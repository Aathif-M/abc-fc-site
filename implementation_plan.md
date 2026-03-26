# Add Navbar Sections to Homepage

The navbar has 6 links: **News, Matches, First Team, Academy, Club, Fans**. Currently most of these don't scroll to actual sections. This plan adds proper [id](file:///d:/Projects/Football%20site/src/components/MediaGrid.jsx#45-125) anchors to existing sections and creates 3 new ones.

## Current State → Target Mapping

| Navbar Link | Current State | Action |
|---|---|---|
| `news` | `<LatestNews />` exists, no [id](file:///d:/Projects/Football%20site/src/components/MediaGrid.jsx#45-125) | Add `id="news"` |
| `matches` | `<MatchHub />` + `<Standings />` exist, no [id](file:///d:/Projects/Football%20site/src/components/MediaGrid.jsx#45-125) | Add `id="matches"` |
| `squad` | `<Squad />` exists with `id="legacy"` | Fix to `id="squad"` |
| `academy` | ❌ Missing | Create new `<Academy />` section |
| `club` | `<About />` exists with `id="about"` | Fix to `id="club"` |
| `fans` | ❌ Missing | Create new `<Fans />` section |

## Proposed Changes

### IDs & Wiring

#### [MODIFY] App.jsx
- Wrap `<MatchHub />` + `<Standings />` in `<div id="matches">`
- Wrap `<LatestNews />` in `<div id="news">`
- Change `id="legacy"` → `id="squad"` on the Squad wrapper
- Change `id="about"` → `id="club"` on the About wrapper
- Import and add `<Academy />` and `<Fans />` sections

---

### New Sections

#### [NEW] Academy.jsx
A visually rich Academy section with:
- Header: "The Next Generation"
- 3-card grid showing Academy highlights: U21 results, youth prospects, development philosophy
- Uses images: `academy-action`, `academy-u21`, `academy-youth`
- Dimensions: 1200x800 pixels (3:2 landscape)

#### [NEW] Fans.jsx
A fans/community section with:
- Header: "The Blue Army"
- Stats bar (avg attendance, sell-outs, season ticket holders)
- 2-image collage of fan/stadium atmosphere
- Uses images: `fans-portman-road`, `fans-celebration`
- Dimensions: 1920x1080 pixels (16:9 landscape)

---

## Media Guide Updates

New assets to add to [IPSWICH_MEDIA_GUIDE.txt](file:///d:/Projects/Football%20site/IPSWICH_MEDIA_GUIDE.txt):

**Section 7 — Academy:**
- `academy-action` — 1200x800px — Action shot of academy players in a match
- `academy-u21` — 1200x800px — U21 squad photo or training drill
- `academy-youth` — 1200x800px — Young player close-up or training session

**Section 8 — Fans:**
- `fans-portman-road` — 1920x1080px — Wide panoramic shot of Portman Road packed with fans
- `fans-celebration` — 1920x1080px — Fans celebrating a goal in the stands

## Verification Plan

### Manual Testing (Browser)
1. Run `npm run dev` (already running at http://localhost:5173)
2. Open the site in the browser
3. Click each navbar link (News, Matches, First Team, Academy, Club, Fans) and confirm the page scrolls to the correct section
4. Check that all 3 new sections render with no visible errors
