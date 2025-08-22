
import { Member, Event, BlogPost, GlossaryTerm, Activity } from './types';
import { supabase } from './supabase';

export async function getMembers(): Promise<Member[]> {
    const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('name');
    
    if (error) {
        console.error('Error fetching members:', error);
        return [];
    }
    
    return data || [];
}

export async function addMember(member: Omit<Member, 'id'>): Promise<Member | null> {
    const { data, error } = await supabase
        .from('members')
        .insert([member])
        .select()
        .single();
    
    if (error) {
        console.error('Error adding member:', error);
        return null;
    }
    
    return data;
}

export async function updateMember(id: string, member: Partial<Member>): Promise<Member | null> {
    const { data, error } = await supabase
        .from('members')
        .update(member)
        .eq('id', id)
        .select()
        .single();
    
    if (error) {
        console.error('Error updating member:', error);
        return null;
    }
    
    return data;
}

export async function deleteMemberById(id: string): Promise<boolean> {
    const { error } = await supabase
        .from('members')
        .delete()
        .eq('id', id);
    
    return !error;
}

export async function getUpcomingEvents(): Promise<Event[]> {
    const now = new Date().toISOString();
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('date', now)
        .order('date');
    
    if (error) {
        console.error('Error fetching upcoming events:', error);
        return [];
    }
    
    return data || [];
}

export async function getPastEvents(): Promise<Event[]> {
    const now = new Date().toISOString();
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .lt('date', now)
        .order('date', { ascending: false });
    
    if (error) {
        console.error('Error fetching past events:', error);
        return [];
    }
    
    return data || [];
}

export async function getEventById(id: string): Promise<Event | null> {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();
    
    if (error) {
        console.error('Error fetching event:', error);
        return null;
    }
    
    return data;
}

export async function addEvent(event: Omit<Event, 'id'>): Promise<Event | null> {
    const { data, error } = await supabase
        .from('events')
        .insert([event])
        .select()
        .single();
    
    if (error) {
        console.error('Error adding event:', error);
        return null;
    }
    
    return data;
}

export async function updateEvent(id: string, event: Partial<Event>): Promise<Event | null> {
    const { data, error } = await supabase
        .from('events')
        .update(event)
        .eq('id', id)
        .select()
        .single();
    
    if (error) {
        console.error('Error updating event:', error);
        return null;
    }
    
    return data;
}

export async function deleteEventById(id: string): Promise<boolean> {
    const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
    
    return !error;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false });
    
    if (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
    
    return data || [];
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();
    
    if (error) {
        console.error('Error fetching blog post:', error);
        return null;
    }
    
    return data;
}

export async function addBlogPost(blogPost: Omit<BlogPost, 'id'>): Promise<BlogPost | null> {
    const { data, error } = await supabase
        .from('blog_posts')
        .insert([blogPost])
        .select()
        .single();
    
    if (error) {
        console.error('Error adding blog post:', error);
        return null;
    }
    
    return data;
}

export async function updateBlogPost(id: string, blogPost: Partial<BlogPost>): Promise<BlogPost | null> {
    const { data, error } = await supabase
        .from('blog_posts')
        .update(blogPost)
        .eq('id', id)
        .select()
        .single();
    
    if (error) {
        console.error('Error updating blog post:', error);
        return null;
    }
    
    return data;
}

export async function deleteBlogPostById(id: string): Promise<boolean> {
    const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
    
    return !error;
}

export async function getGlossaryTerms(): Promise<GlossaryTerm[]> {
    const { data, error } = await supabase
        .from('glossary_terms')
        .select('*')
        .order('term');
    
    if (error) {
        console.error('Error fetching glossary terms:', error);
        return [];
    }
    
    return data || [];
}

export async function getFeaturedGlossaryTerms(): Promise<GlossaryTerm[]> {
    const { data, error } = await supabase
        .from('glossary_terms')
        .select('*')
        .eq('featured', true)
        .order('term');
    
    if (error) {
        console.error('Error fetching featured glossary terms:', error);
        return [];
    }
    
    return data || [];
}

export async function getGlossaryTermsGroupedByCategory(): Promise<Record<string, GlossaryTerm[]>> {
    const terms = await getGlossaryTerms();
    const grouped: Record<string, GlossaryTerm[]> = {};
    
    terms.forEach(term => {
        if (!grouped[term.category]) {
            grouped[term.category] = [];
        }
        grouped[term.category].push(term);
    });
    
    return grouped;
}

export async function getGlossaryTermById(id: string): Promise<GlossaryTerm | null> {
    const { data, error } = await supabase
        .from('glossary_terms')
        .select('*')
        .eq('id', id)
        .single();
    
    if (error) {
        console.error('Error fetching glossary term:', error);
        return null;
    }
    
    return data;
}

export async function addGlossaryTerm(term: Omit<GlossaryTerm, 'id'>): Promise<GlossaryTerm | null> {
    const { data, error } = await supabase
        .from('glossary_terms')
        .insert([term])
        .select()
        .single();
    
    if (error) {
        console.error('Error adding glossary term:', error);
        return null;
    }
    
    return data;
}

export async function updateGlossaryTerm(id: string, term: Partial<GlossaryTerm>): Promise<GlossaryTerm | null> {
    const { data, error } = await supabase
        .from('glossary_terms')
        .update(term)
        .eq('id', id)
        .select()
        .single();
    
    if (error) {
        console.error('Error updating glossary term:', error);
        return null;
    }
    
    return data;
}

export async function deleteGlossaryTermById(id: string): Promise<boolean> {
    const { error } = await supabase
        .from('glossary_terms')
        .delete()
        .eq('id', id);
    
    return !error;
}

// Activity log functions
export async function getActivities(): Promise<Activity[]> {
    const { data, error } = await supabase
        .from('activities')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(50);
    
    if (error) {
        console.error('Error fetching activities:', error);
        return [];
    }
    
    return data || [];
}

export async function addActivity(activity: Omit<Activity, 'id' | 'timestamp'>): Promise<void> {
    const { error } = await supabase
        .from('activities')
        .insert([{
            ...activity,
            timestamp: new Date().toISOString()
        }]);
    
    if (error) {
        console.error('Error adding activity:', error);
    }
}
