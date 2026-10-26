import { HomeStage } from "@/components/HomeStage";
import {
  bioParagraphs,
  contactEmail,
  fullName,
  location,
  roleLine,
  siteDescription,
  siteUrl,
} from "@/data/bio";
import { projects } from "@/data/projects";

// The panels only mount once a visitor opens them, so the bio is also rendered
// here, off-screen, where crawlers and screen readers meet it in the markup.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#lewis-levent`,
      name: fullName,
      jobTitle: roleLine,
      description: siteDescription,
      url: siteUrl,
      image: `${siteUrl}/images/og-cover-v2.jpg`,
      email: `mailto:${contactEmail}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: location,
        addressCountry: "ES",
      },
      worksFor: {
        "@type": "Organization",
        name: "Gez Studio",
        url: "https://gez.studio",
      },
      knowsAbout: [
        "Documentary filmmaking",
        "Documentary directing",
        "Documentary editing",
        "Environmental documentary",
        "Food and agriculture",
      ],
      sameAs: ["https://gez.studio", "https://fromashes.film"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: `${fullName} · ${roleLine}`,
      description: siteDescription,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#lewis-levent` },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="sr-only">
        <h1>{`${fullName}, ${roleLine} in ${location}`}</h1>
        {bioParagraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>
      <HomeStage films={projects} />
    </>
  );
}
