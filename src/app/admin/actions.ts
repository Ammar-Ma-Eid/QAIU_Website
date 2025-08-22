
"use server"

import { revalidatePath } from 'next/cache';
import { 
    addMember as dbAddMember, 
    updateMember as dbUpdateMember, 
    deleteMemberById,
    addEvent as dbAddEvent,
    updateEvent as dbUpdateEvent, 
    deleteEventById,
    addBlogPost as dbAddBlogPost,
    updateBlogPost as dbUpdateBlogPost,
    deleteBlogPostById,
    addGlossaryTerm as dbAddGlossaryTerm,
    updateGlossaryTerm as dbUpdateGlossaryTerm,
    deleteGlossaryTermById,
    addActivity
} from '@/lib/data';

export async function addMember(data: any) {
    try {
        const member = await dbAddMember({
            name: data.name,
            role: data.role,
            category: data.category,
            imageUrl: data.imageUrl || '/logo.png',
            dataAiHint: data.dataAiHint || '',
            email: data.email,
            linkedinUrl: data.linkedinUrl || ''
        });
        
        if (member) {
            await addActivity({
                action: 'created',
                entity: 'member',
                entityName: data.name,
                details: `Added new ${data.category} member with role: ${data.role}`
            });
            
            revalidatePath('/admin/dashboard');
            return { success: true, message: 'Member added successfully' };
        }
        
        return { success: false, message: 'Failed to add member' };
    } catch (error) {
        console.error('Error adding member:', error);
        return { success: false, message: 'Error adding member' };
    }
}

export async function updateMember(id: string, data: any) {
    try {
        const member = await dbUpdateMember(id, data);
        
        if (member) {
            await addActivity({
                action: 'updated',
                entity: 'member',
                entityName: data.name,
                details: `Updated ${data.category} member with role: ${data.role}`
            });
            
            revalidatePath('/admin/dashboard');
            return { success: true, message: 'Member updated successfully' };
        }
        
        return { success: false, message: 'Failed to update member' };
    } catch (error) {
        console.error('Error updating member:', error);
        return { success: false, message: 'Error updating member' };
    }
}

export async function deleteMember(id: string) {
    try {
        const success = await deleteMemberById(id);
        
        if (success) {
            await addActivity({
                action: 'deleted',
                entity: 'member',
                entityName: 'Member',
                details: 'Deleted team member'
            });
            
            revalidatePath('/admin/dashboard');
            return { success: true, message: 'Member deleted successfully' };
        }
        
        return { success: false, message: 'Failed to delete member' };
    } catch (error) {
        console.error('Error deleting member:', error);
        return { success: false, message: 'Error deleting member' };
    }
}

export async function addEvent(data: any) {
    try {
        const event = await dbAddEvent({
            title: data.title,
            date: data.date,
            description: data.description,
            imageUrl: data.imageUrl || '/logo.png',
            dataAiHint: data.dataAiHint || '',
            location: data.location,
            gallery: data.gallery || []
        });
        
        if (event) {
            await addActivity({
                action: 'created',
                entity: 'event',
                entityName: data.title,
                details: `Created new event for ${data.date}`
            });
            
            revalidatePath('/admin/dashboard');
            return { success: true, message: 'Event added successfully' };
        }
        
        return { success: false, message: 'Failed to add event' };
    } catch (error) {
        console.error('Error adding event:', error);
        return { success: false, message: 'Error adding event' };
    }
}

export async function updateEvent(id: string, data: any) {
    try {
        const event = await dbUpdateEvent(id, data);
        
        if (event) {
            await addActivity({
                action: 'updated',
                entity: 'event',
                entityName: data.title,
                details: `Updated event scheduled for ${data.date}`
            });
            
            revalidatePath('/admin/dashboard');
            return { success: true, message: 'Event updated successfully' };
        }
        
        return { success: false, message: 'Failed to update event' };
    } catch (error) {
        console.error('Error updating event:', error);
        return { success: false, message: 'Error updating event' };
    }
}

export async function deleteEvent(id: string) {
    try {
        const success = await deleteEventById(id);
        
        if (success) {
            await addActivity({
                action: 'deleted',
                entity: 'event',
                entityName: 'Event',
                details: 'Deleted event'
            });
            
            revalidatePath('/admin/dashboard');
            return { success: true, message: 'Event deleted successfully' };
        }
        
        return { success: false, message: 'Failed to delete event' };
    } catch (error) {
        console.error('Error deleting event:', error);
        return { success: false, message: 'Error deleting event' };
    }
}

export async function addBlogPost(data: any) {
    try {
        const blogPost = await dbAddBlogPost({
            title: data.title,
            author: data.author,
            date: data.date,
            excerpt: data.excerpt,
            content: data.content,
            imageUrl: data.imageUrl || '/logo.png',
            dataAiHint: data.dataAiHint || ''
        });
        
        if (blogPost) {
            await addActivity({
                action: 'created',
                entity: 'blog',
                entityName: data.title,
                details: `Published new blog post by ${data.author}`
            });
            
            revalidatePath('/admin/dashboard');
            return { success: true, message: 'Blog post added successfully' };
        }
        
        return { success: false, message: 'Failed to add blog post' };
    } catch (error) {
        console.error('Error adding blog post:', error);
        return { success: false, message: 'Error adding blog post' };
    }
}

export async function updateBlogPost(id: string, data: any) {
    try {
        const blogPost = await dbUpdateBlogPost(id, data);
        
        if (blogPost) {
            await addActivity({
                action: 'updated',
                entity: 'blog',
                entityName: data.title,
                details: `Updated blog post by ${data.author}`
            });
            
            revalidatePath('/admin/dashboard');
            return { success: true, message: 'Blog post updated successfully' };
        }
        
        return { success: false, message: 'Failed to update blog post' };
    } catch (error) {
        console.error('Error updating blog post:', error);
        return { success: false, message: 'Error updating blog post' };
    }
}

export async function deleteBlogPost(id: string) {
    try {
        const success = await deleteBlogPostById(id);
        
        if (success) {
            await addActivity({
                action: 'deleted',
                entity: 'blog',
                entityName: 'Blog Post',
                details: 'Deleted blog post'
            });
            
            revalidatePath('/admin/dashboard');
            return { success: true, message: 'Blog post deleted successfully' };
        }
        
        return { success: false, message: 'Failed to delete blog post' };
    } catch (error) {
        console.error('Error deleting blog post:', error);
        return { success: false, message: 'Error deleting blog post' };
    }
}

export async function addGlossaryTerm(data: any) {
    try {
        const term = await dbAddGlossaryTerm({
            term: data.term,
            definition: data.definition,
            category: data.category,
            featured: data.featured || false,
            icon: data.icon || ''
        });
        
        if (term) {
            await addActivity({
                action: 'created',
                entity: 'glossary',
                entityName: data.term,
                details: `Added new glossary term in category: ${data.category}`
            });
            
            revalidatePath('/admin/dashboard');
            return { success: true, message: 'Glossary term added successfully' };
        }
        
        return { success: false, message: 'Failed to add glossary term' };
    } catch (error) {
        console.error('Error adding glossary term:', error);
        return { success: false, message: 'Error adding glossary term' };
    }
}

export async function updateGlossaryTerm(id: string, data: any) {
    try {
        const term = await dbUpdateGlossaryTerm(id, data);
        
        if (term) {
            await addActivity({
                action: 'updated',
                entity: 'glossary',
                entityName: data.term,
                details: `Updated glossary term in category: ${data.category}`
            });
            
            revalidatePath('/admin/dashboard');
            return { success: true, message: 'Glossary term updated successfully' };
        }
        
        return { success: false, message: 'Failed to update glossary term' };
    } catch (error) {
        console.error('Error updating glossary term:', error);
        return { success: false, message: 'Error updating glossary term' };
    }
}

export async function deleteGlossaryTerm(id: string) {
    try {
        const success = await deleteGlossaryTermById(id);
        
        if (success) {
            await addActivity({
                action: 'deleted',
                entity: 'glossary',
                entityName: 'Glossary Term',
                details: 'Deleted glossary term'
            });
            
            revalidatePath('/admin/dashboard');
            return { success: true, message: 'Glossary term deleted successfully' };
        }
        
        return { success: false, message: 'Failed to delete glossary term' };
    } catch (error) {
        console.error('Error deleting glossary term:', error);
        return { success: false, message: 'Error deleting glossary term' };
    }
}
