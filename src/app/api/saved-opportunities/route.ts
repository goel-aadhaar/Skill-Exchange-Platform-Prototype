import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get('studentId');

  if (!studentId) {
    return NextResponse.json({ error: 'studentId is required' }, { status: 400 });
  }

  try {
    const result = await query(
      `SELECT opportunity_id FROM saved_opportunities WHERE student_id = $1`,
      [studentId]
    );
    const savedOpportunityIds = result.rows.map(row => row.opportunity_id);
    return NextResponse.json({ savedOpportunityIds });
  } catch (error) {
    console.error('Error fetching saved opportunities:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { studentId, opportunityId, opportunityType } = await request.json();

    if (!studentId || !opportunityId || !opportunityType) {
      return NextResponse.json({ error: 'studentId, opportunityId, and opportunityType are required' }, { status: 400 });
    }

    const id = `saved-${Date.now()}`;
    await query(
      `INSERT INTO saved_opportunities (id, student_id, opportunity_id, opportunity_type)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (student_id, opportunity_id) DO NOTHING`,
      [id, studentId, opportunityId, opportunityType]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving opportunity:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');
    const opportunityId = searchParams.get('opportunityId');

    if (!studentId || !opportunityId) {
      return NextResponse.json({ error: 'studentId and opportunityId are required' }, { status: 400 });
    }

    await query(
      `DELETE FROM saved_opportunities WHERE student_id = $1 AND opportunity_id = $2`,
      [studentId, opportunityId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error unsaving opportunity:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
