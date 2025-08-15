
import { Member, Event, BlogPost, GlossaryTerm } from './types';

const members: Member[] = [];
const events: Event[] = [];
const blogPosts: BlogPost[] = [];
const glossaryTerms: GlossaryTerm[] = [];

export async function getMembers(): Promise<Member[]> {
    return members;
}

export async function getUpcomingEvents(): Promise<Event[]> {
    const now = new Date();
    return events.filter(event => new Date(event.date) > now);
}

export async function getPastEvents(): Promise<Event[]> {
    const now = new Date();
    return events.filter(event => new Date(event.date) <= now);
}

export async function getEventById(id: string): Promise<Event | null> {
    return events.find(event => event.id === id) || null;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    return blogPosts;
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
    return blogPosts.find(post => post.id === id) || null;
}

export async function getGlossaryTerms(): Promise<GlossaryTerm[]> {
    return glossaryTerms;
}

export async function getFeaturedGlossaryTerms(): Promise<GlossaryTerm[]> {
    return glossaryTerms.filter(term => term.featured);
}

export async function getGlossaryTermsGroupedByCategory(): Promise<Record<string, GlossaryTerm[]>> {
    const grouped: Record<string, GlossaryTerm[]> = {};
    glossaryTerms.forEach(term => {
        if (!grouped[term.category]) {
            grouped[term.category] = [];
        }
        grouped[term.category].push(term);
    });
    return grouped;
}

export async function getGlossaryTermById(id: string): Promise<GlossaryTerm | null> {
    return glossaryTerms.find(term => term.id === id) || null;
}
