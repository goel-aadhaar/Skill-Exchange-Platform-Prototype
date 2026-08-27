import { z } from 'zod';
import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

// Schema for POST body validation
const studentPostSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  studentId: z.string().nonempty(),
  program: z.string().optional(),
  specialization: z.string().optional(),
  academicYear: z.string().optional(),
  graduationYear: z.string().optional()
});

export async function POST(req: Request) {
  try {
    const parseResult = studentPostSchema.safeParse(await req.json());
    if (!parseResult.success) {
      const errorMessages = parseResult.error.errors.map(e => `${e.path.join('.')}: ${e.message}`);
      return NextResponse.json({ error: errorMessages.join(', ') }, { status: 400 });
    }
    const { name, email, studentId, program, specialization, academicYear, graduationYear } = parseResult.data;
    // Insert new student (users table) – simplified columns
    await query(
      `INSERT INTO users (name, email, student_id, program, specialization, academic_year, graduation_year) VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (student_id) DO UPDATE SET name = EXCLUDED.name, email = EXCLUDED.email, program = EXCLUDED.program,
       specialization = EXCLUDED.specialization, academic_year = EXCLUDED.academic_year, graduation_year = EXCLUDED.graduation_year;`,
      [name, email, studentId, program || null, specialization || null, academicYear || null, graduationYear || null]
    );
    return NextResponse.json({ success: true, message: 'Profile saved successfully' });
  } catch (error: any) {
    console.error('Student POST error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}

const studentPatchSchema = z.object({
  id: z.string().nonempty(),
  name: z.string().optional(),
  bio: z.string().optional(),
  targetDomain: z.string().optional(),
  targetRole: z.string().optional(),
  careerGoal: z.string().optional(),
  availability: z.string().optional(),
  specialization: z.string().optional(),
  program: z.string().optional(),
  academicYear: z.string().optional(),
  graduationYear: z.number().optional()
});

export async function PATCH(req: Request) {
  try {
    const parseResult = studentPatchSchema.safeParse(await req.json());
    if (!parseResult.success) {
      const errorMessages = parseResult.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`);
      return NextResponse.json({ error: errorMessages.join(', ') }, { status: 400 });
    }

    const {
      id,
      name,
      bio,
      targetDomain,
      targetRole,
      careerGoal,
      availability,
      specialization,
      program,
      academicYear,
      graduationYear
    } = parseResult.data;

    // Verify user exists
    const { rows: userRows } = await query(`SELECT id, name, student_id, email, avatar, program, specialization, academic_year, graduation_year, bio, target_domain, target_role, career_goal, availability, rating, ratings_count, sessions_completed, is_verified, role, cgpa, linkedin_url, github_url, created_at, updated_at FROM users WHERE id = $1`, [id]);
    if (userRows.length === 0) {
      return NextResponse.json({ error: 'Student account not found' }, { status: 404 });
    }

    await query(
      `
      UPDATE users 
      SET 
        name = COALESCE($1, name),
        bio = COALESCE($2, bio),
        target_domain = COALESCE($3, target_domain),
        target_role = COALESCE($4, target_role),
        career_goal = COALESCE($5, career_goal),
        availability = COALESCE($6, availability),
        specialization = COALESCE($7, specialization),
        program = COALESCE($8, program),
        academic_year = COALESCE($9, academic_year),
        graduation_year = COALESCE($10, graduation_year),
        updated_at = NOW()
      WHERE id = $11
    `,
      [
        name || null,
        bio !== undefined ? bio : null,
        targetDomain || null,
        targetRole || null,
        careerGoal !== undefined ? careerGoal : null,
        availability || null,
        specialization || null,
        program || null,
        academicYear || null,
        graduationYear || null,
        id
      ]
    );

    // Fetch updated student with all skills
    const { rows: updatedRows } = await query(`SELECT id, name, student_id, email, avatar, program, specialization, academic_year, graduation_year, bio, target_domain, target_role, career_goal, availability, rating, ratings_count, sessions_completed, is_verified, role, cgpa, linkedin_url, github_url, created_at, updated_at FROM users WHERE id = $1`, [id]);
    const updatedUser = updatedRows[0];

    const teachRes = await query(
      `SELECT ss.*, s.name as skill_name, s.domain 
       FROM student_skills ss 
       JOIN skills s ON ss.skill_id = s.id 
       WHERE ss.student_id = $1 AND ss.skill_type = 'TEACH'`,
      [id]
    );

    const learnRes = await query(
      `SELECT ss.*, s.name as skill_name, s.domain 
       FROM student_skills ss 
       JOIN skills s ON ss.skill_id = s.id 
       WHERE ss.student_id = $1 AND ss.skill_type = 'LEARN'`,
      [id]
    );

    const formattedStudent = {
      id: updatedUser.id,
      name: updatedUser.name,
      studentId: updatedUser.student_id,
      email: updatedUser.email,
      avatar: updatedUser.avatar || updatedUser.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase(),
      program: updatedUser.program,
      specialization: updatedUser.specialization,
      academicYear: updatedUser.academic_year,
      graduationYear: updatedUser.graduation_year,
      bio: updatedUser.bio,
      targetDomain: updatedUser.target_domain,
      targetRole: updatedUser.target_role,
      careerGoal: updatedUser.career_goal,
      availability: updatedUser.availability,
      rating: parseFloat(updatedUser.rating) || 5.0,
      ratingsCount: updatedUser.ratings_count || 0,
      sessionsCompleted: updatedUser.sessions_completed || 0,
      isVerified: updatedUser.is_verified,
      role: updatedUser.role,
      cgpa: updatedUser.cgpa,
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
    };

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      student: formattedStudent
    });
  } catch (error: any) {
    console.error('Student PATCH error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const skillId = searchParams.get('skillId');
    const domain = searchParams.get('domain');
    const search = searchParams.get('search');
    const studentId = searchParams.get('studentId');

    if (studentId) {
      const { rows } = await query(`SELECT id, name, student_id, email, avatar, program, specialization, academic_year, graduation_year, bio, target_domain, target_role, career_goal, availability, rating, ratings_count, sessions_completed, is_verified, role, cgpa, linkedin_url, github_url, created_at, updated_at FROM users WHERE id = $1 LIMIT 1`, [studentId]);
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
    const { rows: users } = await query(`SELECT id, name, student_id, email, avatar, program, specialization, academic_year, graduation_year, bio, target_domain, target_role, career_goal, availability, rating, ratings_count, sessions_completed, is_verified, role, cgpa, linkedin_url, github_url, created_at, updated_at FROM users WHERE role = 'student' ORDER BY rating DESC, name ASC`);

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
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
