'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { EmptyState } from '../components/common/EmptyState';
import {
  Bell,
  CheckCircle2,
  Inbox,
  ShieldCheck,
  Building2,
  Star,
  Info,
  Clock,
  ExternalLink
} from 'lucide-react';

export const NotificationsView: React.FC = () => {
  const {
    notifications,
    currentUser,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setActiveTab,
    unreadNotifsCount
  } = useApp();

  const userNotifications = notifications.filter(
    (n) => n.userId === currentUser.id || n.userId === 'all'
  );

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'request_accepted':
        return { Icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' };
      case 'request_received':
        return { Icon: Inbox, color: 'text-blue-600', bg: 'bg-blue-50' };
      case 'skill_verified':
        return { Icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' };
      case 'placement_alert':
        return { Icon: Building2, color: 'text-amber-600', bg: 'bg-amber-50' };
      case 'rating_received':
        return { Icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' };
      default:
        return { Icon: Info, color: 'text-blue-900', bg: 'bg-blue-50' };
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#0F2942] text-amber-400 border border-amber-400/40 flex items-center justify-center font-bold shadow-xs">
              <Bell className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Notifications & Activity Stream
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time updates on peer mentoring bookings, session confirmations, and placement drives.
          </p>
        </div>

        {unreadNotifsCount > 0 && (
          <button
            type="button"
            onClick={markAllNotificationsAsRead}
            className="px-3.5 py-2 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-500 rounded-xl transition-colors shadow-2xs self-start sm:self-auto"
          >
            Mark All as Read
          </button>
        )}
      </div>

      {/* Notifications List */}
      {userNotifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="You're All Caught Up"
          description="There are no notifications right now. New activity on your requests and skills will appear here."
        />
      ) : (
        <div className="space-y-3">
          {userNotifications.map((notif) => {
            const { Icon, color, bg } = getNotifIcon(notif.type);
            return (
              <div
                key={notif.id}
                onClick={() => {
                  markNotificationAsRead(notif.id);
                  if (notif.targetTab) {
                    setActiveTab(notif.targetTab as any);
                  }
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                  notif.isRead
                    ? 'bg-white border-slate-200 opacity-85 hover:opacity-100 hover:border-slate-300'
                    : 'bg-amber-50/40 border-amber-300 shadow-2xs font-semibold'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-9 h-9 rounded-xl ${bg} ${color} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-extrabold text-slate-900 flex items-center gap-2">
                      <span>{notif.title}</span>
                      {!notif.isRead && (
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {notif.message}
                    </p>
                    <div className="text-[10px] text-slate-400 pt-0.5">
                      {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(notif.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {notif.targetTab && (
                  <span className="text-[11px] font-bold text-blue-900 hover:underline shrink-0 flex items-center gap-0.5 self-center">
                    <span>View</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
