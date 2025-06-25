import { v4 as uuidv4 } from 'uuid';
import { addDays, format, subDays } from 'date-fns';
import { Sample, Experiment, SampleType, ExperimentType, SampleStatus, ExperimentStatus } from '../types';

// Helper function to generate random dates
const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Helper to format dates
const formatDate = (date: Date) => format(date, "yyyy-MM-dd'T'HH:mm:ss");

// Generate mock samples
export const generateMockSamples = (count: number): Sample[] => {
  const sampleTypes: SampleType[] = ['BLOOD', 'TISSUE', 'CELL_CULTURE', 'DNA', 'RNA', 'PROTEIN', 'REAGENT', 'BUFFER', 'OTHER'];
  const sampleStatuses: SampleStatus[] = ['ACTIVE', 'DEPLETED', 'COMPROMISED', 'ARCHIVED', 'EXPIRED'];
  const locations = ['Freezer A', 'Freezer B', 'Refrigerator 1', 'Cabinet 3', 'Shelf 2', 'Box 4'];
  
  const samples: Sample[] = [];
  
  for (let i = 0; i < count; i++) {
    const type = sampleTypes[Math.floor(Math.random() * sampleTypes.length)];
    const id = uuidv4();
    
    samples.push({
      id,
      name: `${type}-${Math.floor(Math.random() * 1000)}`,
      type,
      status: sampleStatuses[Math.floor(Math.random() * sampleStatuses.length)],
      createdAt: formatDate(randomDate(subDays(new Date(), 100), new Date())),
      expiresAt: Math.random() > 0.3 ? formatDate(randomDate(new Date(), addDays(new Date(), 365))) : null,
      temperature: type === 'REAGENT' || type === 'BUFFER' ? 20 : 
                    type === 'CELL_CULTURE' ? 37 : -20,
      location: locations[Math.floor(Math.random() * locations.length)],
      metadata: {
        concentration: Math.random() * 10,
        volume: Math.random() * 50,
        pH: 7 + (Math.random() * 2 - 1),
      },
      tags: ['research', 'lab-' + Math.floor(Math.random() * 3 + 1)],
      notes: Math.random() > 0.7 ? 'Sample appears to be degrading. Check before use.' : '',
      parentId: Math.random() > 0.8 ? samples[Math.floor(Math.random() * Math.max(samples.length, 1))].id : null,
      experiments: [],
    });
  }
  
  return samples;
};

// Generate mock experiments
export const generateMockExperiments = (count: number, samples: Sample[]): Experiment[] => {
  const experimentTypes: ExperimentType[] = ['CELL_STUDY', 'IMMUNE_ASSAY', 'SEPARATION', 'PCR', 'SEQUENCING', 'MICROSCOPY', 'FLOW_CYTOMETRY', 'SPECTROSCOPY', 'OTHER'];
  const experimentStatuses: ExperimentStatus[] = ['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'CANCELLED'];
  
  const experiments: Experiment[] = [];
  
  for (let i = 0; i < count; i++) {
    const type = experimentTypes[Math.floor(Math.random() * experimentTypes.length)];
    const id = uuidv4();
    const status = experimentStatuses[Math.floor(Math.random() * experimentStatuses.length)];
    const startDate = formatDate(randomDate(subDays(new Date(), 60), new Date()));
    
    // For completed experiments, add an end date
    const endDate = status === 'COMPLETED' || status === 'FAILED' ? 
                    formatDate(randomDate(new Date(startDate), addDays(new Date(startDate), 30))) : null;
    
    // Randomly select 1-3 samples for this experiment
    const experimentSamples: string[] = [];
    const sampleCount = Math.floor(Math.random() * 3) + 1;
    
    for (let j = 0; j < sampleCount; j++) {
      const randomSample = samples[Math.floor(Math.random() * samples.length)];
      if (!experimentSamples.includes(randomSample.id)) {
        experimentSamples.push(randomSample.id);
      }
    }
    
    // Add experiment to sample's experiments list
    experimentSamples.forEach(sampleId => {
      const sample = samples.find(s => s.id === sampleId);
      if (sample) {
        sample.experiments.push(id);
      }
    });
    
    const experiment: Experiment = {
      id,
      name: `${type}-EXP-${Math.floor(Math.random() * 1000)}`,
      type,
      status,
      startDate,
      endDate,
      description: `${type} experiment to analyze sample properties.`,
      protocol: `Standard ${type} protocol version ${Math.floor(Math.random() * 5) + 1}.0`,
      samples: experimentSamples,
      results: [],
      metadata: {
        equipment: `${type.toLowerCase()}-machine-${Math.floor(Math.random() * 5) + 1}`,
        temperature: 23 + Math.floor(Math.random() * 5),
        duration: Math.floor(Math.random() * 180) + 30 + ' minutes',
      },
      tags: ['experiment', type.toLowerCase()],
      notes: '',
    };
    
    // Add results for completed experiments
    if (status === 'COMPLETED') {
      const resultCount = Math.floor(Math.random() * 3) + 1;
      
      for (let j = 0; j < resultCount; j++) {
        experiment.results.push({
          id: uuidv4(),
          name: `Result ${j + 1}`,
          type: Math.random() > 0.5 ? 'NUMERIC' : 'TEXT',
          date: formatDate(new Date(endDate || startDate)),
          data: {
            value: Math.random() > 0.5 ? 
                  Math.random() * 100 : 
                  'Observation: Sample showed expected reaction',
          },
          notes: Math.random() > 0.7 ? 'Further analysis may be required.' : '',
        });
      }
    }
    
    experiments.push(experiment);
  }
  
  return experiments;
};

// Create and export mock data
export const samples = generateMockSamples(50);
export const experiments = generateMockExperiments(30, samples);

// Generate mock charts data
export const generateSamplesByTypeData = () => {
  const sampleCounts: Record<string, number> = {};
  
  samples.forEach(sample => {
    sampleCounts[sample.type] = (sampleCounts[sample.type] || 0) + 1;
  });
  
  return {
    labels: Object.keys(sampleCounts),
    datasets: [
      {
        label: 'Samples by Type',
        data: Object.values(sampleCounts),
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
};

export const generateExperimentStatusData = () => {
  const statusCounts: Record<string, number> = {};
  
  experiments.forEach(experiment => {
    statusCounts[experiment.status] = (statusCounts[experiment.status] || 0) + 1;
  });
  
  return {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: 'Experiment Status',
        data: Object.values(statusCounts),
        backgroundColor: [
          'rgba(245, 158, 11, 0.7)', // PLANNED
          'rgba(67, 56, 202, 0.7)',  // IN_PROGRESS
          'rgba(13, 148, 136, 0.7)', // COMPLETED
          'rgba(239, 68, 68, 0.7)',  // FAILED
          'rgba(156, 163, 175, 0.7)', // CANCELLED
        ],
        borderWidth: 1,
      },
    ],
  };
};

export const generateExperimentsTimelineData = () => {
  // Last 12 weeks
  const labels = Array.from({ length: 12 }, (_, i) => 
    format(subDays(new Date(), (11 - i) * 7), 'MMM d')
  );
  
  // Count experiments started in each week
  const data = Array(12).fill(0);
  
  experiments.forEach(experiment => {
    const date = new Date(experiment.startDate);
    const today = new Date();
    const daysDiff = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff <= 84) { // Within the last 12 weeks
      const weekIndex = Math.floor(daysDiff / 7);
      if (weekIndex >= 0 && weekIndex < 12) {
        data[11 - weekIndex]++; // Reverse index since we're going backward in time
      }
    }
  });
  
  return {
    labels,
    datasets: [
      {
        label: 'New Experiments',
        data,
        borderColor: 'rgba(67, 56, 202, 0.7)',
        backgroundColor: 'rgba(67, 56, 202, 0.2)',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };
};