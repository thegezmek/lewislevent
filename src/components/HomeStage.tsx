"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { FilmPlayer } from "@/components/FilmPlayer";
import { ShowreelBackdrop } from "@/components/ShowreelBackdrop";
import { bioParagraphs } from "@/data/bio";
import type { Project } from "@/data/projects";

type Panel = "home" | "films" | "about" | "contact";

const CONTACT_LINKS = [
  { label: "VIMEO", href: "[TODO: Vimeo URL]" },
  { label: "INSTAGRAM", href: "[TODO: Instagram URL]" },
  { label: "IMDB", href: "[TODO: IMDb URL]" },
  { label: "E-MAIL", href: "mailto:lewis@gez.studio" },
] as const;

const VISIBLE_CONTACT = CONTACT_LINKS.filter(
  (link) => !link.href.startsWith("[TODO:"),
);

const DRAG_CLICK_THRESHOLD = 6;

type HomeStageProps = {
  films: Project[];
};

export function HomeStage({ films }: HomeStageProps) {
  const [panel, setPanel] = useState<Panel>("home");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const didDragRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const activePointerRef = useRef<number | null>(null);

  const selected = films[selectedIndex] ?? films[0];
  const filmReel = panel === "films" ? selected?.reelVideo : undefined;

  const togglePanel = (next: Exclude<Panel, "home">) => {
    setPanel((current) => (current === next ? "home" : next));
  };

  const selectFilm = (index: number) => {
    if (didDragRef.current) return;
    setSelectedIndex(index);
    setPanel("films");
  };

  const stepFilm = useCallback(
    (direction: -1 | 1) => {
      setSelectedIndex((current) => {
        const next = (current + direction + films.length) % films.length;
        return next;
      });
      setPanel("films");
    },
    [films.length],
  );

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    activePointerRef.current = event.pointerId;
    isDraggingRef.current = true;
    didDragRef.current = false;
    dragStartXRef.current = event.clientX;
    dragStartScrollRef.current = track.scrollLeft;
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || activePointerRef.current !== event.pointerId) {
      return;
    }
    const track = trackRef.current;
    if (!track) return;
    const distance = event.clientX - dragStartXRef.current;
    if (Math.abs(distance) > DRAG_CLICK_THRESHOLD && !didDragRef.current) {
      didDragRef.current = true;
      track.setPointerCapture(event.pointerId);
    }
    if (!didDragRef.current) return;
    track.scrollLeft = dragStartScrollRef.current - distance;
  };

  const handlePointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (activePointerRef.current !== event.pointerId) return;
    const track = trackRef.current;
    if (track?.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }
    activePointerRef.current = null;
    isDraggingRef.current = false;
  };

  return (
    <div className="home-stage relative min-h-dvh overflow-x-hidden bg-black text-white md:h-dvh md:overflow-hidden">
      <div className="relative h-[min(56vh,28rem)] w-full md:absolute md:inset-0 md:h-full">
        <ShowreelBackdrop src={filmReel} poster={selected?.reelPoster} />
        <div className="pointer-events-none absolute inset-0 bg-black/30 md:bg-black/25" />
        {/* Weighted left and bottom, where the copy and the strip sit, so pale reels stay readable.
            A film's synopsis needs more cover than the two lines on the home panel. */}
        <div
          className={`pointer-events-none absolute inset-0 hidden bg-gradient-to-r md:block ${
            panel === "home"
              ? "from-black/55 via-black/25 via-45% to-transparent"
              : "from-black/75 via-black/55 via-60% to-black/5"
          }`}
        />
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-black/60 via-transparent to-transparent md:block" />
      </div>

      <div className="relative z-10 flex flex-col px-4 pb-6 pt-7 sm:px-6 md:h-dvh md:min-h-dvh md:px-8 md:pb-0 md:pt-[max(1rem,env(safe-area-inset-top))]">
        <div className="flex min-h-0 flex-1 md:items-center md:overflow-y-auto">
          <div
            className={`flex w-full flex-col gap-6 md:flex-row md:justify-between md:gap-10 ${
              panel === "home" ? "md:items-center" : "md:items-start"
            }`}
          >
            <div className="min-w-0">
              {panel === "home" ? (
                <p className="home-ui max-w-[36rem] text-[0.7rem] uppercase leading-[1.55] tracking-[0.12em] text-white">
                  LEWIS LEVENT IS A DOCUMENTARY DIRECTOR-EDITOR AND EXPLORER.
                  <br />
                  FOUNDER OF{" "}
                  <a
                    href="https://gez.studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-white/40 underline-offset-4 transition hover:decoration-white"
                  >
                    GEZ STUDIO
                  </a>
                  , BASED IN BARCELONA.
                </p>
              ) : null}

              {panel === "about" ? (
                <div className="home-copy flex max-w-[38rem] flex-col gap-3 text-[0.8125rem] leading-relaxed text-white/95 md:max-w-[42rem] md:text-[0.75rem] md:leading-[1.7]">
                  {bioParagraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>
              ) : null}

              {panel === "contact" ? (
                <ul className="flex flex-wrap gap-x-5 gap-y-3 text-[0.7rem] uppercase tracking-[0.16em]">
                  {VISIBLE_CONTACT.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="home-ui tap-target inline-flex items-center text-white/80 transition hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}

              {panel === "films" && selected ? (
                <div className="max-w-[38rem] md:max-w-[42rem]">
                  <h2 className="home-ui text-[0.7rem] uppercase tracking-[0.14em]">
                    {selected.stripTitle}
                  </h2>
                  <p className="home-copy mt-4 text-[0.8125rem] leading-relaxed text-white/95 md:text-[0.75rem] md:leading-[1.7]">
                    {selected.stripText}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.7rem] uppercase tracking-[0.16em]">
                    {selected.trailerUrl ? (
                      <button
                        type="button"
                        onClick={() => setPlaying(true)}
                        className="home-ui tap-target inline-flex items-center text-white/80 transition hover:text-white"
                      >
                        PLAY
                      </button>
                    ) : null}
                    <Link
                      href={`/projects/${selected.slug}`}
                      className="home-ui tap-target inline-flex items-center text-white/80 transition hover:text-white"
                    >
                      CREDITS
                    </Link>
                    {selected.fromAshesUrl ? (
                      <a
                        href={selected.fromAshesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="home-ui tap-target inline-flex items-center text-white/80 transition hover:text-white"
                      >
                        FROMASHES.FILM
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>

            <nav
              aria-label="Primary"
              className="flex shrink-0 items-center gap-5 text-[0.7rem] uppercase tracking-[0.16em] md:pt-0"
            >
              {(["films", "about", "contact"] as const).map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => togglePanel(id)}
                  aria-pressed={panel === id}
                  className={`home-ui tap-target inline-flex items-center ${
                    panel === id ? "text-white" : "text-white/55 hover:text-white"
                  }`}
                >
                  {id.toUpperCase()}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-10 md:mt-auto md:pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <div
            ref={trackRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            onDragStart={(event) => event.preventDefault()}
            className="film-strip -mx-4 cursor-grab overflow-x-auto overscroll-x-contain px-4 pb-1 active:cursor-grabbing sm:-mx-6 sm:px-6 md:mx-0 md:px-0"
          >
            <ul className="flex w-max gap-3 md:gap-4">
              {films.map((film, index) => (
                <li key={film.slug} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => selectFilm(index)}
                    aria-pressed={panel === "films" && index === selectedIndex}
                    aria-label={film.stripTitle}
                    className={`relative block aspect-video h-[5.75rem] overflow-hidden bg-black sm:h-[7rem] md:h-[8.5rem] ${
                      panel === "films" && index === selectedIndex
                        ? "opacity-100"
                        : "opacity-40 hover:opacity-70"
                    }`}
                  >
                    {film.coverImage ? (
                      <Image
                        src={film.coverImage}
                        alt=""
                        fill
                        draggable={false}
                        className="object-cover"
                        sizes="220px"
                      />
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <p className="home-ui mt-4 text-[0.58rem] uppercase tracking-[0.16em] text-white/45">
            Lewis Levent © 2026 · All rights reserved · Directorial debut
            collection (2021–2026).
          </p>
        </div>
      </div>

      {playing && selected ? (
        <FilmPlayer
          title={selected.stripTitle}
          trailerUrl={selected.trailerUrl}
          onBack={() => setPlaying(false)}
          onPrev={() => stepFilm(-1)}
          onNext={() => stepFilm(1)}
        />
      ) : null}
    </div>
  );
}
