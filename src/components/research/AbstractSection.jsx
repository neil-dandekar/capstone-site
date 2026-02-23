import FadeInSection from "./FadeInSection";

export default function AbstractSection({ text }) {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-6">
        <FadeInSection>
          <div className="relative pl-5">
            <div className="absolute -left-0 top-0 bottom-0 w-1 rounded-full bg-blue-600 dark:bg-blue-500" />
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">
              Abstract
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">{text}</p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
