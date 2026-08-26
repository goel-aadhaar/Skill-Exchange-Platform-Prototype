import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const location = searchParams.get('location') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const offset = (page - 1) * limit;

    let whereClauses: string[] = [];
    let params: any[] = [];
    let paramIdx = 1;

    if (search) {
      whereClauses.push(
        `(LOWER(company_name) LIKE $${paramIdx} OR LOWER(role) LIKE $${paramIdx} OR LOWER(skills_required) LIKE $${paramIdx})`
      );
      params.push(`%${search.toLowerCase()}%`);
      paramIdx++;
    }

    if (location && location !== 'all') {
      whereClauses.push(`LOWER(locations) LIKE $${paramIdx}`);
      params.push(`%${location.toLowerCase()}%`);
      paramIdx++;
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const countRes = await query(`SELECT COUNT(*) as total FROM internship_opportunities ${whereSql}`, params);
    const total = parseInt(countRes.rows[0]?.total || '0', 10);

    const dataRes = await query(
      `SELECT * FROM internship_opportunities ${whereSql} ORDER BY id ASC LIMIT $${paramIdx} OFFSET $${paramIdx + 1}`,
      [...params, limit, offset]
    );

    const formattedInternships = dataRes.rows.map((r) => ({
      id: r.id,
      companyName: r.company_name,
      noticeDate: r.notice_date,
      role: r.role,
      stipend: r.stipend,
      locations: r.locations,
      skillsRequired: r.skills_required
    }));

    return NextResponse.json({
      internships: formattedInternships,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error: any) {
    console.error('Internships API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
