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
  /** Show immediately (above-the-fold / first paint) */
  immediate?: boolean;
  style?: CSSProperties;
};

let sharedObserver: IntersectionObserver | null = null;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isNearViewport(node: HTMLElement) {
  const rect = node.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  // Reveal once any portion is within ~1 viewport below the fold
  return rect.top < vh * 1.15 && rect.bottom > -vh * 0.1;
}

function getObserver() {
  if (typeof window === "undefined") return null;

  if (!sharedObserver) {
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
        // Expand detection so near-fold content reveals without extra scroll
        rootMargin: "12% 0px 28% 0px",
        threshold: 0.01,
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
  immediate = false,
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion() || immediate || isNearViewport(node)) {
      node.classList.add("is-visible");
      return;
    }

    const observer = getObserver();
    if (!observer) return;

    observer.observe(node);
    return () => observer.unobserve(node);
  }, [immediate]);

  return createElement(
    Tag,
    {
      ref,
      className: `reveal${stagger ? " reveal-stagger" : ""}${immediate ? " is-visible" : ""} ${className}`.trim(),
      style: {
        ...style,
        ...(delay > 0 ? { "--reveal-delay": `${delay}ms` } : undefined),
      },
    },
    children,
  );
}
