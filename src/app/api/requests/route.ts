import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    let sql = `
      SELECT 
        mr.*,
        u_req.name as requester_name,
        u_req.email as requester_email,
        u_req.avatar as requester_avatar,
        u_req.program as requester_program,
        u_men.name as mentor_name,
        u_men.email as mentor_email,
        u_men.avatar as mentor_avatar,
        s.name as skill_name,
        s.domain as skill_domain
      FROM mentoring_requests mr
      JOIN users u_req ON mr.requester_id = u_req.id
      JOIN users u_men ON mr.mentor_id = u_men.id
      JOIN skills s ON mr.skill_id = s.id
    `;
    const params: any[] = [];

    if (userId) {
      sql += ` WHERE mr.requester_id = $1 OR mr.mentor_id = $1`;
      params.push(userId);
    }

    sql += ` ORDER BY mr.created_at DESC`;

    const { rows } = await query(sql, params);

    const formattedRequests = rows.map((r) => ({
      id: r.id,
      requesterId: r.requester_id,
      requesterName: r.requester_name,
      requesterEmail: r.requester_email,
      requesterAvatar: r.requester_avatar || r.requester_name.slice(0, 2).toUpperCase(),
      requesterProgram: r.requester_program,
      mentorId: r.mentor_id,
      mentorName: r.mentor_name,
      mentorEmail: r.mentor_email,
      mentorAvatar: r.mentor_avatar || r.mentor_name.slice(0, 2).toUpperCase(),
      skillId: r.skill_id,
      skillName: r.skill_name,
      skillDomain: r.skill_domain,
      reason: r.reason,
      preferredDate: r.preferred_date,
      preferredTime: r.preferred_time,
      message: r.message,
      meetingLink: r.meeting_link,
      status: r.status,
      mentorResponseNote: r.mentor_response_note,
      sessionNotes: r.session_notes,
      createdAt: r.created_at,
      acceptedAt: r.accepted_at,
      completedAt: r.completed_at
    }));

    return NextResponse.json({ requests: formattedRequests });
  } catch (error: any) {
    console.error('Requests GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { requesterId, mentorId, skillId, reason, preferredDate, preferredTime, message } = body;

    if (!requesterId || !mentorId || !skillId) {
      return NextResponse.json({ error: 'Missing required fields (requesterId, mentorId, skillId)' }, { status: 400 });
    }

    if (requesterId === mentorId) {
      return NextResponse.json({ error: 'You cannot request mentoring from yourself' }, { status: 400 });
    }

    // Check if duplicate pending request exists
    const { rows: existing } = await query(
      `SELECT id FROM mentoring_requests 
       WHERE requester_id = $1 AND mentor_id = $2 AND skill_id = $3 AND status = 'PENDING'`,
      [requesterId, mentorId, skillId]
    );

    if (existing.length > 0) {
      return NextResponse.json({ error: 'You already have a pending request for this skill with this mentor' }, { status: 400 });
    }

    const requestId = `req-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

    // Insert request
    await query(
      `
      INSERT INTO mentoring_requests (
        id, requester_id, mentor_id, skill_id, reason, preferred_date, preferred_time, message, status, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'PENDING', NOW())
    `,
      [requestId, requesterId, mentorId, skillId, reason || '', preferredDate || '', preferredTime || '', message || '']
    );

    // Fetch requester and skill info for notification
    const { rows: reqUser } = await query(`SELECT name FROM users WHERE id = $1`, [requesterId]);
    const { rows: skillRow } = await query(`SELECT name FROM skills WHERE id = $1`, [skillId]);
    const requesterName = reqUser[0]?.name || 'A student';
    const skillName = skillRow[0]?.name || 'a skill';

    // Create database-backed notification for Mentor
    const notifId = `notif-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    await query(
      `
      INSERT INTO notifications (id, user_id, type, title, message, related_entity_id, target_tab, is_read, created_at)
      VALUES ($1, $2, 'request_received', 'New Mentoring Request', $3, $4, 'my_requests', false, NOW())
    `,
      [notifId, mentorId, `${requesterName} wants to learn ${skillName} from you.`, requestId]
    );

    return NextResponse.json({ success: true, requestId, message: 'Mentoring request submitted successfully' });
  } catch (error: any) {
    console.error('Requests POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { requestId, status, meetingLink, mentorResponseNote, sessionNotes, userId } = body;

    if (!requestId || !status) {
      return NextResponse.json({ error: 'requestId and status are required' }, { status: 400 });
    }

    // Fetch request details
    const { rows: reqRows } = await query(
      `SELECT mr.*, s.name as skill_name, u_men.name as mentor_name 
       FROM mentoring_requests mr 
       JOIN skills s ON mr.skill_id = s.id 
       JOIN users u_men ON mr.mentor_id = u_men.id 
       WHERE mr.id = $1`,
      [requestId]
    );

    if (reqRows.length === 0) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    const currentReq = reqRows[0];

    let acceptedAt = currentReq.accepted_at;
    let completedAt = currentReq.completed_at;

    if (status === 'ACCEPTED' && !acceptedAt) {
      acceptedAt = new Date().toISOString();
    }
    if (status === 'COMPLETED' && !completedAt) {
      completedAt = new Date().toISOString();
      // Increment mentor's sessions_completed count
      await query(`UPDATE users SET sessions_completed = sessions_completed + 1 WHERE id = $1`, [currentReq.mentor_id]);
    }

    await query(
      `
      UPDATE mentoring_requests 
      SET 
        status = $1,
        meeting_link = COALESCE($2, meeting_link),
        mentor_response_note = COALESCE($3, mentor_response_note),
        session_notes = COALESCE($4, session_notes),
        accepted_at = $5,
        completed_at = $6
      WHERE id = $7
    `,
      [status, meetingLink || null, mentorResponseNote || null, sessionNotes || null, acceptedAt, completedAt, requestId]
    );

    // Create Notification for the other party
    const notifId = `notif-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    if (status === 'ACCEPTED') {
      await query(
        `
        INSERT INTO notifications (id, user_id, type, title, message, related_entity_id, target_tab, is_read, created_at)
        VALUES ($1, $2, 'request_accepted', 'Mentoring Request Accepted!', $3, $4, 'my_requests', false, NOW())
      `,
        [
          notifId,
          currentReq.requester_id,
          `${currentReq.mentor_name} accepted your request for ${currentReq.skill_name}. Session scheduled.`,
          requestId
        ]
      );
    } else if (status === 'REJECTED') {
      await query(
        `
        INSERT INTO notifications (id, user_id, type, title, message, related_entity_id, target_tab, is_read, created_at)
        VALUES ($1, $2, 'request_rejected', 'Mentoring Request Update', $3, $4, 'my_requests', false, NOW())
      `,
        [
          notifId,
          currentReq.requester_id,
          `${currentReq.mentor_name} is currently unavailable for ${currentReq.skill_name}. Try exploring other peer mentors.`,
          requestId
        ]
      );
    } else if (status === 'COMPLETED') {
      await query(
        `
        INSERT INTO notifications (id, user_id, type, title, message, related_entity_id, target_tab, is_read, created_at)
        VALUES ($1, $2, 'session_completed', 'Session Completed! Please Rate Your Mentor', $3, $4, 'my_requests', false, NOW())
      `,
        [
          notifId,
          currentReq.requester_id,
          `Your session for ${currentReq.skill_name} is completed. Please leave a 5-star rating and feedback.`,
          requestId
        ]
      );
    }

    return NextResponse.json({ success: true, message: `Request status updated to ${status}` });
  } catch (error: any) {
    console.error('Requests PATCH error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
