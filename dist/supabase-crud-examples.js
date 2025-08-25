"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activityOperations = exports.contactOperations = exports.glossaryOperations = exports.blogOperations = exports.eventOperations = exports.memberOperations = void 0;
const supabase_1 = require("./supabase");
// MEMBERS CRUD OPERATIONS
exports.memberOperations = {
    // Create a new member
    async createMember(member) {
        try {
            const { data, error } = await supabase_1.supabase
                .from('members')
                .insert([member])
                .select()
                .single();
            if (error) {
                throw new Error('Error creating member: ' + error.message);
            }
            return data;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    },
    // Read all members
    async getAllMembers() {
        const { data, error } = await supabase_1.supabase
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
    async getMemberById(id) {
        const { data, error } = await supabase_1.supabase
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
    async updateMember(id, updates) {
        const { data, error } = await supabase_1.supabase
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
    async deleteMember(id) {
        const { error } = await supabase_1.supabase
            .from('members')
            .delete()
            .eq('id', id);
        return !error;
    }
};
// EVENTS CRUD OPERATIONS
exports.eventOperations = {
    // Create a new event
    async createEvent(event) {
        const { data, error } = await supabase_1.supabase
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
    async getAllEvents() {
        const { data, error } = await supabase_1.supabase
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
    async getUpcomingEvents() {
        const now = new Date().toISOString();
        const { data, error } = await supabase_1.supabase
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
    async getPastEvents() {
        const now = new Date().toISOString();
        const { data, error } = await supabase_1.supabase
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
    async getEventById(id) {
        const { data, error } = await supabase_1.supabase
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
    async updateEvent(id, updates) {
        const { data, error } = await supabase_1.supabase
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
    async deleteEvent(id) {
        const { error } = await supabase_1.supabase
            .from('events')
            .delete()
            .eq('id', id);
        return !error;
    }
};
// BLOG POSTS CRUD OPERATIONS
exports.blogOperations = {
    // Create a new blog post
    async createBlogPost(blogPost) {
        const { data, error } = await supabase_1.supabase
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
    async getAllBlogPosts() {
        const { data, error } = await supabase_1.supabase
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
    async getBlogPostById(id) {
        const { data, error } = await supabase_1.supabase
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
    async updateBlogPost(id, updates) {
        const { data, error } = await supabase_1.supabase
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
    async deleteBlogPost(id) {
        const { error } = await supabase_1.supabase
            .from('blog_posts')
            .delete()
            .eq('id', id);
        return !error;
    }
};
// GLOSSARY TERMS CRUD OPERATIONS
exports.glossaryOperations = {
    // Create a new glossary term
    async createGlossaryTerm(term) {
        const { data, error } = await supabase_1.supabase
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
    async getAllGlossaryTerms() {
        const { data, error } = await supabase_1.supabase
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
    async getFeaturedGlossaryTerms() {
        const { data, error } = await supabase_1.supabase
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
    async getGlossaryTermById(id) {
        const { data, error } = await supabase_1.supabase
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
    async updateGlossaryTerm(id, updates) {
        const { data, error } = await supabase_1.supabase
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
    async deleteGlossaryTerm(id) {
        const { error } = await supabase_1.supabase
            .from('glossary_terms')
            .delete()
            .eq('id', id);
        return !error;
    }
};
// CONTACT MESSAGES CRUD OPERATIONS
exports.contactOperations = {
    // Create a new contact message
    async createContactMessage(message) {
        const { error } = await supabase_1.supabase
            .from('contact_messages')
            .insert([message]);
        if (error) {
            console.error('Error creating contact message:', error);
            return false;
        }
        return true;
    },
    // Get all contact messages (admin only)
    async getAllContactMessages() {
        const { data, error } = await supabase_1.supabase
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
exports.activityOperations = {
    // Log an activity
    async logActivity(activity) {
        const { error } = await supabase_1.supabase
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
    async getAllActivities() {
        const { data, error } = await supabase_1.supabase
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
