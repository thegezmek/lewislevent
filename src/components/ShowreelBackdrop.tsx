"use client";

import { useState } from "react";
import { SHOWREEL_STILLS } from "@/data/showreel";

type ShowreelBackdropProps = {
  src?: string;
  poster?: string;
};

type Layer = {
  src?: string;
  poster?: string;
};

export function ShowreelBackdrop({ src, poster }: ShowreelBackdropProps = {}) {
  // No default: the caller decides which reel, and passes nothing until it
  // knows the viewport. The stills stand in for that first moment.
  const videoSrc = src;
  const videoPoster = poster;

  /** The reel on screen, which lags behind the prop until the next one can play. */
  const [shown, setShown] = useState<Layer>({ src: videoSrc, poster: videoPoster });
  const incoming = shown.src !== videoSrc;

  if (videoSrc) {
    return (
      <div className="showreel-media absolute inset-0 overflow-hidden bg-black">
        {incoming && shown.src ? (
          <video
            key={shown.src}
            className="absolute inset-0 h-full w-full object-cover"
            src={shown.src}
            poster={shown.poster}
            loop
            autoPlay
            muted
            playsInline
            aria-hidden
          />
        ) : null}
        <video
          key={videoSrc}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: incoming ? 0 : 1 }}
          src={videoSrc}
          poster={videoPoster}
          onLoadedData={() => setShown({ src: videoSrc, poster: videoPoster })}
          onCanPlay={() => setShown({ src: videoSrc, poster: videoPoster })}
          preload="auto"
          loop
          autoPlay
          muted
          playsInline
          aria-hidden
        />
      </div>
    );
  }

  return (
    <div className="showreel-stills absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${SHOWREEL_STILLS[0]})` }}
      />
      {SHOWREEL_STILLS.map((still, index) => (
        <div
          key={still}
          className="showreel-still absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${still})`,
            animationDelay: `${index * 8}s`,
          }}
        />
      ))}
    </div>
  );
}
