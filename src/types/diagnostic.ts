export interface DiagnosticCode {
  code: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  system: string;
}

export interface VehicleInfo {
  make: string;
  model: string;
  year: number;
  engine?: string;
  mileage?: number;
}

export interface Symptom {
  id: string;
  category: string;
  description: string;
  selected: boolean;
}

export interface DiagnosticResult {
  analysis: string;
  possibleCauses: string[];
  recommendedActions: string[];
  estimatedCost?: {
    min: number;
    max: number;
  };
  urgency: 'routine' | 'priority' | 'immediate' | 'safety_critical';
}

export interface DiagnosticHistory {
  id: string;
  date: string;
  codes: DiagnosticCode[];
  symptoms: string[];
  result: DiagnosticResult;
  vehicleInfo: VehicleInfo;
}