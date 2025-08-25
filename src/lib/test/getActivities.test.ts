import { getActivities } from '../data';

describe('getActivities', () => {
    it('should fetch activities successfully', async () => {
        const activities = await getActivities();
        expect(Array.isArray(activities)).toBe(true);
        expect(activities.length).toBeGreaterThan(0); // Assuming there should be at least one activity
    });
});
