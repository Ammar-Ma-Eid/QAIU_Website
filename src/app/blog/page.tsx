import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getBlogPosts } from '@/lib/data';
import { User, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import Image from 'next/image';

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <div className="relative overflow-hidden">
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">Our Blog</h1>
          <p className="max-w-3xl mx-auto mt-4 text-lg text-muted-foreground">
            Insights, tutorials, and stories from the world of Quantum Computing.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id} className="group block">
              <Card className="flex flex-col bg-card/60 backdrop-blur-sm border-border/50 shadow-lg overflow-hidden h-full transition-all group-hover:border-primary/50 group-hover:shadow-xl">
                <div className="relative aspect-video">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    data-ai-hint={post.dataAiHint || 'blog post image'}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl leading-tight">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="flex-col items-start gap-4">
                  <div className="flex flex-wrap items-center justify-between text-sm text-muted-foreground w-full gap-2">
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>{format(new Date(post.date), 'PPP')}</span>
                    </div>
                  </div>
                  <div className="text-primary font-medium flex items-center transition-transform group-hover:translate-x-1 mt-auto pt-2">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
