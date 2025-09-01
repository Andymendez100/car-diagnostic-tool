import React, { useState } from 'react';
import { AlertTriangle, Check, Search, Car, DollarSign, Clock } from 'lucide-react';
import { Symptom, VehicleInfo, DiagnosticResult, DiagnosticHistory } from '../types/diagnostic';
import { commonSymptoms } from '../data/symptoms';
import { GeminiService } from '../services/geminiService';
import VehicleInfoForm from './VehicleInfoForm';

interface Props {
  onAddToHistory: (entry: DiagnosticHistory) => void;
  apiKey: string;
}

const SymptomChecker: React.FC<Props> = ({ onAddToHistory, apiKey }) => {
  const [symptoms, setSymptoms] = useState<Symptom[]>(commonSymptoms);
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo>({
    make: '',
    model: '',
    year: new Date().getFullYear(),
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const geminiService = new GeminiService(apiKey);

  const categories = ['all', ...Array.from(new Set(symptoms.map(s => s.category)))];
  
  const filteredSymptoms = symptoms.filter(symptom => {
    const matchesSearch = symptom.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         symptom.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || symptom.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedSymptoms = symptoms.filter(s => s.selected);

  const toggleSymptom = (id: string) => {
    setSymptoms(symptoms.map(symptom =>
      symptom.id === id ? { ...symptom, selected: !symptom.selected } : symptom
    ));
  };

  const analyzeSymptoms = async () => {
    const selected = symptoms.filter(s => s.selected);
    
    if (selected.length === 0) {
      alert('Please select at least one symptom.');
      return;
    }

    if (!vehicleInfo.make || !vehicleInfo.model) {
      alert('Please provide vehicle make and model information.');
      return;
    }

    setIsAnalyzing(true);
    try {
      const analysis = await geminiService.analyzeSymptoms(symptoms, vehicleInfo);
      setResult(analysis);

      const historyEntry: DiagnosticHistory = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        codes: [],
        symptoms: selected.map(s => s.description),
        result: analysis,
        vehicleInfo: { ...vehicleInfo }
      };

      onAddToHistory(historyEntry);
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Failed to analyze symptoms. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearSelection = () => {
    setSymptoms(symptoms.map(symptom => ({ ...symptom, selected: false })));
    setResult(null);
  };

  const getUrgencyColor = (urgency: DiagnosticResult['urgency']) => {
    switch (urgency) {
      case 'routine': return 'text-green-600';
      case 'priority': return 'text-yellow-600';
      case 'immediate': return 'text-orange-600';
      case 'safety_critical': return 'text-red-600';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Engine': 'bg-red-100 text-red-800',
      'Transmission': 'bg-purple-100 text-purple-800',
      'Brakes': 'bg-orange-100 text-orange-800',
      'Electrical': 'bg-yellow-100 text-yellow-800',
      'Cooling': 'bg-blue-100 text-blue-800',
      'Steering': 'bg-indigo-100 text-indigo-800',
      'Suspension': 'bg-green-100 text-green-800',
      'Exhaust': 'bg-gray-100 text-gray-800',
      'Fuel System': 'bg-pink-100 text-pink-800',
      'Warning Lights': 'bg-red-100 text-red-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Vehicle Information */}
      <VehicleInfoForm 
        vehicleInfo={vehicleInfo}
        onChange={setVehicleInfo}
      />

      {/* Symptom Checker */}
      <div className="bg-tesla-dark-gray rounded-xl shadow-2xl border border-tesla-medium-gray p-6">
        <h2 className="text-2xl font-semibold text-tesla-white mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-tesla-red" />
          Symptom Checker
        </h2>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search symptoms..."
              className="w-full pl-10 pr-4 py-2 bg-tesla-black border border-tesla-medium-gray rounded-lg text-tesla-white placeholder-gray-500 focus:ring-2 focus:ring-tesla-red focus:border-tesla-red"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-tesla-black border border-tesla-medium-gray rounded-lg text-tesla-white focus:ring-2 focus:ring-tesla-red focus:border-tesla-red"
          >
            {categories.map(category => (
              <option key={category} value={category} className="bg-tesla-black text-tesla-white">
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>

        {/* Selected Count and Clear */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-300">
            {selectedSymptoms.length} symptoms selected
          </p>
          {selectedSymptoms.length > 0 && (
            <button
              onClick={clearSelection}
              className="text-tesla-red hover:text-tesla-red-hover text-sm font-medium"
            >
              Clear all selections
            </button>
          )}
        </div>

        {/* Symptoms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {filteredSymptoms.map((symptom) => (
            <button
              key={symptom.id}
              onClick={() => toggleSymptom(symptom.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                symptom.selected
                  ? 'border-tesla-red bg-tesla-black'
                  : 'border-tesla-medium-gray hover:border-tesla-red hover:bg-tesla-black bg-tesla-dark-gray'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(symptom.category)}`}>
                  {symptom.category}
                </span>
                {symptom.selected && (
                  <Check className="w-5 h-5 text-tesla-red flex-shrink-0" />
                )}
              </div>
              <p className="text-tesla-white font-medium text-sm leading-tight">
                {symptom.description}
              </p>
            </button>
          ))}
        </div>

        {/* Analyze Button */}
        <button
          onClick={analyzeSymptoms}
          disabled={isAnalyzing || selectedSymptoms.length === 0}
          className="w-full px-6 py-3 bg-tesla-red text-tesla-white rounded-lg hover:bg-tesla-red-hover disabled:bg-tesla-medium-gray disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Analyzing symptoms with AI...
            </>
          ) : (
            <>
              <AlertTriangle className="w-5 h-5" />
              Analyze Symptoms with Gemini AI
            </>
          )}
        </button>
      </div>

      {/* Analysis Results */}
      {result && (
        <div className="bg-tesla-dark-gray rounded-xl shadow-2xl border border-tesla-medium-gray p-6">
          <h2 className="text-2xl font-semibold text-tesla-white mb-4 flex items-center gap-2">
            <Car className="w-6 h-6 text-tesla-red" />
            AI Analysis Results
          </h2>

          {/* Urgency Badge */}
          <div className="mb-4">
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(result.urgency)}`}>
              <Clock className="w-4 h-4" />
              {result.urgency.charAt(0).toUpperCase() + result.urgency.slice(1)} Priority
            </span>
          </div>

          {/* Analysis */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-tesla-white mb-2">Analysis</h3>
            <p className="text-gray-300 leading-relaxed">{result.analysis}</p>
          </div>

          {/* Possible Causes */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-tesla-white mb-3">Possible Causes</h3>
            <ul className="space-y-2">
              {result.possibleCauses.map((cause, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-tesla-red rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">{cause}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Actions */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-tesla-white mb-3">Recommended Actions</h3>
            <ul className="space-y-2">
              {result.recommendedActions.map((action, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">{action}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cost Estimate */}
          {result.estimatedCost && (
            <div className="bg-tesla-black rounded-lg border border-tesla-medium-gray p-4">
              <h3 className="text-lg font-semibold text-tesla-white mb-2 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                Estimated Repair Cost
              </h3>
              <p className="text-2xl font-bold text-green-500">
                ${result.estimatedCost.min} - ${result.estimatedCost.max}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Cost estimates are approximate and may vary by location and vehicle condition.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;