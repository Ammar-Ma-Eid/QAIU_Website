const { memberOperations, eventOperations, blogOperations, glossaryOperations, contactOperations } = require('./dist/supabase-crud-examples.js');

async function testPublicCRUDOperations() {
    console.log('Testing Public CRUD Operations (read-only and contact form)...');

    // Test reading operations (public access)
    console.log('\n1. Testing Read Operations...');
    
    const allMembers = await memberOperations.getAllMembers();
    console.log('All Members:', allMembers.length, 'members found');

    const allEvents = await eventOperations.getAllEvents();
    console.log('All Events:', allEvents.length, 'events found');

    const allBlogPosts = await blogOperations.getAllBlogPosts();
    console.log('All Blog Posts:', allBlogPosts.length, 'posts found');

    const allGlossaryTerms = await glossaryOperations.getAllGlossaryTerms();
    console.log('All Glossary Terms:', allGlossaryTerms.length, 'terms found');

    // Test contact form (public insert access)
    console.log('\n2. Testing Contact Form Operation...');
    const contactMessageSuccess = await contactOperations.createContactMessage({
        name: 'Test User',
        email: 'test@example.com',
        phone: '123-456-7890',
        message: 'This is a test message from the public CRUD test.'
    });
    console.log('Contact Message Created:', contactMessageSuccess ? '✅ Success' : '❌ Failed');

    console.log('\n3. Testing Individual Read Operations...');
    
    if (allMembers.length > 0) {
        const firstMember = await memberOperations.getMemberById(allMembers[0].id);
        console.log('First Member:', firstMember ? '✅ Found' : '❌ Not found');
    }

    if (allEvents.length > 0) {
        const firstEvent = await eventOperations.getEventById(allEvents[0].id);
        console.log('First Event:', firstEvent ? '✅ Found' : '❌ Not found');
    }

    console.log('\n✅ Public CRUD operations test completed!');
    console.log('Note: Write operations (create, update, delete) require admin authentication.');
    console.log('The contact form is the only public write operation available.');
}

testPublicCRUDOperations();
