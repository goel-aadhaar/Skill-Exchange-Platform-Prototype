import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const skillId = searchParams.get('skillId');
    const domain = searchParams.get('domain');
    const search = searchParams.get('search');
    const studentId = searchParams.get('studentId');

    if (studentId) {
      const { rows } = await query(`SELECT * FROM users WHERE id = $1 LIMIT 1`, [studentId]);
      if (rows.length === 0) {
        return NextResponse.json({ error: 'Student not found' }, { status: 404 });
      }
      const user = rows[0];
      const teachRes = await query(
        `SELECT ss.*, s.name as skill_name, s.domain 
         FROM student_skills ss 
         JOIN skills s ON ss.skill_id = s.id 
         WHERE ss.student_id = $1 AND ss.skill_type = 'TEACH'`,
        [user.id]
      );
      const learnRes = await query(
        `SELECT ss.*, s.name as skill_name, s.domain 
         FROM student_skills ss 
         JOIN skills s ON ss.skill_id = s.id 
         WHERE ss.student_id = $1 AND ss.skill_type = 'LEARN'`,
        [user.id]
      );

      return NextResponse.json({
        student: {
          ...user,
          studentId: user.student_id,
          academicYear: user.academic_year,
          graduationYear: user.graduation_year,
          targetDomain: user.target_domain,
          targetRole: user.target_role,
          careerGoal: user.career_goal,
          ratingsCount: user.ratings_count,
          sessionsCompleted: user.sessions_completed,
          isVerified: user.is_verified,
          rating: parseFloat(user.rating) || 5.0,
          skillsToTeach: teachRes.rows.map((r) => ({
            skillId: r.skill_id,
            skillName: r.skill_name,
            domain: r.domain,
            proficiency: r.proficiency,
            experienceNote: r.experience_note,
            verified: r.is_verified,
            sessionsHelped: r.sessions_helped,
            isAvailable: r.is_available
          })),
          skillsToLearn: learnRes.rows.map((r) => ({
            skillId: r.skill_id,
            skillName: r.skill_name,
            domain: r.domain,
            currentLevel: r.current_level,
            targetLevel: r.target_level,
            priority: r.priority
          }))
        }
      });
    }

    // Query all students
    const { rows: users } = await query(`SELECT * FROM users WHERE role = 'student' ORDER BY rating DESC, name ASC`);

    // Fetch all student skills in batch
    const { rows: allSkills } = await query(`
      SELECT ss.*, s.name as skill_name, s.domain 
      FROM student_skills ss 
      JOIN skills s ON ss.skill_id = s.id
    `);

    const students = users.map((user) => {
      const userTeachSkills = allSkills
        .filter((s) => s.student_id === user.id && s.skill_type === 'TEACH')
        .map((r) => ({
          skillId: r.skill_id,
          skillName: r.skill_name,
          domain: r.domain,
          proficiency: r.proficiency,
          experienceNote: r.experience_note,
          verified: r.is_verified,
          sessionsHelped: r.sessions_helped,
          isAvailable: r.is_available
        }));

      const userLearnSkills = allSkills
        .filter((s) => s.student_id === user.id && s.skill_type === 'LEARN')
        .map((r) => ({
          skillId: r.skill_id,
          skillName: r.skill_name,
          domain: r.domain,
          currentLevel: r.current_level,
          targetLevel: r.target_level,
          priority: r.priority
        }));

      return {
        id: user.id,
        name: user.name,
        studentId: user.student_id,
        email: user.email,
        avatar: user.avatar || user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase(),
        program: user.program,
        specialization: user.specialization,
        academicYear: user.academic_year,
        graduationYear: user.graduation_year,
        bio: user.bio,
        targetDomain: user.target_domain,
        targetRole: user.target_role,
        careerGoal: user.career_goal,
        availability: user.availability,
        rating: parseFloat(user.rating) || 5.0,
        ratingsCount: user.ratings_count || 0,
        sessionsCompleted: user.sessions_completed || 0,
        isVerified: user.is_verified,
        role: user.role,
        cgpa: user.cgpa,
        skillsToTeach: userTeachSkills,
        skillsToLearn: userLearnSkills
      };
    });

    let filtered = students;
    if (skillId) {
      filtered = filtered.filter((s) => s.skillsToTeach.some((st) => st.skillId === skillId || st.skillName.toLowerCase().includes(skillId.toLowerCase())));
    }
    if (domain) {
      filtered = filtered.filter((s) => s.targetDomain.toLowerCase() === domain.toLowerCase() || s.skillsToTeach.some((st) => st.domain.toLowerCase() === domain.toLowerCase()));
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter((s) => s.name.toLowerCase().includes(q) || s.studentId.toLowerCase().includes(q) || s.skillsToTeach.some((st) => st.skillName.toLowerCase().includes(q)));
    }

    return NextResponse.json({ students: filtered });
  } catch (error: any) {
    console.error('Students API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
