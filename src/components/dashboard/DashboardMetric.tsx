import React from 'react';

interface DashboardMetricProps {
  title: string;
  value: string | number;
  total?: number;
  icon: React.ReactNode;
  trend?: {
    direction: 'up' | 'down' | 'same';
    value?: string;
    text: string;
  };
}

export const DashboardMetric: React.FC<DashboardMetricProps> = ({
  title,
  value,
  total,
  icon,
  trend,
}) => {
  return (
    <div className="card p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
            {value}
            {total && <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-1">/ {total}</span>}
          </p>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-lg">{icon}</div>
      </div>
      
      {trend && (
        <div className="mt-4 flex items-center text-xs">
          {trend.direction === 'up' && (
            <svg className="w-3 h-3 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          )}
          {trend.direction === 'down' && (
            <svg className="w-3 h-3 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          )}
          {trend.direction === 'same' && (
            <svg className="w-3 h-3 text-slate-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
            </svg>
          )}
          <span className={`font-medium ${trend.direction === 'up' ? 'text-green-500' : trend.direction === 'down' ? 'text-red-500' : 'text-slate-500'}`}>
            {trend.value && trend.value}
          </span>
          <span className="text-slate-500 dark:text-slate-400 ml-1">{trend.text}</span>
        </div>
      )}
    </div>
  );
};