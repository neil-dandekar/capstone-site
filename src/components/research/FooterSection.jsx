import { Github, Mail } from "lucide-react";
import FadeInSection from "./FadeInSection";

export default function FooterSection({ data }) {
  return (
    <footer className="py-12 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-4xl mx-auto px-6">
        <FadeInSection>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-zinc-400 dark:text-zinc-500">{data.citationNote}</p>
            <div className="flex items-center gap-4">
              {data.contactEmail && (
                <a
                  href={`mailto:${data.contactEmail}`}
                  className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" /> Contact
                </a>
              )}
              {data.githubLink && (
                <a
                  href={data.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
              )}
            </div>
          </div>

          <p className="mt-6 text-center text-[11px] text-zinc-300 dark:text-zinc-700">{data.copyright}</p>
        </FadeInSection>
      </div>
    </footer>
  );
}
