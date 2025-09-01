import { DiagnosticCode } from '../types/diagnostic';

export const commonDiagnosticCodes: { [key: string]: DiagnosticCode } = {
  'P0300': {
    code: 'P0300',
    description: 'Random/Multiple Cylinder Misfire Detected',
    severity: 'high',
    system: 'Engine'
  },
  'P0301': {
    code: 'P0301',
    description: 'Cylinder 1 Misfire Detected',
    severity: 'medium',
    system: 'Engine'
  },
  'P0302': {
    code: 'P0302',
    description: 'Cylinder 2 Misfire Detected',
    severity: 'medium',
    system: 'Engine'
  },
  'P0171': {
    code: 'P0171',
    description: 'System Too Lean (Bank 1)',
    severity: 'medium',
    system: 'Fuel System'
  },
  'P0172': {
    code: 'P0172',
    description: 'System Too Rich (Bank 1)',
    severity: 'medium',
    system: 'Fuel System'
  },
  'P0420': {
    code: 'P0420',
    description: 'Catalyst System Efficiency Below Threshold (Bank 1)',
    severity: 'medium',
    system: 'Emissions'
  },
  'P0430': {
    code: 'P0430',
    description: 'Catalyst System Efficiency Below Threshold (Bank 2)',
    severity: 'medium',
    system: 'Emissions'
  },
  'P0442': {
    code: 'P0442',
    description: 'Evaporative Emission Control System Leak Detected (small leak)',
    severity: 'low',
    system: 'Emissions'
  },
  'P0446': {
    code: 'P0446',
    description: 'Evaporative Emission Control System Vent Control Circuit Malfunction',
    severity: 'low',
    system: 'Emissions'
  },
  'P0128': {
    code: 'P0128',
    description: 'Coolant Thermostat (Coolant Temperature Below Thermostat Regulating Temperature)',
    severity: 'medium',
    system: 'Cooling'
  },
  'P0401': {
    code: 'P0401',
    description: 'Exhaust Gas Recirculation Flow Insufficient Detected',
    severity: 'medium',
    system: 'Emissions'
  },
  'P0404': {
    code: 'P0404',
    description: 'Exhaust Gas Recirculation Circuit Range/Performance',
    severity: 'medium',
    system: 'Emissions'
  },
  'P0461': {
    code: 'P0461',
    description: 'Fuel Level Sensor Circuit Range/Performance',
    severity: 'low',
    system: 'Fuel System'
  },
  'P0506': {
    code: 'P0506',
    description: 'Idle Control System RPM Lower Than Expected',
    severity: 'medium',
    system: 'Engine'
  },
  'P0507': {
    code: 'P0507',
    description: 'Idle Control System RPM Higher Than Expected',
    severity: 'medium',
    system: 'Engine'
  },
  'P0740': {
    code: 'P0740',
    description: 'Torque Converter Clutch Circuit Malfunction',
    severity: 'medium',
    system: 'Transmission'
  },
  'P0750': {
    code: 'P0750',
    description: 'Shift Solenoid A Malfunction',
    severity: 'high',
    system: 'Transmission'
  },
  'B1000': {
    code: 'B1000',
    description: 'ECU Defective',
    severity: 'critical',
    system: 'Engine Control'
  },
  'C0000': {
    code: 'C0000',
    description: 'No Chassis Codes Set',
    severity: 'low',
    system: 'Chassis'
  },
  'U0100': {
    code: 'U0100',
    description: 'Lost Communication With ECM/PCM',
    severity: 'critical',
    system: 'Network'
  }
};