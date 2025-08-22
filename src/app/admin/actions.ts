
"use server"

import { revalidatePath } from 'next/cache';
import { addActivity } from '@/lib/admin-activity';

export async function addMember(data: any) {
    // In a real implementation, you would save to database here
    addActivity({
        action: 'created',
        entity: 'member',
        entityName: data.name,
        details: `Added new ${data.category} member with role: ${data.role}`
    });
    
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Member added successfully' };
}

export async function updateMember(id: string, data: any) {
    // In a real implementation, you would update database here
    addActivity({
        action: 'updated',
        entity: 'member',
        entityName: data.name,
        details: `Updated ${data.category} member with role: ${data.role}`
    });
    
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Member updated successfully' };
}

export async function deleteMember(id: string) {
    // In a real implementation, you would get member name from database
    addActivity({
        action: 'deleted',
        entity: 'member',
        entityName: 'Member',
        details: 'Deleted team member'
    });
    
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Member deleted successfully' };
}

export async function addEvent(data: any) {
    addActivity({
        action: 'created',
        entity: 'event',
        entityName: data.title,
        details: `Created new event for ${data.date}`
    });
    
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Event added successfully' };
}

export async function updateEvent(id: string, data: any) {
    addActivity({
        action: 'updated',
        entity: 'event',
        entityName: data.title,
        details: `Updated event scheduled for ${data.date}`
    });
    
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Event updated successfully' };
}

export async function deleteEvent(id: string) {
    addActivity({
        action: 'deleted',
        entity: 'event',
        entityName: 'Event',
        details: 'Deleted event'
    });
    
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Event deleted successfully' };
}

export async function addBlogPost(data: any) {
    addActivity({
        action: 'created',
        entity: 'blog',
        entityName: data.title,
        details: `Published new blog post by ${data.author}`
    });
    
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Blog post added successfully' };
}

export async function updateBlogPost(id: string, data: any) {
    addActivity({
        action: 'updated',
        entity: 'blog',
        entityName: data.title,
        details: `Updated blog post by ${data.author}`
    });
    
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Blog post updated successfully' };
}

export async function deleteBlogPost(id: string) {
    addActivity({
        action: 'deleted',
        entity: 'blog',
        entityName: 'Blog Post',
        details: 'Deleted blog post'
    });
    
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Blog post deleted successfully' };
}

export async function addGlossaryTerm(data: any) {
    addActivity({
        action: 'created',
        entity: 'glossary',
        entityName: data.term,
        details: `Added new ${data.category} term`
    });
    
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Glossary term added successfully' };
}

export async function updateGlossaryTerm(id: string, data: any) {
    addActivity({
        action: 'updated',
        entity: 'glossary',
        entityName: data.term,
        details: `Updated ${data.category} term definition`
    });
    
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Glossary term updated successfully' };
}

export async function deleteGlossaryTerm(id: string) {
    addActivity({
        action: 'deleted',
        entity: 'glossary',
        entityName: 'Term',
        details: 'Deleted glossary term'
    });
    
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Glossary term deleted successfully' };
}
