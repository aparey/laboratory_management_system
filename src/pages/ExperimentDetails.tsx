import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Share, Clock, Download, ArrowRight, FlaskConical, Beaker, Tag, CheckCircle, AlertTriangle } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { experiments, samples as allSamples } from '../data/mockData';
import { Experiment, Sample } from '../types';

export const ExperimentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experiment, setExperiment] = useState<Experiment | null>(null);
  const [experimentSamples, setExperimentSamples] = useState<Sample[]>([]);
  
  useEffect(() => {
    // Find the experiment
    const foundExperiment = experiments.find(e => e.id === id);
    if (foundExperiment) {
      setExperiment(foundExperiment);
      document.title = `${foundExperiment.name} - LabTrack`;
      
      // Find related samples
      const relatedSamples = allSamples.filter(s => 
        foundExperiment.samples.includes(s.id)
      );
      setExperimentSamples(relatedSamples);
    } else {
      navigate('/experiments');
    }
  }, [id, navigate]);
  
  if (!experiment) {
    return (
      <div className="py-12 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-12 w-12 mb-4"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-48 mb-2"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-36"></div>
        </div>
      </div>
    );
  }

  // Format dates
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return format(parseISO(dateString), 'MMMM d, yyyy');
  };
  
  // Get status color class
  const getStatusColorClass = () => {
    switch (experiment.status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'PLANNED':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'FAILED':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'CANCELLED':
        return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div className="py-6 fade-in">
      {/* Back button and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center">
          <Link to="/experiments" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className="mx-2 text-slate-300 dark:text-slate-600">/</span>
          <span className="text-slate-500 dark:text-slate-400">Experiments</span>
          <span className="mx-2 text-slate-300 dark:text-slate-600">/</span>
          <span className="text-slate-900 dark:text-white font-medium">{experiment.name}</span>
        </div>
        
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="btn-outline">
            <Share className="h-4 w-4 mr-1" />
            Share
          </button>
          <button className="btn-outline">
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </button>
          <button className="btn-danger">
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </button>
        </div>
      </div>
      
      {/* Experiment details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-start">
                <div className="flex-shrink-0 bg-teal-50 dark:bg-teal-900/30 rounded-lg p-4 flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
                  <FlaskConical className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">{experiment.name}</h1>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <span className="badge-blue">{experiment.type}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColorClass()}`}>
                          {experiment.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <span className="text-sm text-slate-500 dark:text-slate-400 block mb-1">ID:</span>
                      <span className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{experiment.id}</span>
                    </div>
                  </div>
                  
                  <p className="mt-4 text-slate-700 dark:text-slate-300">
                    {experiment.description}
                  </p>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Start Date</p>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-slate-400 mr-1" />
                        <p className="text-sm font-medium">{formatDate(experiment.startDate)}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">End Date</p>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-slate-400 mr-1" />
                        <p className="text-sm font-medium">{formatDate(experiment.endDate)}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Protocol</p>
                      <p className="text-sm font-medium">{experiment.protocol}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Sample Count</p>
                      <div className="flex items-center">
                        <Beaker className="h-4 w-4 text-slate-400 mr-1" />
                        <p className="text-sm font-medium">{experiment.samples.length} samples</p>
                      </div>
                    </div>
                  </div>
                  
                  {experiment.tags.length > 0 && (
                    <div className="mt-6">
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Tags</p>
                      <div className="flex flex-wrap gap-2">
                        {experiment.tags.map((tag, index) => (
                          <div key={index} className="inline-flex items-center bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full text-xs">
                            <Tag className="h-3 w-3 text-slate-500 dark:text-slate-400 mr-1" />
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {experiment.notes && (
                    <div className="mt-6">
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Notes</p>
                      <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-md">
                        {experiment.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Samples used */}
          <div className="card">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <h2 className="font-medium text-slate-800 dark:text-slate-200">Samples Used</h2>
              <Link to={`/experiments/${experiment.id}/samples/add`} className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">
                Add sample
              </Link>
            </div>
            <div className="p-4">
              {experimentSamples.length === 0 ? (
                <p className="text-center text-slate-500 dark:text-slate-400 py-4">
                  No samples associated with this experiment yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {experimentSamples.map(sample => (
                    <Link
                      key={sample.id}
                      to={`/samples/${sample.id}`}
                      className="flex items-center p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex-shrink-0 bg-indigo-50 dark:bg-indigo-900/30 rounded-full p-2 mr-3">
                        <Beaker className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                            {sample.name}
                          </p>
                          <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            sample.status === 'ACTIVE'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                          }`}>
                            {sample.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {sample.type} • Location: {sample.location}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-400 ml-2" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Results */}
          <div className="card">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <h2 className="font-medium text-slate-800 dark:text-slate-200">Results</h2>
              <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">
                Add result
              </button>
            </div>
            <div className="p-4">
              {experiment.results.length === 0 ? (
                <div className="text-center py-8">
                  {experiment.status === 'COMPLETED' ? (
                    <>
                      <AlertTriangle className="mx-auto h-12 w-12 text-amber-400" />
                      <h3 className="mt-2 text-base font-medium text-slate-900 dark:text-white">No results recorded</h3>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        This experiment is marked as completed but has no results.
                      </p>
                    </>
                  ) : (
                    <>
                      <ClockIcon className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600" />
                      <h3 className="mt-2 text-base font-medium text-slate-900 dark:text-white">
                        {experiment.status === 'PLANNED' || experiment.status === 'IN_PROGRESS' 
                          ? 'Results pending' 
                          : 'No results recorded'}
                      </h3>
                    </>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {experiment.results.map(result => (
                    <div 
                      key={result.id}
                      className="border border-slate-200 dark:border-slate-700 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-slate-900 dark:text-white">{result.name}</h3>
                        <span className="badge-blue">{result.type}</span>
                      </div>
                      
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Recorded on {formatDate(result.date)}
                      </p>
                      
                      <div className="mt-3">
                        {result.type === 'NUMERIC' ? (
                          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-md">
                            <p className="text-2xl font-semibold text-slate-900 dark:text-white">
                              {typeof result.data.value === 'number' 
                                ? result.data.value.toFixed(2) 
                                : result.data.value}
                            </p>
                          </div>
                        ) : (
                          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-md">
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                              {result.data.value.toString()}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      {result.notes && (
                        <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                          <p className="font-medium">Notes:</p>
                          <p className="mt-1">{result.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Metadata and actions sidebar */}
        <div className="space-y-6">
          <div className="card">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="font-medium text-slate-800 dark:text-slate-200">Metadata</h2>
            </div>
            <div className="p-4">
              {Object.keys(experiment.metadata).length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400 text-sm">No metadata available.</p>
              ) : (
                <dl className="space-y-3">
                  {Object.entries(experiment.metadata).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-xs text-slate-500 dark:text-slate-400">{key}</dt>
                      <dd className="mt-1 text-sm font-medium">{value.toString()}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>
          
          <div className="card">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="font-medium text-slate-800 dark:text-slate-200">Status</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Current Status</p>
                  <div className={`flex items-center px-3 py-2 rounded-md ${
                    experiment.status === 'COMPLETED'
                      ? 'bg-green-50 dark:bg-green-900/20'
                      : experiment.status === 'IN_PROGRESS'
                      ? 'bg-blue-50 dark:bg-blue-900/20'
                      : experiment.status === 'PLANNED'
                      ? 'bg-amber-50 dark:bg-amber-900/20'
                      : experiment.status === 'FAILED'
                      ? 'bg-red-50 dark:bg-red-900/20'
                      : 'bg-slate-50 dark:bg-slate-800/50'
                  }`}>
                    {experiment.status === 'COMPLETED' && <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" />}
                    {experiment.status === 'IN_PROGRESS' && <ArrowRight className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />}
                    {experiment.status === 'PLANNED' && <Clock className="h-5 w-5 text-amber-500 dark:text-amber-400 mr-2" />}
                    {experiment.status === 'FAILED' && <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" />}
                    {experiment.status === 'CANCELLED' && <AlertTriangle className="h-5 w-5 text-slate-500 dark:text-slate-400 mr-2" />}
                    <span className="font-medium text-slate-900 dark:text-white">{experiment.status}</span>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Update Status</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'FAILED'].map(status => (
                      <button
                        key={status}
                        className={`py-2 px-3 text-xs font-medium rounded-md ${
                          experiment.status === status
                            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 cursor-default'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors'
                        }`}
                        disabled={experiment.status === status}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="font-medium text-slate-800 dark:text-slate-200">Actions</h2>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <button className="w-full btn-outline text-left justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export as PDF
                </button>
                <Link to={`/experiments/duplicate/${experiment.id}`} className="w-full btn-outline text-left justify-start">
                  <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="8" y="8" width="12" height="12" rx="2" ry="2"></rect>
                    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"></path>
                  </svg>
                  Duplicate Experiment
                </Link>
                <hr className="border-slate-200 dark:border-slate-700" />
                <button className="w-full btn-danger text-left justify-start">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Experiment
                </button>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="font-medium text-slate-800 dark:text-slate-200">Timeline</h2>
            </div>
            <div className="p-4">
              <div className="relative pl-6 space-y-6">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700"></div>
                
                <div className="relative">
                  <div className="absolute left-0 top-1 w-4 h-4 -ml-2 rounded-full border-2 border-indigo-500 dark:border-indigo-400 bg-white dark:bg-slate-800"></div>
                  <h3 className="text-sm font-medium text-slate-900 dark:text-white">Experiment created</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {formatDate(experiment.startDate)}
                  </p>
                </div>
                
                {experiment.status === 'IN_PROGRESS' && (
                  <div className="relative">
                    <div className="absolute left-0 top-1 w-4 h-4 -ml-2 rounded-full border-2 border-blue-500 dark:border-blue-400 bg-white dark:bg-slate-800"></div>
                    <h3 className="text-sm font-medium text-slate-900 dark:text-white">Started experiment</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {formatDate(experiment.startDate)}
                    </p>
                  </div>
                )}
                
                {(experiment.status === 'COMPLETED' || experiment.status === 'FAILED') && (
                  <div className="relative">
                    <div className="absolute left-0 top-1 w-4 h-4 -ml-2 rounded-full border-2 border-green-500 dark:border-green-400 bg-white dark:bg-slate-800"></div>
                    <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                      {experiment.status === 'COMPLETED' ? 'Completed' : 'Failed'}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {formatDate(experiment.endDate)}
                    </p>
                  </div>
                )}
                
                {experiment.results.length > 0 && (
                  <div className="relative">
                    <div className="absolute left-0 top-1 w-4 h-4 -ml-2 rounded-full border-2 border-teal-500 dark:border-teal-400 bg-white dark:bg-slate-800"></div>
                    <h3 className="text-sm font-medium text-slate-900 dark:text-white">Results recorded</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {formatDate(experiment.results[0].date)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClockIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);