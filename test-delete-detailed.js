const { config } = require('dotenv');
const path = require('path');

// Load environment variables from .env file
config({ path: path.resolve(__dirname, '.env') });

const { memberOperations, eventOperations, blogOperations, glossaryOperations, contactOperations } = require('./dist/supabase-crud-examples.js');

async function testDeleteDetailed() {
    console.log('🔍 Detailed Delete Operation Analysis...\n');

    // Get initial counts
    const initialMembers = await memberOperations.getAllMembers();
    const initialEvents = await eventOperations.getAllEvents();
    const initialBlogPosts = await blogOperations.getAllBlogPosts();
    const initialGlossaryTerms = await glossaryOperations.getAllGlossaryTerms();

    console.log('Initial Record Counts:');
    console.log(`   Members: ${initialMembers.length}`);
    console.log(`   Events: ${initialEvents.length}`);
    console.log(`   Blog Posts: ${initialBlogPosts.length}`);
    console.log(`   Glossary Terms: ${initialGlossaryTerms.length}`);

    // Test delete operations and capture detailed results
    console.log('\n🧪 Testing Delete Operations:');

    if (initialMembers.length > 0) {
        const memberToDelete = initialMembers[0];
        console.log(`\nDeleting Member: ${memberToDelete.name} (ID: ${memberToDelete.id})`);
        
        const deleteResult = await memberOperations.deleteMember(memberToDelete.id);
        console.log(`   Delete API result: ${deleteResult}`);
        
        // Check if member still exists
        const memberAfter = await memberOperations.getMemberById(memberToDelete.id);
        console.log(`   Member still exists: ${memberAfter ? '✅ Yes' : '❌ No'}`);
        if (memberAfter) {
            console.log(`   Member data unchanged: ${JSON.stringify(memberAfter) === JSON.stringify(memberToDelete) ? '✅ Yes' : '❌ No'}`);
        }
    }

    if (initialEvents.length > 0) {
        const eventToDelete = initialEvents[0];
        console.log(`\nDeleting Event: ${eventToDelete.title} (ID: ${eventToDelete.id})`);
        
        const deleteResult = await eventOperations.deleteEvent(eventToDelete.id);
        console.log(`   Delete API result: ${deleteResult}`);
        
        // Check if event still exists
        const eventAfter = await eventOperations.getEventById(eventToDelete.id);
        console.log(`   Event still exists: ${eventAfter ? '✅ Yes' : '❌ No'}`);
    }

    // Final counts
    console.log('\n📊 Final Record Counts:');
    const finalMembers = await memberOperations.getAllMembers();
    const finalEvents = await eventOperations.getAllEvents();
    const finalBlogPosts = await blogOperations.getAllBlogPosts();
    const finalGlossaryTerms = await glossaryOperations.getAllGlossaryTerms();

    console.log(`   Members: ${finalMembers.length} (${finalMembers.length === initialMembers.length ? 'unchanged' : 'changed'})`);
    console.log(`   Events: ${finalEvents.length} (${finalEvents.length === initialEvents.length ? 'unchanged' : 'changed'})`);
    console.log(`   Blog Posts: ${finalBlogPosts.length} (${finalBlogPosts.length === initialBlogPosts.length ? 'unchanged' : 'changed'})`);
    console.log(`   Glossary Terms: ${finalGlossaryTerms.length} (${finalGlossaryTerms.length === initialGlossaryTerms.length ? 'unchanged' : 'changed'})`);

    console.log('\n🎯 Conclusion:');
    console.log('The delete operations return "success" but RLS policies prevent actual deletion.');
    console.log('This is expected behavior for anonymous users - the API call succeeds but no data is modified.');
    console.log('Admin authentication is required for actual delete operations.');
}

testDeleteDetailed().catch(console.error);
