import { POST } from '../../src/app/api/students/route';
import { NextResponse } from 'next/server';

// Mock the DB query to avoid real database calls
jest.mock('../../src/lib/db', () => ({
  query: jest.fn().mockResolvedValue({ rows: [] }),
}));

describe('Students API POST handler', () => {
  test('returns 400 when required fields are missing', async () => {
    const req = new Request('http://localhost/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com' }), // missing name and studentId
    });
    const res = (await POST(req)) as NextResponse;
    const json = await res.json();
    expect(res.status).toBe(400);
    // error message should contain missing fields
    expect(json.error).toContain('name');
    expect(json.error).toContain('studentId');
  });

  test('accepts a valid student payload', async () => {
    const payload = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      studentId: 's12345',
      program: 'Computer Science',
    };
    const req = new Request('http://localhost/api/students', {
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
