import { Pool } from 'pg';
const pool = new Pool({ connectionString: 'postgresql://neondb_owner:npg_Ascn7UR5MDGo@ep-weathered-unit-axtvac9s-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require' });
pool.query("SELECT ss.*, s.name as skill_name, s.domain FROM student_skills ss JOIN skills s ON ss.skill_id = s.id WHERE ss.student_id = 'user-tushar' AND ss.skill_type = 'LEARN'", (err, res) => {
  console.log('Learn Skills:', res ? res.rows : err);
  pool.end();
});
