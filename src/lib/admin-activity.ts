import { Activity } from './types';
import { addActivity as dbAddActivity, getActivities } from './data';

// Get recent activities
export async function getRecentActivities(): Promise<Activity[]> {
    return await getActivities();
}

// Add new activity
export async function addActivity(activity: Omit<Activity, 'id' | 'timestamp'>): Promise<void> {
    await dbAddActivity(activity);
}