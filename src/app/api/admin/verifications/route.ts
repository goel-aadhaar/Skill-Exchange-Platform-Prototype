import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function GET() {
  try {
    const { rows } = await query(`
      SELECT 
        sv.*,
        u.name as student_name,
        u.student_id,
        u.program as student_program,
        u.avatar as student_avatar,
        s.name as skill_name,
        s.domain
      FROM skill_verifications sv
      JOIN users u ON sv.student_id = u.id
      JOIN skills s ON sv.skill_id = s.id
      ORDER BY sv.submitted_at DESC
    `);

    const formatted = rows.map((r) => ({
      id: r.id,
      studentId: r.student_id,
      studentName: r.student_name,
      studentProgram: r.student_program,
      studentAvatar: r.student_avatar || r.student_name.slice(0, 2).toUpperCase(),
      skillId: r.skill_id,
      skillName: r.skill_name,
      domain: r.domain,
      claimedProficiency: r.claimed_proficiency,
      evidenceNote: r.evidence_note,
      submittedAt: r.submitted_at,
      status: r.status,
      adminRemarks: r.admin_remarks
    }));

    return NextResponse.json({ verifications: formatted });
  } catch (error: any) {
    console.error('Admin Verifications GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { studentId, skillId, claimedProficiency, evidenceNote } = body;

    if (!studentId || !skillId) {
      return NextResponse.json({ error: 'studentId and skillId required' }, { status: 400 });
    }

    const id = `verif-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    await query(
      `
      INSERT INTO skill_verifications (id, student_id, skill_id, claimed_proficiency, evidence_note, status, submitted_at)
      VALUES ($1, $2, $3, $4, $5, 'Pending', NOW())
    `,
      [id, studentId, skillId, claimedProficiency || 'Intermediate', evidenceNote || '']
    );

    return NextResponse.json({ success: true, message: 'Verification request submitted to Placement Cell' });
  } catch (error: any) {
    console.error('Admin Verifications POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { verificationId, status, adminRemarks, adminId } = body;

    if (!verificationId || !status || !adminId) {
      return NextResponse.json({ error: 'verificationId, status, and adminId are required' }, { status: 400 });
    }

    const { rows: admins } = await query(`SELECT role FROM users WHERE id = $1`, [adminId]);
    if (admins.length === 0 || admins[0].role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    const { rows } = await query(
      `SELECT sv.*, s.name as skill_name FROM skill_verifications sv JOIN skills s ON sv.skill_id = s.id WHERE sv.id = $1`,
      [verificationId]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Verification claim not found' }, { status: 404 });
    }

    const claim = rows[0];

    await query(
      `UPDATE skill_verifications SET status = $1, admin_remarks = $2, reviewed_at = NOW() WHERE id = $3`,
      [status, adminRemarks || null, verificationId]
    );

    // If approved, update student_skills verified flag
    if (status === 'Approved') {
      await query(
        `UPDATE student_skills SET is_verified = true WHERE student_id = $1 AND skill_id = $2 AND skill_type = 'TEACH'`,
        [claim.student_id, claim.skill_id]
      );
    }

    // Notify student
    const notifId = `notif-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    await query(
      `
      INSERT INTO notifications (id, user_id, type, title, message, related_entity_id, target_tab, is_read, created_at)
      VALUES ($1, $2, 'skill_verified', $3, $4, $5, 'my_skills', false, NOW())
    `,
      [
        notifId,
        claim.student_id,
        status === 'Approved' ? `Skill Verified: ${claim.skill_name}` : `Skill Verification Update: ${claim.skill_name}`,
        status === 'Approved'
          ? `Placement Cell verified your competency badge in ${claim.skill_name}.`
          : `Placement Cell reviewed your verification for ${claim.skill_name}: ${adminRemarks || 'Please submit updated evidence.'}`,
        claim.skill_id
      ]
    );

    return NextResponse.json({ success: true, message: `Verification claim marked as ${status}` });
  } catch (error: any) {
    console.error('Admin Verifications PATCH error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
