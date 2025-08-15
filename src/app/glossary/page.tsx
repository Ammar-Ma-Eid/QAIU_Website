import { getGlossaryTermsGroupedByCategory } from '@/lib/data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookMarked } from 'lucide-react';

export default async function GlossaryPage() {
  const groupedTerms = await getGlossaryTermsGroupedByCategory();
  const categories = Object.keys(groupedTerms).sort();

  return (
    <div className="bg-secondary">
        <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">Quantum Glossary</h1>
            <p className="max-w-3xl mx-auto mt-4 text-lg text-muted-foreground">
            A comprehensive guide to the essential terms and concepts in the world of quantum computing.
            </p>
        </div>

        {categories.length > 0 ? (
            <div className="max-w-4xl mx-auto space-y-8">
            {categories.map((category) => (
                <div key={category}>
                <h2 className="font-headline text-2xl font-bold mb-4 flex items-center">
                    <BookMarked className="h-6 w-6 mr-3 text-primary" />
                    {category}
                </h2>
                <Accordion type="single" collapsible className="w-full bg-card rounded-lg shadow-sm p-2">
                    {groupedTerms[category].map((term) => (
                    <AccordionItem key={term.id} value={term.id}>
                        <AccordionTrigger className="px-4 text-lg font-semibold hover:no-underline text-left">
                            {term.term}
                        </AccordionTrigger>
                        <AccordionContent className="px-4 text-base text-muted-foreground text-left">
                            {term.definition}
                        </AccordionContent>
                    </AccordionItem>
                    ))}
                </Accordion>
                </div>
            ))}
            </div>
        ) : (
            <div className="text-center py-16 text-muted-foreground bg-card/60 backdrop-blur-sm border-border/50 rounded-lg shadow-lg">
                <p>No glossary terms have been added yet. Please check back soon!</p>
            </div>
        )}
        </div>
    </div>
  );
}
