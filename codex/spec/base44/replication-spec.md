# Full Replication Guide: Academic ML Research Project Page

## Tech Stack

| Layer              | Technology                                            |
| ------------------ | ----------------------------------------------------- |
| Framework          | React 18 (JSX)                                        |
| Styling            | Tailwind CSS (utility-first)                          |
| UI Components      | shadcn/ui (Button)                                    |
| Icons              | lucide-react                                          |
| Markdown Rendering | react-markdown                                        |
| Animations         | Native browser IntersectionObserver + CSS transitions |
| Routing            | react-router-dom (single page, no routing needed)     |
| Dark Mode          | CSS class strategy (`dark` on `<html>`)               |

No backend. No build config changes. No extra CSS files. Everything is pure Tailwind + React.

## File Structure

```text
pages/
  Home.jsx                       # Main page, assembles all sections

components/
  research/
    siteContent.js               # ALL editable content lives here
    ThemeToggle.jsx              # Dark/light toggle button
    FadeInSection.jsx            # Reusable scroll animation wrapper
    HeroSection.jsx              # Title, authors, buttons, teaser image
    AbstractSection.jsx          # Abstract card with accent bar
    MotivationSection.jsx        # Problem statement + image
    MethodSection.jsx            # Diagram + collapsible tech details
    DemoSection.jsx              # Video / image demo embed
    ResultsSection.jsx           # Figures grid + findings list
    SummarySection.jsx           # Takeaways + impact highlights
    BibtexSection.jsx            # Copyable BibTeX block
    FooterSection.jsx            # Contact, GitHub, copyright
```

## Color System (Tailwind)

| Role                    | Light Mode                                 | Dark Mode                       |
| ----------------------- | ------------------------------------------ | ------------------------------- |
| Page background         | `bg-white`                                 | `bg-zinc-950`                   |
| Section alt background  | `bg-zinc-50/60`                            | `bg-zinc-900/40`                |
| Card / panel background | `bg-white`                                 | `bg-zinc-900`                   |
| Border                  | `border-zinc-200`                          | `border-zinc-800`               |
| Primary text            | `text-zinc-900`                            | `text-white`                    |
| Secondary text          | `text-zinc-600`                            | `text-zinc-400`                 |
| Muted / caption text    | `text-zinc-400`                            | `text-zinc-500`                 |
| Accent (blue)           | `text-blue-600` / `bg-blue-700`            | `text-blue-400` / `bg-blue-800` |
| Accent badge background | `bg-blue-50`                               | `bg-blue-950/60`                |
| Code block background   | `bg-zinc-900`                              | `bg-zinc-950`                   |
| Top gradient bar        | `from-blue-600 via-blue-500 to-indigo-500` | same                            |

The single accent color throughout is `blue-600` / `blue-700` (dark blue). It appears on:

- The top 3px gradient bar
- Section underline dividers (`h-1 w-12 rounded-full bg-blue-600`)
- Buttons, links, badge borders, icon colors, the abstract accent bar

## Typography System

All fonts are Tailwind defaults (system font stack). No custom fonts loaded.

| Element               | Classes                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------ |
| Page title (H1)       | `text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold leading-tight tracking-tight` |
| Section headings (H2) | `text-2xl md:text-3xl font-bold`                                                                 |
| Tagline               | `text-lg md:text-xl text-zinc-500`                                                               |
| Body text             | `text-base leading-relaxed`                                                                      |
| Captions              | `text-xs italic text-zinc-400`                                                                   |
| Labels / eyebrows     | `text-xs font-semibold uppercase tracking-widest text-blue-600`                                  |
| Code / BibTeX         | `text-xs md:text-sm font-mono` (inside `<pre>`)                                                  |

## Dark Mode Implementation

Strategy: CSS class-based dark mode (not `prefers-color-scheme`).

```jsx
// Home.jsx
const [dark, setDark] = useState(false);

useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
}, [dark]);
```

This adds/removes the `dark` class on `<html>`. Tailwind's `dark:` variants then apply. Default is light mode.

The toggle button is `position: fixed; top: 5; right: 5; z-50` (always visible regardless of scroll position). It uses a backdrop blur (`backdrop-blur-md`) and semi-transparent background (`bg-white/70`) to float cleanly over any content.

## Animation System: `FadeInSection`

This is the only animation primitive used across the entire page. Every section is wrapped in it.

```jsx
// FadeInSection.jsx — full implementation
import { useEffect, useRef, useState } from "react";

export default function FadeInSection({ children, className = "", delay = 0 }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setVisible(true), delay);
                    observer.unobserve(entry.target); // fires once only
                }
            },
            { threshold: 0.12 }, // triggers when 12% of element is visible
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [delay]);

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${
                visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
            } ${className}`}
        >
            {children}
        </div>
    );
}
```

How it works:

- Default state: `opacity-0 translate-y-8` (invisible, shifted down 32px)
- When 12% of element enters viewport, triggers after optional `delay` (ms)
- Transitions to: `opacity-100 translate-y-0`
- Duration: `700ms`, easing: `ease-out`
- Fires once only (`observer.unobserve` prevents re-triggering)

Usage pattern (staggered children):

```jsx
<FadeInSection>{/* heading — no delay */}</FadeInSection>
<FadeInSection delay={80}>{/* subtitle */}</FadeInSection>
<FadeInSection delay={160}>{/* authors */}</FadeInSection>
<FadeInSection delay={240}>{/* buttons */}</FadeInSection>
<FadeInSection delay={320}>{/* teaser image */}</FadeInSection>
```

Each element gets +80ms more delay, creating a natural cascade effect.

## Layout Architecture

Page (`Home.jsx`):

```jsx
<div className="min-h-screen transition-colors duration-300 bg-white dark:bg-zinc-950">
    <ThemeToggle />
    <div className="h-[3px] bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500" />
    {/* sections... */}
    <hr className="border-zinc-200 dark:border-zinc-800" />
    <AbstractSection />
    <MotivationSection /> {/* alt background */}
    <MethodSection />
    <DemoSection /> {/* alt background */}
    <ResultsSection />
    <SummarySection /> {/* alt background */}
    <BibtexSection />
    <FooterSection />
</div>
```

Alternating section backgrounds (`white → zinc-50 → white → ...`) create visual rhythm without borders or heavy dividers. Sections with alt backgrounds use `bg-zinc-50/60 dark:bg-zinc-900/40`.

## Section Anatomy (Consistent Pattern)

Every section follows this internal structure:

```jsx
<section className="py-16 md:py-20">
    {" "}
    {/* vertical padding */}
    <div className="max-w-5xl mx-auto px-6">
        {" "}
        {/* centered, padded container */}
        <FadeInSection>
            <h2>Heading</h2>
            <div className="h-1 w-12 rounded-full bg-blue-600 mb-8" />{" "}
            {/* accent underline */}
        </FadeInSection>
        {/* content */}
    </div>
</section>
```

The `h-1 w-12 rounded-full bg-blue-600` accent bar under every H2 is the visual signature of the design.

Max widths used:

- `max-w-4xl` - hero, footer (text-heavy, centered)
- `max-w-5xl` - method, demo, results (wider for images/figures)
- `max-w-3xl` - abstract, summary, bibtex (narrower for readability)

## Component-by-Component Design

### HeroSection

- Full centered layout, no sidebar
- Venue badge: pill shape, `rounded-full`, blue tint, uppercase tracking
- H1: `font-extrabold`, fluid sizing from `text-3xl` to `lg:text-[3.25rem]`
- Authors: inline chips with name + superscript affiliation, `·` separators
- Buttons: 4 buttons, primary (solid blue) + 3 ghost outlines
- Background orb: absolutely positioned `w-[600px] h-[600px]` circle, `bg-blue-100/40 blur-3xl`, purely decorative
- Teaser image: full-width, `max-h-[420px] object-cover`, `rounded-2xl`, heavy shadow (`shadow-xl shadow-zinc-200/50`)

### AbstractSection

- No section heading, just the eyebrow label `Abstract` in blue
- Left accent bar: `absolute -left-4 top-0 bottom-0 w-1 rounded-full bg-blue-600`
- Text at `text-base md:text-lg`, generous `leading-relaxed`

### MotivationSection + DemoSection + SummarySection

- Alternate background sections
- Two-column grid (`grid md:grid-cols-2`) for text + image side-by-side

### MethodSection

- Single column layout with full-width diagram
- Collapsible "Technical Details" block:
- Toggle button uses `ChevronDown` icon that rotates 180° with `transition-transform duration-300`
- Panel uses `max-h-0` to `max-h-[2000px]` transition for smooth open/close (CSS height animation trick)
- Inner content rendered with `react-markdown` + prose Tailwind plugin classes

### ResultsSection

- 2-column figure grid (`grid sm:grid-cols-2 gap-6`)
- Each figure: image + italic caption below
- Findings list: `CheckCircle2` icon (blue) + text, inside a panel card

### BibtexSection

- `<pre>` block: `bg-zinc-900 text-zinc-300`, monospace, rounded-xl, `overflow-x-auto`
- Copy button: absolutely positioned `top-3 right-3`, hidden by default, appears on hover via `group/group-hover:opacity-100`
- Copy feedback: icon swaps from `Copy` to `Check` (green) for 2 seconds using `setTimeout`

### FooterSection

- Simple two-column flex (`flex-col sm:flex-row`), small text
- Three links: email (`mailto:`), GitHub (external), copyright line
- Separated from page content by `border-t border-zinc-200 dark:border-zinc-800`

## Content Configuration System

All content lives in `components/research/siteContent.js` as a plain JavaScript object (no YAML parser needed, works in-browser):

```js
const siteContent = {
    title: "...",
    tagline: "...",
    authors: [{ name, affiliation, link }],
    venue: "...",
    paperLink: "...",
    codeLink: "...",
    demoLink: "...",
    teaserImage: "...",
    teaserCaption: "...",
    abstract: `...`,
    motivation: { heading, text, image, imageCaption },
    method: { heading, text, image, imageCaption, technicalDetails },
    demo: { heading, text, videoUrl, gifUrl, gifCaption },
    results: { heading, figures: [{ image, caption }], findings: [] },
    summary: { heading, text, highlights: [] },
    bibtex: `...`,
    footer: { contactEmail, githubLink, citationNote, copyright },
};
```

To customize:

- Only this file needs to be edited
- Swap `teaserImage` for a local path
- Update abstract
- Add/remove authors
- Change links
- Zero structural code changes required

## Replication Checklist

- Install deps: `react-markdown`, `lucide-react`, `tailwindcss` with `darkMode: 'class'` in config
- Create the file structure above exactly
- Copy each component verbatim
- Edit `siteContent.js` with your own content
- `Home.jsx` assembles everything; no `Layout.js` wrapper needed

That's the complete blueprint. Every design decision is explicit and reversible.
