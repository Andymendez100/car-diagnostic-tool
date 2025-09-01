import React from 'react';
import { Car } from 'lucide-react';
import { VehicleInfo } from '../types/diagnostic';
import { vehicleMakes, vehicleModels } from '../data/vehicleData';

interface Props {
  vehicleInfo: VehicleInfo;
  onChange: (info: VehicleInfo) => void;
}

const VehicleInfoForm: React.FC<Props> = ({ vehicleInfo, onChange }) => {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1990 + 1 }, (_, i) => currentYear - i);
  const availableModels = vehicleInfo.make ? vehicleModels[vehicleInfo.make] || [] : [];

  const handleChange = (field: keyof VehicleInfo, value: string | number | undefined) => {
    let updatedInfo = {
      ...vehicleInfo,
      [field]: value
    };

    // Reset model when make changes
    if (field === 'make') {
      updatedInfo.model = '';
    }

    onChange(updatedInfo);
  };

  return (
    <div className="bg-tesla-dark-gray rounded-xl shadow-2xl border border-tesla-medium-gray p-6">
      <h2 className="text-2xl font-semibold text-tesla-white mb-4 flex items-center gap-2">
        <Car className="w-6 h-6 text-tesla-red" />
        Vehicle Information
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Make <span className="text-tesla-red">*</span>
          </label>
          <select
            value={vehicleInfo.make}
            onChange={(e) => handleChange('make', e.target.value)}
            className="w-full px-3 py-2 bg-tesla-black border border-tesla-medium-gray rounded-lg text-tesla-white focus:ring-2 focus:ring-tesla-red focus:border-tesla-red"
            required
          >
            <option value="" className="bg-tesla-black text-gray-500">Select Make</option>
            {vehicleMakes.map(make => (
              <option key={make} value={make} className="bg-tesla-black text-tesla-white">{make}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Model <span className="text-tesla-red">*</span>
          </label>
          <select
            value={vehicleInfo.model}
            onChange={(e) => handleChange('model', e.target.value)}
            className="w-full px-3 py-2 bg-tesla-black border border-tesla-medium-gray rounded-lg text-tesla-white focus:ring-2 focus:ring-tesla-red focus:border-tesla-red disabled:bg-tesla-medium-gray disabled:text-gray-500"
            required
            disabled={!vehicleInfo.make || availableModels.length === 0}
          >
            <option value="" className="bg-tesla-black text-gray-500">
              {!vehicleInfo.make ? 'Select Make First' : 'Select Model'}
            </option>
            {availableModels.map(model => (
              <option key={model} value={model} className="bg-tesla-black text-tesla-white">{model}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Year <span className="text-tesla-red">*</span>
          </label>
          <select
            value={vehicleInfo.year}
            onChange={(e) => handleChange('year', parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-tesla-black border border-tesla-medium-gray rounded-lg text-tesla-white focus:ring-2 focus:ring-tesla-red focus:border-tesla-red"
            required
          >
            {yearOptions.map(year => (
              <option key={year} value={year} className="bg-tesla-black text-tesla-white">{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Engine (Optional)
          </label>
          <input
            type="text"
            value={vehicleInfo.engine || ''}
            onChange={(e) => handleChange('engine', e.target.value)}
            placeholder="e.g., 2.4L 4-cylinder"
            className="w-full px-3 py-2 bg-tesla-black border border-tesla-medium-gray rounded-lg text-tesla-white placeholder-gray-500 focus:ring-2 focus:ring-tesla-red focus:border-tesla-red"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Mileage (Optional)
          </label>
          <input
            type="number"
            value={vehicleInfo.mileage || ''}
            onChange={(e) => handleChange('mileage', e.target.value ? parseInt(e.target.value) : undefined)}
            placeholder="e.g., 75000"
            min="0"
            className="w-full px-3 py-2 bg-tesla-black border border-tesla-medium-gray rounded-lg text-tesla-white placeholder-gray-500 focus:ring-2 focus:ring-tesla-red focus:border-tesla-red"
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleInfoForm;