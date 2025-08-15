import { getEventById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';

type PageProps = {
  params: {
    id: string;
  };
};

export default async function EventDetailPage({ params }: PageProps) {
  const event = await getEventById(params.id);

  if (!event) {
    notFound();
  }

  const isPast = new Date(event.date) < new Date();

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <article className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter mb-4">{event.title}</h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span className="font-medium">{format(new Date(event.date), 'PPPP p')}</span>
            </div>
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span className="font-medium">{event.location}</span>
              </div>
            )}
            {isPast && <Badge variant="secondary">Past Event</Badge>}
          </div>
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg mb-8">
            <Image 
              src={event.imageUrl} 
              alt={event.title} 
              fill 
              style={{ objectFit: 'cover' }} 
              data-ai-hint={event.dataAiHint || 'event image'}
              priority
            />
          </div>
          <div className="text-lg text-foreground/90 leading-relaxed space-y-6">
            <p>{event.description}</p>
          </div>
        </div>

        {event.gallery && event.gallery.length > 0 && (
          <div>
            <h2 className="font-headline text-3xl font-bold mb-6">Event Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {event.gallery.map((photo, index) => (
                <Card key={index} className="overflow-hidden group border-border/50 shadow-lg">
                    <div className="relative aspect-video">
                      <Image 
                        src={photo.src} 
                        alt={photo.alt} 
                        fill 
                        style={{objectFit: 'cover'}} 
                        data-ai-hint={photo.dataAiHint}
                        className="transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
