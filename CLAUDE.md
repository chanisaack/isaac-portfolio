# Isaac Chan — Mechanical Engineering Portfolio

## What this is
A personal portfolio site for Isaac Chan, a USC mechanical engineering student, showcasing five hardware/robotics/product projects. Homepage is a minimal index (animated intro + project list), each project linking to its own detail page. Domain: isaac.engineering (registered via Porkbun).

## Current state — this is a finished, content-complete design with real media
`index.html`, `styles.css`, `script.js`, `carousel.js`, all five files in `projects/`, and `projects/media/` (real photos, CAD renders, and video per project) are a **locked, approved design with real content** — Isaac has iterated on this over many rounds, written the actual project descriptions himself, and supplied real media. Treat this as the source of truth. Don't redesign it — extend it (an about page, deployment) without changing the established look, structure, voice, or media.

### Media
Each project has a `projects/media/<slug>/` folder: numbered images (`<slug>-1.jpg`, `-2.jpg`, etc.) plus, where applicable, video files and matching `-poster.jpg` frame grabs used as each video's poster attribute. Videos were transcoded from the original phone/camera footage (H.264 mp4, faststart, scaled to a max of 1280px width, reasonable CRF) — originals ranged 15–495MB each; compressed versions are 3–12MB. Each project's `-1.jpg` file is also used as its homepage cover thumbnail (`.entry-media img` on the homepage links directly to `projects/media/<slug>/<slug>-1.jpg`). Cove has two videos (`cove-video.mp4` and `cove-video-2.mp4`, the latter a longer-form TerraLabs piece) — if adding a second video to another project, follow that same naming pattern rather than overwriting the first.

**Carousel frame (deliberate, don't add back):** `.carousel-track` has no background, border, or decorative pattern — media sits directly on the page's own grid background. It has a fixed height (440px desktop / 280px mobile) purely to reserve vertical space and prevent layout shift as slides of different aspect ratios are hovered, not to visually frame the content. If a slide is short/wide enough that it doesn't fill that height, the page's grid just shows through the gap — that's correct, not a bug.

### SEO
Every page has: a unique `<title>`, `<meta name="description">`, canonical URL, Open Graph tags, and Twitter card tags (all pointing to `https://www.isaac.engineering` — the www subdomain, since that's Isaac's chosen primary in Vercel). Homepage also has a JSON-LD `Person` schema block identifying Isaac by name, university, and LinkedIn. `robots.txt` and `sitemap.xml` live at the project root. If adding a 6th project, add its meta block (copy an existing project page's `<head>` as a template) and add its URL to `sitemap.xml`.

### The five projects, in homepage order
1. **ID0: The Agentic Hardware Robot** — `projects/id0.html` — YC RoboHacks, '26
2. **Cove: 7DOF Industrial Robotic Arm** — `projects/cove.html` — USC TerraLabs, '26
3. **Boxy: FIRST Robotics '25** — `projects/boxy.html` — FTC 14473, '25
4. **Borealis: FIRST Robotics '24** — `projects/borealis.html` — FTC 14473, '24
5. **Olos: Therapy Audio Journaling Tool** — `projects/olos.html` — USC SEP, '25

Note the FIRST Robotics work is intentionally split into two separate project pages (Boxy and Borealis, one per season/competition robot) rather than one combined "FIRST Robotics" page — each has its own distinct mechanical story and should stay separate.

All five detail pages follow an identical structure: back-link → title/meta header → image/video carousel with real media → body copy broken into "The problem" / "What I built" / "Outcome" sections, using Isaac's own written descriptions verbatim. Don't paraphrase or "improve" his copy — it's already in his voice and finalized.

## Design system (do not deviate without asking)
All tokens live in `styles.css` under `:root`.
- Background: `--paper` (#fbfbf9, a slight off-white — not pure white, not gray/cream) with a subtle gray grid overlay.
- Accent colors, used sparingly: `--indigo` (#4a5a9c) for the name highlight in the hero and for project titles on hover; `--blue` (#3a5a78) for links ("View project", back-link). Two distinct, deliberately close tones — don't consolidate into one variable.
- **Typography:** Instrument Sans (Google Fonts, free) for headline/title/body copy — chosen after Isaac compared several free grotesk options; deliberately not Inter (reads as generic/AI-default) and not the reference deck's actual fonts (PP Neue Montreal / Polymath Display / PP Editorial New — paid Pangram Pangram fonts; see note below). IBM Plex Mono is the utility face — nav, meta lines, "View project" links, carousel controls — never used for headlines or body copy.
- **Do not embed/extract PP Neue Montreal or Polymath Display from the reference pptx.** Those are commercially licensed; PowerPoint embedding permission doesn't extend to web redistribution. If Isaac later buys a web license from pangrampangram.com, swap the font-family values in styles.css — nothing else changes.
- Homepage entries are minimal by design: small image thumbnail beside (not above) the text, title, one combined meta line ("Org | Role | Year"), a short description, "View project →". No stats/spec-strip — anything more detailed lives on the project's own page. The whole entry is one clickable link.
- Nav layout: "Projects" dropdown at top-left (click to open, lists all 5 projects), LinkedIn icon at top-right. Email lives in the footer, opposite the copyright line — not in the nav.
- Project entry titles turn indigo on hover (`.entry:hover .entry-title`), matching the hero name color exactly.
- **Hero intro animation** (script.js, home page only): "I'm Isaac Chan," fades in slowly (1.6s) on load. Once shown, a second line cycles through descriptor phrases — "mechanical engineer.", "student @ USC.", "builder.", "product designer.", "robot enthusiast." — using a type → pause → highlight (selection-style background) → delete → next-phrase loop, with randomized natural typing-rhythm timing (~90WPM equivalent, extra pause at spaces, rare longer "thinking" pauses). This is a deliberate, finished piece of polish — don't simplify it back to static text or an instant swap.
- No rounded pill buttons, no drop-shadow cards, no gradient blobs, no stock icon packs (the LinkedIn icon is a hand-drawn inline SVG — keep it that way).
- Motion stays minimal and purposeful otherwise: project entries fade up on scroll, carousel uses a hover-scrub segmented strip below the media (see below — not prev/next buttons), link hovers get subtle underline/arrow nudges, dropdown fades/slides open.
- Margins are intentionally tight: max content width 720px, hero padding ~32px, each project entry is a fixed-height band (224px) so divider lines land exactly on the 32px background grid. Don't loosen this without being asked.
- Mobile layout uses **CSS container queries** (not viewport media queries) scoped to `#device-viewport` in preview contexts — see below.

- **Carousel interaction (deliberate, don't revert to prev/next buttons):** each project's media carousel uses a thin segmented hover-scrub strip (`.carousel-scrubber` / `.scrub-seg`) positioned BELOW the media, not overlaid on top of it. Hovering a segment (or tapping, on touch) switches to that slide — inspired by samfcheng.com's hover-scrub galleries, adapted rather than copied. The strip is deliberately below the image specifically so native `<video controls>` on a video slide stay fully clickable — an overlay across the image would block them. Logic lives in `carousel.js`, shared across all project pages.

## Structure & next steps
1. Scaffold into a proper project if desired (Astro suits this multi-page static structure well), or keep as plain multi-page HTML — either is fine given the site's simplicity.
2. An about/intro page has been discussed but not yet built — cover Isaac's background at USC, Amazon's AI Innovation Lab, geCKo Materials, and TerraLabs, in the same plain first-person tone as the homepage.
3. Consider migrating the repeated homepage entry HTML into a data-driven list (JS/JSON array of project objects) so adding a 6th project later is a one-block edit.

## Content still needed from Isaac
- Résumé link — not currently in nav (nav is just Projects dropdown / LinkedIn / email-in-footer per Isaac's explicit request). Add only if he asks.
- Confirm LinkedIn URL (currently `https://www.linkedin.com/in/isaac-k-chan`).

## Deployment
Static site → Vercel, Netlify, or Cloudflare Pages, then point `isaac.engineering` at it via Porkbun DNS. Internal links currently use root-relative paths from the homepage (`projects/id0.html`, etc.) and `../` relative paths from inside `/projects/` (`../index.html#work`, `../styles.css`) — verify these resolve correctly under whatever hosting/build setup is chosen.

## A note on the chat-preview file (if one exists alongside this repo)
Isaac has been previewing changes via a separate single-file bundled version (all pages inlined, hash-free JS click-routing instead of real navigation, plus a desktop/mobile toggle using a `#device-viewport` container with CSS container queries). That file is a chat-convenience artifact only — it is NOT the production site and shouldn't be treated as a second source of truth. If one is present in this folder, it's for reference/context only; the multi-file structure described above is authoritative.

## Tone/voice reminders
Isaac's project copy is already written and finalized — specific, technical, outcome-driven (e.g. "10+ hardware revisions and 100+ 3D prints in about 36 hours," not "rapid iteration"). Don't rewrite it. If new copy is needed (about page, new project), match that same plain, first-person, factual register.
