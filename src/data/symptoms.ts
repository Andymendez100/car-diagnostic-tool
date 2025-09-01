import { Symptom } from '../types/diagnostic';

export const commonSymptoms: Symptom[] = [
  // Engine Symptoms
  { id: 'engine-rough-idle', category: 'Engine', description: 'Engine idles roughly or irregularly', selected: false },
  { id: 'engine-stalling', category: 'Engine', description: 'Engine stalls or dies unexpectedly', selected: false },
  { id: 'engine-hard-start', category: 'Engine', description: 'Engine is hard to start or won\'t start', selected: false },
  { id: 'engine-misfiring', category: 'Engine', description: 'Engine misfires or runs unevenly', selected: false },
  { id: 'engine-knocking', category: 'Engine', description: 'Knocking or pinging noises from engine', selected: false },
  { id: 'engine-overheating', category: 'Engine', description: 'Engine overheating or running hot', selected: false },
  { id: 'engine-power-loss', category: 'Engine', description: 'Loss of engine power or acceleration', selected: false },
  { id: 'engine-oil-leak', category: 'Engine', description: 'Oil leak under the vehicle', selected: false },

  // Transmission Symptoms
  { id: 'trans-slipping', category: 'Transmission', description: 'Transmission slipping between gears', selected: false },
  { id: 'trans-hard-shift', category: 'Transmission', description: 'Hard or jerky shifting', selected: false },
  { id: 'trans-no-shift', category: 'Transmission', description: 'Transmission won\'t shift or stuck in gear', selected: false },
  { id: 'trans-fluid-leak', category: 'Transmission', description: 'Red fluid leak (transmission fluid)', selected: false },
  { id: 'trans-grinding', category: 'Transmission', description: 'Grinding noise during shifting', selected: false },

  // Braking System Symptoms
  { id: 'brakes-squealing', category: 'Brakes', description: 'Squealing or screeching when braking', selected: false },
  { id: 'brakes-grinding', category: 'Brakes', description: 'Grinding noise when braking', selected: false },
  { id: 'brakes-soft-pedal', category: 'Brakes', description: 'Brake pedal feels soft or spongy', selected: false },
  { id: 'brakes-vibration', category: 'Brakes', description: 'Steering wheel or pedal vibrates when braking', selected: false },
  { id: 'brakes-pulling', category: 'Brakes', description: 'Vehicle pulls to one side when braking', selected: false },

  // Electrical System Symptoms
  { id: 'electrical-dim-lights', category: 'Electrical', description: 'Headlights or interior lights are dim', selected: false },
  { id: 'electrical-battery-dead', category: 'Electrical', description: 'Battery keeps dying or won\'t hold charge', selected: false },
  { id: 'electrical-alternator', category: 'Electrical', description: 'Battery warning light is on', selected: false },
  { id: 'electrical-starter', category: 'Electrical', description: 'Clicking noise when trying to start', selected: false },
  { id: 'electrical-fuses', category: 'Electrical', description: 'Electrical components not working', selected: false },

  // Cooling System Symptoms
  { id: 'cooling-overheating', category: 'Cooling', description: 'Temperature gauge shows overheating', selected: false },
  { id: 'cooling-coolant-leak', category: 'Cooling', description: 'Coolant leak (green, orange, or pink fluid)', selected: false },
  { id: 'cooling-steam', category: 'Cooling', description: 'Steam coming from under the hood', selected: false },
  { id: 'cooling-no-heat', category: 'Cooling', description: 'Heater not producing warm air', selected: false },

  // Suspension & Steering Symptoms
  { id: 'steering-hard', category: 'Steering', description: 'Steering is hard or requires extra effort', selected: false },
  { id: 'steering-loose', category: 'Steering', description: 'Steering feels loose or has excessive play', selected: false },
  { id: 'steering-vibration', category: 'Steering', description: 'Steering wheel vibrates while driving', selected: false },
  { id: 'suspension-bouncing', category: 'Suspension', description: 'Vehicle bounces excessively over bumps', selected: false },
  { id: 'suspension-noise', category: 'Suspension', description: 'Clunking or rattling noise over bumps', selected: false },

  // Exhaust System Symptoms
  { id: 'exhaust-loud', category: 'Exhaust', description: 'Exhaust is louder than normal', selected: false },
  { id: 'exhaust-smoke-white', category: 'Exhaust', description: 'White smoke from exhaust', selected: false },
  { id: 'exhaust-smoke-blue', category: 'Exhaust', description: 'Blue smoke from exhaust', selected: false },
  { id: 'exhaust-smoke-black', category: 'Exhaust', description: 'Black smoke from exhaust', selected: false },

  // Fuel System Symptoms
  { id: 'fuel-poor-mileage', category: 'Fuel System', description: 'Poor fuel economy', selected: false },
  { id: 'fuel-smell', category: 'Fuel System', description: 'Smell of gasoline inside or outside car', selected: false },
  { id: 'fuel-hesitation', category: 'Fuel System', description: 'Engine hesitates during acceleration', selected: false },

  // Warning Lights
  { id: 'warning-check-engine', category: 'Warning Lights', description: 'Check Engine light is on', selected: false },
  { id: 'warning-abs', category: 'Warning Lights', description: 'ABS warning light is on', selected: false },
  { id: 'warning-airbag', category: 'Warning Lights', description: 'Airbag warning light is on', selected: false },
  { id: 'warning-oil', category: 'Warning Lights', description: 'Oil pressure warning light is on', selected: false },
  { id: 'warning-temperature', category: 'Warning Lights', description: 'Temperature warning light is on', selected: false },
];