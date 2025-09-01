export interface CarIssue {
  id: string;
  category: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  commonCauses: string[];
  keywords: string[];
}

export const commonCarIssues: CarIssue[] = [
  // Engine Issues
  {
    id: 'engine-clicking',
    category: 'Engine',
    description: 'Clicking noise coming from the engine',
    severity: 'high',
    commonCauses: ['Low oil level', 'Worn valve lifters', 'Carbon buildup', 'Timing chain issues'],
    keywords: ['clicking', 'ticking', 'tapping', 'engine', 'hood']
  },
  {
    id: 'engine-knocking',
    category: 'Engine',
    description: 'Knocking or pinging sound when accelerating',
    severity: 'high',
    commonCauses: ['Bad fuel quality', 'Carbon buildup', 'Wrong octane fuel', 'Engine timing issues'],
    keywords: ['knocking', 'pinging', 'metallic', 'acceleration', 'engine']
  },
  {
    id: 'engine-rough-idle',
    category: 'Engine',
    description: 'Engine runs rough or shakes when idling',
    severity: 'medium',
    commonCauses: ['Dirty air filter', 'Bad spark plugs', 'Vacuum leak', 'Fuel injector problems'],
    keywords: ['rough', 'shaking', 'vibration', 'idle', 'unstable']
  },
  {
    id: 'engine-wont-start',
    category: 'Engine',
    description: 'Engine cranks but won\'t start',
    severity: 'critical',
    commonCauses: ['Dead battery', 'Bad starter', 'Fuel pump failure', 'Ignition system issues'],
    keywords: ['wont start', 'cranking', 'no start', 'dead', 'battery']
  },
  {
    id: 'engine-overheating',
    category: 'Engine',
    description: 'Engine temperature running hot or overheating',
    severity: 'critical',
    commonCauses: ['Coolant leak', 'Bad thermostat', 'Radiator issues', 'Water pump failure'],
    keywords: ['hot', 'overheating', 'temperature', 'steam', 'coolant']
  },

  // Braking Issues
  {
    id: 'brakes-squealing',
    category: 'Brakes',
    description: 'High-pitched squealing when braking',
    severity: 'medium',
    commonCauses: ['Worn brake pads', 'Glazed rotors', 'Brake dust buildup', 'Worn brake shoes'],
    keywords: ['squealing', 'screeching', 'high pitched', 'brakes', 'stopping']
  },
  {
    id: 'brakes-grinding',
    category: 'Brakes',
    description: 'Grinding noise when applying brakes',
    severity: 'high',
    commonCauses: ['Severely worn brake pads', 'Damaged rotors', 'Brake hardware issues', 'Debris in brakes'],
    keywords: ['grinding', 'metal on metal', 'scraping', 'brakes', 'loud']
  },
  {
    id: 'brakes-soft-pedal',
    category: 'Brakes',
    description: 'Brake pedal feels soft or spongy',
    severity: 'high',
    commonCauses: ['Air in brake lines', 'Brake fluid leak', 'Worn brake pads', 'Master cylinder issues'],
    keywords: ['soft', 'spongy', 'pedal', 'mushy', 'brake']
  },
  {
    id: 'brakes-pulling',
    category: 'Brakes',
    description: 'Car pulls to one side when braking',
    severity: 'high',
    commonCauses: ['Uneven brake pad wear', 'Stuck caliper', 'Contaminated brake fluid', 'Alignment issues'],
    keywords: ['pulling', 'veering', 'one side', 'steering', 'braking']
  },

  // Transmission Issues
  {
    id: 'transmission-slipping',
    category: 'Transmission',
    description: 'Transmission slips or doesn\'t shift properly',
    severity: 'high',
    commonCauses: ['Low transmission fluid', 'Worn clutch', 'Internal damage', 'Solenoid problems'],
    keywords: ['slipping', 'shifting', 'transmission', 'gears', 'delay']
  },
  {
    id: 'transmission-grinding',
    category: 'Transmission',
    description: 'Grinding noise when shifting gears',
    severity: 'high',
    commonCauses: ['Worn synchronizers', 'Low gear oil', 'Clutch problems', 'Internal wear'],
    keywords: ['grinding', 'shifting', 'gears', 'manual', 'clutch']
  },
  {
    id: 'transmission-whining',
    category: 'Transmission',
    description: 'Whining or whirring noise from transmission',
    severity: 'medium',
    commonCauses: ['Low transmission fluid', 'Worn bearings', 'Torque converter issues', 'Pump problems'],
    keywords: ['whining', 'whirring', 'transmission', 'automatic', 'noise']
  },

  // Electrical Issues
  {
    id: 'electrical-clicking-start',
    category: 'Electrical',
    description: 'Rapid clicking when trying to start the car',
    severity: 'high',
    commonCauses: ['Weak battery', 'Corroded terminals', 'Bad starter solenoid', 'Poor connections'],
    keywords: ['clicking', 'rapid', 'start', 'starter', 'electrical']
  },
  {
    id: 'electrical-dim-lights',
    category: 'Electrical',
    description: 'Headlights or interior lights are dim',
    severity: 'medium',
    commonCauses: ['Weak battery', 'Bad alternator', 'Corroded connections', 'Voltage regulator issues'],
    keywords: ['dim', 'lights', 'headlights', 'dark', 'electrical']
  },
  {
    id: 'electrical-dead-battery',
    category: 'Electrical',
    description: 'Battery keeps dying or won\'t hold charge',
    severity: 'high',
    commonCauses: ['Old battery', 'Parasitic drain', 'Bad alternator', 'Corroded terminals'],
    keywords: ['dead', 'battery', 'charge', 'dying', 'electrical']
  },

  // Suspension & Steering
  {
    id: 'suspension-clunking',
    category: 'Suspension',
    description: 'Clunking noise over bumps or when turning',
    severity: 'medium',
    commonCauses: ['Worn struts', 'Bad sway bar links', 'Loose ball joints', 'Damaged bushings'],
    keywords: ['clunking', 'bumps', 'turning', 'suspension', 'noise']
  },
  {
    id: 'steering-hard',
    category: 'Steering',
    description: 'Steering wheel is hard to turn',
    severity: 'medium',
    commonCauses: ['Low power steering fluid', 'Bad power steering pump', 'Belt issues', 'Rack and pinion problems'],
    keywords: ['hard', 'steering', 'difficult', 'turn', 'effort']
  },
  {
    id: 'steering-vibration',
    category: 'Steering',
    description: 'Steering wheel vibrates while driving',
    severity: 'medium',
    commonCauses: ['Unbalanced wheels', 'Warped brake rotors', 'Alignment issues', 'Tire problems'],
    keywords: ['vibration', 'shaking', 'steering', 'wheel', 'driving']
  },

  // Exhaust Issues
  {
    id: 'exhaust-loud',
    category: 'Exhaust',
    description: 'Car is much louder than usual',
    severity: 'medium',
    commonCauses: ['Exhaust leak', 'Damaged muffler', 'Broken exhaust pipe', 'Catalytic converter issues'],
    keywords: ['loud', 'noise', 'exhaust', 'muffler', 'rumbling']
  },
  {
    id: 'exhaust-smoke-white',
    category: 'Exhaust',
    description: 'White smoke coming from exhaust',
    severity: 'high',
    commonCauses: ['Coolant leak into engine', 'Blown head gasket', 'Cracked cylinder head', 'Cold weather condensation'],
    keywords: ['white', 'smoke', 'exhaust', 'steam', 'tailpipe']
  },
  {
    id: 'exhaust-smoke-blue',
    category: 'Exhaust',
    description: 'Blue smoke coming from exhaust',
    severity: 'high',
    commonCauses: ['Burning oil', 'Worn piston rings', 'Valve seal problems', 'Turbocharger issues'],
    keywords: ['blue', 'smoke', 'exhaust', 'oil', 'burning']
  },

  // AC/Heating Issues
  {
    id: 'ac-not-cold',
    category: 'Climate Control',
    description: 'Air conditioning not blowing cold air',
    severity: 'low',
    commonCauses: ['Low refrigerant', 'Bad compressor', 'Clogged filter', 'Electrical issues'],
    keywords: ['ac', 'air conditioning', 'not cold', 'warm', 'hot']
  },
  {
    id: 'heater-not-warm',
    category: 'Climate Control',
    description: 'Heater not producing warm air',
    severity: 'low',
    commonCauses: ['Low coolant', 'Bad heater core', 'Thermostat stuck', 'Blend door issues'],
    keywords: ['heater', 'heat', 'cold', 'not warm', 'blowing']
  },

  // Fuel System Issues
  {
    id: 'fuel-poor-mileage',
    category: 'Fuel System',
    description: 'Getting much worse gas mileage than usual',
    severity: 'medium',
    commonCauses: ['Dirty air filter', 'Bad oxygen sensor', 'Fuel injector problems', 'Tire pressure low'],
    keywords: ['mileage', 'mpg', 'fuel', 'gas', 'consumption']
  },
  {
    id: 'fuel-smell',
    category: 'Fuel System',
    description: 'Smell of gasoline inside or outside the car',
    severity: 'high',
    commonCauses: ['Fuel leak', 'Bad fuel pump', 'Evaporative system leak', 'Fuel line damage'],
    keywords: ['smell', 'gasoline', 'fuel', 'odor', 'fumes']
  },

  // Tire Issues
  {
    id: 'tire-noise',
    category: 'Tires',
    description: 'Unusual noise or humming from tires',
    severity: 'medium',
    commonCauses: ['Uneven tire wear', 'Low tire pressure', 'Alignment issues', 'Bad wheel bearing'],
    keywords: ['tire', 'humming', 'road noise', 'wearing', 'pressure']
  },
  {
    id: 'tire-vibration',
    category: 'Tires',
    description: 'Car vibrates at certain speeds',
    severity: 'medium',
    commonCauses: ['Unbalanced tires', 'Bent rim', 'Tire defect', 'Suspension problems'],
    keywords: ['vibration', 'speed', 'shaking', 'tires', 'wheels']
  }
];