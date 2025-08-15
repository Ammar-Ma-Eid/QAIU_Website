"use server"

import { revalidatePath } from 'next/cache';

export async function addMember() {
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Member added successfully' };
}

export async function updateMember() {
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Member updated successfully' };
}

export async function deleteMember(id: string) {
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Member deleted successfully' };
}

export async function addEvent() {
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Event added successfully' };
}

export async function updateEvent() {
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Event updated successfully' };
}

export async function deleteEvent(id: string) {
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Event deleted successfully' };
}

export async function addBlogPost() {
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Blog post added successfully' };
}

export async function updateBlogPost() {
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Blog post updated successfully' };
}

export async function deleteBlogPost(id: string) {
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Blog post deleted successfully' };
}

export async function addGlossaryTerm() {
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Glossary term added successfully' };
}

export async function updateGlossaryTerm() {
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Glossary term updated successfully' };
}

export async function deleteGlossaryTerm(id: string) {
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Glossary term deleted successfully' };
}
