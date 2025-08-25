import { getActivities } from '../data';

async function testGetActivities() {
    const activities = await getActivities();
    console.log('Fetched Activities:', activities);
}

testGetActivities();
