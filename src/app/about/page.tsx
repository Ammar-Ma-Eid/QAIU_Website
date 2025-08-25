import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getMembers } from '@/lib/data';
import type { Member } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Linkedin, Mail, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function AboutPage() {
  const members: Member[] = await getMembers();
  const leaders = members.filter(m => m.category === 'leader');
  const boardMembers = members.filter(m => m.category === 'board');

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
          <div className="max-w-4xl mx-auto text-center mb-10">
            <p className="text-lg text-muted-foreground mb-6">
              We are the QAIU Community, quantum computing student club at Alamein International University (AIU) and a student Sub-branch of QEGYPT, a Qcousin of QWORLD.
            </p>
            <p className="text-lg text-muted-foreground">
              As part of the QEgypt and QWorld network, we are a group of passionate students driving quantum awareness and innovation
            </p>
          </div>

          <h2 className="font-headline text-3xl font-bold text-center mb-10">Vision and Mission</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="bg-card/60 backdrop-blur-sm border-border/50 shadow-lg overflow-hidden">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  To establish the Quantum Community at Alamein International University as a leading platform for knowledge exchange and innovation in the field of quantum science, contributing to the development of students' research and scientific capabilities, and strengthening ties between the university and Quantum institutions.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/60 backdrop-blur-sm border-border/50 shadow-lg overflow-hidden">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
                  <li>Promoting Scientific Awareness: Delivering outstanding scientific and educational content in the field of quantum science through lectures, hands-on workshops, and seminars.</li>
                  <li>Encouraging Research and Innovation: Supporting and motivating students to engage in research and practical experiences in quantum science through collaboration with academic staff and experts.</li>
                  <li>Building a Network: Establishing partnerships with local and international academic and research institutions to enhance training and development opportunities.</li>
                  <li>Developing Skills: Organizing events and competitions that inspire creativity and help students develop their scientific and practical skills.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

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
                  />
                </div>
              </div>
              <div className="md:w-1/2 relative min-h-[300px] md:min-h-0">
                <Image
                  src="/AIU campus.jpg"
                    alt="Alamein International University Campus"
                    fill
                    className="object-cover"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-4xl mx-auto">
            {leaders.map((leader) => (
              <Card key={leader.id} className="bg-card/60 backdrop-blur-sm border-border/50 overflow-hidden text-center shadow-lg max-w-md mx-auto">
                <CardHeader>
                  <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-primary/20">
                    <Image src={leader.imageUrl} alt={leader.name} fill sizes="120px" style={{ objectFit: 'cover' }} />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="font-headline text-1">{leader.name}</CardTitle>
                  <Badge variant="default" className="mt-2 text-base">{leader.role}</Badge>
                  <div className="flex justify-center gap-1 mt-1">
                    <a href={`mailto:${leader.email}`} className="text-muted-foreground hover:text-primary">
                      <span className="sr-only">Email</span>
                      <Mail className="h-5 w-5" />
                    </a>
                    <a href={leader.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                      <span className="sr-only">LinkedIn</span>
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-headline text-3xl font-bold text-center mb-10">Our Board</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {boardMembers.map((member) => (
              <Card key={member.id} className="bg-card/60 backdrop-blur-sm border-border/50 overflow-hidden text-center pt-6 shadow-lg max-w-md">
                <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-primary/20">
                  <Image src={member.imageUrl} alt={member.name} fill style={{ objectFit: 'cover' }} />
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
