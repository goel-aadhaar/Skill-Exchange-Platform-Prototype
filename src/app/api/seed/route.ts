import { NextResponse } from 'next/server';
import { initializeDatabase, seedInitialData } from '../../../lib/seedDatabase';

export async function POST() {
  try {
    await initializeDatabase();
    await seedInitialData();
    return NextResponse.json({ success: true, message: 'Database initialized and seeded successfully.' });
  } catch (error: any) {
    console.error('Seed API error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return POST();
}
