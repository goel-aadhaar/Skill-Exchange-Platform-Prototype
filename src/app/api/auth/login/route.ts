import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function POST(req: Request) {
  try {
    const { identifier, password } = await req.json();

    if (!identifier) {
      return NextResponse.json({ error: 'Student ID or Email is required' }, { status: 400 });
    }

    // Query user by student_id or email
    const { rows } = await query(
      `SELECT * FROM users WHERE LOWER(student_id) = LOWER($1) OR LOWER(email) = LOWER($1) LIMIT 1`,
      [identifier.trim()]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Account not found. Please check your Student ID or email.' }, { status: 404 });
    }

    const user = rows[0];

    // Verify password
    if (password && user.password_hash && password !== user.password_hash) {
      return NextResponse.json({ error: 'Incorrect password. Please try again.' }, { status: 401 });
    }

    // Fetch teaching skills
    const teachSkillsRes = await query(
      `SELECT ss.*, s.name as skill_name, s.domain 
       FROM student_skills ss 
       JOIN skills s ON ss.skill_id = s.id 
       WHERE ss.student_id = $1 AND ss.skill_type = 'TEACH'`,
      [user.id]
    );

    // Fetch learning skills
    const learnSkillsRes = await query(
      `SELECT ss.*, s.name as skill_name, s.domain 
       FROM student_skills ss 
       JOIN skills s ON ss.skill_id = s.id 
       WHERE ss.student_id = $1 AND ss.skill_type = 'LEARN'`,
      [user.id]
    );

    const formattedUser = {
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
      skillsToTeach: teachSkillsRes.rows.map((r) => ({
        skillId: r.skill_id,
        skillName: r.skill_name,
        domain: r.domain,
        proficiency: r.proficiency,
        experienceNote: r.experience_note,
        verified: r.is_verified,
        sessionsHelped: r.sessions_helped,
        isAvailable: r.is_available
      })),
      skillsToLearn: learnSkillsRes.rows.map((r) => ({
        skillId: r.skill_id,
        skillName: r.skill_name,
        domain: r.domain,
        currentLevel: r.current_level,
        targetLevel: r.target_level,
        priority: r.priority
      }))
    };

    return NextResponse.json({ success: true, user: formattedUser });
  } catch (error: any) {
    console.error('Login API error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
