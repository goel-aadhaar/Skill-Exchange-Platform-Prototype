import { POST } from '../../src/app/api/skills/route';
import { NextResponse } from 'next/server';

// Mock the DB query to avoid real database calls
jest.mock('../../src/lib/db', () => ({
  query: jest.fn().mockResolvedValue({ rows: [] }),
}));

describe('Skills API POST handler', () => {
  test('returns 400 when required fields are missing', async () => {
    const req = new Request('http://localhost/api/skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const res = (await POST(req)) as NextResponse;
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.error).toContain('studentId');
  });

  test('accepts a valid TEACH skill payload', async () => {
    const payload = {
      studentId: 'student-1',
      skillId: 'skill-1',
      skillType: 'TEACH',
      proficiency: 'Advanced',
      experienceNote: '5 years experience',
    };
    const req = new Request('http://localhost/api/skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const res = (await POST(req)) as NextResponse;
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
  });
});
