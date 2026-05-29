"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";

type DirectorGalleryProps = {
  title: string;
  images: readonly string[];
  compact?: boolean;
};

const DRAG_CLICK_THRESHOLD = 6;

export function DirectorGallery({
  title,
  images,
  compact = false,
}: DirectorGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(images.length > 1);
  const [isDragging, setIsDragging] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const didDragRef = useRef(false);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    setCanScrollLeft(track.scrollLeft > 8);
    setCanScrollRight(track.scrollLeft < maxScrollLeft - 8);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const goToPrevious = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return null;
      return (current - 1 + images.length) % images.length;
    });
  }, [images.length]);

  const goToNext = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return null;
      return (current + 1) % images.length;
    });
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
        return;
      }
      if (images.length < 2) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrevious();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNext();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, images.length, goToPrevious, goToNext]);

  const openLightbox = (index: number) => {
    if (didDragRef.current) return;
    setLightboxIndex(index);
  };

  const scrollByPage = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;

    const amount = Math.round(track.clientWidth * 0.9);
    track.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const handleDragStart = (event: MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    setIsDragging(true);
    didDragRef.current = false;
    dragStartXRef.current = event.clientX;
    dragStartScrollRef.current = track.scrollLeft;
  };

  const handleDragMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const track = trackRef.current;
    if (!track) return;
    const distance = event.clientX - dragStartXRef.current;
    if (Math.abs(distance) > DRAG_CLICK_THRESHOLD) {
      didDragRef.current = true;
    }
    track.scrollLeft = dragStartScrollRef.current - distance;
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    updateScrollState();
  };

  const compactItemClass =
    "w-[calc(100cqw-0.25rem)] max-w-[11rem] shrink-0 snap-start sm:max-w-[12rem] md:max-w-[18rem] lg:w-[calc((100%-1.5rem)/3)] lg:min-w-[calc((100%-1.5rem)/3)] lg:max-w-none";

  return (
    <section className={compact ? "mt-4 min-w-0 md:mt-5" : "mt-12 min-w-0 md:mt-14"}>
      <div className="flex min-w-0 items-center justify-between gap-3 sm:gap-4">
        <p className="min-w-0 truncate text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-stone-500 md:text-[0.62rem]">
          {title}
        </p>
        <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
          <button
            type="button"
            onClick={() => scrollByPage("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll gallery left"
            className={`tap-target inline-flex items-center justify-center border border-stone-800/80 text-sm text-stone-300 transition hover:border-stone-600 hover:text-stone-100 disabled:cursor-not-allowed disabled:border-stone-900 disabled:text-stone-700 ${
              compact ? "h-9 w-9 md:h-11 md:w-11" : "h-11 w-11 md:h-9 md:w-9"
            }`}
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByPage("right")}
            disabled={!canScrollRight}
            aria-label="Scroll gallery right"
            className={`tap-target inline-flex items-center justify-center border border-stone-800/80 text-sm text-stone-300 transition hover:border-stone-600 hover:text-stone-100 disabled:cursor-not-allowed disabled:border-stone-900 disabled:text-stone-700 ${
              compact ? "h-9 w-9 md:h-11 md:w-11" : "h-11 w-11 md:h-9 md:w-9"
            }`}
          >
            →
          </button>
        </div>
      </div>

      <div
        className={`min-w-0 ${compact ? "relative mt-3.5 @container/director-profile" : "relative mt-5"}`}
      >
        <div
          ref={trackRef}
          onScroll={updateScrollState}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onDragStart={(event) => event.preventDefault()}
          className={`min-w-0 overflow-x-auto overscroll-x-contain pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [touch-action:pan-x] [&::-webkit-scrollbar]:hidden ${
            isDragging ? "cursor-grabbing select-none" : "cursor-grab"
          }`}
        >
          <ul
            className={`flex snap-x snap-mandatory ${
              compact ? "gap-2 md:gap-2.5 lg:gap-3" : "gap-3 md:gap-4"
            }`}
          >
            {images.map((image, index) => (
              <li
                key={image}
                className={
                  compact
                    ? compactItemClass
                    : "w-[min(78vw,100%)] max-w-[19rem] shrink-0 snap-start sm:max-w-[17rem] md:w-[22rem] md:max-w-[22rem]"
                }
              >
                <button
                  type="button"
                  onClick={() => openLightbox(index)}
                  aria-label={`View director on location photo ${index + 1} full screen`}
                  className="group tap-target block w-full min-h-0 text-left"
                >
                  <figure
                    className={`relative aspect-[4/3] overflow-hidden bg-stone-950 ring-1 ring-stone-800/70 transition-[box-shadow,ring-color] duration-500 group-hover:ring-[#e9a31a]/35${
                      compact ? " max-md:aspect-[3/2]" : ""
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Director on location ${index + 1}`}
                      fill
                      draggable={false}
                      className="object-cover transition duration-[1.1s] ease-out group-hover:scale-[1.04] group-hover:brightness-[1.08]"
                      sizes={
                        compact
                          ? "(min-width: 1024px) 12vw, (min-width: 768px) 50vw, 11rem"
                          : "(min-width: 768px) 22rem, min(78vw, 100%)"
                      }
                    />
                  </figure>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {mounted &&
        lightboxIndex !== null &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} photo ${lightboxIndex + 1}`}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] sm:p-4 md:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setLightboxIndex(null);
              }}
              aria-label="Close full screen image"
              className="tap-target absolute right-3 top-[max(0.75rem,env(safe-area-inset-top))] z-10 inline-flex h-11 w-11 items-center justify-center border border-stone-700/80 text-lg text-stone-300 transition hover:border-stone-500 hover:text-stone-100 sm:right-4 md:right-8 md:top-8"
            >
              ×
            </button>

            <div
              className="relative flex min-h-0 w-full flex-1 items-center justify-center px-12 sm:px-14 md:px-20"
              onClick={(event) => event.stopPropagation()}
            >
              {images.length > 1 ? (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    goToPrevious();
                  }}
                  aria-label="Previous photo"
                  className="tap-target absolute left-1 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-stone-700/80 text-sm text-stone-300 transition hover:border-stone-500 hover:text-stone-100 sm:left-3 md:left-8"
                >
                  ←
                </button>
              ) : null}

              <div className="relative h-[min(72vh,calc(100dvh-8rem))] w-full max-w-full sm:h-[min(78vh,calc(100dvh-7rem))] md:h-[min(85vh,calc(100vh-6rem))] md:max-w-[min(72rem,100%)]">
                <Image
                  src={images[lightboxIndex]}
                  alt={`Director on location ${lightboxIndex + 1}`}
                  fill
                  priority
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              {images.length > 1 ? (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    goToNext();
                  }}
                  aria-label="Next photo"
                  className="tap-target absolute right-1 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-stone-700/80 text-sm text-stone-300 transition hover:border-stone-500 hover:text-stone-100 sm:right-3 md:right-8"
                >
                  →
                </button>
              ) : null}
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
