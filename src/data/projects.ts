export type ProjectStatus = "post-production" | "completed";

export type ProjectCredit = {
  label: string;
  value: string;
};

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  yearLabel: string;
  status: ProjectStatus;
  statusLabel: string;
  runtime: string;
  synopsis: string;
  /** Shown on collection cards under the year. */
  country: string;
  /** One-sentence hook on collection cards (under country). */
  logline: string;
  /** Index 0–7 in the 2×4 collection overview sprite (left→right, top→bottom). */
  spriteIndex: number;
  /** Optional custom cover used on home + project hero. */
  coverImage?: string;
  /** Optional dedicated poster art (e.g. editorial focus row on home). */
  posterImage?: string;
  /** Optional gallery shown at the bottom of project page. */
  stillImages?: string[];
  /** Optional trailer URL shown at the bottom of project page. */
  trailerUrl?: string;
  /** Small caps line above the main title on the project page. */
  titleKicker?: string;
  /** Main H1 when split from full `title` (e.g. series part vs film name). */
  titleHeadline?: string;
  /** Long-form synopsis paragraphs; when set, project page uses two-column sheet layout. */
  synopsisParagraphs?: string[];
  credits?: ProjectCredit[];
};

export const projects: Project[] = [
  {
    slug: "from-ashes-i-land-of-the-honey-bug",
    title: "From Ashes Part I: Land of the Honey Bug",
    shortTitle: "From Ashes I: Land of the Honey Bug",
    yearLabel: "2021 – 2025",
    status: "post-production",
    statusLabel: "[Post-Production]",
    runtime: "73 mins",
    synopsis:
      "Two months after the 2021 wildfires, an elderly beekeeper returns to Muğla—ash, pine honey, and the honey bug at the heart of a tradition in flux.",
    country: "Türkiye",
    logline:
      "After the fires, a beekeeper and his village reckon with ash, pine honey, and the tiny insect their whole tradition depends on.",
    spriteIndex: 0,
    coverImage: "/covers/from-ashes-i-cover.png",
    stillImages: [
      "/stills/from-ashes-i/new-01.png",
      "/stills/from-ashes-i/new-02.png",
      "/stills/from-ashes-i/new-03.png",
      "/stills/from-ashes-i/new-04.png",
      "/stills/from-ashes-i/new-05.png",
      "/stills/from-ashes-i/new-06.png",
      "/stills/from-ashes-i/new-07.png",
      "/stills/from-ashes-i/new-08.png",
      "/stills/from-ashes-i/new-09.png",
    ],
    trailerUrl: "https://vimeo.com/1099954712/8103f5b26c?share=copy",
    titleKicker: "From Ashes Part I:",
    titleHeadline: "Land of the Honey Bug",
    synopsisParagraphs: [
      "Two months after the 2021 wildfires, Hüseyin, an elderly beekeeper, walks through his village in Muğla, where his home and the surrounding pine forests that sustained an ancient beekeeping tradition have been reduced to ash.",
      "His return becomes an entry point into a community reckoning with what has been lost, as pine honey producers search for continuity in a landscape that no longer functions as it once did.",
      "What now defines the future of their age-old practice is what locals call the honey bug, a small forest insect found almost nowhere else on Earth, upon which the entire pine honey system depends.",
      "As beekeepers confront the fragility of this relationship, their story opens onto a wider reality, revealing how human actions, ecological imbalance, and a warming climate are reshaping the forests they depend on, and the future of a tradition that hangs in the balance.",
    ],
    credits: [
      { label: "Director–Editor", value: "Lewis Levent" },
      {
        label: "Producers",
        value: "Lewis Levent, İlkay Bilgiç, Canay Atalay",
      },
      { label: "Executive Producer", value: "Julian Oliver" },
      { label: "Production Company", value: "Gez Studio" },
      { label: "Year", value: "2021–2025" },
      { label: "Country", value: "Türkiye" },
      { label: "Language", value: "Turkish, English" },
      { label: "Runtime", value: "73 mins" },
      { label: "Status", value: "Post-Production" },
    ],
  },
  {
    slug: "from-ashes-ii-the-mountainside-of-ormana",
    title: "From Ashes Part II: The Mountainside of Ormana",
    shortTitle: "From Ashes II: The Mountainside of Ormana",
    yearLabel: "2021 – 2025",
    status: "post-production",
    statusLabel: "[Post-Production]",
    runtime: "55 mins",
    synopsis:
      "Summer 2021: the Manavgat fire bears down on Ormana—residents face the flames with local knowledge and community action when support is out of reach.",
    country: "Türkiye",
    logline:
      "When the Manavgat fire reaches Ormana, villagers fight the flames with instinct and local knowledge—and without waiting for help.",
    spriteIndex: 1,
    coverImage: "/covers/from-ashes-ii-cover.png",
    stillImages: [
      "/stills/from-ashes-ii/still-01.png",
      "/stills/from-ashes-ii/still-02.png",
      "/stills/from-ashes-ii/still-03.png",
      "/stills/from-ashes-ii/still-04.png",
      "/stills/from-ashes-ii/still-05.png",
      "/stills/from-ashes-ii/still-06.png",
      "/stills/from-ashes-ii/still-07.png",
      "/stills/from-ashes-ii/still-08.png",
      "/stills/from-ashes-ii/still-09.png",
    ],
    trailerUrl: "https://vimeo.com/1101667778/9933555489?share=copy",
    titleKicker: "From Ashes Part II:",
    titleHeadline: "The Mountainside of Ormana",
    synopsisParagraphs: [
      "As wildfires spread across Türkiye's Mediterranean region in the summer of 2021, the Manavgat fire advanced toward the mountain village of Ormana, placing it directly in its path.",
      "Cut off from immediate support, residents were forced to make their own decisions as flames moved through the surrounding forests, drawing on local knowledge, instinct, and a deep familiarity with their landscape to protect their homes.",
      "Their experience becomes an account of what it means to face wildfire at the moment of impact, revealing both the limits of institutional response and the critical role of community action in the absence of it.",
      "Through their story, the film examines how fire is altering the conditions of life in fire-prone regions, and what adaptation demands of those living on the frontlines of a rapidly changing climate.",
    ],
    credits: [
      { label: "Director–Editor", value: "Lewis Levent" },
      {
        label: "Producers",
        value: "Lewis Levent, İlkay Bilgiç, Canay Atalay",
      },
      { label: "Executive Producer", value: "Julian Oliver" },
      { label: "Production Company", value: "Gez Studio" },
      { label: "Year", value: "2021–2025" },
      { label: "Country", value: "Türkiye" },
      { label: "Language", value: "Turkish, English" },
      { label: "Runtime", value: "55 mins" },
      { label: "Status", value: "Post-Production" },
    ],
  },
  {
    slug: "kuzaya",
    title: "Kuzaya",
    shortTitle: "Kuzaya",
    yearLabel: "2026",
    status: "post-production",
    statusLabel: "[Post-Production]",
    runtime: "60 mins",
    synopsis:
      "In Kenya, soil health and policy converge as farmers, scientists, and institutions turn back toward biological balance—and what it costs to rebuild stability at its source.",
    country: "Kenya, Rwanda",
    logline:
      "Farmers, science, and policy move toward living soil again—tracing what it takes to steady land, food, and economy at the roots.",
    spriteIndex: 2,
    coverImage: "/covers/kuzaya-cover.png",
    stillImages: [
      "/stills/kuzaya/still-01.png",
      "/stills/kuzaya/still-02.png",
      "/stills/kuzaya/still-03.png",
      "/stills/kuzaya/still-04.png",
      "/stills/kuzaya/still-05.png",
      "/stills/kuzaya/still-06.png",
      "/stills/kuzaya/still-07.png",
      "/stills/kuzaya/still-08.png",
      "/stills/kuzaya/still-09.png",
    ],
    trailerUrl: "https://vimeo.com/1170298182/86b5767828",
    synopsisParagraphs: [
      "In Kenya, declining soil health has left farmers increasingly dependent on costly inputs while yields continue to fall. In response, a range of actors, from farmers and scientists to agricultural enterprises and policymakers, are turning back toward natural processes that restore fertility through the living systems within the soil.",
      "Kuzaya follows the implementation of these approaches as they take hold across farms and institutions, revealing how industry and policy are beginning to support a return to biological balance. As the land starts to recover, the film observes what it takes to rebuild economic stability at its source, and the wider implications for the future of food.",
    ],
    credits: [
      { label: "Director–Editor", value: "Lewis Levent" },
      { label: "Producer", value: "Vigilance Atieno" },
      {
        label: "Executive Producers",
        value: "Tommie Hooft, Julian Oliver",
      },
      { label: "Production Company", value: "Gez Studio" },
      { label: "Year", value: "2026" },
      { label: "Country", value: "Kenya, Rwanda" },
      {
        label: "Language",
        value: "English, Swahili, Kinyarwanda",
      },
      { label: "Runtime", value: "60 mins" },
      { label: "Status", value: "Post-Production" },
    ],
  },
  {
    slug: "green-refuge",
    title: "Green Refuge",
    shortTitle: "Green Refuge",
    yearLabel: "2021 – 2025",
    status: "post-production",
    statusLabel: "Seeking distribution [Post-Production]",
    runtime: "60 mins",
    synopsis:
      "Zo communities cross from Myanmar into Northeast India without refugee status; a community-led agroforestry effort ties displaced and host peoples to the land—and to each other.",
    country: "India, Myanmar",
    logline:
      "Across the border without refugee status, Zo families and their hosts rebuild land and livelihood together through agroforestry.",
    spriteIndex: 3,
    coverImage: "/stills/green-refuge/still-01.png",
    stillImages: [
      "/stills/green-refuge/still-02.png",
      "/stills/green-refuge/still-03.png",
      "/stills/green-refuge/still-04.png",
      "/stills/green-refuge/still-05.png",
      "/stills/green-refuge/still-06.png",
      "/stills/green-refuge/still-07.png",
      "/stills/green-refuge/still-08.png",
      "/stills/green-refuge/still-09.png",
      "/stills/green-refuge/still-10.png",
    ],
    synopsisParagraphs: [
      "As Zo communities flee violence across the Myanmar border into Northeast India, they arrive without formal recognition as refugees, leaving them in a state of legal and economic vulnerability, dependent on the Indigenous ethnic groups who receive them. With limited access to land, income, or protection, both displaced and host communities face growing pressure to sustain themselves.",
      "Through a community-led agroforestry initiative, they begin cultivating food and restoring degraded land together, creating a shared economic foundation that strengthens stability on both sides.",
      "Green Refuge follows this fragile collaboration as it takes root, revealing how rebuilding livelihood in place can reduce the need for unsafe migration, and how refuge is shaped not only by those who arrive, but by those who choose to receive them.",
    ],
    trailerUrl: "https://vimeo.com/1169157132/584ddef2c5?share=copy&fl=sv&fe=ci",
    credits: [
      { label: "Director–Editor", value: "Lewis Levent" },
      { label: "Producer", value: "Hasina Kharbhih" },
      { label: "Executive Producer", value: "Julian Oliver" },
      { label: "Production Company", value: "Gez Studio" },
      { label: "Year", value: "2021–2025" },
      { label: "Country", value: "India, Myanmar" },
      {
        label: "Language",
        value: "English, Burmese, Mizo, Manipuri",
      },
      { label: "Runtime", value: "60 mins" },
      { label: "Status", value: "Post-Production" },
    ],
  },
  {
    slug: "bon-aime",
    title: "Bon Aime",
    shortTitle: "Bon Aime",
    yearLabel: "2023 – 2024",
    status: "post-production",
    statusLabel: "[Post-Production]",
    runtime: "60 mins",
    synopsis:
      "An Amsterdam DJ-producer lands in Kampala; sessions with a hip-hop collective become memory, then a record—improvisation, solitude, and sound between places.",
    country: "Uganda, Netherlands, South Africa",
    logline:
      "Kampala jam sessions echo back in Amsterdam as one producer turns encounter, memory, and place into a record.",
    spriteIndex: 4,
    coverImage: "/covers/bon-aime-cover.png",
    stillImages: [
      "/stills/bon-aime/still-01.png",
      "/stills/bon-aime/still-02.png",
      "/stills/bon-aime/still-03.png",
      "/stills/bon-aime/still-04.png",
      "/stills/bon-aime/still-05.png",
      "/stills/bon-aime/still-06.png",
      "/stills/bon-aime/still-07.png",
      "/stills/bon-aime/still-08.png",
      "/stills/bon-aime/still-09.png",
    ],
    trailerUrl: "https://vimeo.com/1171295662/9de8571bf5?share=copy",
    synopsisParagraphs: [
      "An Amsterdam-based DJ and producer arrives in Kampala and steps into unfamiliar rooms, where jam sessions with a hip-hop collective and a youth studio unfold without rehearsal or expectation. In these first encounters, music emerges instinctively, shaped by presence, rhythm, and the shared act of listening. What begins as improvisation becomes a point of departure, leaving an imprint that lingers beyond the moment itself.",
      "Bon Aime follows this deepening creative journey as Adam returns to Amsterdam, carrying with him the atmosphere of those sessions. Working in solitude, he begins to merge his electronic language with the feeling of having been there, translating memory, connection, and place into sound. The film reveals the fragile and often unseen process through which music is formed, tracing how creation moves between encounter and reflection, and how a record becomes a vessel for experience.",
    ],
    credits: [
      { label: "Director–Editor", value: "Lewis Levent" },
      { label: "Producer", value: "Adam Shpilt" },
      { label: "Executive Producer", value: "Julian Oliver" },
      { label: "Production Company", value: "Gez Studio" },
      { label: "Year", value: "2023–2024" },
      {
        label: "Country",
        value: "Uganda, Netherlands, South Africa",
      },
      { label: "Language", value: "English, Lugandan" },
      { label: "Status", value: "Post-Production" },
    ],
  },
  {
    slug: "empower",
    title: "Empower",
    shortTitle: "Empower",
    yearLabel: "2021 – 2025",
    status: "completed",
    statusLabel: "[Completed]",
    runtime: "20 mins",
    synopsis:
      "In Northeast India, a community-led weaving initiative with Impulse NGO Network turns traditional knowledge into income—and a buffer against trafficking and unsafe migration.",
    country: "India",
    logline:
      "Weaving at home becomes income and protection for women facing exploitation and the pull of unsafe migration.",
    spriteIndex: 5,
    coverImage: "/covers/empower-cover.png",
    posterImage: "/posters/empower-poster.png",
    stillImages: [
      "/stills/empower/still-01.png",
      "/stills/empower/still-02.png",
      "/stills/empower/still-03.png",
      "/stills/empower/still-04.png",
      "/stills/empower/still-05.png",
      "/stills/empower/still-06.png",
      "/stills/empower/still-07.png",
      "/stills/empower/still-08.png",
      "/stills/empower/still-09.png",
    ],
    trailerUrl: "https://vimeo.com/1068557433",
    synopsisParagraphs: [
      "In Northeast India, limited economic opportunity and the pressures of unsafe migration leave many women vulnerable to trafficking and exploitation. Through a community-led weaving initiative supported by Impulse NGO Network, they begin transforming traditional knowledge into a source of income, allowing them to support themselves without leaving home.",
      "Empower follows this process as it unfolds, revealing how financial independence becomes a form of protection. As livelihoods take shape within their own communities, the film observes how weaving offers more than income, it creates stability, agency, and a pathway that reduces the need to enter uncertain and dangerous migration routes.",
    ],
    credits: [
      { label: "Director–Editor", value: "Lewis Levent" },
      { label: "Producer", value: "Hasina Kharbhih" },
      { label: "Executive Producer", value: "Julian Oliver" },
      { label: "Production Company", value: "Gez Studio" },
      { label: "Year", value: "2021–2025" },
      { label: "Country", value: "India" },
      {
        label: "Language",
        value: "English, Hindi, Burmese",
      },
      { label: "Runtime", value: "20 mins" },
      { label: "Status", value: "Complete" },
    ],
  },
  {
    slug: "proteen",
    title: "Proteen",
    shortTitle: "Proteen",
    yearLabel: "2023",
    status: "post-production",
    statusLabel: "[Post-Production]",
    runtime: "20 mins",
    synopsis:
      "Black soldier fly farming turns organic waste into feed and fertilizer—Proteen’s early days, circular economy, and rethinking waste, food, and opportunity in Uganda.",
    country: "Uganda",
    logline:
      "From waste crisis to black soldier fly farming—watching a circular-economy company take shape from the ground up.",
    spriteIndex: 6,
    coverImage: "/covers/proteen-cover.png",
    posterImage: "/posters/proteen-poster.png",
    stillImages: [
      "/stills/proteen/still-01.png",
      "/stills/proteen/still-02.png",
      "/stills/proteen/still-03.png",
      "/stills/proteen/still-04.png",
      "/stills/proteen/still-05.png",
      "/stills/proteen/still-06.png",
      "/stills/proteen/still-07.png",
      "/stills/proteen/still-08.png",
      "/stills/proteen/still-09.png",
    ],
    trailerUrl: "https://vimeo.com/972957789?share=copy",
    synopsisParagraphs: [
      "Proteen sets out to address a growing waste crisis, leading to the discovery of black soldier fly farming as a way to convert organic waste into valuable resources. What begins as an experiment evolves into the creation of Proteen, a company built on the principles of circular economy, where waste becomes both fertilizer and animal feed.",
      "The film follows this early formation as it unfolds, capturing the uncertainty, trial, and conviction behind building a new model from the ground up. Through Proteen's emergence, it reveals how innovation can arise from observation of natural systems, and how one enterprise begins to redefine the relationship between waste, food, and economic opportunity.",
    ],
    credits: [
      { label: "Director–Editor", value: "Lewis Levent" },
      { label: "Producer", value: "Tommie Hooft" },
      { label: "Executive Producer", value: "Julian Oliver" },
      { label: "Production Company", value: "Gez Studio" },
      { label: "Year", value: "2023" },
      { label: "Country", value: "Uganda" },
      { label: "Language", value: "English" },
      { label: "Partners", value: "Marula Proteen Ltd" },
      { label: "Runtime", value: "20 mins" },
      { label: "Status", value: "Post-Production" },
    ],
  },
  {
    slug: "worldview-seaweed",
    title: "Worldview Seaweed",
    shortTitle: "Worldview Seaweed",
    yearLabel: "2023",
    status: "post-production",
    statusLabel: "[Post-Production]",
    runtime: "20 mins",
    synopsis:
      "Coastal Thailand: seaweed farming, the Worldview Climate Foundation, and communities balancing tradition with a changing ocean—and what cultivation means for livelihoods and ecology.",
    country: "Thailand",
    logline:
      "On the Thai coast, seaweed farming bridges tradition and a warming sea—livelihood, resilience, and balance in the shallows.",
    spriteIndex: 7,
    coverImage: "/covers/worldview-seaweed-cover.png",
    posterImage: "/posters/worldview-seaweed-poster.png",
    stillImages: [
      "/stills/worldview-seaweed/still-01.png",
      "/stills/worldview-seaweed/still-02.png",
      "/stills/worldview-seaweed/still-03.png",
      "/stills/worldview-seaweed/still-04.png",
      "/stills/worldview-seaweed/still-05.png",
      "/stills/worldview-seaweed/still-06.png",
      "/stills/worldview-seaweed/still-07.png",
      "/stills/worldview-seaweed/still-08.png",
      "/stills/worldview-seaweed/still-09.png",
    ],
    trailerUrl: "https://vimeo.com/965374218?share=copy",
    synopsisParagraphs: [
      "In coastal Thailand, seaweed cultivation is being explored as a way to strengthen livelihoods and respond to environmental change. Working in partnership with local communities, the Worldview Climate Foundation introduces new farming approaches that build on traditional knowledge while adapting to shifting ocean conditions.",
      "Worldview Seaweed follows this process as it unfolds, revealing how ocean cultivation can support economic resilience while contributing to wider ecological balance. The film offers a coastal perspective on food production, extending the collection's exploration of how natural systems continue to shape the future of sustenance.",
    ],
    credits: [
      { label: "Director–Editor", value: "Lewis Levent" },
      { label: "Producer", value: "Dr Arne Fjortoft" },
      { label: "Executive Producer", value: "Julian Oliver" },
      { label: "Production Company", value: "Gez Studio" },
      { label: "Year", value: "2023" },
      { label: "Country", value: "Thailand" },
      { label: "Language", value: "English, Thai" },
      {
        label: "Partners",
        value: "Worldview International Foundation",
      },
      { label: "Status", value: "Post-Production" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
