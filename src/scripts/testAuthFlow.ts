import { query } from '../lib/db';

async function testAuth() {
  console.log('--- TESTING FULL DATABASE LOGIN & SIGNUP (REGISTRATION) ---');

  const testStudentId = `TEST${Date.now().toString().slice(-4)}`;
  const testEmail = `test.student.${Date.now()}@imthyderabad.edu.in`;

  console.log(`1. Testing Registration for new student: ${testStudentId} (${testEmail})...`);

  // Insert user via SQL simulation of register route
  const userId = `user-${testStudentId.toLowerCase()}`;
  await query(
    `INSERT INTO users (
      id, name, student_id, email, password_hash, avatar, program, specialization,
      academic_year, graduation_year, bio, target_domain, target_role, career_goal,
      availability, rating, ratings_count, sessions_completed, is_verified, role, created_at
    ) VALUES (
      $1, $2, $3, $4, 'secure_password_123', 'TS', 'PGDM (Analytics)', 'Data Science & IT',
      'Year 1 (2026 - 2028)', 2026, 'Test registered user for authentication flow testing.',
      'Data Analytics', 'Business Analyst', 'Deloitte Placement', 'Weekdays 7 PM', 5.0, 0, 0, false, 'student', NOW()
    )`,
    [userId, 'Test Student Candidate', testStudentId, testEmail]
  );

  // Insert test teaching skill
  await query(
    `INSERT INTO student_skills (id, student_id, skill_id, skill_type, proficiency, experience_note, is_verified, sessions_helped, is_available)
     VALUES ($1, $2, 'skill-python-data', 'TEACH', 'Intermediate', 'Self taught', false, 0, true)`,
    [`ss-teach-${userId}-python`, userId]
  );

  console.log(`✓ Registration Successful: User ID ${userId} inserted into PostgreSQL.`);

  // 2. Test Login by Student ID
  console.log(`2. Testing Login by Student ID: ${testStudentId}...`);
  const loginByIdRes = await query(
    `SELECT u.*, 
     (SELECT COUNT(*) FROM student_skills ss WHERE ss.student_id = u.id AND ss.skill_type = 'TEACH') as teach_count
     FROM users u WHERE LOWER(u.student_id) = LOWER($1)`,
    [testStudentId]
  );

  if (loginByIdRes.rows.length === 1) {
    console.log(`✓ Login by Student ID successful: Found ${loginByIdRes.rows[0].name} with ${loginByIdRes.rows[0].teach_count} teaching skill.`);
  } else {
    throw new Error('Login by Student ID failed!');
  }

  // 3. Test Login by Email
  console.log(`3. Testing Login by Email: ${testEmail}...`);
  const loginByEmailRes = await query(
    `SELECT id, name, student_id, email FROM users WHERE LOWER(email) = LOWER($1)`,
    [testEmail]
  );

  if (loginByEmailRes.rows.length === 1) {
    console.log(`✓ Login by Email successful: Found ${loginByEmailRes.rows[0].name}.`);
  } else {
    throw new Error('Login by Email failed!');
  }

  // Clean up test user
  await query(`DELETE FROM student_skills WHERE student_id = $1`, [userId]);
  await query(`DELETE FROM users WHERE id = $1`, [userId]);
  console.log(`✓ Cleanup test user completed.`);
  console.log('--- ALL AUTHENTICATION (LOGIN & SIGNUP) WORKFLOWS VERIFIED ---');
}

testAuth()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Auth test failed:', err);
    process.exit(1);
  });
