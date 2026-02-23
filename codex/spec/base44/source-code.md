# Source Code

Complete source for each file:

## `components/research/siteContent.js`

```js
/\*\*

- ═══════════════════════════════════════════════════════════════
- SITE CONTENT CONFIGURATION
- Edit this file to change ALL content on the research page.
- ═══════════════════════════════════════════════════════════════
  \*/

const siteContent = {
title: "Adaptive Neural Compression via Learned Entropy Models",
tagline: "Pushing the Pareto frontier of neural data compression with adaptive, content-aware entropy coding",
authors: [
{ name: "Alice Zhang", affiliation: "UC San Diego", link: "https://example.com/alice" },
{ name: "Bob Kumar", affiliation: "MIT CSAIL", link: "https://example.com/bob" },
{ name: "Carol Chen", affiliation: "Google DeepMind", link: "https://example.com/carol" },
{ name: "David Park", affiliation: "Stanford University",link: "https://example.com/david" },
],
venue: "NeurIPS 2026 · Spotlight",
paperLink: "https://arxiv.org/abs/2025.00000",
codeLink: "https://github.com/example/adaptive-neural-compression",
demoLink: "#demo",
teaserImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80",
teaserCaption: "Our method adaptively allocates bits across spatial regions, achieving state-of-the-art rate-distortion performance.",

abstract: `Neural compression methods have made remarkable progress in closing the gap with traditional codecs, yet they often treat all spatial regions uniformly during entropy coding. We introduce Adaptive Neural Compression (ANC), a framework that learns content-aware entropy models capable of dynamically allocating bitrate based on local image complexity. Our approach combines a lightweight spatial attention module with a hierarchical hyperprior to produce region-adaptive probability estimates. Extensive experiments on Kodak, CLIC, and Tecnick demonstrate that ANC achieves 12–18% BD-rate savings over the strongest learned baselines while adding negligible computational overhead. We further show that our adaptive entropy model generalizes across resolutions and domains without fine-tuning, enabling practical deployment in bandwidth-constrained settings.`,

motivation: {
heading: "Why Adaptive Entropy Coding?",
text: `Existing neural image codecs apply a single, globally-parameterized entropy model to every spatial location. This is suboptimal: smooth sky regions need far fewer bits than textured areas. Traditional codecs like VVC already exploit this via block-level mode decisions, but learned methods lack an analogous mechanism. Our key insight is that a lightweight attention module can learn to predict per-region complexity, enabling the entropy coder to allocate bits where they matter most—without any hand-crafted heuristics.`,
image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
imageCaption: "Bit allocation heatmap: warm = more bits, cool = fewer bits.",
},

method: {
heading: "Method Overview",
text: `ANC augments a standard autoencoder-based codec with two additions: (1) a Spatial Attention Module (SAM) that produces per-pixel importance maps from the encoder's latent representation, and (2) a Hierarchical Adaptive Hyperprior that conditions the entropy parameters on both global image statistics and local attention scores.`,
image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1000&q=80",
imageCaption: "Architecture: encoder → SAM → adaptive hyperprior → arithmetic coder → decoder.",
technicalDetails: `**Spatial Attention Module (SAM):** Given encoder features F ∈ ℝ^{C×H×W}, SAM applies channel-wise squeeze-excitation followed by a 1×1 convolution to produce attention map A ∈ [0,1]^{1×H×W}.

**Hierarchical Adaptive Hyperprior:** We extend the mean-scale hyperprior by conditioning the scale parameters σ on both the hyper-latent z and the attention map A. Specifically, σ = f*σ(z, A), where f*σ is a small MLP.

**Training Objective:** L = R + λ·D + α·L_attn, where L_attn = ||A - sg(Â)||₂ is a self-consistency loss.

**Computational Cost:** SAM adds only 0.3% FLOPs to the base model.`,
},

demo: {
heading: "Interactive Demo",
text: "Drag the slider to compare our method (ANC) with the baseline codec at the same bitrate. Notice how ANC preserves fine details in textured regions while achieving better overall quality.",
videoUrl: null,
gifUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&q=80",
gifCaption: "Side-by-side comparison at 0.15 bpp on a Kodak test image.",
},

results: {
heading: "Key Results",
figures: [
{
image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
caption: "Rate-distortion curves on Kodak: ANC (ours) vs. baselines.",
},
{
image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
caption: "BD-rate savings across datasets and quality levels.",
},
],
findings: [
"12–18% BD-rate savings over Cheng2020 and STF on Kodak, CLIC, and Tecnick.",
"Attention maps correlate strongly (ρ = 0.87) with human perceptual saliency annotations.",
"Zero-shot generalization: models trained on 256×256 crops maintain gains on 2K resolution images.",
"Negligible latency overhead: < 2% increase in decode time compared to the base model.",
"Consistent improvements across all λ values, with larger gains at lower bitrates.",
],
},

summary: {
heading: "Summary & Impact",
text: `We have shown that adaptive, content-aware entropy coding is a simple yet powerful addition to neural image compression. By learning where to allocate bits, ANC achieves state-of-the-art rate-distortion performance with minimal computational overhead. Our approach is architecture-agnostic and can be integrated into any autoencoder-based codec.`,
highlights: [
"First learned method to match VVC's adaptive bit allocation without hand-crafted heuristics.",
"Open-source release with pre-trained models and a pip-installable library.",
"Potential applications in video streaming, satellite imaging, and medical imaging compression.",
],
},

bibtex: `@inproceedings{zhang2026adaptive,
  title     = {Adaptive Neural Compression via Learned Entropy Models},
  author    = {Zhang, Alice and Kumar, Bob and Chen, Carol and Park, David},
  booktitle = {Advances in Neural Information Processing Systems (NeurIPS)},
  year      = {2026},
  url       = {https://arxiv.org/abs/2025.00000}
}`,

footer: {
contactEmail: "alice.zhang@ucsd.edu",
githubLink: "https://github.com/example/adaptive-neural-compression",
citationNote: "If you find this work useful, please cite our paper using the BibTeX above.",
copyright: "© 2026 Zhang et al. · UC San Diego",
},
};

export default siteContent;
```

## `components/research/FadeInSection.jsx`

```jsx
import { useEffect, useRef, useState } from "react";

export default function FadeInSection({ children, className = "", delay = 0 }) {
const ref = useRef(null);
const [visible, setVisible] = useState(false);

useEffect(() => {
const observer = new IntersectionObserver(
([entry]) => {
if (entry.isIntersecting) {
setTimeout(() => setVisible(true), delay);
observer.unobserve(entry.target);
}
},
{ threshold: 0.12 }
);
if (ref.current) observer.observe(ref.current);
return () => observer.disconnect();
}, [delay]);

return (

<div
ref\_\_={ref}
className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`} >
{children}
</div>
);
}
```

## `components/research/ThemeToggle.jsx`

```jsx
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle({ dark, onToggle }) {
    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="fixed top-5 right-5 z-50 rounded-full backdrop-blur-md
                 bg-white/70 dark:bg-zinc-800/70
                 border border-zinc-200 dark:border-zinc-700
                 shadow-lg hover:scale-105 transition-transform"
        >
            {dark ? (
                <Sun className="h-5 w-5 text-amber-400" />
            ) : (
                <Moon className="h-5 w-5 text-slate-700" />
            )}
        </Button>
    );
}
```

## `components/research/HeroSection.jsx`

```jsx
import { FileText, Github, Play, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import FadeInSection from "./FadeInSection";

function AuthorChip({ name, affiliation, link }) {
    const inner = (
        <span className="inline-flex items-baseline gap-1">
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
                {name}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {affiliation}
            </span>
        </span>
    );
    if (link && link !== "#") {
        return (
            <a
                href__={link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline underline-offset-2 decoration-blue-400"
            >
                {inner}
            </a>
        );
    }
    return inner;
}

export default function HeroSection({ content }) {
    const scrollToBibtex = () =>
        document
            .getElementById("bibtex")
            ?.scrollIntoView({ behavior: "smooth" });

    return (
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-24">
            {/* Background decorative orb */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2
                      w-[600px] h-[600px] rounded-full
                      bg-blue-100/40 dark:bg-blue-900/20
                      blur-3xl pointer-events-none"
            />

            <div className="relative max-w-4xl mx-auto text-center px-6">
                {/* Venue badge */}
                <FadeInSection>
                    {content.venue && (
                        <span
                            className="inline-block mb-5 px-4 py-1.5 rounded-full
                             text-xs font-semibold tracking-wide uppercase
                             bg-blue-50 dark:bg-blue-950/60
                             text-blue-700 dark:text-blue-300
                             border border-blue-200 dark:border-blue-800"
                        >
                            {content.venue}
                        </span>
                    )}
                </FadeInSection>

                {/* Title */}
                <FadeInSection delay={80}>
                    <h1
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem]
                         font-extrabold leading-tight tracking-tight
                         text-zinc-900 dark:text-white"
                    >
                        {content.title}
                    </h1>
                </FadeInSection>

                {/* Tagline */}
                <FadeInSection delay={160}>
                    <p
                        className="mt-5 text-lg md:text-xl
                        text-zinc-500 dark:text-zinc-400
                        max-w-2xl mx-auto leading-relaxed"
                    >
                        {content.tagline}
                    </p>
                </FadeInSection>

                {/* Authors */}
                <FadeInSection delay={240}>
                    <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
                        {content.authors.map((a, i) => (
                            <span key={i} className="flex items-center gap-1">
                                <AuthorChip {...a} />
                                {i < content.authors.length - 1 && (
                                    <span className="text-zinc-300 dark:text-zinc-600 ml-3">
                                        ·
                                    </span>
                                )}
                            </span>
                        ))}
                    </div>
                </FadeInSection>

                {/* Buttons */}
                <FadeInSection delay={320}>
                    <div className="mt-9 flex flex-wrap justify-center gap-3">
                        <Button
                            asChild
                            className="bg-blue-700 hover:bg-blue-800 text-white shadow-md shadow-blue-700/20"
                        >
                            <a
                                href__={content.paperLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FileText className="mr-2 h-4 w-4" /> Paper
                            </a>
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                            className="border-zinc-300 dark:border-zinc-700"
                        >
                            <a
                                href__={content.codeLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Github className="mr-2 h-4 w-4" /> Code
                            </a>
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                            className="border-zinc-300 dark:border-zinc-700"
                        >
                            <a href__={content.demoLink}>
                                <Play className="mr-2 h-4 w-4" /> Demo
                            </a>
                        </Button>

                        <Button
                            variant="outline"
                            className="border-zinc-300 dark:border-zinc-700"
                            onClick={scrollToBibtex}
                        >
                            <Quote className="mr-2 h-4 w-4" /> BibTeX
                        </Button>
                    </div>
                </FadeInSection>

                {/* Teaser image */}
                {content.teaserImage && (
                    <FadeInSection delay={400}>
                        <div
                            className="mt-14 rounded-2xl overflow-hidden
                            border border-zinc-200 dark:border-zinc-800
                            shadow-xl shadow-zinc-200/50 dark:shadow-black/30"
                        >
                            <img
                                src={content.teaserImage}
                                alt="Teaser"
                                className="w-full object-cover max-h-[420px]"
                            />
                        </div>
                        {content.teaserCaption && (
                            <p
                                className="mt-3 text-xs text-zinc-400 dark:text-zinc-500
                            italic max-w-xl mx-auto"
                            >
                                {content.teaserCaption}
                            </p>
                        )}
                    </FadeInSection>
                )}
            </div>
        </section>
    );
}
```

## `components/research/AbstractSection.jsx`

```jsx
import FadeInSection from "./FadeInSection";

export default function AbstractSection({ text }) {
    return (
        <section className="py-16 md:py-20">
            <div className="max-w-3xl mx-auto px-6">
                <FadeInSection>
                    <div className="relative pl-5">
                        {/_ Left accent bar _/}
                        <div
                            className="absolute -left-0 top-0 bottom-0 w-1
                            rounded-full bg-blue-600 dark:bg-blue-500"
                        />
                        <h2
                            className="text-xs font-semibold uppercase tracking-widest
                           text-blue-600 dark:text-blue-400 mb-4"
                        >
                            Abstract
                        </h2>
                        <p
                            className="text-base md:text-lg leading-relaxed
                          text-zinc-700 dark:text-zinc-300"
                        >
                            {text}
                        </p>
                    </div>
                </FadeInSection>
            </div>
        </section>
    );
}
```

## `components/research/MotivationSection.jsx`

```jsx
import FadeInSection from "./FadeInSection";

export default function MotivationSection({ data }) {
    return (
        <section
            className="py-16 md:py-20
                        bg-zinc-50/60 dark:bg-zinc-900/40"
        >
            <div className="max-w-5xl mx-auto px-6">
                <FadeInSection>
                    <h2
                        className="text-2xl md:text-3xl font-bold
                         text-zinc-900 dark:text-white mb-3"
                    >
                        {data.heading}
                    </h2>
                    <div className="h-1 w-12 rounded-full bg-blue-600 mb-8" />
                </FadeInSection>

                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <FadeInSection delay={100}>
                        <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                            {data.text}
                        </p>
                    </FadeInSection>

                    {data.image && (
                        <FadeInSection delay={200}>
                            <div
                                className="rounded-xl overflow-hidden
                              border border-zinc-200 dark:border-zinc-800 shadow-lg"
                            >
                                <img
                                    src={data.image}
                                    alt={data.heading}
                                    className="w-full object-cover"
                                />
                            </div>
                            {data.imageCaption && (
                                <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500 italic">
                                    {data.imageCaption}
                                </p>
                            )}
                        </FadeInSection>
                    )}
                </div>
            </div>
        </section>
    );
}
```

## `components/research/MethodSection.jsx`

```jsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import FadeInSection from "./FadeInSection";

export default function MethodSection({ data }) {
    const [open, setOpen] = useState(false);

    return (
        <section className="py-16 md:py-20">
            <div className="max-w-5xl mx-auto px-6">
                <FadeInSection>
                    <h2
                        className="text-2xl md:text-3xl font-bold
                         text-zinc-900 dark:text-white mb-3"
                    >
                        {data.heading}
                    </h2>
                    <div className="h-1 w-12 rounded-full bg-blue-600 mb-8" />
                </FadeInSection>

                <FadeInSection delay={100}>
                    <p
                        className="text-base leading-relaxed
                        text-zinc-600 dark:text-zinc-400
                        max-w-3xl mb-10"
                    >
                        {data.text}
                    </p>
                </FadeInSection>

                {data.image && (
                    <FadeInSection delay={200}>
                        <div
                            className="rounded-xl overflow-hidden
                            border border-zinc-200 dark:border-zinc-800
                            shadow-lg mb-3"
                        >
                            <img
                                src={data.image}
                                alt={data.heading}
                                className="w-full object-cover max-h-[400px]"
                            />
                        </div>
                        {data.imageCaption && (
                            <p className="text-xs text-zinc-400 dark:text-zinc-500 italic mb-8">
                                {data.imageCaption}
                            </p>
                        )}
                    </FadeInSection>
                )}

                {data.technicalDetails && (
                    <FadeInSection delay={300}>
                        {/* Toggle button */}
                        <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center gap-2
                         text-sm font-medium
                         text-blue-600 dark:text-blue-400
                         hover:text-blue-700 dark:hover:text-blue-300
                         transition-colors mt-4"
                        >
                            <ChevronDown
                                className={`h-4 w-4 transition-transform duration-300
                            ${open ? "rotate-180" : ""}`}
                            />
                            {open ? "Hide" : "Show"} Technical Details
                        </button>

                        {/* Collapsible panel — CSS max-height trick */}
                        <div
                            className={`overflow-hidden transition-all duration-500 ease-in-out
                          ${
                              open
                                  ? "max-h-[2000px] opacity-100 mt-6"
                                  : "max-h-0 opacity-0 mt-0"
                          }`}
                        >
                            <div
                                className="bg-zinc-50 dark:bg-zinc-900/60
                              rounded-xl border border-zinc-200 dark:border-zinc-800
                              p-6 md:p-8"
                            >
                                <ReactMarkdown
                                    className="prose prose-sm dark:prose-invert max-w-none
                             prose-headings:text-zinc-800 dark:prose-headings:text-zinc-200
                             prose-p:text-zinc-600 dark:prose-p:text-zinc-400
                             prose-strong:text-zinc-700 dark:prose-strong:text-zinc-300"
                                >
                                    {data.technicalDetails}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </FadeInSection>
                )}
            </div>
        </section>
    );
}
```

## `components/research/DemoSection.jsx`

```jsx
import FadeInSection from "./FadeInSection";

export default function DemoSection({ data }) {
    return (
        <section
            id="demo"
            className="py-16 md:py-20
                                   bg-zinc-50/60 dark:bg-zinc-900/40"
        >
            <div className="max-w-5xl mx-auto px-6">
                <FadeInSection>
                    <h2
                        className="text-2xl md:text-3xl font-bold
                         text-zinc-900 dark:text-white mb-3"
                    >
                        {data.heading}
                    </h2>
                    <div className="h-1 w-12 rounded-full bg-blue-600 mb-6" />
                    <p
                        className="text-base text-zinc-600 dark:text-zinc-400
                        max-w-2xl mb-10 leading-relaxed"
                    >
                        {data.text}
                    </p>
                </FadeInSection>

                <FadeInSection delay={150}>
                    <div
                        className="rounded-xl overflow-hidden
                          border border-zinc-200 dark:border-zinc-800
                          shadow-xl bg-black"
                    >
                        {data.videoUrl ? (
                            /* Embedded video */
                            <div className="aspect-video">
                                <iframe
                                    src={data.videoUrl}
                                    className="w-full h-full"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    title="Demo video"
                                />
                            </div>
                        ) : data.gifUrl ? (
                            /* GIF or static image */
                            <img
                                src={data.gifUrl}
                                alt="Demo"
                                className="w-full object-cover max-h-[480px]"
                            />
                        ) : (
                            /* Empty placeholder */
                            <div
                                className="aspect-video flex items-center justify-center
                              bg-zinc-100 dark:bg-zinc-900"
                            >
                                <span className="text-zinc-400 dark:text-zinc-600 text-sm">
                                    Demo placeholder
                                </span>
                            </div>
                        )}
                    </div>
                    {data.gifCaption && (
                        <p className="mt-3 text-xs text-zinc-400 dark:text-zinc-500 italic">
                            {data.gifCaption}
                        </p>
                    )}
                </FadeInSection>
            </div>
        </section>
    );
}
```

## `components/research/ResultsSection.jsx`

```jsx
import { CheckCircle2 } from "lucide-react";
import FadeInSection from "./FadeInSection";

export default function ResultsSection({ data }) {
    return (
        <section className="py-16 md:py-20">
            <div className="max-w-5xl mx-auto px-6">
                <FadeInSection>
                    <h2
                        className="text-2xl md:text-3xl font-bold
                         text-zinc-900 dark:text-white mb-3"
                    >
                        {data.heading}
                    </h2>
                    <div className="h-1 w-12 rounded-full bg-blue-600 mb-10" />
                </FadeInSection>

                {/* Figure grid */}
                {data.figures?.length > 0 && (
                    <div className="grid sm:grid-cols-2 gap-6 mb-12">
                        {data.figures.map((fig, i) => (
                            <FadeInSection key={i} delay={i * 120}>
                                <div
                                    className="rounded-xl overflow-hidden
                                border border-zinc-200 dark:border-zinc-800 shadow-md"
                                >
                                    <img
                                        src={fig.image}
                                        alt={fig.caption}
                                        className="w-full object-cover h-56"
                                    />
                                </div>
                                {fig.caption && (
                                    <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500 italic">
                                        {fig.caption}
                                    </p>
                                )}
                            </FadeInSection>
                        ))}
                    </div>
                )}

                {/* Findings panel */}
                <FadeInSection delay={300}>
                    <div
                        className="bg-zinc-50 dark:bg-zinc-900/60
                          rounded-xl border border-zinc-200 dark:border-zinc-800
                          p-6 md:p-8"
                    >
                        <h3
                            className="text-xs font-semibold uppercase tracking-widest
                           text-blue-600 dark:text-blue-400 mb-5"
                        >
                            Key Findings
                        </h3>
                        <ul className="space-y-4">
                            {data.findings.map((finding, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle2
                                        className="h-5 w-5 text-blue-600 dark:text-blue-400
                                           mt-0.5 flex-shrink-0"
                                    />
                                    <span className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        {finding}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </FadeInSection>
            </div>
        </section>
    );
}
```

## `components/research/SummarySection.jsx`

```jsx
import { Sparkles } from "lucide-react";
import FadeInSection from "./FadeInSection";

export default function SummarySection({ data }) {
    return (
        <section
            className="py-16 md:py-20
                        bg-zinc-50/60 dark:bg-zinc-900/40"
        >
            <div className="max-w-3xl mx-auto px-6">
                <FadeInSection>
                    <h2
                        className="text-2xl md:text-3xl font-bold
                         text-zinc-900 dark:text-white mb-3"
                    >
                        {data.heading}
                    </h2>
                    <div className="h-1 w-12 rounded-full bg-blue-600 mb-8" />
                </FadeInSection>

                <FadeInSection delay={100}>
                    <p
                        className="text-base leading-relaxed
                        text-zinc-600 dark:text-zinc-400 mb-8"
                    >
                        {data.text}
                    </p>
                </FadeInSection>

                {data.highlights?.length > 0 && (
                    <FadeInSection delay={200}>
                        <div className="space-y-3">
                            {data.highlights.map((h, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-3
                             bg-white dark:bg-zinc-900
                             rounded-lg border border-zinc-200 dark:border-zinc-800
                             p-4 shadow-sm"
                                >
                                    <Sparkles
                                        className="h-4 w-4 text-blue-600 dark:text-blue-400
                                       mt-0.5 flex-shrink-0"
                                    />
                                    <span className="text-sm text-zinc-700 dark:text-zinc-300">
                                        {h}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </FadeInSection>
                )}
            </div>
        </section>
    );
}
```

## `components/research/BibtexSection.jsx`

```jsx
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import FadeInSection from "./FadeInSection";

export default function BibtexSection({ bibtex }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(bibtex);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="bibtex" className="py-16 md:py-20">
            <div className="max-w-3xl mx-auto px-6">
                <FadeInSection>
                    <h2
                        className="text-2xl md:text-3xl font-bold
                         text-zinc-900 dark:text-white mb-3"
                    >
                        Citation
                    </h2>
                    <div className="h-1 w-12 rounded-full bg-blue-600 mb-8" />
                </FadeInSection>

                <FadeInSection delay={100}>
                    {/* group enables hover-show of the copy button */}
                    <div className="relative group">
                        <pre
                            className="bg-zinc-900 dark:bg-zinc-950
                            text-zinc-300
                            rounded-xl p-6
                            text-xs md:text-sm leading-relaxed
                            overflow-x-auto
                            border border-zinc-800"
                        >
                            {bibtex}
                        </pre>

                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={handleCopy}
                            className="absolute top-3 right-3
                         opacity-0 group-hover:opacity-100
                         transition-opacity
                         bg-zinc-800 hover:bg-zinc-700
                         text-zinc-300 border-zinc-700"
                        >
                            {copied ? (
                                <>
                                    <Check className="mr-1 h-3.5 w-3.5 text-green-400" />{" "}
                                    Copied
                                </>
                            ) : (
                                <>
                                    <Copy className="mr-1 h-3.5 w-3.5" /> Copy
                                </>
                            )}
                        </Button>
                    </div>
                </FadeInSection>
            </div>
        </section>
    );
}
```

## `components/research/FooterSection.jsx`

```jsx
import { Github, Mail } from "lucide-react";
import FadeInSection from "./FadeInSection";

export default function FooterSection({ data }) {
    return (
        <footer className="py-12 border-t border-zinc-200 dark:border-zinc-800">
            <div className="max-w-4xl mx-auto px-6">
                <FadeInSection>
                    <div
                        className="flex flex-col sm:flex-row
                          items-center justify-between gap-4"
                    >
                        <p className="text-xs text-zinc-400 dark:text-zinc-500">
                            {data.citationNote}
                        </p>
                        <div className="flex items-center gap-4">
                            {data.contactEmail && (
                                <a
                                    href__={`mailto:${data.contactEmail}`}
                                    className="flex items-center gap-1.5
                             text-xs text-zinc-500 dark:text-zinc-400
                             hover:text-blue-600 dark:hover:text-blue-400
                             transition-colors"
                                >
                                    <Mail className="h-3.5 w-3.5" /> Contact
                                </a>
                            )}
                            {data.githubLink && (
                                <a
                                    href__={data.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5
                             text-xs text-zinc-500 dark:text-zinc-400
                             hover:text-blue-600 dark:hover:text-blue-400
                             transition-colors"
                                >
                                    <Github className="h-3.5 w-3.5" /> GitHub
                                </a>
                            )}
                        </div>
                    </div>

                    <p
                        className="mt-6 text-center text-[11px]
                        text-zinc-300 dark:text-zinc-700"
                    >
                        {data.copyright}
                    </p>
                </FadeInSection>
            </div>
        </footer>
    );
}
```

## `pages/Home.jsx`

```jsx
import { useState, useEffect } from "react";
import siteContent from "@/components/research/siteContent";
import ThemeToggle from "@/components/research/ThemeToggle";
import HeroSection from "@/components/research/HeroSection";
import AbstractSection from "@/components/research/AbstractSection";
import MotivationSection from "@/components/research/MotivationSection";
import MethodSection from "@/components/research/MethodSection";
import DemoSection from "@/components/research/DemoSection";
import ResultsSection from "@/components/research/ResultsSection";
import SummarySection from "@/components/research/SummarySection";
import BibtexSection from "@/components/research/BibtexSection";
import FooterSection from "@/components/research/FooterSection";

export default function Home() {
    const [dark, setDark] = useState(false);

    // Toggle the `dark` class on <html> — Tailwind dark: variants respond to this
    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
    }, [dark]);

    return (
        <div
            className={`min-h-screen transition-colors duration-300
                     ${dark ? "bg-zinc-950" : "bg-white"}`}
        >
            {/* Always-visible theme toggle */}
            <ThemeToggle dark={dark} onToggle={() => setDark(!dark)} />

            {/* 3px accent gradient line at the very top */}
            <div
                className="h-[3px] bg-gradient-to-r
                      from-blue-600 via-blue-500 to-indigo-500"
            />

            <HeroSection content={siteContent} />

            {/* Thin divider between hero and abstract */}
            <div className="max-w-5xl mx-auto px-6">
                <hr className="border-zinc-200 dark:border-zinc-800" />
            </div>

            <AbstractSection text={siteContent.abstract} />
            <MotivationSection data={siteContent.motivation} />
            <MethodSection data={siteContent.method} />
            <DemoSection data={siteContent.demo} />
            <ResultsSection data={siteContent.results} />
            <SummarySection data={siteContent.summary} />
            <BibtexSection bibtex={siteContent.bibtex} />
            <FooterSection data={siteContent.footer} />
        </div>
    );
}
```

## Notes

That's every file in full. To replicate: copy all 11 files exactly, install react-markdown and lucide-react, ensure Tailwind is configured with darkMode: 'class', then edit only siteContent.js for your own content.
