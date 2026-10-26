"use client";

import { useEffect, useRef, useState } from "react";
import { vimeoEmbedSrc } from "@/lib/vimeo";

type FilmPlayerProps = {
  title: string;
  trailerUrl?: string;
  onBack: () => void;
  onPrev: () => void;
  onNext: () => void;
};

declare global {
  interface Window {
    Vimeo?: {
      Player: new (element: HTMLIFrameElement) => {
        on: (event: string, callback: (data: { percent?: number }) => void) => void;
        off: (event: string) => void;
        destroy: () => void;
      };
    };
  }
}

function loadVimeoApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Vimeo) return Promise.resolve();
  const existing = document.querySelector<HTMLScriptElement>(
    'script[src="https://player.vimeo.com/api/player.js"]',
  );
  if (existing) {
    return new Promise((resolve) => {
      existing.addEventListener("load", () => resolve(), { once: true });
    });
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Vimeo player failed to load"));
    document.head.appendChild(script);
  });
}

export function FilmPlayer({
  title,
  trailerUrl,
  onBack,
  onPrev,
  onNext,
}: FilmPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [progress, setProgress] = useState(0);
  const src = vimeoEmbedSrc(trailerUrl, true);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onBack();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onBack, onPrev, onNext]);

  useEffect(() => {
    setProgress(0);
    const iframe = iframeRef.current;
    if (!iframe || !src) return;

    let player: {
      on: (event: string, callback: (data: { percent?: number }) => void) => void;
      off: (event: string) => void;
      destroy: () => void;
    } | null = null;
    let cancelled = false;

    loadVimeoApi()
      .then(() => {
        if (cancelled || !iframeRef.current || !window.Vimeo) return;
        player = new window.Vimeo.Player(iframeRef.current);
        player.on("timeupdate", (data) => {
          if (typeof data.percent === "number") setProgress(data.percent);
        });
      })
      .catch(() => {
        /* Progress bar stays empty if the API cannot load. */
      });

    return () => {
      cancelled = true;
      player?.off("timeupdate");
      player?.destroy();
    };
  }, [src]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} trailer`}
      className="fixed inset-0 z-[80] bg-black"
    >
      <div className="absolute inset-x-0 top-0 z-10 h-[2px] bg-white/15">
        <div
          className="h-full bg-white transition-[width] duration-200 ease-linear"
          style={{ width: `${Math.min(100, progress * 100)}%` }}
        />
      </div>

      <button
        type="button"
        onClick={onBack}
        className="home-ui tap-target absolute left-4 top-[max(1rem,env(safe-area-inset-top))] z-10 inline-flex items-center text-[0.7rem] uppercase tracking-[0.16em] text-white md:left-8"
      >
        BACK
      </button>

      <button
        type="button"
        onClick={onPrev}
        className="home-ui tap-target absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 items-center text-[0.7rem] uppercase tracking-[0.16em] text-white md:inline-flex md:left-8"
      >
        PREV
      </button>
      <button
        type="button"
        onClick={onNext}
        className="home-ui tap-target absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center text-[0.7rem] uppercase tracking-[0.16em] text-white md:inline-flex md:right-8"
      >
        NEXT
      </button>

      {/* The title sits in the video's own column so it lands at its bottom left. */}
      <div className="flex h-full items-center justify-center px-0 md:px-24">
        <div className="w-full md:w-[min(100%,140vh)]">
          {src ? (
            <iframe
              key={src}
              ref={iframeRef}
              src={src}
              title={`${title} trailer`}
              className="aspect-video w-full md:aspect-auto md:h-[min(80vh,56.25vw)]"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : null}
          <p className="home-ui mt-4 px-4 text-[0.875rem] uppercase leading-[1.35] tracking-[0.12em] text-white md:mt-5 md:px-0 md:text-[1.05rem]">
            {title}
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-10 px-4 md:px-8">
        <div className="flex justify-between md:hidden">
          <button
            type="button"
            onClick={onPrev}
            className="home-ui tap-target inline-flex items-center text-[0.7rem] uppercase tracking-[0.16em] text-white"
          >
            PREV
          </button>
          <button
            type="button"
            onClick={onNext}
            className="home-ui tap-target inline-flex items-center text-[0.7rem] uppercase tracking-[0.16em] text-white"
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}
