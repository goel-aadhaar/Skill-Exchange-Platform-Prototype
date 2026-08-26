'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = Info;
        let borderClass = 'border-slate-200';
        let bgClass = 'bg-white';
        let iconColor = 'text-slate-500';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          borderClass = 'border-emerald-200';
          iconColor = 'text-emerald-600';
        } else if (toast.type === 'error') {
          Icon = AlertCircle;
          borderClass = 'border-rose-200';
          iconColor = 'text-rose-600';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          borderClass = 'border-amber-200';
          iconColor = 'text-amber-600';
        } else if (toast.type === 'info') {
          Icon = Info;
          borderClass = 'border-sky-200';
          iconColor = 'text-[#8B1E2D]';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg ${bgClass} ${borderClass} transition-all duration-200 animate-in slide-in-from-bottom-3`}
          >
            <Icon className={`w-5 h-5 ${iconColor} shrink-0 mt-0.5`} />
            <div className="flex-1 min-w-0">
              {toast.title && (
                <div className="text-xs font-semibold text-slate-900 tracking-tight">
                  {toast.title}
                </div>
              )}
              <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                {toast.message}
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
