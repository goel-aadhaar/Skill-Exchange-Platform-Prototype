import { POST, PATCH } from '../../src/app/api/students/route';
import { NextResponse } from 'next/server';
import { query } from '../../src/lib/db';

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

describe('Students API PATCH handler', () => {
  test('returns 400 when id is missing', async () => {
    const req = new Request('http://localhost/api/students', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bio: 'New bio' }),
    });
    const res = (await PATCH(req)) as NextResponse;
    expect(res.status).toBe(400);
  });

  test('successfully updates student profile when user exists', async () => {
    (query as jest.Mock).mockResolvedValueOnce({
      rows: [{ id: 'user-tushar', name: 'Tushar Goel', student_id: '25A3HP658' }],
    }).mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({
        rows: [{ id: 'user-tushar', name: 'Tushar Goel Updated', student_id: '25A3HP658', rating: 5.0 }],
      })
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [] });

    const req = new Request('http://localhost/api/students', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: 'user-tushar',
        name: 'Tushar Goel Updated',
        bio: 'Updated bio for consulting',
      }),
    });
    const res = (await PATCH(req)) as NextResponse;
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.student.name).toBe('Tushar Goel Updated');
  });
});
