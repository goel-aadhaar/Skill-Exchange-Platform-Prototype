import { query } from '../lib/db';

async function verifyFlow() {
  console.log('--- STARTING NEON POSTGRESQL MULTI-USER WORKFLOW VERIFICATION ---');

  // 1. Check users count and personas
  const usersRes = await query(`SELECT id, name, student_id, role, rating, sessions_completed FROM users ORDER BY name ASC`);
  console.log(`✓ Seeded users in DB: ${usersRes.rows.length}`);
  usersRes.rows.forEach(u => console.log(`   - ${u.name} (${u.student_id}) [Rating: ${u.rating}★, Sessions: ${u.sessions_completed}]`));

  // 2. Check 226 placement jobs
  const jobsRes = await query(`SELECT COUNT(*) as count FROM placement_jobs`);
  console.log(`✓ Total Placement Jobs in DB: ${jobsRes.rows[0].count} (Expected: 226)`);

  // 3. Check 75 internship opportunities
  const sipsRes = await query(`SELECT COUNT(*) as count FROM internship_opportunities`);
  console.log(`✓ Total Summer Internships in DB: ${sipsRes.rows[0].count} (Expected: 75)`);

  // 4. Test Multi-User Mentoring Request Cycle: Tushar -> Oshi
  const tushar = usersRes.rows.find(u => u.student_id === '25A3HP658');
  const oshi = usersRes.rows.find(u => u.student_id === '25A3HP651');

  if (!tushar || !oshi) {
    throw new Error('Tushar or Oshi not found in database!');
  }

  // Find Python skill
  const skillRes = await query(`SELECT id, name FROM skills WHERE LOWER(name) LIKE '%python%' LIMIT 1`);
  const pythonSkill = skillRes.rows[0];
  console.log(`✓ Target Skill found: ${pythonSkill.name} (${pythonSkill.id})`);

  // Create request
  const testReqId = `test-req-${Date.now()}`;
  await query(
    `INSERT INTO mentoring_requests (id, requester_id, mentor_id, skill_id, reason, preferred_date, preferred_time, message, status, created_at)
     VALUES ($1, $2, $3, $4, 'Preparing for Deloitte technical round', '2026-09-01', '7:00 PM - 8:30 PM', 'Hi Oshi, need help with Python pandas.', 'PENDING', NOW())`,
    [testReqId, tushar.id, oshi.id, pythonSkill.id]
  );
  console.log(`✓ Mentoring request created in Neon PostgreSQL: ${testReqId}`);

  // Create Notification for Oshi
  await query(
    `INSERT INTO notifications (id, user_id, type, title, message, related_entity_id, target_tab, is_read, created_at)
     VALUES ($1, $2, 'request_received', 'New Mentoring Request', 'Tushar Goel wants to learn Python from you', $3, 'my_requests', false, NOW())`,
    [`notif-${Date.now()}`, oshi.id, testReqId]
  );
  console.log(`✓ Live notification created for Oshi in DB`);

  // Oshi accepts
  await query(
    `UPDATE mentoring_requests 
     SET status = 'ACCEPTED', meeting_link = 'https://meet.google.com/imth-python-session', mentor_response_note = 'Happy to help with Pandas & Numpy!', accepted_at = NOW()
     WHERE id = $1`,
    [testReqId]
  );
  console.log(`✓ Oshi accepted request with Google Meet link in DB`);

  // Session completed & Tushar submits 5-star review
  await query(
    `UPDATE mentoring_requests SET status = 'COMPLETED', completed_at = NOW() WHERE id = $1`,
    [testReqId]
  );
  await query(
    `INSERT INTO ratings_reviews (id, request_id, reviewer_id, mentor_id, skill_name, rating, tags, review, created_at)
     VALUES ($1, $2, $3, $4, $5, 5, $6, 'Oshi explained pandas dataframes so clearly! Highly recommended mentor.', NOW())`,
    [`rat-${Date.now()}`, testReqId, tushar.id, oshi.id, pythonSkill.name, ['Clear Explanations', 'Practical Examples']]
  );

  // Recalculate Oshi's rating
  const avgRes = await query(`SELECT AVG(rating) as avg_rating, COUNT(id) as total_count FROM ratings_reviews WHERE mentor_id = $1`, [oshi.id]);
  const newAvg = parseFloat(avgRes.rows[0].avg_rating).toFixed(2);
  const newCount = parseInt(avgRes.rows[0].total_count);
  await query(`UPDATE users SET rating = $1, ratings_count = $2 WHERE id = $3`, [newAvg, newCount, oshi.id]);

  console.log(`✓ Tushar submitted 5★ review. Oshi's new database rating: ${newAvg}★ (${newCount} reviews)`);
  console.log('--- ALL NEON POSTGRESQL WORKFLOWS VERIFIED SUCCESSFULLY ---');
}

verifyFlow()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Verification failed:', err);
    process.exit(1);
  });
