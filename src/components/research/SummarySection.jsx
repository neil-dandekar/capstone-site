import { Sparkles } from "lucide-react";
import FadeInSection from "./FadeInSection";

export default function SummarySection({ data }) {
  return (
    <section className="py-16 md:py-20 bg-zinc-50/60 dark:bg-zinc-900/40">
      <div className="max-w-3xl mx-auto px-6">
        <FadeInSection>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-3">{data.heading}</h2>
          <div className="h-1 w-12 rounded-full bg-blue-600 mb-8" />
        </FadeInSection>

        <FadeInSection delay={100}>
          <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400 mb-8">{data.text}</p>
        </FadeInSection>

        {data.highlights?.length > 0 && (
          <FadeInSection delay={200}>
            <div className="space-y-3">
              {data.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm"
                >
                  <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">{highlight}</span>
                </div>
              ))}
            </div>
          </FadeInSection>
        )}
      </div>
    </section>
  );
}
