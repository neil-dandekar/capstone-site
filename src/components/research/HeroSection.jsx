import { FileText, Github, Play, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import FadeInSection from "./FadeInSection";

function getAuthorEmail(author) {
  if (typeof author.link === "string" && author.link.startsWith("mailto:")) {
    return author.link.replace("mailto:", "");
  }

  return author.affiliation || "N/A";
}

function AuthorChip({ name, affiliation, link }) {
  const email = getAuthorEmail({ affiliation, link });
  const inner = (
    <span className="flex flex-col items-center text-center leading-tight">
      <span className="font-medium text-zinc-900 dark:text-zinc-100">{name}</span>
      <span className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{email}</span>
    </span>
  );

  if (typeof link === "string" && link.length > 0 && link !== "#") {
    const isMailto = link.startsWith("mailto:");
    return (
      <a
        href={link}
        target={isMailto ? undefined : "_blank"}
        rel={isMailto ? undefined : "noopener noreferrer"}
        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        {inner}
      </a>
    );
  }

  return inner;
}

export default function HeroSection({ content }) {
  const effectiveToolLink = content.toolLink ?? content.demoLink;
  const effectivePaperLink = content.paperLink ?? content.paperPlaceholderLink ?? content.codeLink;
  const scrollToBibtex = () => {
    document.getElementById("bibtex")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-100/40 dark:bg-blue-900/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center px-6">
        <FadeInSection>
          {content.venue && (
            <span className="inline-block mb-5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              {content.venue}
            </span>
          )}
        </FadeInSection>

        <FadeInSection delay={80}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold leading-tight tracking-tight text-zinc-900 dark:text-white">
            {content.title}
          </h1>
        </FadeInSection>

        <FadeInSection delay={160}>
          <p className="mt-5 text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {content.tagline}
          </p>
        </FadeInSection>

        <FadeInSection delay={240}>
          <div className="mt-7 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm">
            {content.authors.map((author) => (
              <span key={author.name} className="flex items-center">
                <AuthorChip {...author} />
              </span>
            ))}
          </div>
        </FadeInSection>

        <FadeInSection delay={320}>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              variant="ghost"
              className="!bg-blue-700 hover:!bg-blue-800 !text-white dark:!text-white shadow-md shadow-blue-700/20"
            >
              <a href={effectiveToolLink} target="_blank" rel="noopener noreferrer">
                <Play className="mr-2 h-4 w-4" /> Tool
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              className="border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
            >
              <a href={content.codeLink} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> Code
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              className="border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
            >
              <a href={effectivePaperLink} target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" /> Paper
              </a>
            </Button>

            <Button
              variant="outline"
              className="border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
              onClick={scrollToBibtex}
            >
              <Quote className="mr-2 h-4 w-4" /> BibTeX
            </Button>
          </div>
        </FadeInSection>

        {content.teaserImage && (
          <FadeInSection delay={400}>
            <div className="mt-14 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-black/30">
              <img src={content.teaserImage} alt="Teaser" className="w-full object-cover max-h-[420px]" />
            </div>
            {content.teaserCaption && (
              <p className="mt-3 text-xs text-zinc-400 dark:text-zinc-500 italic max-w-xl mx-auto">
                {content.teaserCaption}
              </p>
            )}
          </FadeInSection>
        )}
      </div>
    </section>
  );
}
