const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgresql://neondb_owner:npg_Ascn7UR5MDGo@ep-weathered-unit-axtvac9s-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require' });
async function run() {
  try {
    const res = await pool.query("SELECT id FROM users WHERE student_id = '25A3HP658'");
    const tusharId = res.rows[0].id;
    console.log('Tushar ID:', tusharId);
    
    // Check if Tushar has learn skills
    const learnRes = await pool.query("SELECT * FROM student_skills WHERE student_id = $1 AND skill_type = 'LEARN'", [tusharId]);
    if (learnRes.rows.length === 0) {
      console.log('Inserting learn skills for Tushar...');
      await pool.query("INSERT INTO student_skills (id, student_id, skill_id, skill_type, current_level, target_level, priority) VALUES ('ss-learn-1', $1, 'skill-python-data', 'LEARN', 'Beginner', 'Advanced', 'High')", [tusharId]);
      await pool.query("INSERT INTO student_skills (id, student_id, skill_id, skill_type, current_level, target_level, priority) VALUES ('ss-learn-2', $1, 'skill-sql', 'LEARN', 'Intermediate', 'Expert', 'High')", [tusharId]);
      console.log('Inserted.');
    } else {
      console.log('Tushar already has learn skills:', learnRes.rows);
    }
  } catch (e) { console.error(e); }
  pool.end();
}
run();
