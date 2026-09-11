"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: "0" | "75" | "100" | "150" | "200" | "300" | "500" | "700" | "1000";
}

export function ScrollReveal({ children, className = "", delay = "0" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: "-50px 0px",
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out fill-mode-forwards ${
        isVisible
          ? `opacity-100 translate-y-0 delay-${delay}`
          : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}
