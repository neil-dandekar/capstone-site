# DSC 180 Capstone – Website Specification

## 1. Purpose

This website is a public-facing, static, single-page research site for a DSC 180 capstone project.

It should:

- Motivate the problem
- Explain the approach at a high level
- Highlight impact and results
- Encourage readers to explore further (paper, code, demo)

The audience is broad:

- Recruiters
- Students
- Researchers
- General public
- Technical readers who may skim

The goal is to make the project exciting, credible, and accessible.

---

## 2. Core Design Principles

- Single-page vertical scroll layout
- Minimal navigation
- No complicated multi-page structure
- Clean, modern, academic aesthetic
- White and dark theme toggle (default light)
- Accent color: dark blue
- Mobile responsive
- Easy to skim
- Figure-driven storytelling
- Professional, conference-style look (NeurIPS / ICLR style project pages)

Avoid:

- Heavy animations
- Overly complex layouts
- Cluttered design
- Corporate marketing style

---

## 3. Structural Layout (Top to Bottom)

### 3.1 Hero Section

Contents:

- Project title (large, centered)
- One-line tagline
- Author names with affiliations
- Buttons:
    - Paper
    - Code
    - Demo (if applicable)
    - BibTeX

Optional:

- Teaser image or diagram below title

Purpose:
Immediately communicate what the project is and why it matters.

---

### 3.2 Introduction / Motivation

Contents:

- Problem being addressed
- Why it is relevant
- Why it matters to society or industry

Tone:
Accessible to a general audience.
Avoid heavy math here.

Optional:

- Supporting diagram or visual

---

### 3.3 Methods (High-Level)

Contents:

- Explanation of approach
- Conceptual overview
- Visual diagram of pipeline or system

This section should:

- Explain what was built or analyzed
- Not overwhelm with technical details

Optional:

- Collapsible “Technical Details” dropdown for advanced readers

---

### 3.4 Demo Section (If Applicable)

If the project includes a product, tool, dashboard, or application:

Include:

- Screenshot, GIF, or video
- Short explanation of what it demonstrates
- Prominent link to interactive version

If no product exists, this section can be renamed:

- “Case Study”
- “Illustration”
- “Example Output”

---

### 3.5 Results & Insights

Contents:

- Key figures or plots
- Visualizations that tell the story
- Bullet-point insights

Design principle:
Readers should understand the core contribution by skimming figures.

Keep explanations concise and intuitive.

---

### 3.6 Impact / Conclusion

Contents:

- Main takeaways
- Why this work matters
- Broader implications
- Future directions (optional)

End with a strong concluding statement.

---

### 3.7 BibTeX Section

Include:

- Proper citation block
- Copy-to-clipboard button
- Clean code formatting

---

### 3.8 Footer

Include:

- Contact information
- GitHub repository link
- Report link
- Attribution or credits (optional)

---

## 4. Content Management Requirements

The site must be easily editable without modifying HTML layout.

All content must be stored in a structured configuration file such as:

- `content.yaml`
- `content.json`
- or structured markdown

This file should contain:

- Title
- Authors
- Links
- Abstract
- Section text
- Image paths
- BibTeX entry

The website must dynamically render content from this file.

Goals:

- Clear separation of content and layout
- Easy swapping of text, links, and images
- No need to edit page structure when updating content

---

## 5. Technical Requirements

- Static website
- Compatible with GitHub Pages
- No backend
- Lightweight dependencies
- Clean folder structure:
    - `/assets`
    - `/images`
    - `/config`
    - `/components` (if applicable)

---

## 6. Tone and Style Guidelines

- Professional but welcoming
- Less formal than a report
- Clear explanations
- Short paragraphs
- Visual-first storytelling
- Minimal jargon in main sections
- Optional deeper technical explanation behind dropdowns

---

## 7. Submission Requirements (DSC 180 Specific)

For checkpoint:

- Repository must exist
- Skeleton structure with headers and section layout
- README must include:
    - Link to live website

Final submission:

- Fully implemented
- Hosted on GitHub Pages
- Publicly accessible

---

## 8. Primary Objective

This website is not a full research paper.

It is:

- A compelling public-facing narrative
- A visual explanation of the project
- A gateway to the full report and code

It should make someone want to:

- Click the GitHub repository
- Read the report
- Reach out with interest
- Interview the author
