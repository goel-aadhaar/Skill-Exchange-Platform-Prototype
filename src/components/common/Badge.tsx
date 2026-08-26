import React from 'react';
import { ShieldCheck, Sparkles, CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react';
import { ProficiencyLevel, PriorityLevel, RequestStatus } from '../../types';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'default' | 'verified' | 'proficiency' | 'priority' | 'status' | 'domain' | 'outline' | 'company-tier';
  level?: ProficiencyLevel | PriorityLevel | RequestStatus | string;
  className?: string;
  size?: 'xs' | 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  level,
  className = '',
  size = 'sm'
}) => {
  const sizeClasses = {
    xs: 'text-[10px] px-1.5 py-0.5',
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1 font-medium'
  }[size];

  if (variant === 'verified') {
    return (
      <span className={`inline-flex items-center gap-1 font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 ${sizeClasses} ${className}`}>
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        {children || 'Verified Mentor'}
      </span>
    );
  }

  if (variant === 'proficiency') {
    const prof = (level as ProficiencyLevel) || 'Intermediate';
    const profStyles = {
      Beginner: 'bg-slate-100 text-slate-700 border-slate-200',
      Intermediate: 'bg-sky-50 text-sky-700 border-sky-200',
      Advanced: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      Expert: 'bg-purple-50 text-purple-700 border-purple-200'
    }[prof] || 'bg-slate-100 text-slate-700 border-slate-200';

    return (
      <span className={`inline-flex items-center font-medium rounded-full border ${profStyles} ${sizeClasses} ${className}`}>
        {children || prof}
      </span>
    );
  }

  if (variant === 'priority') {
    const prio = (level as PriorityLevel) || 'Medium';
    const prioStyles = {
      High: 'bg-rose-50 text-rose-700 border-rose-200',
      Medium: 'bg-amber-50 text-amber-700 border-amber-200',
      Low: 'bg-slate-100 text-slate-600 border-slate-200'
    }[prio] || 'bg-slate-100 text-slate-700 border-slate-200';

    return (
      <span className={`inline-flex items-center font-medium rounded-full border ${prioStyles} ${sizeClasses} ${className}`}>
        {children || `${prio} Priority`}
      </span>
    );
  }

  if (variant === 'status') {
    const stat = (level as RequestStatus) || 'Pending';
    let statStyle = 'bg-slate-100 text-slate-700 border-slate-200';
    let Icon = Clock;

    if (stat === 'Pending') {
      statStyle = 'bg-amber-50 text-amber-800 border-amber-200';
      Icon = Clock;
    } else if (stat === 'Accepted' || stat === 'Active') {
      statStyle = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      Icon = CheckCircle2;
    } else if (stat === 'Completed') {
      statStyle = 'bg-blue-50 text-blue-800 border-blue-200';
      Icon = Sparkles;
    } else if (stat === 'Rejected' || stat === 'Cancelled') {
      statStyle = 'bg-rose-50 text-rose-800 border-rose-200';
      Icon = XCircle;
    }

    return (
      <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${statStyle} ${sizeClasses} ${className}`}>
        <Icon className="w-3 h-3" />
        {children || stat}
      </span>
    );
  }

  if (variant === 'domain') {
    return (
      <span className={`inline-flex items-center font-medium rounded-md bg-slate-100 text-slate-700 border border-slate-200 ${sizeClasses} ${className}`}>
        {children}
      </span>
    );
  }

  if (variant === 'company-tier') {
    return (
      <span className={`inline-flex items-center font-medium rounded-md bg-amber-50 text-amber-800 border border-amber-200 ${sizeClasses} ${className}`}>
        ★ {children}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center font-medium rounded-full bg-slate-100 text-slate-700 border border-slate-200 ${sizeClasses} ${className}`}>
      {children}
    </span>
  );
};
