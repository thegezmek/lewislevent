export type ProjectStatus = "post-production" | "completed";

export type ProjectCredit = {
  label: string;
  value: string;
};

export type ProjectPartner = {
  src: string;
  alt: string;
  href: string;
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
  /** Homepage strip title (uppercase display). */
  stripTitle: string;
  /** Homepage strip paragraph. */
  stripText: string;
  /** Index 0–7 in the 2×4 collection overview sprite (left→right, top→bottom).
   *  Omitted for films outside that eight-film grid, which supply `coverImage` instead. */
  spriteIndex?: number;
  /** Optional custom cover used on home + project hero. */
  coverImage?: string;
  /** Optional silent loop played behind the stage while this film is selected. */
  reelVideo?: string;
  /** First frame of `reelVideo`, shown while it buffers. */
  reelPoster?: string;
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
  partners?: ProjectPartner[];
  fromAshesUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "from-ashes-i-land-of-the-honey-bug",
    title: "From Ashes, Episode 1: Land of the Honey Bug",
    shortTitle: "From Ashes 1: Land of the Honey Bug",
    yearLabel: "2021 – 2025",
    status: "completed",
    statusLabel: "[Completed]",
    runtime: "73 mins",
    synopsis:
      "After the fires, a beekeeper returns to a vanished forest. As the fragile ecology behind pine honey begins to unravel, the relationship between honey bee, \"honey bug\" and forest holds the future of an ancient beekeeping tradition. A community searches for a way forward in a landscape that no longer sustains them.",
    country: "Türkiye",
    logline:
      "After the fires, a beekeeper returns to a vanished forest and an ancient tradition facing an uncertain future.",
    stripTitle: "FROM ASHES — EPISODE 1: LAND OF THE HONEY BUG",
    stripText:
      "Two months after Türkiye's 2021 wildfires, Hüseyin walks through his village in Muğla, where his home and the surrounding pine forests have been reduced to ash. These forests sustained an ancient beekeeping tradition, rooted in the relationship between honey bee, \"honey bug\" and pine tree. The honey bug, a small insect dwelling on pine trees and found almost nowhere else on Earth, lies at the heart of pine honey production. Land of the Honey Bug follows a community searching for continuity in a landscape that may no longer sustain them.",
    spriteIndex: 0,
    coverImage: "/covers/from-ashes-i-cover.png",
    reelVideo: "/showreel/from-ashes-i.mp4",
    reelPoster: "/showreel/from-ashes-i-poster.jpg",
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
    titleKicker: "From Ashes — Episode 1",
    titleHeadline: "Land of the Honey Bug",
    fromAshesUrl: "https://fromashes.film",
    synopsisParagraphs: [
      "Two months after Türkiye's 2021 wildfires, Hüseyin walks through his village in Muğla, where his home and the surrounding pine forests have been reduced to ash. These forests sustained an ancient beekeeping tradition, rooted in the relationship between honey bee, \"honey bug\" and pine tree.",
      "The honey bug, a small insect dwelling on pine trees and found almost nowhere else on Earth, lies at the heart of pine honey production.",
      "Land of the Honey Bug follows a community searching for continuity in a landscape that may no longer sustain them. Their search unfolds amid a warming climate, the pressures of human activity and an increasingly charged public response to the fires.",
    ],
    credits: [
      { label: "Director–Editor", value: "Lewis Levent" },
      { label: "Producers", value: "İlkay Bilgiç, Lewis Levent" },
      { label: "Impact Producer", value: "Canay Atalay" },
      { label: "Executive Producer", value: "Julian Oliver" },
      { label: "Post-Production Supervisor", value: "Selçuk Demirci" },
      { label: "Original Music", value: "İlker Yurtcan" },
      { label: "Sound Post-Production", value: "Anthony Croft" },
      { label: "Motion Design", value: "Ezgi Lemur" },
      {
        label: "Additional Camera",
        value: "Gabriel Fenner (2021), Sefa Zaman (2023)",
      },
      { label: "Production Company", value: "Gez Studio Ltd" },
      { label: "Year", value: "2021–2025" },
      { label: "Country", value: "Türkiye" },
      { label: "Language", value: "Turkish, English" },
      { label: "Runtime", value: "73 mins" },
      { label: "Status", value: "Completed" },
    ],
    partners: [
      {
        src: "/partners/project-honeylight.png",
        alt: "Project Honeylight",
        href: "https://projecthoneylight.life/",
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
        src: "/partners/turkiye-ari-yetistiricileri-merkez-birligi.png",
        alt: "Türkiye Arı Yetiştiricileri Merkez Birliği",
        href: "https://www.tab.org.tr/",
      },
    ],
  },
  {
    slug: "from-ashes-ii-the-mountainside-of-ormana",
    title: "From Ashes, Episode 2: The Mountainside of Ormana",
    shortTitle: "From Ashes 2: The Mountainside of Ormana",
    yearLabel: "2021 – 2025",
    status: "completed",
    statusLabel: "[Completed]",
    runtime: "55 mins",
    synopsis:
      "In Ormana, an 800-year-old village in the Taurus mountains of Türkiye, life is bound to the surrounding forest. As wildfire closes in, residents turn to instinct, knowledge and each other in an effort to save their home.",
    country: "Türkiye",
    logline:
      "As wildfire approaches Ormana, a mountain community draws on its knowledge of the forest to protect their 800-year-old village.",
    stripTitle: "FROM ASHES — EPISODE 2: THE MOUNTAINSIDE OF ORMANA",
    stripText:
      "In Ormana, an 800-year-old village in the Taurus mountains of Türkiye, life is bound to the surrounding forest. As wildfire closes in, residents turn to instinct, knowledge and each other in an effort to save their home.",
    spriteIndex: 1,
    coverImage: "/covers/from-ashes-ii-cover.png",
    reelVideo: "/showreel/from-ashes-ii.mp4",
    reelPoster: "/showreel/from-ashes-ii-poster.jpg",
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
    titleKicker: "From Ashes — Episode 2",
    titleHeadline: "The Mountainside of Ormana",
    fromAshesUrl: "https://fromashes.film",
    synopsisParagraphs: [
      "In Ormana, an 800-year-old village in the Taurus mountains of Türkiye, life is bound to the surrounding forest. During the 2021 wildfires, residents turn to instinct, knowledge and each other as fire descends towards their home.",
      "The Mountainside of Ormana follows their effort to protect a way of life shaped by generations of familiarity with the land. Their response reveals the ties between people and place, where knowledge of the forest and reliance on one another become part of survival.",
      "Through this community's experience, the film explores our relationship with the natural world, and what it means to belong to a landscape whose future is becoming uncertain.",
    ],
    credits: [
      { label: "Director–Editor", value: "Lewis Levent" },
      { label: "Producers", value: "İlkay Bilgiç, Lewis Levent" },
      { label: "Impact Producer", value: "Canay Atalay" },
      { label: "Executive Producer", value: "Julian Oliver" },
      { label: "Post-Production Supervisor", value: "Selçuk Demirci" },
      { label: "Original Music", value: "İlker Yurtcan" },
      { label: "Sound Post-Production", value: "Anthony Croft" },
      { label: "Motion Design", value: "Ezgi Lemur" },
      { label: "Additional Camera", value: "Sefa Zaman (2023)" },
      { label: "Production Company", value: "Gez Studio Ltd" },
      { label: "Year", value: "2021–2025" },
      { label: "Country", value: "Türkiye" },
      { label: "Language", value: "Turkish, English" },
      { label: "Runtime", value: "55 mins" },
      { label: "Status", value: "Completed" },
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
      "Across East Africa, farmers, scientists, and agricultural innovators seek to restore soil fertility and reduce dependence on chemical inputs.",
    stripTitle: "KUZAYA",
    stripText:
      "In Homa Bay, on the shore of Lake Victoria, John Roche turns his community's organic waste into fertiliser. Across Kenya and Rwanda, farmers pay more for chemical inputs every season and harvest less. Kuzaya follows the farmers, scientists and companies working to bring the life back into the soil. On the way it asks a second question: what is the soil doing to our food, and to us?",
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
    status: "completed",
    statusLabel: "[Completed]",
    runtime: "60 mins",
    synopsis:
      "Zo communities cross from Myanmar into Northeast India without refugee status; a community-led agroforestry effort ties displaced and host peoples to the land—and to each other.",
    country: "India, Myanmar",
    logline:
      "On the Indo-Myanmar border, displaced Zo communities and their Indigenous hosts rebuild livelihoods together through agroforestry.",
    stripTitle: "GREEN REFUGE",
    stripText:
      "Zo families fleeing the civil war in Myanmar cross into Mizoram, in Northeast India, without formal refugee status. They depend on the Indigenous communities who take them in, and neither side has much land, income or protection to spare. With Impulse NGO Network, displaced and host families start farming together, on agroforestry plots that grow food and restore degraded land. Green Refuge follows the project as it takes root, and what it asks of the people who receive refugees.",
    spriteIndex: 3,
    coverImage: "/stills/green-refuge/still-01.png",
    reelVideo: "/showreel/green-refuge.mp4",
    reelPoster: "/showreel/green-refuge-poster.jpg",
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
      "Zo families fleeing the civil war in Myanmar cross into Mizoram, in Northeast India, without formal refugee status. They depend on the Indigenous communities who take them in, and neither side has much land, income or protection to spare.",
      "With Impulse NGO Network, displaced and host families start farming together, on agroforestry plots that grow food and restore degraded land. Green Refuge follows the project as it takes root, and what it asks of the people who receive refugees.",
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
      { label: "Status", value: "Completed" },
    ],
    partners: [
      {
        src: "/partners/impulse-ngo-network.png",
        alt: "Impulse NGO Network",
        href: "https://www.impulsengonetwork.org/",
      },
    ],
  },
  {
    slug: "voice-of-the-earth",
    title: "Voice of the Earth",
    shortTitle: "Voice of the Earth",
    yearLabel: "2024",
    status: "completed",
    statusLabel: "[Completed]",
    runtime: "3 mins 50 secs",
    synopsis:
      "Raine Piyãko of the Ashaninka tribe brings the sacred music of the Amazon together with a symphonic orchestral ensemble from Hungary.",
    country: "Amazon",
    logline:
      "Raine Piyãko of the Ashaninka tribe brings the sacred music of the Amazon together with a symphonic orchestral ensemble from Hungary.",
    stripTitle: "VOICE OF THE EARTH",
    stripText:
      "Raine Piyãko of the Ashaninka tribe brings the sacred music of the Amazon together with a symphonic orchestral ensemble from Hungary.",
    coverImage: "/covers/voice-of-the-earth-cover.jpg",
    reelVideo: "/showreel/voice-of-the-earth.mp4",
    reelPoster: "/showreel/voice-of-the-earth-poster.jpg",
    trailerUrl: "https://vimeo.com/1034632699",
    credits: [
      { label: "Director–Editor", value: "Lewis Levent" },
      { label: "Producer–Composer", value: "Ryan Whitewolf" },
      { label: "Artist", value: "Raine Piyãko" },
      { label: "Format", value: "Music Video" },
      { label: "Production Company", value: "Gez Studio" },
      { label: "Year", value: "2024" },
      { label: "Country", value: "Amazon" },
      { label: "Status", value: "Completed" },
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
    country: "Uganda, Netherlands",
    logline:
      "An Amsterdam-based DJ travels to Kampala, where spontaneous musical encounters become the foundation of a new record.",
    stripTitle: "BON AIME",
    stripText:
      "Adam Shpilt, a DJ and producer from Amsterdam, arrives in Kampala knowing no one in its music scene. Within days he is in jam sessions with a hip-hop collective and a youth studio, with no rehearsal and no plan. Back in Amsterdam, working alone, he starts building a record out of those rooms. Bon Aime follows both halves: the sessions in Kampala and the record that comes from them.",
    spriteIndex: 4,
    coverImage: "/covers/bon-aime-cover.png",
    reelVideo: "/showreel/bon-aime.mp4",
    reelPoster: "/showreel/bon-aime-poster.jpg",
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
        value: "Uganda, Netherlands",
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
      "An indigenous artisan collective across the eight Northeastern states of India weaves peace silk, fostering resilience against human trafficking.",
    stripTitle: "EMPOWER",
    stripText:
      "In Northeast India, women with few ways to earn at home come under pressure to migrate, and unsafe routes leave many open to trafficking. Hasina Kharbhih's Impulse NGO Network works with an artisan collective across the region's eight states, weaving peace silk for sale. Empower follows the weavers as the income starts to come in, and what it means to be able to stay.",
    spriteIndex: 5,
    coverImage: "/covers/empower-cover.png",
    reelVideo: "/showreel/empower.mp4",
    reelPoster: "/showreel/empower-poster.jpg",
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
      { label: "Status", value: "Completed" },
    ],
    partners: [
      {
        src: "/partners/impulse-ngo-network.png",
        alt: "Impulse NGO Network",
        href: "https://www.impulsengonetwork.org/",
      },
      {
        src: "/partners/impulse-empower.png",
        alt: "Impulse Empower",
        href: "https://www.impulsempower.com/",
      },
    ],
  },
  {
    slug: "proteen",
    title: "Proteen",
    shortTitle: "Proteen",
    yearLabel: "2023",
    status: "completed",
    statusLabel: "[Completed]",
    runtime: "20 mins",
    synopsis:
      "Black soldier fly farming turns organic waste into feed and fertilizer—Proteen’s early days, circular economy, and rethinking waste, food, and opportunity in Uganda.",
    country: "Uganda",
    logline:
      "A journey with Proteen, transforming organic waste into Supercharged Fertilizer, revolutionizing farming in Africa with a circular system.",
    stripTitle: "PROTEEN",
    stripText:
      "In Uganda, Tommie Hooft and his partners went looking for an answer to a growing pile of organic waste and found the black soldier fly. Its larvae eat the waste. What they leave behind becomes fertiliser, and the larvae themselves become animal feed. Proteen follows the company's first steps, from the test batches to the farms where the fertiliser goes into the ground.",
    spriteIndex: 6,
    coverImage: "/covers/proteen-cover.png",
    reelVideo: "/showreel/proteen.mp4",
    reelPoster: "/showreel/proteen-poster.jpg",
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
      { label: "Status", value: "Completed" },
    ],
    partners: [
      {
        src: "/partners/marula-proteen-limited.png",
        alt: "Marula Proteen Limited",
        href: "https://weareproteen.com/",
      },
    ],
  },
  {
    slug: "worldview-seaweed",
    title: "Worldview Seaweed",
    shortTitle: "Worldview Seaweed",
    yearLabel: "2023",
    status: "completed",
    statusLabel: "[Completed]",
    runtime: "20 mins",
    synopsis:
      "Coastal Thailand: seaweed farming, the Worldview Climate Foundation, and communities balancing tradition with a changing ocean—and what cultivation means for livelihoods and ecology.",
    country: "Thailand",
    logline:
      "A story of seaweed, sustainability, and CO₂ mitigation through a collaborative pilot uniting public and private sectors with Thai coastal communities.",
    stripTitle: "WORLDVIEW SEAWEED",
    stripText:
      "In Ao Luek, on the coast of Krabi, families already farm seaweed in the open sea. Thailand's Department of Fisheries has spent a year testing a new strain on shore. Ploy, from the Worldview Climate Foundation, brings the two together. Worldview Seaweed follows the trials, and whether a crop grown in the sea can pay a coastal village and take carbon out of the air.",
    spriteIndex: 7,
    coverImage: "/covers/worldview-seaweed-cover.png",
    reelVideo: "/showreel/worldview-seaweed.mp4",
    reelPoster: "/showreel/worldview-seaweed-poster.jpg",
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
      { label: "Producer", value: "Dr Arne Fjørtoft" },
      { label: "Executive Producer", value: "Julian Oliver" },
      { label: "Production Company", value: "Gez Studio" },
      { label: "Year", value: "2023" },
      { label: "Country", value: "Thailand" },
      { label: "Language", value: "English, Thai" },
      {
        label: "Partners",
        value: "Worldview International Foundation",
      },
      { label: "Status", value: "Completed" },
    ],
    partners: [
      {
        src: "/partners/worldview-international-foundation.png",
        alt: "Worldview International Foundation",
        href: "https://worldview.global/",
      },
      {
        src: "/partners/department-of-fisheries-thailand.png",
        alt: "Department of Fisheries Thailand",
        href: "https://www4.fisheries.go.th/index.php/dof_en",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
