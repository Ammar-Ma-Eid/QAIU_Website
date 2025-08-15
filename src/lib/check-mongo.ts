import clientPromise from '@/lib/mongodb';

export async function checkMongoConnection() {
    try {
        const client = await clientPromise;
        await client.db().command({ ping: 1 });
        return { ok: true, message: 'MongoDB connection successful.' };
    } catch (error) {
        return { ok: false, message: 'MongoDB connection failed.', error: (error instanceof Error ? error.message : String(error)) };
    }
}
