import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Plus, Clock, AlertTriangle, CheckCircle, Beaker } from 'lucide-react';
import { samples, experiments, generateSamplesByTypeData, generateExperimentStatusData, generateExperimentsTimelineData } from '../data/mockData';
import { DashboardMetric } from '../components/dashboard/DashboardMetric';
import { DashboardChart } from '../components/dashboard/DashboardChart';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { ExperimentStatus, SampleStatus } from '../types';

export const Dashboard: React.FC = () => {
  // Calculate metrics
  const activeSamples = samples.filter(s => s.status === 'ACTIVE').length;
  const totalSamples = samples.length;
  const experimentsInProgress = experiments.filter(e => e.status === 'IN_PROGRESS').length;
  const totalExperiments = experiments.length;
  const completedExperiments = experiments.filter(e => e.status === 'COMPLETED').length;
  const failedExperiments = experiments.filter(e => e.status === 'FAILED').length;
  
  // Chart data
  const samplesByTypeData = generateSamplesByTypeData();
  const experimentStatusData = generateExperimentStatusData();
  const experimentsTimelineData = generateExperimentsTimelineData();
  
  useEffect(() => {
    document.title = 'Dashboard - LabTrack';
  }, []);

  return (
    <div className="py-6 space-y-6 fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Overview of your laboratory samples and experiments
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Link to="/samples/new" className="btn-outline">
            <Plus className="h-4 w-4 mr-1" />
            New Sample
          </Link>
          <Link to="/experiments/new" className="btn-primary">
            <Beaker className="h-4 w-4 mr-1" />
            New Experiment
          </Link>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardMetric 
          title="Active Samples"
          value={activeSamples}
          total={totalSamples}
          icon={<Beaker className="h-6 w-6 text-indigo-400" />}
          trend={{ direction: 'up', value: '12%', text: 'from last month' }}
        />
        <DashboardMetric 
          title="Total Experiments"
          value={totalExperiments}
          icon={<ArrowUpRight className="h-6 w-6 text-teal-400" />}
          trend={{ direction: 'up', value: '23%', text: 'from last month' }}
        />
        <DashboardMetric 
          title="In Progress"
          value={experimentsInProgress}
          icon={<Clock className="h-6 w-6 text-amber-400" />}
          trend={{ direction: 'same', text: 'steady pace' }}
        />
        <DashboardMetric 
          title="Success Rate"
          value={`${Math.round((completedExperiments / (completedExperiments + failedExperiments)) * 100)}%`}
          icon={<CheckCircle className="h-6 w-6 text-green-400" />}
          trend={{ direction: 'up', value: '5%', text: 'from last month' }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <h2 className="font-medium text-slate-800 dark:text-slate-200">Samples by Type</h2>
          </div>
          <div className="p-4">
            <DashboardChart type="doughnut" data={samplesByTypeData} />
          </div>
        </div>
        
        <div className="card">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <h2 className="font-medium text-slate-800 dark:text-slate-200">Experiment Status</h2>
          </div>
          <div className="p-4">
            <DashboardChart type="bar" data={experimentStatusData} />
          </div>
        </div>
      </div>

      {/* Timeline Chart */}
      <div className="card">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="font-medium text-slate-800 dark:text-slate-200">Experiments Timeline</h2>
        </div>
        <div className="p-4">
          <DashboardChart type="line" data={experimentsTimelineData} />
        </div>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <h2 className="font-medium text-slate-800 dark:text-slate-200">Recent Activity</h2>
          </div>
          <div className="p-4">
            <RecentActivity 
              samples={samples.slice(0, 3)} 
              experiments={experiments.slice(0, 3)} 
            />
          </div>
        </div>
        
        <div className="card">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center">
            <h2 className="font-medium text-slate-800 dark:text-slate-200">Alerts</h2>
            <span className="ml-2 badge-red">3 New</span>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            <div className="p-4 flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Sample expiring soon</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  DNA-782 expires in 3 days. Consider taking action.
                </p>
              </div>
            </div>
            <div className="p-4 flex items-start">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Low temperature alert</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Freezer B temperature above normal range. Check immediately.
                </p>
              </div>
            </div>
            <div className="p-4 flex items-start">
              <AlertTriangle className="h-5 w-5 text-indigo-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Experiment needs attention</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  CELL_STUDY-EXP-345 has been inactive for 7 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};