import FadeInSection from "./FadeInSection";

export default function DemoSection({ data }) {
  return (
    <section id="demo" className="py-16 md:py-20 bg-zinc-50/60 dark:bg-zinc-900/40">
      <div className="max-w-5xl mx-auto px-6">
        <FadeInSection>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-3">{data.heading}</h2>
          <div className="h-1 w-12 rounded-full bg-blue-600 mb-6" />
          <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mb-10 leading-relaxed">{data.text}</p>
        </FadeInSection>

        <FadeInSection delay={150}>
          <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl bg-black">
            {data.videoUrl ? (
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
              <img src={data.gifUrl} alt="Demo" className="w-full object-cover max-h-[480px]" />
            ) : (
              <div className="aspect-video flex items-center justify-center bg-zinc-100 dark:bg-zinc-900">
                <span className="text-zinc-400 dark:text-zinc-600 text-sm">Demo placeholder</span>
              </div>
            )}
          </div>
          {data.gifCaption && (
            <p className="mt-3 text-xs text-zinc-400 dark:text-zinc-500 italic">{data.gifCaption}</p>
          )}
        </FadeInSection>
      </div>
    </section>
  );
}
