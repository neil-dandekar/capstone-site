import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import FadeInSection from "./FadeInSection";

export default function BibtexSection({ bibtex }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(bibtex);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

    return (
        <section id="bibtex" className="py-16 md:py-20">
            <div className="max-w-3xl mx-auto px-6">
                <FadeInSection>
                    <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-3">
                        Citation
                    </h2>
                    <div className="h-1 w-12 rounded-full bg-blue-600 mb-8" />
                </FadeInSection>

                <FadeInSection delay={100}>
                    <div className="relative group">
                        <pre className="bg-zinc-900 dark:bg-zinc-950 text-zinc-300 rounded-xl p-6 text-xs md:text-sm leading-relaxed overflow-x-auto border border-zinc-800">
                            {bibtex}
                        </pre>

                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={handleCopy}
                            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700"
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
