import { getBlogPostById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Calendar, User } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';

type PageProps = {
  params: {
    id: string;
  };
};

export default async function BlogPostDetailPage({ params }: PageProps) {
  const post = await getBlogPostById(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span className="font-medium">{format(new Date(post.date), 'PPPP')}</span>
            </div>
          </div>
        </header>

        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg mb-12">
            <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                style={{ objectFit: 'cover' }}
                data-ai-hint={post.dataAiHint || 'blog post image'}
                priority
            />
        </div>

        <div className="text-lg text-foreground/90 leading-relaxed space-y-6">
            {post.content.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
        </div>
      </article>
    </div>
  );
}
