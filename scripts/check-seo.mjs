import assert from "node:assert/strict";

// Check the server HTML a Naver crawler receives, without executing JavaScript.
const base = process.argv[2] || "http://localhost:3100";
const canonicalBase = "https://www.saerim.kr";
const headers = { "User-Agent": "Mozilla/5.0 (compatible; Yeti/1.1; +https://naver.me/spd)" };
const read = (path, options = {}) => fetch(new URL(path, base), { headers, ...options });
const decode = (value) => value?.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'");
const meta = (html, name) => decode(html.match(new RegExp(`<meta (?:name|property)="${name}" content="([^"]*)"`))?.[1]);

const sitemap = await read("/sitemap.xml");
assert.equal(sitemap.status, 200);
const xml = await sitemap.text();
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]));
assert.ok(urls.length > 30);
assert.equal(new Set(urls.map(String)).size, urls.length);
const paths = ["/", "/products", "/oem", "/contact", "/en/products", "/zh/products"];
for (const prefix of ["/products/", "/factory/", "/news/"]) {
  const url = urls.find((url) => url.pathname.startsWith(prefix));
  assert.ok(url, `Sitemap includes ${prefix}`);
  paths.push(url.pathname);
}
for (const url of urls) {
  assert.equal(url.origin, canonicalBase);
  assert.ok(!url.pathname.startsWith("/ko"));
}
for (const path of paths) {
  const response = await read(path);
  assert.equal(response.status, 200, path);
  const html = await response.text();
  const head = html.split("</head>")[0];
  const title = decode(head.match(/<title>(.*?)<\/title>/)?.[1]);
  assert.ok(title, `${path}: title in initial head`);
  assert.equal(meta(head, "og:title"), title, `${path}: matching page and OG titles`);
  assert.equal(meta(head, "og:description"), meta(head, "description"), `${path}: matching descriptions`);
  assert.ok(meta(head, "og:image")?.startsWith(canonicalBase), `${path}: preview image`);
  assert.equal(head.match(/rel="canonical" href="([^"]*)"/)?.[1].replace(/\/$/, ""), `${canonicalBase}${path}`.replace(/\/$/, ""));
  assert.ok(!/name="robots"[^>]*noindex/.test(head), `${path}: indexable`);
  if (process.env.EXPECT_NAVER_VERIFICATION) {
    assert.equal(meta(head, "naver-site-verification"), process.env.EXPECT_NAVER_VERIFICATION);
  }
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  assert.ok(schemas.some((schema) => schema["@type"] === "WebSite" && schema.name === "새림"));
  if (path === "/") {
    assert.equal(meta(head, "og:site_name"), "새림");
    const organization = schemas.find((schema) => schema["@type"] === "Organization");
    assert.equal(organization?.name, "새림");
    assert.equal(organization?.legalName, "유한회사 새림");
    const page = schemas.find((schema) => schema["@type"] === "WebPage");
    assert.equal(page?.about?.["@id"], organization["@id"]);
    assert.equal(page?.isPartOf?.["@id"], `${canonicalBase}/#website`);
    assert.match(html, /<h2[^>]*>새림 공식 홈페이지<\/h2>/);
  }
  console.log(`PASS ${path}`);
}
for (const path of ["/ko", "/ko/products?category=test"]) {
  const response = await read(path, { redirect: "manual" });
  assert.equal(response.status, 308, `${path}: permanent redirect`);
  const target = new URL(response.headers.get("location"), base);
  assert.equal(target.pathname + target.search, path.slice(3) || "/");
}
const robots = await (await read("/robots.txt")).text();
assert.ok(robots.includes("Allow: /"));
assert.ok(robots.includes(`Sitemap: ${canonicalBase}/sitemap.xml`));
const missing = await read("/products/does-not-exist-seo-check");
assert.equal(missing.status, 404);
console.log(`PASS ${urls.length} sitemap URLs, robots.txt, redirects, missing-product 404`);
