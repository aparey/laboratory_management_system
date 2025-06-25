import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Filter, RefreshCw, DownloadCloud, Trash2, Search, FlaskConical } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { experiments } from '../data/mockData';
import { Experiment, ExperimentType, ExperimentStatus } from '../types';

export const Experiments: React.FC = () => {
  const [filteredExperiments, setFilteredExperiments] = useState<Experiment[]>(experiments);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<ExperimentType | 'ALL'>('ALL');
  const [statusFilter, setStatusFilter] = useState<ExperimentStatus | 'ALL'>('ALL');
  const [selectedExperiments, setSelectedExperiments] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Experiment | '';
    direction: 'asc' | 'desc';
  }>({ key: 'startDate', direction: 'desc' });

  // Experiment type options
  const experimentTypeOptions: { value: ExperimentType | 'ALL'; label: string }[] = [
    { value: 'ALL', label: 'All Types' },
    { value: 'CELL_STUDY', label: 'Cell Study' },
    { value: 'IMMUNE_ASSAY', label: 'Immune Assay' },
    { value: 'SEPARATION', label: 'Separation' },
    { value: 'PCR', label: 'PCR' },
    { value: 'SEQUENCING', label: 'Sequencing' },
    { value: 'MICROSCOPY', label: 'Microscopy' },
    { value: 'FLOW_CYTOMETRY', label: 'Flow Cytometry' },
    { value: 'SPECTROSCOPY', label: 'Spectroscopy' },
    { value: 'OTHER', label: 'Other' },
  ];

  // Experiment status options
  const experimentStatusOptions: { value: ExperimentStatus | 'ALL'; label: string }[] = [
    { value: 'ALL', label: 'All Statuses' },
    { value: 'PLANNED', label: 'Planned' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'COMPLETED', label: 'Completed' },
    { value: 'FAILED', label: 'Failed' },
    { value: 'CANCELLED', label: 'Cancelled' },
  ];

  // Apply filters
  useEffect(() => {
    let filtered = [...experiments];

    // Apply search filter
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        experiment =>
          experiment.name.toLowerCase().includes(lowercasedSearch) ||
          experiment.id.toLowerCase().includes(lowercasedSearch) ||
          experiment.description.toLowerCase().includes(lowercasedSearch)
      );
    }

    // Apply type filter
    if (typeFilter !== 'ALL') {
      filtered = filtered.filter(experiment => experiment.type === typeFilter);
    }

    // Apply status filter
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(experiment => experiment.status === statusFilter);
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof Experiment];
        const bValue = b[sortConfig.key as keyof Experiment];
        
        if (aValue === null) return sortConfig.direction === 'asc' ? -1 : 1;
        if (bValue === null) return sortConfig.direction === 'asc' ? 1 : -1;
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc' 
            ? aValue.localeCompare(bValue) 
            : bValue.localeCompare(aValue);
        }
        
        return sortConfig.direction === 'asc' 
          ? (aValue as any) - (bValue as any) 
          : (bValue as any) - (aValue as any);
      });
    }

    setFilteredExperiments(filtered);
  }, [searchTerm, typeFilter, statusFilter, sortConfig]);

  // Handle sorting
  const handleSort = (key: keyof Experiment) => {
    setSortConfig(current => ({
      key,
      direction:
        current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Toggle select experiment
  const toggleSelectExperiment = (id: string) => {
    setSelectedExperiments(current =>
      current.includes(id)
        ? current.filter(experimentId => experimentId !== id)
        : [...current, id]
    );
  };

  // Toggle select all experiments
  const toggleSelectAll = () => {
    if (selectedExperiments.length === filteredExperiments.length) {
      setSelectedExperiments([]);
    } else {
      setSelectedExperiments(filteredExperiments.map(experiment => experiment.id));
    }
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setTypeFilter('ALL');
    setStatusFilter('ALL');
    setSortConfig({ key: 'startDate', direction: 'desc' });
  };

  useEffect(() => {
    document.title = 'Experiments - LabTrack';
  }, []);

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return format(parseISO(dateString), 'MMM d, yyyy');
  };

  return (
    <div className="py-6 space-y-6 fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Experiments</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage your laboratory experiments
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/experiments/new"
            className="btn-primary inline-flex items-center"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Experiment
          </Link>
        </div>
      </div>

      {/* Filters and search */}
      <div className="card">
        <div className="p-4">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="search"
                className="input pl-10"
                placeholder="Search experiments by name, ID, or description..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="w-full sm:w-auto">
                <select
                  className="select"
                  value={typeFilter}
                  onChange={e => setTypeFilter(e.target.value as ExperimentType | 'ALL')}
                >
                  {experimentTypeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="w-full sm:w-auto">
                <select
                  className="select"
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value as ExperimentStatus | 'ALL')}
                >
                  {experimentStatusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                className="btn-outline flex items-center text-sm"
                onClick={handleResetFilters}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Experiments grid */}
      <div className="card">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center">
            <h2 className="font-medium text-slate-800 dark:text-slate-200">
              Experiment List
            </h2>
            <span className="ml-2 badge-blue">{filteredExperiments.length} experiments</span>
          </div>
          
          {selectedExperiments.length > 0 && (
            <div className="mt-3 sm:mt-0 flex items-center space-x-3">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {selectedExperiments.length} selected
              </span>
              <button className="btn-outline text-sm flex items-center">
                <DownloadCloud className="mr-1 h-4 w-4" />
                Export
              </button>
              <button className="btn-danger text-sm flex items-center">
                <Trash2 className="mr-1 h-4 w-4" />
                Delete
              </button>
            </div>
          )}
        </div>
        
        <div className="p-4">
          {filteredExperiments.length === 0 ? (
            <div className="text-center py-8">
              <FlaskConical className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600" />
              <h3 className="mt-2 text-base font-medium text-slate-900 dark:text-white">No experiments found</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredExperiments.map(experiment => (
                <div 
                  key={experiment.id}
                  className="border border-slate-200 dark:border-slate-700 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-600 dark:bg-slate-800"
                        checked={selectedExperiments.includes(experiment.id)}
                        onChange={() => toggleSelectExperiment(experiment.id)}
                      />
                      <span className={`ml-3 px-2 py-1 text-xs rounded ${
                        experiment.status === 'COMPLETED'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : experiment.status === 'IN_PROGRESS'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                          : experiment.status === 'PLANNED'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                          : experiment.status === 'FAILED'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                      }`}>
                        {experiment.status}
                      </span>
                    </div>
                    <span className="badge-blue">{experiment.type}</span>
                  </div>
                  <div className="p-4">
                    <Link to={`/experiments/${experiment.id}`} className="block">
                      <h3 className="text-lg font-medium text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        {experiment.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {experiment.description.length > 100
                          ? `${experiment.description.slice(0, 100)}...`
                          : experiment.description}
                      </p>
                      
                      <div className="mt-4 flex items-center text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center">
                          <svg className="mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          Started: {formatDate(experiment.startDate)}
                        </div>
                        {experiment.endDate && (
                          <div className="flex items-center ml-4">
                            <svg className="mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"></circle>
                              <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            Ended: {formatDate(experiment.endDate)}
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 flex items-center">
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {experiment.samples.length} samples
                        </div>
                        <div className="ml-4 text-xs text-slate-500 dark:text-slate-400">
                          {experiment.results.length} results
                        </div>
                        <Link
                          to={`/experiments/${experiment.id}`}
                          className="ml-auto text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                        >
                          View details &rarr;
                        </Link>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};