"use client";

import Image from "next/image";
import {
  Fragment,
  useCallback,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { FilmPlayer } from "@/components/FilmPlayer";
import { ShowreelBackdrop } from "@/components/ShowreelBackdrop";
import { ABOUT_REEL_POSTER, ABOUT_REEL_SRC } from "@/data/showreel";
import { bioParagraphs, contactEmail } from "@/data/bio";
import type { Project } from "@/data/projects";

type Panel = "home" | "films" | "about" | "contact";

/** The email sits on its own line below these, spelled out rather than labelled. */
const CONTACT_LINKS = [
  { label: "VIMEO", href: "https://vimeo.com/gezstudio" },
  { label: "INSTAGRAM", href: "https://www.instagram.com/lewislevent/" },
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/lewislevent/" },
] as const;

/** Says what CONTACT is for, so the panel is an invitation rather than a list. */
const CONTACT_LINE =
  "For director commissions, branded film and distribution inquiries.";

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
  // Credits open in place rather than on their own page. The state is kept
  // across films, so stepping the strip with them open keeps them open.
  const [showCredits, setShowCredits] = useState(false);
  // 0 is the film itself; 1+ index into its `pieces`.
  const [pieceIndex, setPieceIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const didDragRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const activePointerRef = useRef<number | null>(null);

  const selected = films[selectedIndex] ?? films[0];

  // A piece counts once it has a real trailer. Its paragraph is optional and
  // falls back to the parent film's.
  const readyPieces = (selected?.pieces ?? []).filter(
    (p) => p.trailerUrl != null && !p.trailerUrl.startsWith("[TODO:"),
  );
  const piece = pieceIndex > 0 ? readyPieces[pieceIndex - 1] : undefined;

  const activeTitle =
    piece?.label ?? selected?.baseLabel ?? selected?.stripTitle;
  const activeText = piece?.stripText ?? selected?.stripText;
  const activeTrailer = piece ? piece.trailerUrl : selected?.trailerUrl;
  const activeCredits = piece ? piece.credits : selected?.credits;
  // Films play their own reel, ABOUT plays Lewis on location, and the rest
  // fall through to the general showreel inside ShowreelBackdrop.
  const backdropSrc =
    panel === "films"
      ? (piece?.reelVideo ?? selected?.reelVideo)
      : panel === "about"
        ? ABOUT_REEL_SRC
        : undefined;
  const backdropPoster =
    panel === "films"
      ? (piece?.reelPoster ?? selected?.reelPoster)
      : panel === "about"
        ? ABOUT_REEL_POSTER
        : undefined;

  const togglePanel = (next: Exclude<Panel, "home">) => {
    setPanel((current) => (current === next ? "home" : next));
  };

  const selectFilm = (index: number) => {
    if (didDragRef.current) return;
    setSelectedIndex(index);
    setPieceIndex(0);
    setPanel("films");
  };

  const stepFilm = useCallback(
    (direction: -1 | 1) => {
      setSelectedIndex((current) => {
        const next = (current + direction + films.length) % films.length;
        return next;
      });
      setPieceIndex(0);
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
        <ShowreelBackdrop src={backdropSrc} poster={backdropPoster} />
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
                <p className="home-ui max-w-[36rem] text-[clamp(0.55rem,2.45vw,0.7rem)] uppercase leading-[1.55] tracking-[0.1em] text-white sm:tracking-[0.12em] md:text-[0.7rem]">
                  LEWIS LEVENT IS A DOCUMENTARY DIRECTOR-EDITOR AND EXPLORER.
                  <br />
                  <span className="whitespace-nowrap">FOUNDER OF</span>{" "}
                  <a
                    href="https://gez.studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-white/40 underline-offset-4 transition hover:decoration-white"
                  >
                    GEZ STUDIO
                  </a>
                  <span className="whitespace-nowrap">, BASED IN BARCELONA.</span>
                </p>
              ) : null}

              {panel === "about" ? (
                <div className="home-copy flex max-w-[38rem] flex-col gap-3 text-[0.8125rem] leading-relaxed text-white/95 md:max-w-[42rem] md:text-[0.75rem] md:leading-[1.7]">
                  {bioParagraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)} className="whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}

              {panel === "contact" ? (
                <div className="max-w-[38rem] md:max-w-[42rem]">
                  <p className="home-copy text-[0.8125rem] leading-relaxed text-white/95 md:text-[0.75rem] md:leading-[1.7]">
                    {CONTACT_LINE}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-[0.7rem] uppercase tracking-[0.16em]">
                    {VISIBLE_CONTACT.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="home-ui tap-target inline-flex items-center text-white/80 transition hover:text-white"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="home-ui tap-target mt-3 inline-flex items-center text-[0.875rem] font-medium tracking-[0.01em] text-white transition hover:text-white/75 md:text-[0.8125rem]"
                  >
                    {contactEmail}
                  </a>
                </div>
              ) : null}

              {panel === "films" && selected ? (
                <div className="max-w-[38rem] md:max-w-[42rem]">
                  {readyPieces.length ? (
                    <h2 className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] uppercase tracking-[0.14em]">
                      {[
                        selected.baseLabel ?? selected.stripTitle,
                        ...readyPieces.map((p) => p.label),
                      ].map(
                        (label, index) => (
                          <Fragment key={label}>
                            {index > 0 ? (
                              <span aria-hidden className="text-white/25">
                                /
                              </span>
                            ) : null}
                            <button
                              type="button"
                              onClick={() => {
                                setPieceIndex(index);
                                setShowCredits(false);
                              }}
                              aria-pressed={pieceIndex === index}
                              className={`home-ui tap-target inline-flex items-center transition ${
                                pieceIndex === index
                                  ? "text-white underline decoration-white/50 underline-offset-[5px]"
                                  : "text-white/45 hover:text-white/80"
                              }`}
                            >
                              {label}
                            </button>
                          </Fragment>
                        ),
                      )}
                    </h2>
                  ) : (
                    <h2 className="home-ui text-[0.7rem] uppercase tracking-[0.14em]">
                      {activeTitle}
                    </h2>
                  )}

                  <p className="home-copy mt-4 text-[0.8125rem] leading-relaxed text-white/95 md:text-[0.75rem] md:leading-[1.7]">
                    {activeText}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.7rem] uppercase tracking-[0.16em]">
                    {activeTrailer ? (
                      <button
                        type="button"
                        onClick={() => setPlaying(true)}
                        className="home-ui tap-target inline-flex items-center text-white/80 transition hover:text-white"
                      >
                        PLAY
                      </button>
                    ) : null}
                    {activeCredits?.length ? (
                      <button
                        type="button"
                        onClick={() => setShowCredits((open) => !open)}
                        aria-expanded={showCredits}
                        className={`home-ui tap-target inline-flex items-center gap-1.5 transition ${
                          showCredits ? "text-white" : "text-white/80 hover:text-white"
                        }`}
                      >
                        CREDITS
                        <svg
                          aria-hidden
                          viewBox="0 0 10 6"
                          className={`h-[0.3rem] w-[0.5rem] transition-transform ${
                            showCredits ? "rotate-180" : ""
                          }`}
                        >
                          <path
                            d="M1 1l4 4 4-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="square"
                          />
                        </svg>
                      </button>
                    ) : null}
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

                  {showCredits && activeCredits?.length ? (
                    <dl className="mt-5 grid grid-cols-[minmax(0,8.5rem)_1fr] gap-x-5 gap-y-1.5 text-[0.7rem] leading-relaxed sm:grid-cols-[minmax(0,11rem)_1fr]">
                      {activeCredits.map(({ label, value }) => (
                        <Fragment key={label}>
                          <dt className="home-ui uppercase tracking-[0.12em] text-white/45">
                            {label}
                          </dt>
                          <dd className="home-copy text-white/90">{value}</dd>
                        </Fragment>
                      ))}
                    </dl>
                  ) : null}
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
          {panel === "films" ? (
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
                    className={`film-cover relative block aspect-video h-[5.75rem] overflow-hidden bg-black sm:h-[7rem] md:h-[8.5rem] ${
                      panel === "films" && index === selectedIndex
                        ? "opacity-100"
                        : "opacity-45 hover:opacity-90"
                    }`}
                  >
                    {film.coverImage ? (
                      <Image
                        src={film.coverImage}
                        alt=""
                        fill
                        draggable={false}
                        className="film-cover-media object-cover"
                        sizes="220px"
                      />
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          ) : null}
          <p className="home-ui mt-4 text-[0.58rem] uppercase tracking-[0.16em] text-white/45">
            Lewis Levent © 2026 · All rights reserved · Directorial debut
            collection (2021–2026).
          </p>
        </div>
      </div>

      {playing && selected ? (
        <FilmPlayer
          title={activeTitle}
          trailerUrl={activeTrailer}
          onBack={() => setPlaying(false)}
          onPrev={() => stepFilm(-1)}
          onNext={() => stepFilm(1)}
        />
      ) : null}
    </div>
  );
}
