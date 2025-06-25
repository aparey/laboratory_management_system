import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Share, Clock, Download, ArrowRight, FlaskConical, Thermometer, Tag } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { samples, experiments } from '../data/mockData';
import { Sample, Experiment } from '../types';

export const SampleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sample, setSample] = useState<Sample | null>(null);
  const [relatedExperiments, setRelatedExperiments] = useState<Experiment[]>([]);
  const [parentSample, setParentSample] = useState<Sample | null>(null);
  const [childSamples, setChildSamples] = useState<Sample[]>([]);
  
  useEffect(() => {
    // Find the sample
    const foundSample = samples.find(s => s.id === id);
    if (foundSample) {
      setSample(foundSample);
      document.title = `${foundSample.name} - LabTrack`;
      
      // Find related experiments
      const sampleExperiments = experiments.filter(e => 
        e.samples.includes(foundSample.id)
      );
      setRelatedExperiments(sampleExperiments);
      
      // Find parent sample
      if (foundSample.parentId) {
        const parent = samples.find(s => s.id === foundSample.parentId);
        if (parent) {
          setParentSample(parent);
        }
      }
      
      // Find child samples
      const children = samples.filter(s => s.parentId === foundSample.id);
      setChildSamples(children);
    } else {
      navigate('/samples');
    }
  }, [id, navigate]);
  
  if (!sample) {
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
    switch (sample.status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'DEPLETED':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'COMPROMISED':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'ARCHIVED':
        return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
      case 'EXPIRED':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div className="py-6 fade-in">
      {/* Back button and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center">
          <Link to="/samples" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className="mx-2 text-slate-300 dark:text-slate-600">/</span>
          <span className="text-slate-500 dark:text-slate-400">Samples</span>
          <span className="mx-2 text-slate-300 dark:text-slate-600">/</span>
          <span className="text-slate-900 dark:text-white font-medium">{sample.name}</span>
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
      
      {/* Sample details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-start">
                <div className="flex-shrink-0 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4 flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
                  <FlaskConical className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">{sample.name}</h1>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <span className="badge-blue">{sample.type}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColorClass()}`}>
                          {sample.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <span className="text-sm text-slate-500 dark:text-slate-400 block mb-1">ID:</span>
                      <span className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{sample.id}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Created</p>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-slate-400 mr-1" />
                        <p className="text-sm font-medium">{formatDate(sample.createdAt)}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Expires</p>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-slate-400 mr-1" />
                        <p className="text-sm font-medium">{formatDate(sample.expiresAt)}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Location</p>
                      <p className="text-sm font-medium">{sample.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Temperature</p>
                      <div className="flex items-center">
                        <Thermometer className="h-4 w-4 text-slate-400 mr-1" />
                        <p className="text-sm font-medium">
                          {sample.temperature !== null ? `${sample.temperature}°C` : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {sample.tags.length > 0 && (
                    <div className="mt-6">
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Tags</p>
                      <div className="flex flex-wrap gap-2">
                        {sample.tags.map((tag, index) => (
                          <div key={index} className="inline-flex items-center bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full text-xs">
                            <Tag className="h-3 w-3 text-slate-500 dark:text-slate-400 mr-1" />
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {sample.notes && (
                    <div className="mt-6">
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Notes</p>
                      <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-md">
                        {sample.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Related samples */}
          <div className="card">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="font-medium text-slate-800 dark:text-slate-200">Related Samples</h2>
            </div>
            <div className="p-6">
              {!parentSample && childSamples.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400 text-sm">No related samples found.</p>
              ) : (
                <div className="space-y-6">
                  {parentSample && (
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">Parent Sample</h3>
                      <Link 
                        to={`/samples/${parentSample.id}`}
                        className="flex items-center p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <div className="flex-shrink-0 bg-indigo-50 dark:bg-indigo-900/30 rounded-full p-2 mr-3">
                          <FlaskConical className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                              {parentSample.name}
                            </p>
                            <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              parentSample.status === 'ACTIVE'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                            }`}>
                              {parentSample.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {parentSample.type} • Created {formatDate(parentSample.createdAt)}
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-400 ml-2" />
                      </Link>
                    </div>
                  )}
                  
                  {childSamples.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">Derived Samples ({childSamples.length})</h3>
                      <div className="space-y-3">
                        {childSamples.map(child => (
                          <Link
                            key={child.id}
                            to={`/samples/${child.id}`}
                            className="flex items-center p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                          >
                            <div className="flex-shrink-0 bg-indigo-50 dark:bg-indigo-900/30 rounded-full p-2 mr-3">
                              <FlaskConical className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center">
                                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                                  {child.name}
                                </p>
                                <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                  child.status === 'ACTIVE'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                    : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                                }`}>
                                  {child.status}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                {child.type} • Created {formatDate(child.createdAt)}
                              </p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-slate-400 ml-2" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Experiments */}
          <div className="card">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <h2 className="font-medium text-slate-800 dark:text-slate-200">Experiments</h2>
              <Link to={`/experiments/new?sample=${sample.id}`} className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">
                Add experiment
              </Link>
            </div>
            <div className="p-4">
              {relatedExperiments.length === 0 ? (
                <p className="text-center text-slate-500 dark:text-slate-400 py-4">
                  No experiments associated with this sample yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {relatedExperiments.map(experiment => (
                    <Link
                      key={experiment.id}
                      to={`/experiments/${experiment.id}`}
                      className="block p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">{experiment.name}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{experiment.type}</p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
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
                      <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                        <span>Started: {formatDate(experiment.startDate)}</span>
                        {experiment.endDate && (
                          <span className="ml-4">Ended: {formatDate(experiment.endDate)}</span>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                        {experiment.description}
                      </p>
                    </Link>
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
              {Object.keys(sample.metadata).length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400 text-sm">No metadata available.</p>
              ) : (
                <dl className="space-y-3">
                  {Object.entries(sample.metadata).map(([key, value]) => (
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
              <h2 className="font-medium text-slate-800 dark:text-slate-200">Actions</h2>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <button className="w-full btn-outline text-left justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export as PDF
                </button>
                <Link to={`/samples/duplicate/${sample.id}`} className="w-full btn-outline text-left justify-start">
                  <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="8" y="8" width="12" height="12" rx="2" ry="2"></rect>
                    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"></path>
                  </svg>
                  Duplicate Sample
                </Link>
                <Link to={`/samples/new?parentId=${sample.id}`} className="w-full btn-outline text-left justify-start">
                  <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  Create Child Sample
                </Link>
                <hr className="border-slate-200 dark:border-slate-700" />
                <button className="w-full btn-danger text-left justify-start">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Sample
                </button>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="font-medium text-slate-800 dark:text-slate-200">Sample History</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-4 w-4 rounded-full bg-green-400 mt-0.5"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Sample created</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {formatDate(sample.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-4 w-4 rounded-full bg-blue-400 mt-0.5"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Status updated to {sample.status}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {formatDate(sample.createdAt)} 
                    </p>
                  </div>
                </div>
                {relatedExperiments.length > 0 && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-4 w-4 rounded-full bg-indigo-400 mt-0.5"></div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">Added to experiment</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {formatDate(relatedExperiments[0].startDate)} - {relatedExperiments[0].name}
                      </p>
                    </div>
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