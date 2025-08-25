import { Button } from '@/components/ui/button';
import { ArrowRight, BrainCircuit, CheckCircle, Calendar, FlaskConical, Code } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import bgCut from '../../bg_cut.jpg';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { getUpcomingEvents, getFeaturedGlossaryTerms } from '@/lib/data';
import { format } from 'date-fns';
import { ContactForm } from '@/components/contact-form';
import DynamicIcon from '@/components/dynamic-icon';

import type { Event, GlossaryTerm } from '@/lib/types';

export default async function Home() {
  // Handle potential errors when fetching data
  let upcomingEvents: Event[] = [];
  let featuredGlossaryTerms: GlossaryTerm[] = [];
  
  try {
    [upcomingEvents, featuredGlossaryTerms] = await Promise.all([
      getUpcomingEvents(),
      getFeaturedGlossaryTerms()
    ]);
  } catch (error) {
    console.error('Error fetching data for homepage:', error);
    // Continue with empty arrays
  }

  const quantumJobs = [
    {
      title: 'Quantum Research Scientist',
      description: 'Design and conduct experiments on quantum systems. Develop novel quantum algorithms and contribute to foundational quantum theory. Requires a PhD in Physics or a related field.',
      icon: FlaskConical,
    },
    {
      title: 'Quantum Software Engineer',
      description: 'Build software tools and platforms to control quantum hardware. Implement quantum algorithms on simulators and real devices, and optimize for performance and error correction.',
      icon: Code,
    },
    {
      title: 'Quantum Machine Learning Specialist',
      description: 'Explore the intersection of quantum computing and AI. Develop quantum machine learning models to solve problems in optimization, classification, and generative modeling.',
      icon: BrainCircuit,
    },
  ];

  const quantumApplications = [
    { title: 'Cryptography', description: 'Breaking or creating ultra-secure encryption' },
    { title: 'Drug discovery', description: 'Simulating molecules to speed up medicine development' },
    { title: 'Optimization', description: 'Solving complex problems in logistics, finance, and engineering' },
    { title: 'Artificial Intelligence', description: 'Speeding up machine learning algorithms' },
    { title: 'Material science', description: 'Designing new materials at the atomic level' },
    { title: 'Weather forecasting', description: 'Improving climate and weather prediction accuracy' },
    { title: 'Financial modeling', description: 'Analyzing risk and markets more effectively' },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <section className="relative min-h-[100vh] flex items-center justify-center w-full">
        <div className="relative z-10 w-full max-w-5xl px-4 py-20 md:py-32 text-center flex flex-col items-center justify-center">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4">
            Quantum computing at <span className="text-primary">Alamein International University</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
            Exploring the world of quantum computing to pioneer the next wave of technological innovation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/about">
                Learn More <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/events">
                Upcoming Events
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="relative container mx-auto px-4 pb-20 md:pb-32">
        <div className="text-center mb-16">
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tighter">Upcoming Events</h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
            Join our workshops, seminars, and hackathons.
          </p>
        </div>
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.slice(0, 3).map((event) => (
              <Link href={`/events/${event.id}`} key={event.id} className="group block">
                <Card className="flex flex-col bg-card/60 backdrop-blur-sm border-border/50 shadow-lg overflow-hidden h-full transition-all group-hover:border-primary/50 group-hover:shadow-xl">
                  <div className="relative aspect-video">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover"
                      data-ai-hint={event.dataAiHint || 'event image'}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl leading-tight">{event.title}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground pt-2">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>{format(new Date(event.date), 'PPP')}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground line-clamp-2">{event.description}</p>
                  </CardContent>
                  <CardFooter>
                    <div className="text-primary font-medium flex items-center transition-transform group-hover:translate-x-1 mt-auto pt-2">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground bg-card/60 backdrop-blur-sm border-border/50 rounded-lg shadow-lg">
            <p>No upcoming events scheduled. Please check back soon!</p>
          </div>
        )}
        <div className="text-center mt-12">
          <Button asChild>
            <Link href="/events">View All Events <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {featuredGlossaryTerms.length > 0 && (
        <section className="relative container mx-auto px-4 pb-20 md:pb-32">
          <div className="text-center mb-16">
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tighter">Quantum Concepts</h2>
            <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
              A brief introduction to key terms in quantum computing.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredGlossaryTerms.map((term) => (
              <Card key={term.id} className="bg-card/60 backdrop-blur-sm border-border/50 shadow-lg p-6 flex flex-col items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <DynamicIcon name={term.icon} className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-headline text-xl font-bold mb-2">{term.term}</h3>
                <p className="text-muted-foreground flex-grow">{term.definition.substring(0, 100)}...</p>
                <Button variant="link" asChild className="mt-4">
                  <Link href="/glossary">Learn More</Link>
                </Button>
              </Card>
            ))}
          </div>
        </section>
      )}

      <section className="relative container mx-auto px-4 pb-20 md:pb-32">
        <div className="text-center mb-16">
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tighter">Careers in Quantum</h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
            Explore high-demand roles at the forefront of the quantum revolution.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {quantumJobs.map((job, index) => (
            <div key={index} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-800 to-sky-500 rounded-lg blur-lg opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <Card className="relative flex flex-col bg-card/80 backdrop-blur-sm shadow-lg overflow-hidden h-full p-1">
                <div className="absolute inset-0 opacity-10 bg-[url(/grid.svg)] [background-position:10px_10px]"></div>
                <CardHeader className="relative">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <job.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-xl leading-tight">{job.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow relative">
                  <p className="text-muted-foreground">{job.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>


      <section className="bg-foreground text-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="font-headline text-3xl font-bold mb-6">What is Quantum Computing?</h2>
              <p className="text-lg text-background/80 leading-relaxed">
                Quantum computing uses the principles of quantum mechanics to process information. Unlike regular computers that use bits (0 or 1), quantum computers use qubits, which can be 0 and 1 at the same time (superposition). They also use entanglement, linking qubits together in powerful ways. This allows quantum computers to solve certain complex problems much faster than classical computers, although they are still mostly experimental today.
              </p>
            </div>
            <div>
              <h2 className="font-headline text-3xl font-bold mb-6">Quantum Applications</h2>
              <ul className="space-y-4">
                {quantumApplications.map((app) => (
                  <li key={app.title} className="flex items-start">
                    <CheckCircle className="h-6 w-6 mr-3 mt-1 text-primary flex-shrink-0" />
                    <div>
                      <strong className="text-background">{app.title}:</strong>
                      <span className="text-background/80 ml-2">{app.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-transparent">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tighter">Get In Touch</h2>
            <p className="max-w-3xl mx-auto mt-4 text-lg text-muted-foreground">
              We are here to help you with any questions or inquiries you may have. Please feel free to reach out to us using the contact form below, and we will get back to you as soon as possible.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto mt-12 bg-card shadow-lg">
            <CardContent className="p-8">
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
