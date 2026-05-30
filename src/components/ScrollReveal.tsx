"use client";

import {
  createElement,
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Delay in ms before the reveal starts */
  delay?: number;
  /** Stagger children that use `.reveal-item` */
  stagger?: boolean;
  style?: CSSProperties;
};

let sharedObserver: IntersectionObserver | null = null;

function getObserver() {
  if (typeof window === "undefined") return null;

  if (!sharedObserver) {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          sharedObserver?.unobserve(entry.target);
        });
      },
      {
        root: null,
        rootMargin: prefersReduced ? "0px" : "0px 0px -6% 0px",
        threshold: prefersReduced ? 0 : 0.12,
      },
    );
  }

  return sharedObserver;
}

export function ScrollReveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  stagger = false,
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      node.classList.add("is-visible");
      return;
    }

    const observer = getObserver();
    if (!observer) return;

    observer.observe(node);
    return () => observer.unobserve(node);
  }, []);

  return createElement(
    Tag,
    {
      ref,
      className: `reveal${stagger ? " reveal-stagger" : ""} ${className}`.trim(),
      style: {
        ...style,
        ...(delay > 0 ? { "--reveal-delay": `${delay}ms` } : undefined),
      },
    },
    children,
  );
}
