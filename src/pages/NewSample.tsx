import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Sample, SampleType, SampleStatus } from '../types';

export const NewSample: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<Sample>>({
    id: uuidv4(),
    name: '',
    type: 'BLOOD',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    expiresAt: null,
    temperature: null,
    location: '',
    metadata: {},
    tags: [],
    notes: '',
    parentId: null,
    experiments: [],
  });

  useEffect(() => {
    document.title = 'New Sample - LabTrack';
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call to save the sample
    console.log('Sample data:', formData);
    navigate('/samples');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="py-6 fade-in">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/samples')}
          className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="ml-3 text-2xl font-semibold text-slate-900 dark:text-white">New Sample</h1>
      </div>

      <div className="card max-w-3xl">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="label">Sample Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="input"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter sample name"
              />
            </div>

            <div>
              <label htmlFor="type" className="label">Sample Type</label>
              <select
                id="type"
                name="type"
                required
                className="select"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="BLOOD">Blood</option>
                <option value="TISSUE">Tissue</option>
                <option value="CELL_CULTURE">Cell Culture</option>
                <option value="DNA">DNA</option>
                <option value="RNA">RNA</option>
                <option value="PROTEIN">Protein</option>
                <option value="REAGENT">Reagent</option>
                <option value="BUFFER">Buffer</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="location" className="label">Storage Location</label>
              <input
                type="text"
                id="location"
                name="location"
                required
                className="input"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Freezer A, Shelf 2"
              />
            </div>

            <div>
              <label htmlFor="temperature" className="label">Storage Temperature (°C)</label>
              <input
                type="number"
                id="temperature"
                name="temperature"
                className="input"
                value={formData.temperature || ''}
                onChange={handleChange}
                placeholder="e.g., -20"
              />
            </div>

            <div>
              <label htmlFor="expiresAt" className="label">Expiration Date</label>
              <input
                type="date"
                id="expiresAt"
                name="expiresAt"
                className="input"
                value={formData.expiresAt?.split('T')[0] || ''}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="status" className="label">Status</label>
              <select
                id="status"
                name="status"
                required
                className="select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="ACTIVE">Active</option>
                <option value="DEPLETED">Depleted</option>
                <option value="COMPROMISED">Compromised</option>
                <option value="ARCHIVED">Archived</option>
                <option value="EXPIRED">Expired</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="tags" className="label">Tags</label>
            <input
              type="text"
              id="tags"
              name="tags"
              className="input"
              placeholder="Enter tags separated by commas"
              value={formData.tags?.join(', ')}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
              }))}
            />
          </div>

          <div>
            <label htmlFor="notes" className="label">Notes</label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              className="input"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any additional notes about the sample"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/samples')}
              className="btn-outline"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Sample
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};