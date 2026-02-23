# Frontend Layout & Structure Guide

Complete visual and structural layout guide.

## Page-Level Structure

The entire page is a single vertical scroll with no routing. `Home.jsx` is the root and stacks every section top-to-bottom inside one div.

```text
<div>                          <- Root container, full viewport height
  |- [3px gradient bar]        <- Decorative top line (blue -> indigo)
  |- <ThemeToggle />           <- Fixed, top-right corner (z-50)
  |- <HeroSection />
  |- <hr />                    <- Thin divider line
  |- <AbstractSection />       <- White background
  |- <MotivationSection />     <- Alt background (zinc-50)
  |- <MethodSection />         <- White background
  |- <DemoSection />           <- Alt background (zinc-50)
  |- <ResultsSection />        <- White background
  |- <SummarySection />        <- Alt background (zinc-50)
  |- <BibtexSection />         <- White background
  '- <FooterSection />         <- Border-top divider, white
```

Background rhythm: sections alternate `White -> Zinc-50 -> White -> Zinc-50`. This creates visual separation without hard borders or heavy dividers.

## Viewport & Container System

Every section uses the same centering pattern:

```text
Full viewport width (100vw)
'- <section> py-16 md:py-20
   '- <div> mx-auto px-6
      '- content
```

Three container max-widths are used depending on content type:

- `max-w-3xl` (768px): Abstract, Summary, BibTeX (text-heavy, narrow for readability)
- `max-w-4xl` (896px): Hero, Footer (centered, moderate width)
- `max-w-5xl` (1024px): Motivation, Method, Demo, Results (wide; accommodates images/figures)

## Section-by-Section Layout Diagrams

### 1. Top Bar + Theme Toggle

```text
┌─────────────────────────────────────────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓ [3px gradient bar] ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  blue-600 -> indigo-500
└─────────────────────────────────────────────────────┘
┌──────────┐
│ ☀️ / 🌙 │  <- Fixed, z-50, top-right
│ toggle   │     backdrop-blur, rounded-full
└──────────┘
```

### 2. Hero Section

```text
┌─────────────────────────────────────────────────────┐
│ pt-28 md:pt-36                                      │
│                                                     │
│ [decorative blur orb - absolute]                    │ 600x600px, blue-100/40, blur-3xl
│                                                     │
│ ┌─────────────────────────────┐                     │
│ │ [ venue badge pill ]        │ <- centered         │ blue-50 bg, blue-700 text
│ └─────────────────────────────┘                     │
│                                                     │
│ ┌─────────────────────────────┐                     │
│ │ LARGE TITLE (H1)            │ <- centered         │ font-extrabold, up to text-5xl
│ └─────────────────────────────┘                     │
│                                                     │
│ ┌─────────────────────────────┐                     │
│ │ tagline subtitle            │ <- centered         │ text-xl, zinc-500, max-w-2xl
│ └─────────────────────────────┘                     │
│                                                     │
│ Author · Author · Author · Author                   │ <- centered, inline, · separator
│ [name bold] [affiliation small]                     │
│                                                     │
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐         │
│ │ Paper  │ │ Code   │ │ Demo   │ │ BibTeX │         │ <- flex-wrap, gap-3, centered
│ └────────┘ └────────┘ └────────┘ └────────┘         │    1 solid blue + 3 outline
│                                                     │
│ ┌───────────────────────────────────────────┐       │
│ │ TEASER IMAGE                              │       │ rounded-2xl, shadow-xl
│ │ max-h-[420px] object-cover                │       │ border zinc-200
│ └───────────────────────────────────────────┘       │
│ [italic caption text, centered]                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 3. Abstract Section

```text
┌─────────────────────────────────────────────────────┐
│ py-16 md:py-20                                      │
│ max-w-3xl, white background                         │
│                                                     │
│ ┌──────────────────────────────────────────────┐    │
│ │▌ ABSTRACT <- blue eyebrow label             │    │ ▌ = left accent bar
│ │▌ Long abstract paragraph text here.         │    │ absolute, w-1, blue-600
│ │▌ text-base md:text-lg, leading-relaxed.     │    │ h-full, rounded-full
│ │▌ zinc-700 text color.                       │    │
│ └──────────────────────────────────────────────┘    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

Key detail: the left accent bar is `position: absolute; left: -16px` relative to a `position: relative` wrapper. It spans the full height of the text block.

### 4. Motivation Section

```text
┌─────────────────────────────────────────────────────┐
│ bg-zinc-50/60 dark:bg-zinc-900/40                  │
│ py-16 md:py-20                                      │
│ max-w-5xl                                           │
│                                                     │
│ Section Heading (H2)                                │
│ ▬▬▬▬ <- h-1 w-12 rounded-full blue-600             │ 12px tall, 48px wide pill
│                                                     │
│ ┌──────────────────────┬──────────────────────┐    │
│ │ Body text            │ Image                │    │ grid md:grid-cols-2
│ │ (left column)        │ rounded-xl           │    │ gap-10, items-center
│ │ text-base            │ border + shadow      │    │
│ │ zinc-600             │ [italic caption]     │    │
│ └──────────────────────┴──────────────────────┘    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

On mobile: stacks vertically (text above, image below).

### 5. Method Section

```text
┌─────────────────────────────────────────────────────┐
│ white background                                    │
│ py-16 md:py-20                                      │
│ max-w-5xl                                           │
│                                                     │
│ Section Heading (H2)                                │
│ ▬▬▬▬ <- accent bar                                  │
│                                                     │
│ ┌───────────────────────────────────────────────┐   │
│ │ Body text paragraph - single column           │   │ max-w-3xl, zinc-600
│ └───────────────────────────────────────────────┘   │
│                                                     │
│ ┌───────────────────────────────────────────────┐   │
│ │ FULL-WIDTH DIAGRAM IMAGE                      │   │ max-h-[400px] object-cover
│ │ rounded-xl, border, shadow-lg                 │   │
│ └───────────────────────────────────────────────┘   │
│ [italic caption]                                    │
│                                                     │
│ ▼ Show Technical Details <- toggle button           │ ChevronDown rotates 180deg on open
│                                                     │
│ ┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐       │
│ │ [COLLAPSIBLE PANEL]                            │   │ max-h-0 -> max-h-[2000px]
│ │ bg-zinc-50 rounded-xl border                   │   │ CSS height transition
│ │ prose markdown rendered content                 │   │
│ └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 6. Demo Section

```text
┌─────────────────────────────────────────────────────┐
│ bg-zinc-50/60 dark:bg-zinc-900/40                  │
│ max-w-5xl                                           │
│                                                     │
│ Section Heading (H2)                                │
│ ▬▬▬▬                                                │
│                                                     │
│ Explanatory text paragraph (max-w-2xl)              │
│                                                     │
│ ┌───────────────────────────────────────────────┐   │
│ │ VIDEO (aspect-video iframe)                   │   │ If videoUrl set -> <iframe>
│ │ or GIF / IMAGE                                │   │ Else -> <img>
│ │ or placeholder div                            │   │ Else -> empty placeholder
│ │ rounded-xl, border, shadow-xl, bg-black       │   │
│ └───────────────────────────────────────────────┘   │
│ [italic caption]                                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 7. Results Section

```text
┌─────────────────────────────────────────────────────┐
│ white background                                    │
│ max-w-5xl                                           │
│                                                     │
│ Section Heading (H2)                                │
│ ▬▬▬▬                                                │
│                                                     │
│ ┌────────────────────┬────────────────────────┐     │
│ │ Figure 1           │ Figure 2               │     │ grid sm:grid-cols-2 gap-6
│ │ ┌──────────────┐   │ ┌──────────────────┐   │     │
│ │ │ image        │   │ │ image            │   │     │ h-56, object-cover
│ │ │ h-56         │   │ │ rounded-xl       │   │     │ rounded-xl, border, shadow-md
│ │ └──────────────┘   │ └──────────────────┘   │     │
│ │ [caption]          │ [caption]              │     │
│ └────────────────────┴────────────────────────┘     │
│                                                     │
│ ┌───────────────────────────────────────────────┐   │
│ │ KEY FINDINGS <- blue eyebrow label            │   │ panel: bg-zinc-50 rounded-xl
│ │ ✓ Finding one text here                       │   │ border zinc-200, p-6 md:p-8
│ │ ✓ Finding two text here                       │   │ CheckCircle2 icon, blue-600
│ │ ✓ Finding three text here                     │   │ icon + text flex row, gap-3
│ │ ✓ Finding four text here                      │   │ space-y-4 between items
│ └───────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 8. Summary Section

```text
┌─────────────────────────────────────────────────────┐
│ bg-zinc-50/60 dark:bg-zinc-900/40                  │
│ max-w-3xl                                           │
│                                                     │
│ Section Heading (H2)                                │
│ ▬▬▬▬                                                │
│                                                     │
│ ┌───────────────────────────────────────────────┐   │
│ │ Body paragraph text                            │   │ text-base, zinc-600, leading-relaxed
│ └───────────────────────────────────────────────┘   │
│                                                     │
│ ┌───────────────────────────────────────────────┐   │
│ │ ✦ Highlight one                               │   │ bg-white dark:bg-zinc-900
│ └───────────────────────────────────────────────┘   │ rounded-lg, border, shadow-sm
│ ┌───────────────────────────────────────────────┐   │ p-4, flex items-start gap-3
│ │ ✦ Highlight two                               │   │ Sparkles icon, blue-600
│ └───────────────────────────────────────────────┘   │ space-y-3 between cards
│ ┌───────────────────────────────────────────────┐   │
│ │ ✦ Highlight three                             │   │
│ └───────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 9. BibTeX Section

```text
┌─────────────────────────────────────────────────────┐
│ white background                                    │
│ max-w-3xl                                           │
│                                                     │
│ Citation <- H2                                      │
│ ▬▬▬▬                                                │
│                                                     │
│ ┌───────────────────────────────────────────────┐   │
│ │ @inproceedings{zhang2026...                  │   │ bg-zinc-900 text-zinc-300
│ │ title = {...},                               │   │ rounded-xl, p-6
│ │ author = {...},                              │   │ text-xs md:text-sm font-mono
│ │ ...                                          │   │ overflow-x-auto
│ │ ┌────────┐                                   │   │
│ │ │ Copy   │                                   │   │ absolute top-3 right-3
│ │ └────────┘                                   │   │ opacity-0 -> opacity-100 on hover
│ └───────────────────────────────────────────────┘   │ (group/group-hover pattern)
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 10. Footer Section

```text
┌─────────────────────────────────────────────────────┐
│ border-t zinc-200                                   │ py-12
│ max-w-4xl                                            │
│                                                      │
│ ┌──────────────────────────────────────────────┐     │
│ │ Citation note text (left) | Contact | GitHub │     │ flex-col sm:flex-row
│ └──────────────────────────────────────────────┘     │ justify-between, items-center
│                                                      │
│ © 2026 Author et al.                                 │ text-center, text-[11px]
│                                                      │ zinc-300 (very faint)
└─────────────────────────────────────────────────────┘
```

## `FadeInSection` Placement

Every visible element inside a section is wrapped in `<FadeInSection>`. Sibling elements get incrementally larger `delay` values to create a stagger effect.

```text
Section
|- <FadeInSection> delay=0         -> heading + accent bar
|- <FadeInSection delay={100}>     -> body text / left column
|- <FadeInSection delay={200}>     -> image / right column
'- <FadeInSection delay={300}>     -> panel / findings list
```

In the Hero specifically, each individual element (badge, H1, tagline, authors, buttons, image) gets its own `FadeInSection` with `+80ms` increments.

## Component Dependency Tree

```text
Home.jsx
|- ThemeToggle.jsx (no deps)
|- HeroSection.jsx
|  '- FadeInSection.jsx (no deps)
|- AbstractSection.jsx
|  '- FadeInSection.jsx
|- MotivationSection.jsx
|  '- FadeInSection.jsx
|- MethodSection.jsx
|  |- FadeInSection.jsx
|  '- react-markdown (npm)
|- DemoSection.jsx
|  '- FadeInSection.jsx
|- ResultsSection.jsx
|  '- FadeInSection.jsx
|- SummarySection.jsx
|  '- FadeInSection.jsx
|- BibtexSection.jsx
|  '- FadeInSection.jsx
'- FooterSection.jsx
   '- FadeInSection.jsx

All sections read from:
'- siteContent.js (no deps; plain JS object)
```

## Spacing & Rhythm Reference

| Property                     | Value                          |
| ---------------------------- | ------------------------------ |
| Section vertical padding     | `py-16 md:py-20` (64px / 80px) |
| Container horizontal padding | `px-6` (24px)                  |
| H2 to accent bar gap         | `mb-3` (12px)                  |
| Accent bar to content gap    | `mb-8` (32px)                  |
| Grid gap (two-column)        | `gap-10` (40px)                |
| Figure grid gap              | `gap-6` (24px)                 |
| Card inner padding           | `p-6 md:p-8`                   |
| Highlight card inner padding | `p-4`                          |
| Between highlight cards      | `space-y-3` (12px)             |
| Between finding items        | `space-y-4` (16px)             |
| Between author chips         | `gap-x-5 gap-y-2`              |
| Between hero buttons         | `gap-3` (12px)                 |

## Responsive Breakpoint Behavior

| Element           | Mobile                  | Desktop (`md+`)               |
| ----------------- | ----------------------- | ----------------------------- |
| Hero title        | `text-3xl`              | `text-5xl` / `text-[3.25rem]` |
| Motivation layout | Single column (stacked) | Two-column grid               |
| Section padding   | `py-16`                 | `py-20`                       |
| Hero padding-top  | `pt-28`                 | `pt-36`                       |
| BibTeX font       | `text-xs`               | `text-sm`                     |
| Footer layout     | `flex-col` centered     | `flex-row` space-between      |
| Figure grid       | `grid-cols-1`           | `grid-cols-2`                 |
| Card padding      | `p-6`                   | `p-8`                         |

Every layout decision uses Tailwind's `md:` prefix. No custom media queries are used.

This is the complete structural and spatial blueprint of the page. Combined with the tech stack guide, every layout decision, spacing value, component boundary, and visual pattern is documented for exact replication.
