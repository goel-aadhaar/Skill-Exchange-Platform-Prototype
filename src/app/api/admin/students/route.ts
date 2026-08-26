import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { studentId, action, adminRemarks, adminId } = body;

    if (!studentId || !action || !adminId) {
      return NextResponse.json({ error: 'studentId, action, and adminId are required' }, { status: 400 });
    }

    const { rows: admins } = await query(`SELECT role FROM users WHERE id = $1`, [adminId]);
    if (admins.length === 0 || admins[0].role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    if (action === 'Verify') {
      await query(`UPDATE users SET is_verified = true WHERE id = $1`, [studentId]);
      
      const notifId = `notif-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      await query(
        `
        INSERT INTO notifications (id, user_id, type, title, message, target_tab, is_read, created_at)
        VALUES ($1, $2, 'system', 'Profile Verified', 'Your student profile has been verified by the Administration.', 'profile', false, NOW())
      `,
        [notifId, studentId]
      );
      
      return NextResponse.json({ success: true, message: 'Student verified successfully' });
    } else if (action === 'Reject') {
      // Just delete the unverified user
      await query(`DELETE FROM users WHERE id = $1`, [studentId]);
      return NextResponse.json({ success: true, message: 'Student rejected and removed' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Admin Students PATCH error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
