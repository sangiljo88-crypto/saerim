"use client";

import { useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
};

export function Reveal({ children, className = "", delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = ref.current;

    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          target.classList.add("is-visible");
          observer.unobserve(target);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-block ${className}`}
      style={{ animationDelay: `${delayMs}ms`, transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
