import { supabase } from './supabase';
import { Member, Event, BlogPost, GlossaryTerm, Activity } from './types';

// MEMBERS CRUD OPERATIONS
export const memberOperations = {
  // Create a new member
  async createMember(member: Omit<Member, 'id'>): Promise<Member | null> {
    try {
      const { data, error } = await supabase
        .from('members')
        .insert([member])
        .select()
        .single();
      
      if (error) {
        throw new Error('Error creating member: ' + error.message);
      }
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  // Read all members
  async getAllMembers(): Promise<Member[]> {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching members:', error);
      return [];
    }
    return data || [];
  },

  // Read member by ID
  async getMemberById(id: string): Promise<Member | null> {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching member:', error);
      return null;
    }
    return data;
  },

  // Update member
  async updateMember(id: string, updates: Partial<Member>): Promise<Member | null> {
    const { data, error } = await supabase
      .from('members')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating member:', error);
      return null;
    }
    return data;
  },

  // Delete member
  async deleteMember(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('members')
      .delete()
      .eq('id', id);
    
    return !error;
  }
};

// EVENTS CRUD OPERATIONS
export const eventOperations = {
  // Create a new event
  async createEvent(event: Omit<Event, 'id'>): Promise<Event | null> {
    const { data, error } = await supabase
      .from('events')
      .insert([event])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating event:', error);
      return null;
    }
    return data;
  },

  // Get all events
  async getAllEvents(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date');
    
    if (error) {
      console.error('Error fetching events:', error);
      return [];
    }
    return data || [];
  },

  // Get upcoming events
  async getUpcomingEvents(): Promise<Event[]> {
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
  },

  // Get past events
  async getPastEvents(): Promise<Event[]> {
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
  },

  // Get event by ID
  async getEventById(id: string): Promise<Event | null> {
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
  },

  // Update event
  async updateEvent(id: string, updates: Partial<Event>): Promise<Event | null> {
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating event:', error);
      return null;
    }
    return data;
  },

  // Delete event
  async deleteEvent(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);
    
    return !error;
  }
};

// BLOG POSTS CRUD OPERATIONS
export const blogOperations = {
  // Create a new blog post
  async createBlogPost(blogPost: Omit<BlogPost, 'id'>): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([blogPost])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating blog post:', error);
      return null;
    }
    return data;
  },

  // Get all blog posts
  async getAllBlogPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
    return data || [];
  },

  // Get blog post by ID
  async getBlogPostById(id: string): Promise<BlogPost | null> {
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
  },

  // Update blog post
  async updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating blog post:', error);
      return null;
    }
    return data;
  },

  // Delete blog post
  async deleteBlogPost(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);
    
    return !error;
  }
};

// GLOSSARY TERMS CRUD OPERATIONS
export const glossaryOperations = {
  // Create a new glossary term
  async createGlossaryTerm(term: Omit<GlossaryTerm, 'id'>): Promise<GlossaryTerm | null> {
    const { data, error } = await supabase
      .from('glossary_terms')
      .insert([term])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating glossary term:', error);
      return null;
    }
    return data;
  },

  // Get all glossary terms
  async getAllGlossaryTerms(): Promise<GlossaryTerm[]> {
    const { data, error } = await supabase
      .from('glossary_terms')
      .select('*')
      .order('term');
    
    if (error) {
      console.error('Error fetching glossary terms:', error);
      return [];
    }
    return data || [];
  },

  // Get featured glossary terms
  async getFeaturedGlossaryTerms(): Promise<GlossaryTerm[]> {
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
  },

  // Get glossary term by ID
  async getGlossaryTermById(id: string): Promise<GlossaryTerm | null> {
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
  },

  // Update glossary term
  async updateGlossaryTerm(id: string, updates: Partial<GlossaryTerm>): Promise<GlossaryTerm | null> {
    const { data, error } = await supabase
      .from('glossary_terms')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating glossary term:', error);
      return null;
    }
    return data;
  },

  // Delete glossary term
  async deleteGlossaryTerm(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('glossary_terms')
      .delete()
      .eq('id', id);
    
    return !error;
  }
};

// CONTACT MESSAGES CRUD OPERATIONS
export const contactOperations = {
  // Create a new contact message
  async createContactMessage(message: { name: string; email: string; phone?: string; message: string }): Promise<boolean> {
    const { error } = await supabase
      .from('contact_messages')
      .insert([message]);
    
    if (error) {
      console.error('Error creating contact message:', error);
      return false;
    }
    return true;
  },

  // Get all contact messages (admin only)
  async getAllContactMessages(): Promise<any[]> {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching contact messages:', error);
      return [];
    }
    return data || [];
  }
};

// ACTIVITY LOG OPERATIONS
export const activityOperations = {
  // Log an activity
  async logActivity(activity: Omit<Activity, 'id' | 'timestamp'>): Promise<void> {
    const { error } = await supabase
      .from('activities')
      .insert([{
        ...activity,
        timestamp: new Date().toISOString()
      }]);
    
    if (error) {
      console.error('Error logging activity:', error);
    }
  },

  // Get all activities
  async getAllActivities(): Promise<Activity[]> {
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
};
