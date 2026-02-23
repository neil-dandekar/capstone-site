import { useEffect, useState } from "react";
import BibtexSection from "@/components/research/BibtexSection";
import FooterSection from "@/components/research/FooterSection";
import HeroSection from "@/components/research/HeroSection";
import MethodSection from "@/components/research/MethodSection";
import MotivationSection from "@/components/research/MotivationSection";
import ResultsSection from "@/components/research/ResultsSection";
import ThemeToggle from "@/components/research/ThemeToggle";
import siteContent from "@/config/siteContent";

export default function Home() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${dark ? "bg-zinc-950" : "bg-white"}`}>
      <ThemeToggle dark={dark} onToggle={() => setDark((value) => !value)} />

      <div className="h-[3px] bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500" />

      <HeroSection content={siteContent} />

      <div className="max-w-5xl mx-auto px-6">
        <hr className="border-zinc-200 dark:border-zinc-800" />
      </div>

      <MotivationSection data={siteContent.motivation} />
      <MethodSection data={siteContent.method} />
      <ResultsSection data={siteContent.results} />
      <BibtexSection bibtex={siteContent.bibtex} />
      <FooterSection data={siteContent.footer} />
    </div>
  );
}
