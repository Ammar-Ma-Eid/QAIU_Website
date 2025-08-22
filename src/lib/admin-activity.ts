
import type { Activity } from './types';

// In-memory storage for activities (in production, this would be a database)
let activities: Activity[] = [];

export function addActivity(activity: Omit<Activity, 'id' | 'timestamp'>) {
  const newActivity: Activity = {
    ...activity,
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toISOString(),
  };
  
  activities.unshift(newActivity);
  
  // Keep only the last 50 activities
  if (activities.length > 50) {
    activities = activities.slice(0, 50);
  }
  
  return newActivity;
}

export function getActivities(): Activity[] {
  return activities;
}

export function clearActivities() {
  activities = [];
}
