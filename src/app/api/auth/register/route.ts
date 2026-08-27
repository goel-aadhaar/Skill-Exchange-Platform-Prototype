import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      studentId,
      email,
      password,
      program,
      specialization,
      academicYear,
      graduationYear,
      bio,
      targetDomain,
      targetRole,
      careerGoal,
      availability,
      skillsToTeach,
      skillsToLearn
    } = body;

    if (!name || !studentId || !email) {
      return NextResponse.json(
        { error: 'Name, Student ID, and Email are required.' },
        { status: 400 }
      );
    }

    const cleanStudentId = studentId.trim().toUpperCase();
    const cleanEmail = email.trim().toLowerCase();

    // Check if studentId or email already exists
    const { rows: existing } = await query(
      `SELECT id, student_id, email FROM users WHERE LOWER(student_id) = LOWER($1) OR LOWER(email) = LOWER($2) LIMIT 1`,
      [cleanStudentId, cleanEmail]
    );

    if (existing.length > 0) {
      const match = existing[0];
      if (match.student_id?.toLowerCase() === cleanStudentId.toLowerCase()) {
        return NextResponse.json(
          { error: `An account with Student ID ${cleanStudentId} already exists.` },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: `An account with Email ${cleanEmail} already exists.` },
        { status: 409 }
      );
    }

    const userId = `user-${cleanStudentId.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    const avatar = name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const parsedCgpa = parseFloat(body.cgpa) || 8.5;

    // Insert new user into PostgreSQL
    await query(
      `
      INSERT INTO users (
        id, name, student_id, email, password_hash, avatar, program, specialization,
        academic_year, graduation_year, bio, target_domain, target_role, career_goal,
        availability, rating, ratings_count, sessions_completed, is_verified, role, cgpa, created_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, 5.0, 0, 0, false, 'student', $16, NOW()
      )
    `,
      [
        userId,
        name.trim(),
        cleanStudentId,
        cleanEmail,
        password || 'demo123',
        avatar,
        program || 'PGDM (General)',
        specialization || 'Management',
        academicYear || 'Year 1 (Batch 2024–2026)',
        parseInt(graduationYear) || 2026,
        bio || `Student at IMT Hyderabad preparing for campus placements.`,
        targetDomain || 'Data Analytics',
        targetRole || 'Business Analyst',
        careerGoal || 'Secure campus internship/placement.',
        availability || 'Weekday Evenings (7 PM - 10 PM)',
        parsedCgpa
      ]
    );

    // Insert Teaching Skills if provided
    if (Array.isArray(skillsToTeach) && skillsToTeach.length > 0) {
      for (const st of skillsToTeach) {
        const skillId = st.skillId || `skill-${st.skillName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        const ssId = `ss-teach-${userId}-${skillId}`;
        await query(
          `
          INSERT INTO student_skills (
            id, student_id, skill_id, skill_type, proficiency, experience_note, is_verified, sessions_helped, is_available
          ) VALUES ($1, $2, $3, 'TEACH', $4, $5, false, 0, true)
          ON CONFLICT (student_id, skill_id, skill_type) DO NOTHING
        `,
          [ssId, userId, skillId, st.proficiency || 'Intermediate', st.experienceNote || '']
        );
      }
    }

    // Insert Learning Skills if provided
    if (Array.isArray(skillsToLearn) && skillsToLearn.length > 0) {
      for (const sl of skillsToLearn) {
        const skillId = sl.skillId || `skill-${sl.skillName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        const ssId = `ss-learn-${userId}-${skillId}`;
        await query(
          `
          INSERT INTO student_skills (
            id, student_id, skill_id, skill_type, current_level, target_level, priority
          ) VALUES ($1, $2, $3, 'LEARN', $4, $5, $6)
          ON CONFLICT (student_id, skill_id, skill_type) DO NOTHING
        `,
          [ssId, userId, skillId, sl.currentLevel || 'Beginner', sl.targetLevel || 'Advanced', sl.priority || 'High']
        );
      }
    }

    // Return complete formatted user
    const formattedUser = {
      id: userId,
      name: name.trim(),
      studentId: cleanStudentId,
      email: cleanEmail,
      avatar,
      program: program || 'PGDM (General)',
      specialization: specialization || 'Management',
      academicYear: academicYear || 'Year 1 (Batch 2024–2026)',
      graduationYear: parseInt(graduationYear) || 2026,
      bio: bio || '',
      targetDomain: targetDomain || 'Data Analytics',
      targetRole: targetRole || 'Business Analyst',
      careerGoal: careerGoal || '',
      availability: availability || 'Weekday Evenings (7 PM - 10 PM)',
      rating: 5.0,
      ratingsCount: 0,
      sessionsCompleted: 0,
      isVerified: false,
      role: 'student',
      cgpa: parsedCgpa,
      skillsToTeach: (skillsToTeach || []).map((s: any) => ({
        skillId: s.skillId,
        skillName: s.skillName,
        domain: s.domain || 'General',
        proficiency: s.proficiency || 'Intermediate',
        experienceNote: s.experienceNote || '',
        verified: false,
        sessionsHelped: 0,
        isAvailable: true
      })),
      skillsToLearn: (skillsToLearn || []).map((s: any) => ({
        skillId: s.skillId,
        skillName: s.skillName,
        domain: s.domain || 'General',
        currentLevel: s.currentLevel || 'Beginner',
        targetLevel: s.targetLevel || 'Advanced',
        priority: s.priority || 'High'
      }))
    };

    return NextResponse.json({
      success: true,
      message: 'Account successfully registered in IMT Hyderabad database.',
      user: formattedUser
    });
  } catch (error: any) {
    console.error('Registration API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to register student account' },
      { status: 500 }
    );
  }
}
