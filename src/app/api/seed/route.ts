import { NextResponse } from 'next/server';
import { initializeDatabase, seedInitialData } from '../../../lib/seedDatabase';

export async function POST(req: Request) {
  try {
    const { secret } = await req.json().catch(() => ({}));
    if (secret !== 'imt-skill-exchange-admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await initializeDatabase();
    await seedInitialData();
    return NextResponse.json({ success: true, message: 'Database initialized and seeded successfully.' });
  } catch (error: any) {
    console.error('Seed API error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
