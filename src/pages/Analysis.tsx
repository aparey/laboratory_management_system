import React, { useEffect, useState } from 'react';
import { Filter, Download, Share } from 'lucide-react';
import { experiments, samples, generateSamplesByTypeData, generateExperimentStatusData, generateExperimentsTimelineData } from '../data/mockData';
import { DashboardChart } from '../components/dashboard/DashboardChart';
import { ChartData } from '../types';

type ChartType = 'doughnut' | 'bar' | 'line';
type TimeRange = '7d' | '30d' | '90d' | '1y' | 'all';

export const Analysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'samples' | 'experiments'>('samples');
  const [selectedChart, setSelectedChart] = useState<string>('samplesByType');
  const [timeRange, setTimeRange] = useState<TimeRange>('all');
  
  // Chart data
  const samplesByTypeData = generateSamplesByTypeData();
  const experimentStatusData = generateExperimentStatusData();
  const experimentsTimelineData = generateExperimentsTimelineData();
  
  // Sample charts configuration
  const sampleCharts = [
    { id: 'samplesByType', title: 'Samples by Type', type: 'doughnut' as ChartType, data: samplesByTypeData },
    { id: 'samplesByStatus', title: 'Samples by Status', type: 'bar' as ChartType, data: generateSamplesByStatusData() },
    { id: 'samplesOverTime', title: 'Samples Created Over Time', type: 'line' as ChartType, data: generateSamplesOverTimeData() },
  ];
  
  // Experiment charts configuration
  const experimentCharts = [
    { id: 'experimentsByStatus', title: 'Experiments by Status', type: 'doughnut' as ChartType, data: experimentStatusData },
    { id: 'experimentsByType', title: 'Experiments by Type', type: 'bar' as ChartType, data: generateExperimentsByTypeData() },
    { id: 'experimentsOverTime', title: 'Experiments Over Time', type: 'line' as ChartType, data: experimentsTimelineData },
    { id: 'experimentSuccess', title: 'Experiment Success Rate', type: 'bar' as ChartType, data: generateExperimentSuccessData() },
  ];
  
  const allCharts = [...sampleCharts, ...experimentCharts];
  const currentChart = allCharts.find(chart => chart.id === selectedChart);
  
  useEffect(() => {
    document.title = 'Analysis - LabTrack';
  }, []);
  
  // Helper to generate sample status chart data
  function generateSamplesByStatusData(): ChartData {
    const statusCounts: Record<string, number> = {};
    
    samples.forEach(sample => {
      statusCounts[sample.status] = (statusCounts[sample.status] || 0) + 1;
    });
    
    return {
      labels: Object.keys(statusCounts),
      datasets: [
        {
          label: 'Sample Status',
          data: Object.values(statusCounts),
          backgroundColor: [
            'rgba(16, 185, 129, 0.7)',  // ACTIVE
            'rgba(245, 158, 11, 0.7)',  // DEPLETED
            'rgba(239, 68, 68, 0.7)',   // COMPROMISED
            'rgba(107, 114, 128, 0.7)', // ARCHIVED
            'rgba(124, 58, 237, 0.7)',  // EXPIRED
          ],
          borderWidth: 1,
        },
      ],
    };
  }
  
  // Helper to generate samples over time chart data
  function generateSamplesOverTimeData(): ChartData {
    // Last 12 months
    const now = new Date();
    const months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1);
      return date.toLocaleString('default', { month: 'short' });
    });
    
    // Count samples created in each month
    const data = Array(12).fill(0);
    
    samples.forEach(sample => {
      const date = new Date(sample.createdAt);
      const monthsDiff = (now.getFullYear() - date.getFullYear()) * 12 + now.getMonth() - date.getMonth();
      
      if (monthsDiff < 12 && monthsDiff >= 0) {
        data[11 - monthsDiff]++;
      }
    });
    
    return {
      labels: months,
      datasets: [
        {
          label: 'New Samples',
          data,
          borderColor: 'rgba(67, 56, 202, 0.7)',
          backgroundColor: 'rgba(67, 56, 202, 0.2)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
        },
      ],
    };
  }
  
  // Helper to generate experiment type chart data
  function generateExperimentsByTypeData(): ChartData {
    const typeCounts: Record<string, number> = {};
    
    experiments.forEach(experiment => {
      typeCounts[experiment.type] = (typeCounts[experiment.type] || 0) + 1;
    });
    
    return {
      labels: Object.keys(typeCounts),
      datasets: [
        {
          label: 'Experiment Type',
          data: Object.values(typeCounts),
          backgroundColor: [
            'rgba(67, 56, 202, 0.7)',
            'rgba(13, 148, 136, 0.7)',
            'rgba(245, 158, 11, 0.7)',
            'rgba(239, 68, 68, 0.7)',
            'rgba(16, 185, 129, 0.7)',
            'rgba(99, 102, 241, 0.7)',
            'rgba(251, 146, 60, 0.7)',
            'rgba(37, 99, 235, 0.7)',
            'rgba(124, 58, 237, 0.7)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }
  
  // Helper to generate experiment success rate chart data
  function generateExperimentSuccessData(): ChartData {
    const expTypes = [...new Set(experiments.map(e => e.type))];
    const successCounts: Record<string, number> = {};
    const totalCounts: Record<string, number> = {};
    
    expTypes.forEach(type => {
      successCounts[type] = 0;
      totalCounts[type] = 0;
    });
    
    experiments.forEach(experiment => {
      if (experiment.status === 'COMPLETED' || experiment.status === 'FAILED') {
        totalCounts[experiment.type]++;
        
        if (experiment.status === 'COMPLETED') {
          successCounts[experiment.type]++;
        }
      }
    });
    
    const successRates = expTypes.map(type => {
      return totalCounts[type] > 0 ? (successCounts[type] / totalCounts[type]) * 100 : 0;
    });
    
    return {
      labels: expTypes,
      datasets: [
        {
          label: 'Success Rate (%)',
          data: successRates,
          backgroundColor: 'rgba(16, 185, 129, 0.7)',
          borderWidth: 1,
        },
      ],
    };
  }

  return (
    <div className="py-6 space-y-6 fade-in">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Data Analysis</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Analyze and visualize your laboratory data
        </p>
      </div>

      {/* Tab navigation */}
      <div className="border-b border-slate-200 dark:border-slate-700">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'samples'
                ? 'border-indigo-500 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'
            }`}
            onClick={() => setActiveTab('samples')}
          >
            Sample Analysis
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'experiments'
                ? 'border-indigo-500 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'
            }`}
            onClick={() => setActiveTab('experiments')}
          >
            Experiment Analysis
          </button>
        </nav>
      </div>

      {/* Charts selection and actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="card">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center">
              <h2 className="font-medium text-slate-800 dark:text-slate-200">Available Charts</h2>
            </div>
            <div className="p-4">
              <div className="space-y-1">
                {(activeTab === 'samples' ? sampleCharts : experimentCharts).map(chart => (
                  <button
                    key={chart.id}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                      selectedChart === chart.id
                        ? 'bg-indigo-50 text-indigo-700 font-medium dark:bg-indigo-900/30 dark:text-indigo-300'
                        : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/50'
                    }`}
                    onClick={() => setSelectedChart(chart.id)}
                  >
                    {chart.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="card mt-6">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="font-medium text-slate-800 dark:text-slate-200">Filters</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="time-range" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Time Range
                  </label>
                  <select
                    id="time-range"
                    className="select"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value as TimeRange)}
                  >
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                    <option value="1y">Last year</option>
                    <option value="all">All time</option>
                  </select>
                </div>
                
                <button className="w-full btn-outline flex items-center justify-center text-sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
          
          <div className="card mt-6">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="font-medium text-slate-800 dark:text-slate-200">Actions</h2>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <button className="w-full btn-outline flex items-center justify-center text-sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export Chart
                </button>
                <button className="w-full btn-outline flex items-center justify-center text-sm">
                  <Share className="mr-2 h-4 w-4" />
                  Share Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="card h-full">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="font-medium text-slate-800 dark:text-slate-200">
                {currentChart?.title || 'Select a chart'}
              </h2>
            </div>
            <div className="p-6 h-[500px] flex flex-col">
              {currentChart ? (
                <>
                  <div className="flex-1">
                    <DashboardChart 
                      type={currentChart.type}
                      data={currentChart.data}
                      height={400}
                    />
                  </div>
                  <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                    <p>
                      This chart shows {currentChart.title.toLowerCase()}. 
                      {currentChart.id.includes('OverTime') 
                        ? ' The data is grouped by month showing the trend over the past year.'
                        : currentChart.id.includes('Success')
                        ? ' Success rate is calculated as the percentage of completed experiments vs failed experiments.'
                        : ' The distribution helps identify patterns and focus areas.'}
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400 dark:text-slate-500">
                  <p>Select a chart from the left panel to view analysis</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Insights panel */}
      <div className="card">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="font-medium text-slate-800 dark:text-slate-200">Insights</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20 rounded-lg">
              <h3 className="text-sm font-medium text-green-800 dark:text-green-400">Most Efficient Experiment Type</h3>
              <p className="mt-2 text-sm text-green-700 dark:text-green-300">
                <span className="font-medium">CELL_STUDY</span> - 87% success rate
              </p>
              <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                Consider optimizing other experiment types using similar protocols.
              </p>
            </div>
            
            <div className="p-4 border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-900/20 rounded-lg">
              <h3 className="text-sm font-medium text-amber-800 dark:text-amber-400">Sample Storage Alert</h3>
              <p className="mt-2 text-sm text-amber-700 dark:text-amber-300">
                <span className="font-medium">DNA samples</span> - 12% expiring soon
              </p>
              <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">
                Review storage conditions and update expiration dates if needed.
              </p>
            </div>
            
            <div className="p-4 border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-900/20 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-400">Trending Upwards</h3>
              <p className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <span className="font-medium">SEQUENCING</span> - 132% increase
              </p>
              <p className="mt-1 text-xs text-blue-600 dark:text-blue-400">
                Sequencing experiments have shown the most growth over the last quarter.
              </p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-3">Recommendations</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>Consider increasing resources for CELL_STUDY experiments given their high success rate.</li>
              <li>Review DNA sample storage conditions to reduce expiration rate.</li>
              <li>Evaluate failed SEPARATION experiments to identify common issues and improve protocols.</li>
              <li>Prepare for increased SEQUENCING demand by ensuring adequate equipment and reagent supplies.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};