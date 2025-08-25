import { memberOperations, eventOperations, blogOperations, glossaryOperations, contactOperations } from './src/lib/supabase-crud-examples.js';

async function testCRUDOperations() {
    // Test Member Operations
    console.log('Testing Member Operations...');
    const newMember = await memberOperations.createMember({
        name: 'John Doe',
        role: 'Developer',
        category: 'leader',
        imageUrl: 'https://example.com/image.jpg',
        email: 'john.doe@example.com',
        linkedinUrl: 'https://linkedin.com/in/johndoe'
    });
    console.log('Created Member:', newMember);

    const allMembers = await memberOperations.getAllMembers();
    console.log('All Members:', allMembers);

    if (newMember) {
        const updatedMember = await memberOperations.updateMember(newMember.id, { role: 'Senior Developer' });
        console.log('Updated Member:', updatedMember);

        const deleteSuccess = await memberOperations.deleteMember(newMember.id);
        console.log('Deleted Member:', deleteSuccess);
    }

    // Test Event Operations
    console.log('Testing Event Operations...');
    const newEvent = await eventOperations.createEvent({
        title: 'New Year Party',
        date: '2023-12-31T23:59:59Z',
        description: 'Celebrate the New Year with us!',
        imageUrl: 'https://example.com/event.jpg',
        location: 'City Hall',
        gallery: []
    });
    console.log('Created Event:', newEvent);

    const allEvents = await eventOperations.getAllEvents();
    console.log('All Events:', allEvents);

    if (newEvent) {
        const updatedEvent = await eventOperations.updateEvent(newEvent.id, { title: 'New Year Celebration' });
        console.log('Updated Event:', updatedEvent);

        const deleteSuccess = await eventOperations.deleteEvent(newEvent.id);
        console.log('Deleted Event:', deleteSuccess);
    }

    // Test Blog Post Operations
    console.log('Testing Blog Post Operations...');
    const newBlogPost = await blogOperations.createBlogPost({
        title: 'My First Blog Post',
        author: 'John Doe',
        date: new Date().toISOString(),
        excerpt: 'This is my first blog post.',
        content: 'Hello, world! This is my first blog post content.',
        imageUrl: 'https://example.com/blog.jpg'
    });
    console.log('Created Blog Post:', newBlogPost);

    const allBlogPosts = await blogOperations.getAllBlogPosts();
    console.log('All Blog Posts:', allBlogPosts);

    if (newBlogPost) {
        const updatedBlogPost = await blogOperations.updateBlogPost(newBlogPost.id, { title: 'Updated Blog Post Title' });
        console.log('Updated Blog Post:', updatedBlogPost);

        const deleteSuccess = await blogOperations.deleteBlogPost(newBlogPost.id);
        console.log('Deleted Blog Post:', deleteSuccess);
    }

    // Test Glossary Term Operations
    console.log('Testing Glossary Term Operations...');
    const newGlossaryTerm = await glossaryOperations.createGlossaryTerm({
        term: 'JavaScript',
        definition: 'A programming language commonly used in web development.',
        category: 'Programming',
        featured: true
    });
    console.log('Created Glossary Term:', newGlossaryTerm);

    const allGlossaryTerms = await glossaryOperations.getAllGlossaryTerms();
    console.log('All Glossary Terms:', allGlossaryTerms);

    if (newGlossaryTerm) {
        const updatedGlossaryTerm = await glossaryOperations.updateGlossaryTerm(newGlossaryTerm.id, { definition: 'A versatile programming language.' });
        console.log('Updated Glossary Term:', updatedGlossaryTerm);

        const deleteSuccess = await glossaryOperations.deleteGlossaryTerm(newGlossaryTerm.id);
        console.log('Deleted Glossary Term:', deleteSuccess);
    }

    // Test Contact Message Operations
    console.log('Testing Contact Message Operations...');
    const contactMessageSuccess = await contactOperations.createContactMessage({
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        phone: '123-456-7890',
        message: 'Hello, I would like to inquire about your services.'
    });
    console.log('Created Contact Message:', contactMessageSuccess);
}

testCRUDOperations();
