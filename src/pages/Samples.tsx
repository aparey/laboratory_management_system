import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Filter, RefreshCw, DownloadCloud, Trash2, Search } from 'lucide-react';
import { samples } from '../data/mockData';
import { Sample, SampleType, SampleStatus } from '../types';

export const Samples: React.FC = () => {
  const [filteredSamples, setFilteredSamples] = useState<Sample[]>(samples);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<SampleType | 'ALL'>('ALL');
  const [statusFilter, setStatusFilter] = useState<SampleStatus | 'ALL'>('ALL');
  const [selectedSamples, setSelectedSamples] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Sample | '';
    direction: 'asc' | 'desc';
  }>({ key: 'createdAt', direction: 'desc' });

  // Sample type options
  const sampleTypeOptions: { value: SampleType | 'ALL'; label: string }[] = [
    { value: 'ALL', label: 'All Types' },
    { value: 'BLOOD', label: 'Blood' },
    { value: 'TISSUE', label: 'Tissue' },
    { value: 'CELL_CULTURE', label: 'Cell Culture' },
    { value: 'DNA', label: 'DNA' },
    { value: 'RNA', label: 'RNA' },
    { value: 'PROTEIN', label: 'Protein' },
    { value: 'REAGENT', label: 'Reagent' },
    { value: 'BUFFER', label: 'Buffer' },
    { value: 'OTHER', label: 'Other' },
  ];

  // Sample status options
  const sampleStatusOptions: { value: SampleStatus | 'ALL'; label: string }[] = [
    { value: 'ALL', label: 'All Statuses' },
    { value: 'ACTIVE', label: 'Active' },
    { value: 'DEPLETED', label: 'Depleted' },
    { value: 'COMPROMISED', label: 'Compromised' },
    { value: 'ARCHIVED', label: 'Archived' },
    { value: 'EXPIRED', label: 'Expired' },
  ];

  // Apply filters
  useEffect(() => {
    let filtered = [...samples];

    // Apply search filter
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        sample =>
          sample.name.toLowerCase().includes(lowercasedSearch) ||
          sample.id.toLowerCase().includes(lowercasedSearch) ||
          sample.location.toLowerCase().includes(lowercasedSearch)
      );
    }

    // Apply type filter
    if (typeFilter !== 'ALL') {
      filtered = filtered.filter(sample => sample.type === typeFilter);
    }

    // Apply status filter
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(sample => sample.status === statusFilter);
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof Sample];
        const bValue = b[sortConfig.key as keyof Sample];
        
        if (aValue === null) return sortConfig.direction === 'asc' ? -1 : 1;
        if (bValue === null) return sortConfig.direction === 'asc' ? 1 : -1;
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc' 
            ? aValue.localeCompare(bValue) 
            : bValue.localeCompare(aValue);
        }
        
        if (aValue instanceof Date && bValue instanceof Date) {
          return sortConfig.direction === 'asc' 
            ? aValue.getTime() - bValue.getTime() 
            : bValue.getTime() - aValue.getTime();
        }
        
        return sortConfig.direction === 'asc' 
          ? (aValue as any) - (bValue as any) 
          : (bValue as any) - (aValue as any);
      });
    }

    setFilteredSamples(filtered);
  }, [searchTerm, typeFilter, statusFilter, sortConfig]);

  // Handle sorting
  const handleSort = (key: keyof Sample) => {
    setSortConfig(current => ({
      key,
      direction:
        current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Toggle select sample
  const toggleSelectSample = (id: string) => {
    setSelectedSamples(current =>
      current.includes(id)
        ? current.filter(sampleId => sampleId !== id)
        : [...current, id]
    );
  };

  // Toggle select all samples
  const toggleSelectAll = () => {
    if (selectedSamples.length === filteredSamples.length) {
      setSelectedSamples([]);
    } else {
      setSelectedSamples(filteredSamples.map(sample => sample.id));
    }
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setTypeFilter('ALL');
    setStatusFilter('ALL');
    setSortConfig({ key: 'createdAt', direction: 'desc' });
  };

  useEffect(() => {
    document.title = 'Samples - LabTrack';
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="py-6 space-y-6 fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Samples</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage and track your laboratory samples
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/samples/new"
            className="btn-primary inline-flex items-center"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Sample
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
                placeholder="Search samples by name, ID, or location..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="w-full sm:w-auto">
                <select
                  className="select"
                  value={typeFilter}
                  onChange={e => setTypeFilter(e.target.value as SampleType | 'ALL')}
                >
                  {sampleTypeOptions.map(option => (
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
                  onChange={e => setStatusFilter(e.target.value as SampleStatus | 'ALL')}
                >
                  {sampleStatusOptions.map(option => (
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

      {/* Samples table */}
      <div className="card">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center">
            <h2 className="font-medium text-slate-800 dark:text-slate-200">
              Sample List
            </h2>
            <span className="ml-2 badge-blue">{filteredSamples.length} samples</span>
          </div>
          
          {selectedSamples.length > 0 && (
            <div className="mt-3 sm:mt-0 flex items-center space-x-3">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {selectedSamples.length} selected
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
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="pl-4 py-3 text-left">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-600 dark:bg-slate-800"
                      checked={
                        selectedSamples.length === filteredSamples.length &&
                        filteredSamples.length > 0
                      }
                      onChange={toggleSelectAll}
                    />
                  </div>
                </th>
                <th
                  className="py-3 px-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    <span>Sample</span>
                    {sortConfig.key === 'name' && (
                      <svg
                        className={`ml-1 w-3 h-3 ${
                          sortConfig.direction === 'asc'
                            ? 'transform rotate-180'
                            : ''
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </th>
                <th
                  className="py-3 px-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('type')}
                >
                  <div className="flex items-center">
                    <span>Type</span>
                    {sortConfig.key === 'type' && (
                      <svg
                        className={`ml-1 w-3 h-3 ${
                          sortConfig.direction === 'asc'
                            ? 'transform rotate-180'
                            : ''
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </th>
                <th
                  className="py-3 px-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    <span>Status</span>
                    {sortConfig.key === 'status' && (
                      <svg
                        className={`ml-1 w-3 h-3 ${
                          sortConfig.direction === 'asc'
                            ? 'transform rotate-180'
                            : ''
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </th>
                <th
                  className="py-3 px-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="flex items-center">
                    <span>Created</span>
                    {sortConfig.key === 'createdAt' && (
                      <svg
                        className={`ml-1 w-3 h-3 ${
                          sortConfig.direction === 'asc'
                            ? 'transform rotate-180'
                            : ''
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </th>
                <th
                  className="py-3 px-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('location')}
                >
                  <div className="flex items-center">
                    <span>Location</span>
                    {sortConfig.key === 'location' && (
                      <svg
                        className={`ml-1 w-3 h-3 ${
                          sortConfig.direction === 'asc'
                            ? 'transform rotate-180'
                            : ''
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </th>
                <th className="py-3 px-4 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredSamples.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-slate-500 dark:text-slate-400"
                  >
                    No samples match your search criteria. Try adjusting your filters.
                  </td>
                </tr>
              ) : (
                filteredSamples.map((sample) => (
                  <tr
                    key={sample.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="pl-4 py-4">
                      <input
                        type="checkbox"
                        className="rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-600 dark:bg-slate-800"
                        checked={selectedSamples.includes(sample.id)}
                        onChange={() => toggleSelectSample(sample.id)}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <Link
                          to={`/samples/${sample.id}`}
                          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 font-medium"
                        >
                          {sample.name}
                        </Link>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          ID: {sample.id.substring(0, 8)}...
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="badge-blue">{sample.type}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          sample.status === 'ACTIVE'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : sample.status === 'DEPLETED'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                            : sample.status === 'COMPROMISED'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                            : sample.status === 'ARCHIVED'
                            ? 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                            : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                        }`}
                      >
                        {sample.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-500 dark:text-slate-400">
                      {formatDate(sample.createdAt)}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-500 dark:text-slate-400">
                      {sample.location}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Link
                        to={`/samples/${sample.id}`}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 font-medium text-sm"
                      >
                        View details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 text-right">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing {filteredSamples.length} of {samples.length} samples
          </p>
        </div>
      </div>
    </div>
  );
};