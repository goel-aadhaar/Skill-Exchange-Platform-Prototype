import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const sector = searchParams.get('sector') || '';
    const domain = searchParams.get('domain') || '';
    const location = searchParams.get('location') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const offset = (page - 1) * limit;

    let whereClauses: string[] = [];
    let params: any[] = [];
    let paramIdx = 1;

    if (search) {
      whereClauses.push(
        `(LOWER(company_name) LIKE $${paramIdx} OR LOWER(role) LIKE $${paramIdx} OR LOWER(skills_required) LIKE $${paramIdx} OR LOWER(sector) LIKE $${paramIdx})`
      );
      params.push(`%${search.toLowerCase()}%`);
      paramIdx++;
    }

    if (sector && sector !== 'all') {
      whereClauses.push(`LOWER(sector) LIKE $${paramIdx}`);
      params.push(`%${sector.toLowerCase()}%`);
      paramIdx++;
    }

    if (domain && domain !== 'all') {
      whereClauses.push(`LOWER(domain) LIKE $${paramIdx}`);
      params.push(`%${domain.toLowerCase()}%`);
      paramIdx++;
    }

    if (location && location !== 'all') {
      whereClauses.push(`LOWER(location) LIKE $${paramIdx}`);
      params.push(`%${location.toLowerCase()}%`);
      paramIdx++;
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    // Get Total Count
    const countRes = await query(`SELECT COUNT(*) as total FROM placement_jobs ${whereSql}`, params);
    const total = parseInt(countRes.rows[0]?.total || '0', 10);

    // Get Paginated Rows
    const dataRes = await query(
      `SELECT * FROM placement_jobs ${whereSql} ORDER BY sr_no ASC LIMIT $${paramIdx} OFFSET $${paramIdx + 1}`,
      [...params, limit, offset]
    );

    // Get distinct sectors and domains for filters
    const sectorsRes = await query(`SELECT DISTINCT sector FROM placement_jobs WHERE sector IS NOT NULL AND sector != '' ORDER BY sector ASC`);
    const domainsRes = await query(`SELECT DISTINCT domain FROM placement_jobs WHERE domain IS NOT NULL AND domain != '' ORDER BY domain ASC`);

    const formattedJobs = dataRes.rows.map((r) => ({
      id: r.id,
      srNo: r.sr_no,
      companyName: r.company_name,
      sector: r.sector,
      role: r.role,
      domain: r.domain,
      ctcOffered: r.ctc_offered,
      fixedPay: r.fixed_pay,
      variablePay: r.variable_pay,
      location: r.location,
      experienceRequirements: r.experience_requirements,
      cgpaCriteria: r.cgpa_criteria,
      undergraduatePreferredDegree: r.undergraduate_preferred_degree,
      majorMinorRequired: r.major_minor_required,
      skillsRequired: r.skills_required
    }));

    return NextResponse.json({
      jobs: formattedJobs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      filters: {
        sectors: sectorsRes.rows.map((r) => r.sector),
        domains: domainsRes.rows.map((r) => r.domain)
      }
    });
  } catch (error: any) {
    console.error('Placements API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
