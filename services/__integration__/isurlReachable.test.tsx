import { isUrlReachable } from '@/services/isUrlReachable';

describe('isUrlReachable', () => {
    it('should return true for a reachable URL', async () => {
        const reachableUrl = 'https://www.google.com';
        const result = await isUrlReachable(reachableUrl);
        expect(result).toBe(true);
    });

    it('should return false for an unreachable URL', async () => {
        const unreachableUrl = 'http://nonexistent.url';
        const result = await isUrlReachable(unreachableUrl);
        expect(result).toBe(false);
    });
});