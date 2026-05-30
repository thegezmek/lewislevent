import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CollectionThumb } from "@/components/CollectionThumb";
import { DirectorGallery } from "@/components/DirectorGallery";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { projects } from "@/data/projects";

const FILMS_PER_BLOCK = 4;
const EDITORIAL_POSTER_SLUGS = [
  "proteen",
  "worldview-seaweed",
  "empower",
] as const;
const DIRECTOR_PROFILE_IMAGE = "/lewis-headshot.png";
const DIRECTOR_GALLERY_IMAGES = [
  "/director-gallery/amazon-798.png",
  "/director-gallery/zm-selects-1.png",
  "/director-gallery/kk-selects-4.png",
  "/director-gallery/tashi-selects-10.png",
  "/director-gallery/kk-selects-1.png",
  "/director-gallery/nj-all-07.png",
  "/director-gallery/rp-selects-10.png",
] as const;
const PARTNER_LOGOS = [
  { src: "/partners/dynex.png", alt: "Dynex", href: "https://www.dynex.co/" },
  {
    src: "/partners/impulse-ngo-network.png",
    alt: "Impulse NGO Network",
    href: "https://www.impulsengonetwork.org/",
  },
  {
    src: "/partners/marula-proteen-limited.png",
    alt: "Marula Proteen Limited",
    href: "https://weareproteen.com/",
  },
  { src: "/partners/meta.png", alt: "Meta", href: "https://about.meta.com/" },
  {
    src: "/partners/rockefeller-foundation.png",
    alt: "Rockefeller Foundation",
    href: "https://www.rockefellerfoundation.org/",
  },
  {
    src: "/partners/world-bank.png",
    alt: "The World Bank",
    href: "https://www.worldbank.org/",
  },
  {
    src: "/partners/waterbear.png",
    alt: "WaterBear",
    href: "https://www.waterbear.com/",
  },
  {
    src: "/partners/worldview-international-foundation.png",
    alt: "Worldview International Foundation",
    href: "https://worldview.global/",
  },
  {
    src: "/partners/stop.png",
    alt: "Stop Ecocide",
    href: "https://www.sei.org/",
  },
  { src: "/partners/icipe.png", alt: "ICIPE", href: "https://www.icipe.org/" },
  {
    src: "/partners/solid-africa.png",
    alt: "Solid Africa",
    href: "https://www.solidafrica.org/",
  },
  {
    src: "/partners/vote.png",
    alt: "V.O.T.E.",
    href: "https://voteearth.org/",
  },
  {
    src: "/partners/regeneratex.png",
    alt: "RegenerateX",
    href: "https://www.regeneratex.co/",
  },
  {
    src: "/partners/leaders-on-purpose.png",
    alt: "Leaders on Purpose",
    href: "https://www.leadersonpurpose.com/",
  },
  {
    src: "/partners/united-planet.png",
    alt: "United Planet",
    href: "https://www.unitedplanet.org/",
  },
  {
    src: "/partners/project-honeylight.png",
    alt: "Project Honeylight",
    href: "https://projecthoneylight.life/",
  },
  {
    src: "/partners/department-of-fisheries-thailand.png",
    alt: "Department of Fisheries Thailand",
    href: "https://www4.fisheries.go.th/index.php/dof_en",
  },
  {
    src: "/partners/daily-nation.png",
    alt: "Daily Nation",
    href: "https://www.nation.africa/",
  },
  { src: "/partners/cgiar.png", alt: "CGIAR", href: "https://www.cgiar.org/" },
  {
    src: "/partners/star-fun.png",
    alt: "star.fun",
    href: "https://star.fun/",
  },
  {
    src: "/partners/biosorra.png",
    alt: "Biosorra",
    href: "https://www.biosorra.com/",
  },
  {
    src: "/partners/holland-greentech.png",
    alt: "Holland Greentech",
    href: "https://www.hollandgreentech.com/",
  },
  {
    src: "/partners/impulse-empower.png",
    alt: "Impulse Empower",
    href: "https://www.impulsempower.com/",
  },
  {
    src: "/partners/mugla-sitki-kocman-university.png",
    alt: "Mugla Sitki Kocman University",
    href: "https://www.mu.edu.tr/",
  },
  {
    src: "/partners/istanbul-university-cerrahpasa.png",
    alt: "Istanbul University-Cerrahpasa",
    href: "https://www.iuc.edu.tr/en/",
  },
  {
    src: "/partners/university-of-nairobi.png",
    alt: "University of Nairobi",
    href: "https://www.uonbi.ac.ke/",
  },
  {
    src: "/partners/turkiye-ari-yetistiricileri-merkez-birligi.png",
    alt: "Türkiye Arı Yetiştiricileri Merkez Birliği",
    href: "https://www.tab.org.tr/",
  },
] as const;

const PARTNER_LOGO_HEIGHTS: Partial<Record<(typeof PARTNER_LOGOS)[number]["src"], string>> = {
  "/partners/meta.png": "h-11 sm:h-12",
  "/partners/solid-africa.png": "h-12 md:h-14",
  "/partners/university-of-nairobi.png": "h-11 sm:h-12",
  "/partners/waterbear.png": "h-8 md:h-9",
  "/partners/worldview-international-foundation.png": "h-11 md:h-12",
  "/partners/turkiye-ari-yetistiricileri-merkez-birligi.png": "h-10 md:h-11",
};

const PARTNER_LOGO_FRAMES: Partial<
  Record<(typeof PARTNER_LOGOS)[number]["src"], string>
> = {
  "/partners/star-fun.png":
    "mx-auto my-auto h-[1.05rem] w-[62%] max-w-[3.75rem] shrink-0 md:h-[1.2rem] md:max-w-[4.25rem]",
};

function chunkFilms<T>(items: T[], size: number): T[][] {
  const blocks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    blocks.push(items.slice(i, i + size));
  }
  return blocks;
}

function CollectionCardTitle({ title }: { title: string }) {
  const colon = title.indexOf(":");
  if (colon === -1) {
    return title;
  }
  return (
    <>
      {title.slice(0, colon + 1)}
      <br />
      {title.slice(colon + 1).trim()}
    </>
  );
}

export default function Home() {
  return (
    <div id="top" className="relative min-h-screen bg-[#0a0a0a] text-[#e8e4df]">
      <SiteHeader />

      <main className="bg-[#0a0a0a] pt-[calc(3.75rem+env(safe-area-inset-top,0px))] md:pt-[calc(4.75rem+env(safe-area-inset-top,0px))]">
        {/* Manifesto (Top Copy) */}
        <section className="bg-[#0a0a0a]/95">
          <div className="mx-auto max-w-6xl px-4 pb-10 pt-12 sm:px-6 sm:pb-12 sm:pt-16 md:px-10 md:pb-12 md:pt-20">
            <ScrollReveal>
              <h2 className="max-w-3xl text-2xl font-semibold tracking-[-0.03em] text-stone-100 sm:text-3xl md:text-4xl">
                A slate of documentary films exploring environmental resilience
                and social transformation.
              </h2>
              <p className="mt-5 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-[#e9a31a]">
                By Lewis Levent
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Collection */}
        <section
          id="collection"
          className="scroll-mt-[5.5rem] bg-[#0a0a0a] sm:scroll-mt-24"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20">
            <ScrollReveal>
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-stone-500">
                  Collection story
                </p>
                <h2 className="mt-3 text-2xl font-bold uppercase leading-[1.18] tracking-[-0.03em] text-white antialiased sm:text-3xl md:text-4xl md:leading-[1.15] md:tracking-[-0.035em] lg:text-[2.5rem] lg:tracking-[-0.04em]">
                  Collection Overview
                </h2>
              </div>
            </ScrollReveal>

            <div className="mt-10 md:mt-12">
              {chunkFilms(projects, FILMS_PER_BLOCK).map((block, blockIndex) => (
                <ScrollReveal
                  key={blockIndex}
                  stagger
                  className={blockIndex > 0 ? "mt-12 md:mt-14" : undefined}
                  delay={blockIndex > 0 ? 80 : 0}
                >
                  <ul className="grid list-none grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-8 xl:gap-x-8">
                    {Array.from({ length: FILMS_PER_BLOCK }, (_, slot) => {
                      const project = block[slot];
                      if (!project) {
                        return (
                          <li
                            key={`${blockIndex}-slot-${slot}`}
                            aria-hidden
                            className="pointer-events-none hidden select-none lg:block"
                          >
                            <div className="aspect-[21/9] w-full" />
                          </li>
                        );
                      }
                      return (
                        <li
                          key={project.slug}
                          className="reveal-item"
                          style={{ "--reveal-i": slot } as CSSProperties}
                        >
                          <Link
                            href={`/projects/${project.slug}`}
                            className="collection-card group block rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e9a31a]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                          >
                            <div className="collection-card-media relative aspect-[16/9] w-full overflow-hidden bg-stone-950 ring-1 ring-stone-800/50 transition-[box-shadow,ring-color,transform] duration-500 group-hover:ring-[#e9a31a]/35 sm:aspect-[21/9]">
                              <CollectionThumb
                                spriteIndex={project.spriteIndex}
                                alt={project.title}
                                coverImage={project.coverImage}
                                className="absolute inset-0 h-full w-full transition duration-[1.1s] ease-out group-hover:scale-[1.04] group-hover:brightness-[1.08]"
                              />
                              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/75 via-transparent to-[#0a0a0a]/10 opacity-90 transition duration-500 group-hover:opacity-80" />
                            </div>
                            <h3 className="mt-2 text-sm font-semibold uppercase leading-snug tracking-[0.05em] text-stone-200 transition duration-300 group-hover:text-[#e9a31a] sm:text-base md:mt-2 md:text-sm">
                              <CollectionCardTitle title={project.shortTitle} />
                            </h3>
                            <div className="mt-2 flex flex-col gap-1 border-t border-stone-800/60 pt-2 text-xs text-stone-500 sm:text-[0.8125rem] md:mt-2 md:gap-1 md:pt-2">
                              <p className="text-xs font-medium uppercase tracking-[0.12em] text-stone-400 sm:tracking-[0.13em] md:tracking-[0.14em]">
                                {project.yearLabel}
                              </p>
                              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e9a31a] transition-colors duration-300 group-hover:text-[#f0b942] md:tracking-[0.16em]">
                                {project.country}
                              </p>
                              <p className="line-clamp-4 text-balance text-sm font-medium normal-case leading-relaxed tracking-[0.01em] text-stone-400 antialiased [text-rendering:optimizeLegibility] sm:line-clamp-5 sm:text-[0.9375rem] sm:leading-[1.65] md:line-clamp-6 md:text-[0.8125rem] md:leading-[1.68] lg:text-[0.84375rem]">
                                {project.logline}
                              </p>
                              <p className="text-xs font-medium uppercase tracking-[0.12em] text-stone-400 sm:tracking-[0.13em] md:tracking-[0.14em]">
                                {project.statusLabel}
                              </p>
                              <p className="text-xs uppercase tracking-[0.12em] sm:tracking-[0.13em] md:tracking-[0.14em]">
                                {project.runtime}
                              </p>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0a0a0a]/95">
          <div className="mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-6 sm:pb-12 sm:pt-12 md:px-10 md:pb-12 md:pt-12">
            <div
              className="mb-8 h-px w-full bg-stone-800/70 md:mb-10"
              aria-hidden
            />
            <div className="grid gap-10 sm:gap-10 lg:grid-cols-[minmax(0,0.52fr)_minmax(0,0.48fr)] lg:gap-8">
              <ScrollReveal>
                <div>
                  <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#e9a31a]">
                    Editorial Focus
                  </p>
                  <p className="max-w-xl text-base leading-relaxed text-stone-400 sm:text-lg">
                    These films trace the systems shaping land, livelihood, and
                    movement across diverse regions, following communities and
                    individuals as they respond to disruption and navigate
                    long-term change.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal stagger delay={100}>
                <aside className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                {EDITORIAL_POSTER_SLUGS.map((slug, index) => {
                  const project = projects.find((entry) => entry.slug === slug);
                  if (!project) {
                    return null;
                  }
                  const posterSrc = project.posterImage ?? project.coverImage;
                  if (!posterSrc) {
                    return null;
                  }
                  const poster = (
                    <figure className="relative aspect-[2/3] overflow-hidden bg-stone-950 ring-1 ring-stone-800/70 transition-[box-shadow,ring-color,transform] duration-500 group-hover:ring-[#e9a31a]/35 group-active:scale-[0.98]">
                      <Image
                        src={posterSrc}
                        alt={`${project.title} poster`}
                        fill
                        className="object-cover transition duration-[1.1s] ease-out group-hover:scale-[1.04] group-hover:brightness-[1.08]"
                        sizes="(min-width: 1024px) 22vw, 30vw"
                      />
                    </figure>
                  );
                  const wrapperClass =
                    "reveal-item group tap-target block rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e9a31a]";
                  if (!project.trailerUrl) {
                    return (
                      <div
                        key={project.slug}
                        className={wrapperClass}
                        style={{ "--reveal-i": index } as CSSProperties}
                      >
                        {poster}
                      </div>
                    );
                  }
                  return (
                    <a
                      key={project.slug}
                      href={project.trailerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Watch ${project.title} trailer (opens in new tab)`}
                      className={wrapperClass}
                      style={{ "--reveal-i": index } as CSSProperties}
                    >
                      {poster}
                    </a>
                  );
                })}
                </aside>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Manifesto */}
        <section
          id="manifesto"
          className="scroll-mt-[5.5rem] border-t border-stone-900/80 bg-[#0a0a0a]/95 sm:scroll-mt-24"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-32">
            <div className="grid min-w-0 gap-10 sm:gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,13rem)] md:items-start md:gap-x-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,0.28fr)] lg:items-start lg:gap-10">
              <ScrollReveal className="min-w-0">
                <section>
                  <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#e9a31a]">
                    Director’s Profile
                  </p>
                  <p className="max-w-2xl text-base leading-relaxed text-stone-300 md:text-lg lg:max-w-[40ch]">
                    Lewis Levent is a British-Turkish documentary filmmaker and
                    founder of Gez Studio. His work spans multiple regions,
                    focusing on stories at the intersection of environmental
                    change, culture, and social transformation. His films are
                    developed through long-term fieldwork and have been
                    distributed internationally, including on WaterBear.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={120} className="min-w-0 w-full md:justify-self-end md:pt-0.5 lg:pt-1">
                <aside>
                  <figure className="relative aspect-[4/5] w-full overflow-hidden bg-stone-950 md:aspect-[3/4] md:mx-0 lg:aspect-[4/4.6]">
                    <Image
                      src={DIRECTOR_PROFILE_IMAGE}
                      alt="Portrait of Lewis Levent"
                      fill
                      className="object-contain"
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 16rem, 100vw"
                    />
                  </figure>
                  <DirectorGallery
                    title="On Location"
                    images={DIRECTOR_GALLERY_IMAGES}
                    compact
                  />
                </aside>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="border-t border-stone-900/80 bg-[#0c0c0c]">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:px-10 md:py-24">
            <ScrollReveal>
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#e9a31a]">
                  Partners & Collaborators
                </p>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone-400 md:text-lg">
                  Organisations collaborated with across production, research, and
                  featured stories.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal stagger delay={80} className="mt-8 sm:mt-10">
              <ul className="partners-grid grid grid-cols-3 gap-2.5 sm:gap-3 md:grid-cols-9 md:gap-3">
                {PARTNER_LOGOS.map((logo, index) => (
                  <li
                    key={logo.src}
                    className="reveal-item flex border border-stone-800/80 bg-transparent"
                    style={{ "--reveal-i": index % 9 } as CSSProperties}
                  >
                    <a
                      href={logo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tap-target flex h-full w-full min-h-[3.25rem] items-center justify-center px-1.5 py-0 transition-colors hover:bg-stone-900/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e9a31a]/50 sm:min-h-[3.5rem] sm:px-2 md:px-2"
                    >
                      <div
                        className={`partner-logo-frame relative ${
                          PARTNER_LOGO_FRAMES[logo.src] ??
                          `w-full ${PARTNER_LOGO_HEIGHTS[logo.src] ?? "h-9 md:h-10"}`
                        }`}
                      >
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          fill
                          unoptimized
                          className="object-contain object-center"
                          sizes="(min-width: 768px) 10vw, 28vw"
                        />
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="scroll-mt-[5.5rem] border-t border-stone-900/80 bg-[#0c0c0c] sm:scroll-mt-24"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-32">
            <ScrollReveal>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-stone-500">
                Contact
              </p>
              <h2 className="mt-4 max-w-xl text-2xl font-semibold tracking-[-0.03em] text-stone-100 sm:text-3xl md:text-4xl">
                Screenings, distribution, collaborations.
              </h2>
              <p className="mt-6 max-w-lg text-stone-500">
                Open to distribution, co-production, and partnership
                opportunities across the collection. For screeners, full
                materials, or to discuss collaboration:
              </p>
              <a
                href="mailto:lewis@gez.studio"
                className="ember-underline tap-target mt-8 inline-flex items-center text-base font-medium text-stone-200 sm:mt-10 sm:text-lg"
              >
                lewis@gez.studio
              </a>
            </ScrollReveal>
          </div>
        </section>

        <div className="bg-[#0c0c0c] px-4 pb-10 pt-2 sm:px-6 md:px-10 supports-[padding:max(0px)]:pb-[calc(2.5rem+env(safe-area-inset-bottom))]">
          <div className="mx-auto flex max-w-6xl justify-end">
            <a
              href="#top"
              className="tap-target inline-flex items-center text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-stone-500 transition-colors hover:text-[#e9a31a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e9a31a]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0c0c]"
            >
              Back to top
            </a>
          </div>
        </div>

        <SiteFooter />
      </main>
    </div>
  );
}
