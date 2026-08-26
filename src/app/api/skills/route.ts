import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET() {
  try {
    const { rows: skills } = await query(`SELECT * FROM skills ORDER BY domain ASC, name ASC`);
    const { rows: domains } = await query(`SELECT * FROM domains ORDER BY name ASC`);

    const formattedSkills = skills.map((s) => ({
      id: s.id,
      name: s.name,
      domain: s.domain,
      category: s.category,
      description: s.description,
      demandLevel: s.demand_level,
      associatedRoles: s.associated_roles || [],
      associatedCompanies: s.associated_companies || []
    }));

    const formattedDomains = domains.map((d) => ({
      id: d.id,
      name: d.name,
      iconName: d.icon_name,
      description: d.description,
      popularRoles: d.popular_roles || [],
      keySkills: d.key_skills || [],
      topRecruiters: d.top_recruiters || [],
      avgPackage: d.avg_package,
      marketInsight: d.market_insight
    }));

    return NextResponse.json({ skills: formattedSkills, domains: formattedDomains });
  } catch (error: any) {
    console.error('Skills API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { studentId, skillId, skillType, proficiency, experienceNote, currentLevel, targetLevel, priority } = body;

    if (!studentId || !skillId || !skillType) {
      return NextResponse.json({ error: 'studentId, skillId, and skillType are required' }, { status: 400 });
    }

    const id = `ss-${skillType.toLowerCase()}-${studentId}-${skillId}`;

    if (skillType === 'TEACH') {
      await query(
        `
        INSERT INTO student_skills (
          id, student_id, skill_id, skill_type, proficiency, experience_note, is_verified, sessions_helped, is_available
        ) VALUES ($1, $2, $3, 'TEACH', $4, $5, false, 0, true)
        ON CONFLICT (student_id, skill_id, skill_type) DO UPDATE SET
          proficiency = EXCLUDED.proficiency,
          experience_note = EXCLUDED.experience_note,
          updated_at = NOW();
      `,
        [id, studentId, skillId, proficiency || 'Intermediate', experienceNote || '']
      );
    } else {
      await query(
        `
        INSERT INTO student_skills (
          id, student_id, skill_id, skill_type, current_level, target_level, priority
        ) VALUES ($1, $2, $3, 'LEARN', $4, $5, $6)
        ON CONFLICT (student_id, skill_id, skill_type) DO UPDATE SET
          current_level = EXCLUDED.current_level,
          target_level = EXCLUDED.target_level,
          priority = EXCLUDED.priority,
          updated_at = NOW();
      `,
        [id, studentId, skillId, currentLevel || 'Beginner', targetLevel || 'Advanced', priority || 'High']
      );
    }

    return NextResponse.json({ success: true, message: 'Skill updated successfully' });
  } catch (error: any) {
    console.error('Skill POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get('studentId');
    const skillId = searchParams.get('skillId');
    const skillType = searchParams.get('skillType');

    if (!studentId || !skillId || !skillType) {
      return NextResponse.json({ error: 'Missing required delete parameters' }, { status: 400 });
    }

    await query(
      `DELETE FROM student_skills WHERE student_id = $1 AND skill_id = $2 AND skill_type = $3`,
      [studentId, skillId, skillType]
    );

    return NextResponse.json({ success: true, message: 'Skill removed successfully' });
  } catch (error: any) {
    console.error('Skill DELETE error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
