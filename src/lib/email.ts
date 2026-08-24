import { connect, type TLSSocket } from "node:tls";

/**
 * 문의 접수 메일 알림 — 네이버 SMTP(smtp.naver.com:465) 직접 전송.
 * 외부 패키지 없이 동작하며, 환경변수가 없으면 조용히 건너뛴다.
 *
 * 필요 환경변수 (.env):
 *   SMTP_HOST=smtp.gmail.com        (구글 워크스페이스 사용 시. 네이버면 smtp.naver.com)
 *   SMTP_USER=info@saerim.kr        (발신 계정)
 *   SMTP_PASS=앱 비밀번호            (구글 앱 비밀번호 / 네이버 2단계 인증 앱 비밀번호)
 *   INQUIRY_NOTIFY_TO=info@saerim.kr (받을 주소, 생략 시 SMTP_USER)
 */

const SMTP_HOST = process.env.SMTP_HOST ?? "smtp.naver.com";
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 465);
const TIMEOUT_MS = 10_000;

const b64 = (value: string) => Buffer.from(value, "utf-8").toString("base64");
/** 한글 제목용 RFC 2047 인코딩 */
const encodeHeader = (value: string) => `=?UTF-8?B?${b64(value)}?=`;

function smtpSend(socket: TLSSocket, command: string | null, expectCode: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let buffer = "";
    const onData = (chunk: Buffer) => {
      buffer += chunk.toString("utf-8");
      // 멀티라인 응답(250-...)이 끝날 때까지 대기
      const lines = buffer.split("\r\n").filter(Boolean);
      const last = lines[lines.length - 1];
      if (last && /^\d{3} /.test(last)) {
        socket.off("data", onData);
        if (last.startsWith(expectCode)) resolve(buffer);
        else reject(new Error(`SMTP ${command ?? "(greeting)"} 실패: ${last}`));
      }
    };
    socket.on("data", onData);
    if (command !== null) socket.write(command + "\r\n");
  });
}

export type InquiryMail = {
  kind: string;
  company: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  productSlug: string;
  locale?: string;
};

const KIND_LABEL: Record<string, string> = {
  wholesale: "도매 공급",
  oem: "OEM 생산",
  general: "일반 문의",
};

export async function sendInquiryNotification(inquiry: InquiryMail): Promise<void> {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return; // 미설정 시 메일 없이 접수만 진행

  const to = process.env.INQUIRY_NOTIFY_TO ?? user;
  const kindLabel = KIND_LABEL[inquiry.kind] ?? inquiry.kind;
  const isChinese = inquiry.locale === "zh";
  const subject = `[새림 홈페이지${isChinese ? " · 中文" : ""}] ${kindLabel} 문의 — ${inquiry.company} ${inquiry.name}`;

  const bodyLines = [
    "새림 홈페이지로 새 문의가 접수되었습니다.",
    "",
    `문의 유형 : ${kindLabel}`,
    isChinese && "접수 언어 : 중국어 페이지(/zh)",
    `업체명   : ${inquiry.company}`,
    `담당자   : ${inquiry.name}`,
    `연락처   : ${inquiry.phone}`,
    inquiry.email && `이메일   : ${inquiry.email}`,
    inquiry.productSlug && `문의 제품 : ${inquiry.productSlug}`,
    "",
    "문의 내용:",
    inquiry.message || "(내용 없음)",
    "",
    "— 관리자 페이지 문의함에서도 확인할 수 있습니다.",
  ].filter((line): line is string => line !== "" || true);

  // 본문은 base64 인코딩으로 전송하므로 dot-stuffing이 필요 없다.
  const message = [
    `From: ${encodeHeader("새림 홈페이지")} <${user}>`,
    `To: <${to}>`,
    `Subject: ${encodeHeader(subject)}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    b64(bodyLines.join("\n")),
  ].join("\r\n");

  await new Promise<void>((resolve, reject) => {
    const socket = connect({ host: SMTP_HOST, port: SMTP_PORT, servername: SMTP_HOST });
    const timer = setTimeout(() => {
      socket.destroy();
      reject(new Error("SMTP 연결 시간 초과"));
    }, TIMEOUT_MS);

    socket.once("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });

    socket.once("secureConnect", async () => {
      try {
        await smtpSend(socket, null, "220");
        await smtpSend(socket, "EHLO saerim.kr", "250");
        await smtpSend(socket, "AUTH LOGIN", "334");
        await smtpSend(socket, b64(user), "334");
        await smtpSend(socket, b64(pass), "235");
        await smtpSend(socket, `MAIL FROM:<${user}>`, "250");
        await smtpSend(socket, `RCPT TO:<${to}>`, "250");
        await smtpSend(socket, "DATA", "354");
        await smtpSend(socket, message + "\r\n.", "250");
        socket.write("QUIT\r\n");
        socket.end();
        clearTimeout(timer);
        resolve();
      } catch (error) {
        clearTimeout(timer);
        socket.destroy();
        reject(error as Error);
      }
    });
  });
}
