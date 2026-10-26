/** Single source for the bio. Used by the ABOUT panel, the crawlable page
 *  heading, the site description and the Person structured data. */

export const siteUrl = "https://lewislevent.com";

export const fullName = "Lewis Levent";

export const roleLine = "Documentary Director and Editor";

export const location = "Barcelona";

export const contactEmail = "lewis@gez.studio";

/** ~150 characters, which is what search results show before truncating. */
export const siteDescription =
  "Lewis Levent is a British-Turkish documentary director and editor in Barcelona. Nine films shot across Türkiye, East Africa, Northeast India, Southeast Asia and Europe.";

/** Two paragraphs, first person, Lewis's own draft. The name, the role and the
 *  studio are carried by the two permanent lines above the panel, and the nine
 *  film titles by the strip's aria-labels, so none of them repeat here. */
export const bioParagraphs = [
  "There is a feeling I chase in the full immersion of a story.\nIt takes you out of spectating and hands you something you can use in your own life.",
  "Over the last five years I directed and edited my debut collection across T\u00fcrkiye, East Africa, Northeast India, Southeast Asia and Europe. I want a viewer anywhere to find some resonance in a world nothing like their own.",
] as const;
