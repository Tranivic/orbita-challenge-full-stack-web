import { connect } from './prisma';

describe('Prisma Client', () => {
    test('should connect to the database', async () => {
        const consoleSpy = vi.spyOn(console, 'log');
        await connect();
        expect(consoleSpy).toHaveBeenCalledWith("Connected to the database...");
        consoleSpy.mockRestore();
    });
});