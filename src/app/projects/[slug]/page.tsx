import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CollectionThumb } from "@/components/CollectionThumb";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getProjectBySlug, projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Lewis Levent`,
    description:
      project.synopsisParagraphs?.[0] ?? project.synopsis,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const isDone = project.status === "completed";
  const sheetParagraphs = project.synopsisParagraphs ?? [];
  const sheetCredits = project.credits ?? [];
  const hasSheet = sheetParagraphs.length > 0 && sheetCredits.length > 0;
  const trailerMatch = project.trailerUrl?.match(
    /vimeo\.com\/(\d+)(?:\/([A-Za-z0-9]+))?/,
  );
  const trailerEmbedUrl = trailerMatch
    ? trailerMatch[2]
      ? `https://player.vimeo.com/video/${trailerMatch[1]}?h=${trailerMatch[2]}`
      : `https://player.vimeo.com/video/${trailerMatch[1]}`
    : undefined;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e4df]">
      <SiteHeader />
      <main className="pt-[calc(3.75rem+env(safe-area-inset-top,0px))] md:pt-[calc(4.75rem+env(safe-area-inset-top,0px))]">
        <article className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 sm:pb-24 sm:pt-12 md:px-10 md:pb-32 md:pt-16">
          <Link
            href="/#collection"
            className="ember-underline tap-target -ml-1 inline-flex min-h-11 items-center px-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 sm:text-[0.65rem]"
          >
            ← Collection
          </Link>

          <div className="relative mt-8 aspect-[16/9] overflow-hidden bg-stone-900 ring-1 ring-stone-800/80 sm:mt-10 sm:aspect-[21/9]">
            <CollectionThumb
              spriteIndex={project.spriteIndex}
              alt={project.title}
              coverImage={project.coverImage}
              className="h-full w-full"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/95 via-[#0a0a0a]/10 to-transparent" />
          </div>

          <header className="mt-8 sm:mt-10">
            {project.titleKicker ? (
              <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-stone-500">
                {project.titleKicker}
              </p>
            ) : null}
            <h1 className="text-2xl font-semibold uppercase tracking-[-0.03em] text-stone-100 sm:text-3xl md:text-4xl lg:text-5xl">
              {project.titleHeadline ?? project.title}
            </h1>
          </header>

          {hasSheet ? (
            <div className="mt-10 grid gap-10 border-b border-stone-800/90 pb-10 sm:mt-12 sm:gap-12 sm:pb-12 lg:grid-cols-[1fr_minmax(15rem,19rem)] lg:gap-16 lg:pb-16">
              <div className="space-y-5 text-base leading-relaxed text-stone-400 sm:space-y-6 md:text-lg">
                {sheetParagraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              <dl className="space-y-5 border-t border-stone-800/80 pt-8 text-[0.65rem] uppercase tracking-[0.12em] sm:space-y-6 lg:border-l lg:border-t-0 lg:pt-0 lg:pl-10">
                {sheetCredits.map(({ label, value }) => (
                  <div key={label}>
                    <dt className="text-stone-600">{label}</dt>
                    <dd
                      className={`mt-2 text-sm normal-case tracking-normal ${
                        label === "Status"
                          ? isDone
                            ? "font-medium text-[#7d9b76]"
                            : "font-medium text-[#e9a31a]"
                          : "text-stone-300"
                      }`}
                    >
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : (
            <>
              <dl className="mt-8 grid max-w-2xl grid-cols-1 gap-5 border-b border-stone-800/90 pb-8 text-[0.65rem] uppercase tracking-[0.12em] sm:mt-10 sm:grid-cols-3 sm:gap-6 sm:pb-10">
                <div>
                  <dt className="text-stone-600 underline decoration-stone-700 underline-offset-4">
                    Year
                  </dt>
                  <dd className="mt-2 text-stone-400">{project.yearLabel}</dd>
                </div>
                <div>
                  <dt className="text-stone-600 underline decoration-stone-700 underline-offset-4">
                    Status
                  </dt>
                  <dd
                    className={`mt-2 font-medium normal-case tracking-normal ${isDone ? "text-[#7d9b76]" : "text-[#e9a31a]"}`}
                  >
                    {project.statusLabel}
                  </dd>
                </div>
                <div>
                  <dt className="text-stone-600 underline decoration-stone-700 underline-offset-4">
                    Runtime
                  </dt>
                  <dd className="mt-2 text-stone-400">{project.runtime}</dd>
                </div>
              </dl>

              <div className="mt-10 max-w-2xl space-y-6 text-base leading-relaxed text-stone-400 md:text-lg">
                <p>{project.synopsis}</p>
              </div>
            </>
          )}

          {project.stillImages?.length ? (
            <section className="mt-10 md:mt-12">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
                {project.stillImages.map((image, index) => (
                  <figure
                    key={image}
                    className="relative aspect-video overflow-hidden bg-black"
                  >
                    <Image
                      src={image}
                      alt={`${project.title} film still ${index + 1}`}
                      width={1280}
                      height={720}
                      className="h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[8%] bg-black" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[8%] bg-black" />
                  </figure>
                ))}
              </div>
            </section>
          ) : null}

          {project.trailerUrl ? (
            <section className="mt-8 md:mt-10">
              <p className="mb-5 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#e9a31a] md:mb-6">
                Trailer
              </p>
              {trailerEmbedUrl ? (
                <div className="relative aspect-video overflow-hidden bg-black ring-1 ring-stone-800/80">
                  <iframe
                    src={trailerEmbedUrl}
                    title={`${project.title} trailer`}
                    className="h-full w-full"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              ) : null}
              <a
                href={project.trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ember-underline tap-target mt-5 inline-flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-stone-400 sm:text-[0.7rem]"
              >
                Watch on Vimeo
              </a>
            </section>
          ) : null}
        </article>
        <SiteFooter />
      </main>
    </div>
  );
}
