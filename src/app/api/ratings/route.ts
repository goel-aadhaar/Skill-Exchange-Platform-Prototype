import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const mentorId = searchParams.get('mentorId');

    let sql = `
      SELECT 
        rr.*,
        u_rev.name as reviewer_name,
        u_rev.avatar as reviewer_avatar,
        u_rev.program as reviewer_program,
        u_men.name as mentor_name
      FROM ratings_reviews rr
      JOIN users u_rev ON rr.reviewer_id = u_rev.id
      JOIN users u_men ON rr.mentor_id = u_men.id
    `;
    const params: any[] = [];

    if (mentorId) {
      sql += ` WHERE rr.mentor_id = $1`;
      params.push(mentorId);
    }

    sql += ` ORDER BY rr.created_at DESC`;

    const { rows } = await query(sql, params);

    const formattedRatings = rows.map((r) => ({
      id: r.id,
      requestId: r.request_id,
      reviewerId: r.reviewer_id,
      reviewerName: r.reviewer_name,
      reviewerAvatar: r.reviewer_avatar || r.reviewer_name.slice(0, 2).toUpperCase(),
      reviewerProgram: r.reviewer_program,
      mentorId: r.mentor_id,
      mentorName: r.mentor_name,
      skillName: r.skill_name,
      rating: r.rating,
      tags: r.tags || [],
      review: r.review,
      createdAt: r.created_at
    }));

    return NextResponse.json({ ratings: formattedRatings });
  } catch (error: any) {
    console.error('Ratings GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { requestId, reviewerId, mentorId, skillName, rating, tags, review } = body;

    if (!requestId || !reviewerId || !mentorId || !rating) {
      return NextResponse.json({ error: 'Missing required review fields' }, { status: 400 });
    }

    const ratingId = `rat-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

    // Insert into ratings_reviews
    await query(
      `
      INSERT INTO ratings_reviews (id, request_id, reviewer_id, mentor_id, skill_name, rating, tags, review, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
    `,
      [ratingId, requestId, reviewerId, mentorId, skillName || 'Peer Mentorship', rating, tags || [], review || '']
    );

    // Update request status to COMPLETED if not already
    await query(`UPDATE mentoring_requests SET status = 'COMPLETED', completed_at = COALESCE(completed_at, NOW()) WHERE id = $1`, [requestId]);

    // Recalculate Mentor Average Rating
    const { rows: avgRows } = await query(
      `SELECT AVG(rating) as avg_rating, COUNT(id) as total_count FROM ratings_reviews WHERE mentor_id = $1`,
      [mentorId]
    );

    const newAvg = parseFloat(avgRows[0]?.avg_rating) || rating;
    const newCount = parseInt(avgRows[0]?.total_count) || 1;

    await query(`UPDATE users SET rating = $1, ratings_count = $2 WHERE id = $3`, [newAvg.toFixed(2), newCount, mentorId]);

    // Create Notification for Mentor
    const { rows: reviewerRow } = await query(`SELECT name FROM users WHERE id = $1`, [reviewerId]);
    const reviewerName = reviewerRow[0]?.name || 'Your mentee';

    const notifId = `notif-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    await query(
      `
      INSERT INTO notifications (id, user_id, type, title, message, related_entity_id, target_tab, is_read, created_at)
      VALUES ($1, $2, 'rating_received', 'New Peer Review Received!', $3, $4, 'profile', false, NOW())
    `,
      [notifId, mentorId, `${reviewerName} gave you a ${rating}★ review for ${skillName || 'mentoring'}.`, ratingId]
    );

    return NextResponse.json({ success: true, ratingId, message: 'Rating submitted successfully' });
  } catch (error: any) {
    console.error('Ratings POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
