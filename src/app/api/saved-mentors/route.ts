import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { randomUUID } from 'crypto';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    if (!studentId) {
      return NextResponse.json({ error: 'studentId is required' }, { status: 400 });
    }

    const { rows } = await query(
      'SELECT mentor_id FROM saved_mentors WHERE student_id = $1',
      [studentId]
    );

    return NextResponse.json({ savedMentorIds: rows.map(r => r.mentor_id) });
  } catch (error) {
    console.error('Error fetching saved mentors:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { studentId, mentorId } = await request.json();

    if (!studentId || !mentorId) {
      return NextResponse.json({ error: 'studentId and mentorId are required' }, { status: 400 });
    }

    const id = randomUUID();
    await query(
      'INSERT INTO saved_mentors (id, student_id, mentor_id) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
      [id, studentId, mentorId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving mentor:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');
    const mentorId = searchParams.get('mentorId');

    if (!studentId || !mentorId) {
      return NextResponse.json({ error: 'studentId and mentorId are required' }, { status: 400 });
    }

    await query(
      'DELETE FROM saved_mentors WHERE student_id = $1 AND mentor_id = $2',
      [studentId, mentorId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error unsaving mentor:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
