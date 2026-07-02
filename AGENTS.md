# AGENTS.md — andyeadie.com

## Mission

This is Andy Eadie’s personal website. It should present two connected sides of Andy’s professional life:

1. **AI / web development**
   - Contract Chatbot
   - AI app experiments
   - employment / commercial wins
   - LinkedIn / professional credibility
   - clear examples, screenshots, FAQs and calls to action

2. **Stunts / screen work**
   - personal showreel
   - professional stills
   - IMDb link
   - notable stunt credits
   - confident visual storytelling

The site should feel like a sharp personal brand, not a generic portfolio template.

## Design direction

Aim for a premium editorial / cinematic feel with modern web-product polish.

The design should be:
- bold but controlled
- high contrast
- clean and readable
- slightly cinematic
- professional enough for employers / clients
- visual enough for film and stunt work
- credible enough for AI consulting and app development

Avoid:
- generic startup gradients everywhere
- cheap neon hacker styling
- cluttered sections
- excessive animations
- weak grey-on-grey contrast
- over-rounded toy-like cards
- boilerplate portfolio layouts

## Visual language

Use the existing palette unless a task explicitly asks for a redesign.

Preferred core colours:
- near-black ink: `#0b0d12`
- warm paper background: `#f4f1e9`
- muted grey text: `#6f737d`
- AI blue: `#5b7cff`
- brighter AI blue: `#89a0ff`
- stunt orange/red: `#f05a35`
- brighter stunt orange: `#ff9d72`
- deep dark: `#090b10`

Use CSS variables in `:root` for colour, spacing, radius and shadow values. Do not scatter one-off colours through the CSS.

The AI side can use cooler blue accents.  
The stunt side can use warmer orange/red accents.  
The overall site should still feel unified.

## Typography

Keep typography clean and strong.

Headings:
- large, confident, tight line-height
- avoid overly decorative fonts
- use good hierarchy: hero > section headings > cards > body

Body text:
- readable on mobile and desktop
- no long cramped paragraphs
- use max-widths for comfortable reading

Use existing font choices unless there is a clear reason to improve them.

## Layout principles

Prioritise clear sections:

1. Hero / identity
2. AI web development / Contract Chatbot
3. Contract Chatbot examples, screenshot, FAQ
4. Employment / commercial wins
5. Other AI projects in development
6. Stunts / showreel
7. Professional shots
8. IMDb / notable stunt credits
9. Contact / CTA

Use:
- strong section rhythm
- cards/pills for wins and notable credits
- visual split between AI and stunts
- consistent spacing
- consistent button styles
- clear primary and secondary CTAs

Do not make every section look the same. The AI and stunt halves should feel related but distinct.

## Responsive rules

Mobile is not optional.

Every change must work at:
- narrow mobile width
- tablet width
- desktop width

Avoid horizontal scrolling.  
Avoid tiny tap targets.  
Keep buttons thumb-friendly.  
Stack complex layouts cleanly on mobile.  
Images and videos must scale predictably.

## CSS rules

Prefer editing `styles.css` for styling.

Keep CSS organised by:
1. variables / reset
2. base elements
3. layout utilities
4. header / nav
5. hero
6. sections
7. cards / pills / buttons
8. media / gallery / video
9. responsive media queries

Use existing classes where practical.  
Do not duplicate large blocks of similar CSS.  
Do not introduce a framework unless explicitly asked.

Use modern CSS carefully:
- flexbox and grid are good
- clamp() is good for responsive sizing
- CSS variables are preferred
- simple transitions are fine

Avoid:
- brittle absolute positioning
- magic numbers that only work on one screen
- excessive z-index
- unnecessary JavaScript for layout
- inline styles unless unavoidable

## HTML rules

Keep HTML semantic and readable.

Use:
- `<header>`
- `<main>`
- `<section>`
- `<article>`
- `<nav>`
- `<figure>`
- `<footer>`

Buttons and links should have clear accessible text.

External links can open in a new tab only where that is genuinely useful. If using `target="_blank"`, include `rel="noopener"`.

Do not add fake content. If a real credit, image, screenshot, URL or project detail is missing, use a clear placeholder and mark it visibly in the code.

## JavaScript rules

This is currently a simple static website. Keep JavaScript minimal.

Use `script.js` only for:
- small progressive enhancements
- menu toggles
- smooth UI touches
- lightweight interactions

Do not add:
- direct API calls from the browser
- secrets
- AI provider keys
- analytics scripts
- build tooling
- large dependencies

Any chatbot link should go to the hosted chatbot app. Do not embed private API credentials or direct LLM calls into this site.

## Asset rules

Assets live in `assets/`.

Use sensible file names:
- lowercase
- hyphen-separated
- descriptive

Examples:
- `contract-chatbot-screenshot.webp`
- `andy-stunt-showreel-poster.jpg`
- `imdb-credit-still.jpg`

Optimise images before use where practical. Prefer `.webp` for web images when possible.

Do not commit large source files unless specifically requested:
- raw video
- huge Photoshop files
- archive files
- uncompressed production assets

For video/showreel, prefer externally hosted video or a deliberately optimised web file.

## Accessibility

Maintain good accessibility by default.

Required:
- sufficient colour contrast
- visible focus states
- useful alt text for meaningful images
- decorative images should have empty alt text
- keyboard navigable links/buttons
- no text baked into images unless repeated in HTML
- no motion that blocks reading

Avoid making the site look good only for mouse users.

## SEO / metadata

Keep metadata professional and specific.

Use titles and descriptions that include:
- Andy Eadie
- AI web developer
- Contract Chatbot
- stunt performer / stunt credits
- UK where appropriate

Use sensible heading structure:
- one `<h1>`
- section `<h2>`s
- card `<h3>`s where appropriate

Do not keyword-stuff. Make it credible.

## Content tone

Voice should be direct, confident and specific.

Avoid:
- “passionate about technology”
- “innovative solutions”
- “cutting-edge”
- vague corporate filler
- fake achievements

Prefer concrete statements:
- what Andy built
- what it does
- who it helps
- what problem it solves
- what credits or professional proof exist

## Development workflow

This native VM repo is the canonical working copy:

`/home/ccod/repos/andyeadie-com`

Do not edit the old mounted Windows/shared import folder unless explicitly asked:

`/mnt/hgfs/andyeadie_com`

Before making changes:
1. Inspect the current files.
2. Check `git status`.
3. Identify the smallest safe change.
4. Preserve existing working content unless asked to replace it.

After making changes:
1. Run a quick static sanity check.
2. Show the changed files.
3. Summarise what changed.
4. Leave the repo in a clean or clearly explained state.

Prefer small, reviewable commits.

## Git rules

Use clear commit messages.

Good examples:
- `Polish hero section layout`
- `Add Contract Chatbot FAQ section`
- `Improve mobile navigation`
- `Refine AI and stunt section styling`
- `Add stunt credits cards`

Do not commit unrelated files.  
Do not rewrite history unless explicitly instructed.  
Do not add a remote unless explicitly instructed.

## Quality bar

A good change should make the site feel:
- more intentional
- more premium
- easier to scan
- better on mobile
- more credible
- less generic

When improving design, do not merely add decoration. Improve hierarchy, spacing, contrast, rhythm, and clarity.

