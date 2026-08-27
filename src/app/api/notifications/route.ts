import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const { rows } = await query(
      `SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50`,
      [userId]
    );

    const formatted = rows.map((n) => ({
      id: n.id,
      userId: n.user_id,
      type: n.type,
      title: n.title,
      message: n.message,
      relatedEntityId: n.related_entity_id,
      targetTab: n.target_tab,
      isRead: n.is_read,
      createdAt: n.created_at
    }));

    return NextResponse.json({ notifications: formatted });
  } catch (error: any) {
    console.error('Notifications GET error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { notificationId, userId, markAll } = body;

    if (markAll && userId) {
      await query(`UPDATE notifications SET is_read = true WHERE user_id = $1`, [userId]);
      return NextResponse.json({ success: true, message: 'All notifications marked as read' });
    }

    if (notificationId) {
      await query(`UPDATE notifications SET is_read = true WHERE id = $1`, [notificationId]);
      return NextResponse.json({ success: true, message: 'Notification marked as read' });
    }

    return NextResponse.json({ error: 'notificationId or (markAll and userId) required' }, { status: 400 });
  } catch (error: any) {
    console.error('Notifications PATCH error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
