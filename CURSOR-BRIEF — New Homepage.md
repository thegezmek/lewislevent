# Cursor Brief — lewislevent.com New Homepage

Rebuild the homepage of this Next.js site in the format of **https://ivanolita.com/**, using the copy below. Film pages at `/projects/[slug]` stay, with updated copy and credits.

Read `AGENTS.md` first. This is Next 16.2 / React 19 / Tailwind 4, and APIs differ from older Next. Check `node_modules/next/dist/docs/` before writing code.

---

## 0. Ground rules

- **All copy in this brief is final wording.** Do not rewrite, shorten or "improve" it. Do not add taglines, headings or marketing lines that aren't here.
- Copy marked `[TODO: …]` is a placeholder Lewis will fill. Render it so it's easy to find and replace. Never invent a value.
- **No em dashes in body copy.** They are fine in titles only (e.g. "From Ashes — Episode 1").
- Never add a distributor, broadcaster, streaming platform or festival name anywhere on the site.
- "Ormana" is the correct spelling. Never "Omana".

---

## 1. Reference: how ivanolita.com works

Measured from the live site's markup (5 Oct 2026). Recreate the **behaviour and structure**, and adapt the styling to this site's existing type and colour.

**One screen, no scrolling sections, no project pages in the main flow.**

| Element | Behaviour |
|---|---|
| Showreel | A full-bleed `<video loop autoplay muted playsinline>` fills the viewport behind everything. ~540p file. |
| Description | Top-left, two short lines in uppercase. Always visible. Name of the studio is a link. |
| Buttons | Three text buttons: **FILMS · ABOUT · CONTACT**. Each toggles its own panel; they behave like tabs. |
| ABOUT panel | One paragraph of bio, replacing the description area's body text. |
| CONTACT panel | A row of uppercase text links (VIMEO, IMDB, INSTAGRAM, X, E-MAIL). No form. |
| FILMS panel | A horizontal strip of cover images along the bottom, wider than the viewport, scrolled by **dragging** (dragscroll) or trackpad. **No text on the covers.** The selected cover is highlighted, the others dimmed. |
| Film description | Selecting a cover swaps in a description block: **TITLE IN CAPS**, a blank line, one paragraph, then a row of small uppercase text links. The first film is selected on load. |
| PLAY | Opens a full-screen in-page player for the selected film, with a thin progress bar, **BACK** (closes the player) and **PREV / NEXT** (step through films). No navigating away. |
| Mobile | The description column and buttons hide on small screens on Ivan's site. **Don't copy that.** On mobile, stack: showreel, then two lines, then buttons, then the strip, then the description. All must work at 375px with no sideways page scroll. |

Typography on Ivan's site: everything small, uppercase for UI and titles, sentence case for paragraphs, lots of empty space. The video is the design.

---

## 2. Homepage content

### 2.1 Description (always visible)

```
LEWIS LEVENT IS A DOCUMENTARY DIRECTOR AND EDITOR.
HE IS THE FOUNDER OF GEZ STUDIO.
```
"GEZ STUDIO" links to `https://gez.studio` (new tab).

### 2.2 ABOUT

> Lewis Levent is a British-Turkish documentary director and editor based in Barcelona. He founded Gez Studio in 2021, before he knew how to make films. That summer, wildfires moved through Türkiye. He went, and he stayed, and four years of returning became From Ashes. His debut collection is eight films shot across Türkiye, East Africa, India and Southeast Asia. Kuzaya, filmed in Kenya and Rwanda, is in post-production.

### 2.3 CONTACT

| Label | URL |
|---|---|
| VIMEO | `[TODO: Vimeo URL]` |
| INSTAGRAM | `[TODO: Instagram URL]` |
| IMDB | `[TODO: IMDb URL]` |
| E-MAIL | `mailto:lewis@gez.studio` |

Hide any link whose URL is still a TODO at build time.

### 2.4 Showreel

`[TODO: showreel file]`. Lewis is cutting a 60–90 second silent loop. Until it exists, use a slow crossfade of the existing On Location images (the current homepage carousel) as a stand-in, behind the same layout. Put the video path in one constant so it's a one-line swap.

### 2.5 Footer line (small, keep)

> Lewis Levent © 2026 · All rights reserved · Directorial debut collection (2021–2026).

### 2.6 Remove from the homepage

Hero headline, Collection Overview cards, Editorial Focus, Director's Profile section, On Location carousel (becomes the showreel stand-in), Partners & Collaborators logo wall, Contact section. The partner logos move to each film's page (section 4).

---

## 3. Films: strip order and description blocks

Data lives in `src/data/projects.ts`. Add a field for the strip paragraph (suggested `stripText: string`) and keep the existing fields for the film pages.

The link row under each paragraph:
- **PLAY**: opens the in-page player with that film's trailer.
- **CREDITS**: goes to `/projects/[slug]`.
- **FROMASHES.FILM**: From Ashes films only, links to `https://fromashes.film` (new tab).

Trailers are currently Vimeo share links (`vimeo.com/{id}/{hash}`). For in-page playback, use the Vimeo player embed (`https://player.vimeo.com/video/{id}?h={hash}&autoplay=1`) or the Vimeo Player SDK so BACK, PREV and NEXT can control it. Green Refuge's trailer URL has extra query params; strip them.

Covers are in `public/covers/`. **Green Refuge has no cover file**; use `/stills/green-refuge/still-01.png` as now.

---

**1 · FROM ASHES — EPISODE 1: LAND OF THE HONEY BUG** · slug `from-ashes-i-land-of-the-honey-bug` · selected on load

> Two months after Türkiye's 2021 wildfires, Hüseyin walks through his village in Muğla, where his home and the surrounding pine forests have been reduced to ash. These forests sustained an ancient beekeeping tradition, rooted in the relationship between honey bee, "honey bug" and pine tree. The honey bug, a small insect dwelling on pine trees and found almost nowhere else on Earth, lies at the heart of pine honey production. Land of the Honey Bug follows a community searching for continuity in a landscape that may no longer sustain them.

Links: PLAY · CREDITS · FROMASHES.FILM

---

**2 · FROM ASHES — EPISODE 2: THE MOUNTAINSIDE OF ORMANA** · slug `from-ashes-ii-the-mountainside-of-ormana`

> In Ormana, an 800-year-old village in the Taurus mountains of Türkiye, life is bound to the surrounding forest. As wildfire closes in, residents turn to instinct, knowledge and each other in an effort to save their home.

Links: PLAY · CREDITS · FROMASHES.FILM

---

**3 · KUZAYA** · slug `kuzaya`

> In Homa Bay, on the shore of Lake Victoria, John Roche turns his community's organic waste into fertiliser. Across Kenya and Rwanda, farmers pay more for chemical inputs every season and harvest less. Kuzaya follows the farmers, scientists and companies working to bring the life back into the soil. On the way it asks a second question: what is the soil doing to our food, and to us?

Links: PLAY · CREDITS

---

**4 · GREEN REFUGE** · slug `green-refuge`

> Zo families fleeing the civil war in Myanmar cross into Mizoram, in Northeast India, without formal refugee status. They depend on the Indigenous communities who take them in, and neither side has much land, income or protection to spare. With Impulse NGO Network, displaced and host families start farming together, on agroforestry plots that grow food and restore degraded land. Green Refuge follows the project as it takes root, and what it asks of the people who receive refugees.

Links: PLAY · CREDITS

---

**5 · BON AIME** · slug `bon-aime`

> Adam Shpilt, a DJ and producer from Amsterdam, arrives in Kampala knowing no one in its music scene. Within days he is in jam sessions with a hip-hop collective and a youth studio, with no rehearsal and no plan. Back in Amsterdam, working alone, he starts building a record out of those rooms. Bon Aime follows both halves: the sessions in Kampala and the record that comes from them.

Links: PLAY · CREDITS

---

**6 · EMPOWER** · slug `empower`

> In Northeast India, women with few ways to earn at home come under pressure to migrate, and unsafe routes leave many open to trafficking. Hasina Kharbhih's Impulse NGO Network works with an artisan collective across the region's eight states, weaving peace silk for sale. Empower follows the weavers as the income starts to come in, and what it means to be able to stay.

Links: PLAY · CREDITS

---

**7 · PROTEEN** · slug `proteen`

> In Uganda, Tommie Hooft and his partners went looking for an answer to a growing pile of organic waste and found the black soldier fly. Its larvae eat the waste. What they leave behind becomes fertiliser, and the larvae themselves become animal feed. Proteen follows the company's first steps, from the test batches to the farms where the fertiliser goes into the ground.

Links: PLAY · CREDITS

---

**8 · WORLDVIEW SEAWEED** · slug `worldview-seaweed`

> In Ao Luek, on the coast of Krabi, families already farm seaweed in the open sea. Thailand's Department of Fisheries has spent a year testing a new strain on shore. Ploy, from the Worldview Climate Foundation, brings the two together. Worldview Seaweed follows the trials, and whether a crop grown in the sea can pay a coastal village and take carbon out of the air.

Links: PLAY · CREDITS

---

## 4. Film pages (`/projects/[slug]`): updates

Keep the current layout (synopsis, credits, stills, trailer). Add a **Partners** row of that film's logos only, taken from the old homepage wall (`public/partners/`). Apply these changes:

### 4.1 From Ashes naming (both films)

"Part I / Part II" is retired. Use "Episode 1 / Episode 2" everywhere: `title`, `shortTitle`, `titleKicker`, page `<title>` and metadata.

| Field | Episode 1 | Episode 2 |
|---|---|---|
| `title` | From Ashes, Episode 1: Land of the Honey Bug | From Ashes, Episode 2: The Mountainside of Ormana |
| `shortTitle` | From Ashes 1: Land of the Honey Bug | From Ashes 2: The Mountainside of Ormana |
| `titleKicker` | From Ashes — Episode 1 | From Ashes — Episode 2 |

### 4.2 From Ashes Episode 1 copy

`logline`:
> After the fires, a beekeeper returns to a vanished forest and an ancient tradition facing an uncertain future.

`synopsis` (short):
> After the fires, a beekeeper returns to a vanished forest. As the fragile ecology behind pine honey begins to unravel, the relationship between honey bee, "honey bug" and forest holds the future of an ancient beekeeping tradition. A community searches for a way forward in a landscape that no longer sustains them.

`synopsisParagraphs`:
1. Two months after Türkiye's 2021 wildfires, Hüseyin walks through his village in Muğla, where his home and the surrounding pine forests have been reduced to ash. These forests sustained an ancient beekeeping tradition, rooted in the relationship between honey bee, "honey bug" and pine tree.
2. The honey bug, a small insect dwelling on pine trees and found almost nowhere else on Earth, lies at the heart of pine honey production.
3. Land of the Honey Bug follows a community searching for continuity in a landscape that may no longer sustain them. Their search unfolds amid a warming climate, the pressures of human activity and an increasingly charged public response to the fires.

### 4.3 From Ashes Episode 2 copy

`logline`:
> As wildfire approaches Ormana, a mountain community draws on its knowledge of the forest to protect their 800-year-old village.

`synopsis` (short):
> In Ormana, an 800-year-old village in the Taurus mountains of Türkiye, life is bound to the surrounding forest. As wildfire closes in, residents turn to instinct, knowledge and each other in an effort to save their home.

`synopsisParagraphs`:
1. In Ormana, an 800-year-old village in the Taurus mountains of Türkiye, life is bound to the surrounding forest. During the 2021 wildfires, residents turn to instinct, knowledge and each other as fire descends towards their home.
2. The Mountainside of Ormana follows their effort to protect a way of life shaped by generations of familiarity with the land. Their response reveals the ties between people and place, where knowledge of the forest and reliance on one another become part of survival.
3. Through this community's experience, the film explores our relationship with the natural world, and what it means to belong to a landscape whose future is becoming uncertain.

### 4.4 From Ashes credits (replace both `credits` arrays)

| Label | Episode 1 | Episode 2 |
|---|---|---|
| Director–Editor | Lewis Levent | Lewis Levent |
| Producers | İlkay Bilgiç, Lewis Levent | İlkay Bilgiç, Lewis Levent |
| Impact Producer | Canay Atalay | Canay Atalay |
| Executive Producer | Julian Oliver | Julian Oliver |
| Post-Production Supervisor | Selçuk Demirci | Selçuk Demirci |
| Original Music | İlker Yurtcan | İlker Yurtcan |
| Sound Post-Production | Anthony Croft | Anthony Croft |
| Motion Design | Ezgi Lemur | Ezgi Lemur |
| Additional Camera | Gabriel Fenner (2021), Sefa Zaman (2023) | Sefa Zaman (2023) |
| Production Company | Gez Studio Ltd | Gez Studio Ltd |
| Year | 2021–2025 | 2021–2025 |
| Country | Türkiye | Türkiye |
| Language | Turkish, English | Turkish, English |
| Runtime | 73 mins | 55 mins |
| Status | Completed | Completed |

### 4.5 Green Refuge `synopsisParagraphs`

1. Zo families fleeing the civil war in Myanmar cross into Mizoram, in Northeast India, without formal refugee status. They depend on the Indigenous communities who take them in, and neither side has much land, income or protection to spare.
2. With Impulse NGO Network, displaced and host families start farming together, on agroforestry plots that grow food and restore degraded land. Green Refuge follows the project as it takes root, and what it asks of the people who receive refugees.

`logline` unchanged.

### 4.6 Other films

Kuzaya, Bon Aime, Empower, Proteen and Worldview Seaweed: **no copy changes on their film pages** in this pass.

### 4.7 Site metadata (`src/app/layout.tsx`)

Keep `siteDescription` as is. Change the title from "Lewis Levent — Director" to **"Lewis Levent — Documentary Director"**.

---

## 5. Acceptance checklist

- [ ] Homepage is one screen on desktop: showreel, two lines, three buttons, strip, description.
- [ ] From Ashes Episode 1 is selected on load. Selecting any cover swaps the title and paragraph without a page load.
- [ ] PLAY opens the right trailer in page. BACK closes it, PREV / NEXT step through films.
- [ ] Covers carry no text.
- [ ] Works at 375px wide, with no sideways page scroll, and the strip is still draggable or swipeable.
- [ ] No "Part I / Part II" left anywhere (`grep -ri "part i" src`).
- [ ] No distributor or platform name anywhere (`grep -ri "waterbear" src` returns nothing).
- [ ] No em dashes in paragraph copy.
- [ ] TODO links are hidden, not rendered empty.
- [ ] `npm run build` passes.
