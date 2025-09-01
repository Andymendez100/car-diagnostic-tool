import React, { useState } from 'react';
import { Plus, X, Search, AlertCircle, Car, DollarSign, Clock } from 'lucide-react';
import { VehicleInfo, DiagnosticResult, DiagnosticHistory } from '../types/diagnostic';
import { commonCarIssues, CarIssue } from '../data/commonIssues';
import { GeminiService } from '../services/geminiService';
import VehicleInfoForm from './VehicleInfoForm';

interface Props {
  onAddToHistory: (entry: DiagnosticHistory) => void;
}

const DiagnosticTool: React.FC<Props> = ({ onAddToHistory }) => {
  const [issues, setIssues] = useState<CarIssue[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo>({
    make: '',
    model: '',
    year: new Date().getFullYear(),
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const geminiService = new GeminiService();

  const searchIssues = async () => {
    if (!searchTerm.trim()) return;

    const searchLower = searchTerm.toLowerCase();
    const matchingIssues = commonCarIssues.filter(issue => 
      issue.description.toLowerCase().includes(searchLower) ||
      issue.keywords.some(keyword => keyword.toLowerCase().includes(searchLower)) ||
      issue.category.toLowerCase().includes(searchLower)
    );

    if (matchingIssues.length > 0) {
      // Add unique issues only
      const newIssues = matchingIssues.filter(newIssue => 
        !issues.some(existingIssue => existingIssue.id === newIssue.id)
      );

      if (newIssues.length === 0) {
        alert('These issues are already added.');
        return;
      }

      setIssues([...issues, ...newIssues]);
      setSearchTerm('');
      setAiSuggestions(null); // Clear AI suggestions when we find matches
    } else {
      // No matches found - use AI to analyze user input
      setIsSearching(true);
      try {
        const suggestions = await geminiService.analyzeUserInput(searchTerm, vehicleInfo);
        setAiSuggestions(suggestions);
        setSearchTerm('');
      } catch (error) {
        console.error('AI analysis failed:', error);
        alert('Unable to analyze your description. Please try rephrasing or use keywords like "clicking", "grinding", "squealing", etc.');
      } finally {
        setIsSearching(false);
      }
    }
  };

  const addSuggestedIssue = (suggestedIssue: any) => {
    const newIssue: CarIssue = {
      id: `ai-${Date.now()}`,
      category: suggestedIssue.category,
      description: suggestedIssue.description,
      severity: suggestedIssue.severity,
      commonCauses: [suggestedIssue.reasoning],
      keywords: []
    };

    setIssues([...issues, newIssue]);
  };

  const removeIssue = (issueIdToRemove: string) => {
    setIssues(issues.filter(issue => issue.id !== issueIdToRemove));
  };

  const analyzeIssues = async () => {
    if (issues.length === 0) {
      alert('Please describe at least one issue you\'re experiencing.');
      return;
    }

    if (!vehicleInfo.make || !vehicleInfo.model) {
      alert('Please provide vehicle make and model information.');
      return;
    }

    setIsAnalyzing(true);
    try {
      // Convert issues to a format the AI service can understand
      const issueDescriptions = issues.map(issue => issue.description);
      const analysis = await geminiService.analyzeCarIssues(issues, vehicleInfo);
      setResult(analysis);

      const historyEntry: DiagnosticHistory = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        codes: [],
        symptoms: issueDescriptions,
        result: analysis,
        vehicleInfo: { ...vehicleInfo }
      };

      onAddToHistory(historyEntry);
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Failed to analyze issues. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: CarIssue['severity']) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const getUrgencyColor = (urgency: DiagnosticResult['urgency']) => {
    switch (urgency) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'critical': return 'text-red-600';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Vehicle Information */}
      <VehicleInfoForm 
        vehicleInfo={vehicleInfo}
        onChange={setVehicleInfo}
      />

      {/* Issue Description Input */}
      <div className="bg-tesla-dark-gray rounded-xl shadow-2xl border border-tesla-medium-gray p-6">
        <h2 className="text-2xl font-semibold text-tesla-white mb-4 flex items-center gap-2">
          <Search className="w-6 h-6 text-tesla-red" />
          Describe Your Car Issues
        </h2>
        
        <div className="mb-4">
          <p className="text-gray-300 text-sm mb-3">
            Describe what you're experiencing in plain English. Try keywords like: "clicking noise", "grinding brakes", "engine shaking", "won't start", etc.
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="e.g., hearing a clicking noise from the engine"
              className="flex-1 px-4 py-2 bg-tesla-black border border-tesla-medium-gray rounded-lg text-tesla-white placeholder-gray-500 focus:ring-2 focus:ring-tesla-red focus:border-tesla-red"
              onKeyPress={(e) => e.key === 'Enter' && searchIssues()}
            />
            <button
              onClick={searchIssues}
              disabled={isSearching}
              className="px-6 py-2 bg-tesla-red text-tesla-white rounded-lg hover:bg-tesla-red-hover disabled:bg-tesla-medium-gray transition-colors flex items-center gap-2"
            >
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Find Issues
                </>
              )}
            </button>
          </div>
        </div>

        {/* AI Suggestions */}
        {aiSuggestions && (
          <div className="mb-6 bg-tesla-black rounded-lg border border-tesla-medium-gray p-4">
            <h3 className="text-lg font-semibold text-tesla-white mb-3">AI Analysis & Suggestions</h3>
            
            {/* AI Analysis */}
            <div className="mb-4">
              <p className="text-gray-300 leading-relaxed">{aiSuggestions.analysis}</p>
            </div>

            {/* Suggested Issues */}
            {aiSuggestions.suggestedIssues && aiSuggestions.suggestedIssues.length > 0 && (
              <div className="mb-4">
                <h4 className="text-md font-medium text-tesla-white mb-2">Possible Issues:</h4>
                <div className="space-y-2">
                  {aiSuggestions.suggestedIssues.map((suggested: any, index: number) => (
                    <div key={index} className="bg-tesla-dark-gray rounded-lg border border-tesla-medium-gray p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-1 rounded-full text-xs border ${getSeverityColor(suggested.severity)}`}>
                              {suggested.severity.toUpperCase()}
                            </span>
                            <span className="text-sm text-gray-400">{suggested.category}</span>
                          </div>
                          <p className="text-tesla-white font-medium text-sm">{suggested.description}</p>
                          <p className="text-gray-400 text-xs mt-1">{suggested.reasoning}</p>
                        </div>
                        <button
                          onClick={() => addSuggestedIssue(suggested)}
                          className="ml-3 px-3 py-1 bg-tesla-red text-tesla-white rounded text-xs hover:bg-tesla-red-hover transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Clarifying Questions */}
            {aiSuggestions.clarifyingQuestions && aiSuggestions.clarifyingQuestions.length > 0 && (
              <div>
                <h4 className="text-md font-medium text-tesla-white mb-2">To help narrow down the problem:</h4>
                <ul className="space-y-1">
                  {aiSuggestions.clarifyingQuestions.map((question: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-tesla-red mt-1">•</span>
                      {question}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setAiSuggestions(null)}
                  className="mt-3 text-xs text-gray-400 hover:text-tesla-red transition-colors"
                >
                  Clear suggestions
                </button>
              </div>
            )}
          </div>
        )}

        {/* Added Issues */}
        {issues.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium text-gray-300">Issues You're Experiencing:</h3>
            {issues.map((issue) => (
              <div key={issue.id} className="flex items-center justify-between bg-tesla-black rounded-lg border border-tesla-medium-gray p-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs border ${getSeverityColor(issue.severity)}`}>
                      {issue.severity.toUpperCase()} PRIORITY
                    </span>
                    <span className="text-sm text-gray-400">{issue.category}</span>
                  </div>
                  <p className="text-tesla-white font-medium">{issue.description}</p>
                  {issue.commonCauses.length > 0 && (
                    <p className="text-gray-400 text-sm mt-1">
                      Common causes: {issue.commonCauses.slice(0, 2).join(', ')}
                      {issue.commonCauses.length > 2 && '...'}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => removeIssue(issue.id)}
                  className="p-2 text-gray-500 hover:text-tesla-red transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Analyze Button */}
        <div className="mt-6">
          <button
            onClick={analyzeIssues}
            disabled={isAnalyzing || issues.length === 0}
            className="w-full px-6 py-3 bg-tesla-red text-tesla-white rounded-lg hover:bg-tesla-red-hover disabled:bg-tesla-medium-gray disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Analyzing with AI...
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5" />
                Get AI Diagnosis
              </>
            )}
          </button>
        </div>
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

export default DiagnosticTool;