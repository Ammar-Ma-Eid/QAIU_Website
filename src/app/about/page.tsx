import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getMembers } from '@/lib/data';
import type { Member } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Linkedin, Mail, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function AboutPage() {
  const members: Member[] = await getMembers();
  const supervisor = members.find(m => m.role === 'Supervisor');
  const president = members.find(m => m.role === 'President');
  const otherMembers = members.filter(m => m.role !== 'Supervisor' && m.role !== 'President');

  return (
    <div className="relative overflow-hidden">
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">About QAIU</h1>
          <p className="max-w-3xl mx-auto mt-4 text-lg text-muted-foreground">
            We are a passionate group of students at Alamein International University dedicated to exploring the vast potential of Quantum Computing.
          </p>
        </div>

        <section className="mb-20">
          <h2 className="font-headline text-3xl font-bold text-center mb-10">Our Host Institution</h2>
          <Card className="max-w-4xl mx-auto bg-card/60 backdrop-blur-sm border-border/50 shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 flex flex-col items-center justify-center bg-white p-8">
                <div className="relative h-60 w-96 mb-6">
                  <Image
                    src="/AIU_FULL_LOGO-removebg.png"
                    alt="Alamein International University Logo"
                    fill
                    className="object-contain"
                    data-ai-hint="university logo"
                  />
                </div>
              </div>
              <div className="md:w-1/2 relative min-h-[300px] md:min-h-0">
                <Image
                  src="/AIU campus.jpg"
                  alt="Alamein International University Campus"
                  fill
                  className="object-cover"
                  data-ai-hint="university campus"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                  <h3 className="font-headline text-2xl font-bold mb-2 text-white">Alamein International University</h3>
                  <div className="flex items-center text-white mb-6">
                    <MapPin className="mr-2 h-5 w-5 flex-shrink-0" />
                    <span>New Alamein, Matrouh, Egypt</span>
                  </div>
                  <Button asChild className="w-fit">
                    <a href="https://maps.app.goo.gl/twVSKZrs4wrepVcp7" target="_blank" rel="noopener noreferrer">
                      View on Google Maps
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-20">
          <h2 className="font-headline text-3xl font-bold text-center mb-10">Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {supervisor && (
              <Card className="bg-card/60 backdrop-blur-sm border-border/50 overflow-hidden text-center shadow-lg">
                <CardHeader>
                  <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-primary/20">
                    <Image src={supervisor.imageUrl} alt={supervisor.name} fill style={{ objectFit: 'cover' }} data-ai-hint={supervisor.dataAiHint} />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="font-headline text-2xl">{supervisor.name}</CardTitle>
                  <Badge variant="secondary" className="mt-2 text-base">{supervisor.role}</Badge>
                  <div className="flex justify-center gap-4 mt-4">
                    <a href={`mailto:${supervisor.email}`} className="text-muted-foreground hover:text-primary">
                      <span className="sr-only">Email</span>
                      <Mail className="h-5 w-5" />
                    </a>
                    <a href={supervisor.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                      <span className="sr-only">LinkedIn</span>
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            )}
            {president && (
              <Card className="bg-card/60 backdrop-blur-sm border-border/50 overflow-hidden text-center shadow-lg">
                <CardHeader>
                  <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-primary/20">
                    <Image src={president.imageUrl} alt={president.name} fill style={{ objectFit: 'cover' }} data-ai-hint={president.dataAiHint} />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="font-headline text-2xl">{president.name}</CardTitle>
                  <Badge variant="default" className="mt-2 text-base">{president.role}</Badge>
                  <div className="flex justify-center gap-4 mt-4">
                    <a href={`mailto:${president.email}`} className="text-muted-foreground hover:text-primary">
                      <span className="sr-only">Email</span>
                      <Mail className="h-5 w-5" />
                    </a>
                    <a href={president.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                      <span className="sr-only">LinkedIn</span>
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        <section>
          <h2 className="font-headline text-3xl font-bold text-center mb-10">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {otherMembers.map((member) => (
              <Card key={member.id} className="bg-card/60 backdrop-blur-sm border-border/50 overflow-hidden text-center pt-6 shadow-lg">
                <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-primary/20">
                  <Image src={member.imageUrl} alt={member.name} fill style={{ objectFit: 'cover' }} data-ai-hint={member.dataAiHint} />
                </div>
                <CardContent className="pt-4 px-2 pb-4">
                  <h3 className="font-headline text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                  <div className="flex justify-center gap-3 mt-2">
                    <a href={`mailto:${member.email}`} className="text-muted-foreground hover:text-primary">
                      <span className="sr-only">Email</span>
                      <Mail className="h-4 w-4" />
                    </a>
                    <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                      <span className="sr-only">LinkedIn</span>
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
