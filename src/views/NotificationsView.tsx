'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  CheckCircle2,
  Inbox,
  ShieldCheck,
  Building2,
  Star,
  Info,
  ArrowRight
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
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

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
        return { Icon: Info, color: 'text-slate-600', bg: 'bg-slate-100' };
    }
  };

  const getTimeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${Math.max(1, mins)} min ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hr ago`;
    return `${Math.floor(hours / 24)} days ago`;
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150 max-w-4xl">
      <div className="border-b border-slate-200 pb-6 pt-2 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
            Notifications
          </h1>
          <p className="text-sm text-slate-600">
            Activity stream for mentoring requests, verifications, and system updates.
          </p>
        </div>
        
        {unreadNotifsCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="text-xs font-bold text-[#0B192C] hover:underline"
          >
            Mark all as read
          </button>
        )}
      </div>

      {userNotifications.length === 0 ? (
        <div className="text-center py-12 border border-slate-200 border-dashed rounded bg-slate-50 text-slate-500 text-sm">
          You have no notifications yet.
        </div>
      ) : (
        <div className="border border-slate-200 rounded bg-white overflow-hidden">
          <div className="divide-y divide-slate-100">
            {userNotifications.map((notif) => {
              const { Icon, color, bg } = getNotifIcon(notif.type);
              return (
                <div
                  key={notif.id}
                  onClick={() => {
                    if (!notif.isRead) markNotificationAsRead(notif.id);
                    if (notif.targetTab) setActiveTab(notif.targetTab as any);
                  }}
                  className={`p-4 transition-colors cursor-pointer flex items-start gap-3 hover:bg-slate-50 ${
                    !notif.isRead ? 'bg-slate-50/50' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${bg} ${color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-sm ${!notif.isRead ? 'font-bold text-slate-900' : 'font-medium text-slate-800'}`}>
                        {notif.title}
                      </span>
                      {!notif.isRead && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                      )}
                    </div>
                    <p className={`text-xs ${!notif.isRead ? 'text-slate-700' : 'text-slate-500'}`}>
                      {notif.message}
                    </p>
                    <div className="text-[10px] text-slate-400 mt-1.5">
                      {getTimeAgo(notif.createdAt)}
                    </div>
                  </div>

                  {notif.targetTab && (
                    <div className="shrink-0 pt-1">
                      <button className="text-[10px] font-bold text-slate-400 hover:text-[#0B192C] flex items-center gap-1 uppercase tracking-wider transition-colors">
                        View
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
