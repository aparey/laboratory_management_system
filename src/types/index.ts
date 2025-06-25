export interface Sample {
  id: string;
  name: string;
  type: SampleType;
  status: SampleStatus;
  createdAt: string;
  expiresAt: string | null;
  temperature: number | null;
  location: string;
  metadata: Record<string, any>;
  tags: string[];
  notes: string;
  parentId: string | null;
  experiments: string[];
}

export type SampleType = 
  | 'BLOOD'
  | 'TISSUE'
  | 'CELL_CULTURE'
  | 'DNA'
  | 'RNA'
  | 'PROTEIN'
  | 'REAGENT'
  | 'BUFFER'
  | 'OTHER';

export type SampleStatus = 
  | 'ACTIVE'
  | 'DEPLETED'
  | 'COMPROMISED'
  | 'ARCHIVED'
  | 'EXPIRED';

export interface Experiment {
  id: string;
  name: string;
  type: ExperimentType;
  status: ExperimentStatus;
  startDate: string;
  endDate: string | null;
  description: string;
  protocol: string;
  samples: string[];
  results: ExperimentResult[];
  metadata: Record<string, any>;
  tags: string[];
  notes: string;
}

export type ExperimentType =
  | 'CELL_STUDY'
  | 'IMMUNE_ASSAY'
  | 'SEPARATION'
  | 'PCR'
  | 'SEQUENCING'
  | 'MICROSCOPY'
  | 'FLOW_CYTOMETRY'
  | 'SPECTROSCOPY'
  | 'OTHER';

export type ExperimentStatus =
  | 'PLANNED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'FAILED'
  | 'CANCELLED';

export interface ExperimentResult {
  id: string;
  name: string;
  type: ResultType;
  date: string;
  data: Record<string, any>;
  notes: string;
}

export type ResultType =
  | 'NUMERIC'
  | 'TEXT'
  | 'IMAGE'
  | 'DATASET'
  | 'FILE';

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
}