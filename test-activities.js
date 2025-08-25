import { getActivities } from './src/lib/data.ts';

async function testGetActivities() {
    console.log('Testing getActivities function...');
    try {
        const activities = await getActivities();
        console.log('Fetched Activities:', activities);
        console.log('Number of activities:', activities.length);
        
        if (activities.length > 0) {
            console.log('Sample activity:', activities[0]);
        } else {
            console.log('No activities found in the database.');
        }
    } catch (error) {
        console.error('Error fetching activities:', error);
    }
}

testGetActivities();
