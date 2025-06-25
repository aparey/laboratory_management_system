import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { Sample, Experiment } from '../../types';
import { Beaker, FlaskConical } from 'lucide-react';

interface RecentActivityProps {
  samples: Sample[];
  experiments: Experiment[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ samples, experiments }) => {
  // Combine and sort activities
  const activities = [
    ...samples.map(sample => ({
      type: 'sample' as const,
      id: sample.id,
      name: sample.name,
      date: parseISO(sample.createdAt),
      status: sample.status,
    })),
    ...experiments.map(experiment => ({
      type: 'experiment' as const,
      id: experiment.id,
      name: experiment.name,
      date: parseISO(experiment.startDate),
      status: experiment.status,
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);

  return (
    <div className="space-y-4">
      {activities.length === 0 ? (
        <p className="text-center text-slate-500 dark:text-slate-400 py-4">No recent activity.</p>
      ) : (
        activities.map(activity => (
          <div 
            key={`${activity.type}-${activity.id}`}
            className="flex items-start p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors slide-in-right"
          >
            <div className={`rounded-full p-2 mr-3 ${
              activity.type === 'sample' 
                ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                : 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400'
            }`}>
              {activity.type === 'sample' 
                ? <Beaker className="h-5 w-5" /> 
                : <FlaskConical className="h-5 w-5" />
              }
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                  {activity.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap ml-2">
                  {format(activity.date, 'MMM d, yyyy')}
                </p>
              </div>
              
              <div className="mt-1 flex items-center">
                <span className={`text-xs px-1.5 py-0.5 rounded ${
                  activity.status === 'ACTIVE' || activity.status === 'COMPLETED' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : activity.status === 'IN_PROGRESS' || activity.status === 'PLANNED'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {activity.status}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
                  {activity.type === 'sample' ? 'Sample created' : 'Experiment started'}
                </span>
              </div>
              
              <Link
                to={`/${activity.type}s/${activity.id}`}
                className="mt-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
              >
                View details &rarr;
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};