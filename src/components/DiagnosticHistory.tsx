import React, { useState } from 'react';
import { Calendar, Car, Code, AlertTriangle, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import { DiagnosticHistory as DiagnosticHistoryType } from '../types/diagnostic';

interface Props {
  history: DiagnosticHistoryType[];
}

const DiagnosticHistory: React.FC<Props> = ({ history }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getUrgencyColor = (urgency: DiagnosticHistoryType['result']['urgency']) => {
    switch (urgency) {
      case 'routine': return 'text-green-600 bg-green-100';
      case 'priority': return 'text-yellow-600 bg-yellow-100';
      case 'immediate': return 'text-orange-600 bg-orange-100';
      case 'safety_critical': return 'text-red-600 bg-red-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  if (history.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-tesla-dark-gray rounded-xl shadow-2xl border border-tesla-medium-gray p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-tesla-white mb-2">No Diagnostic History</h2>
          <p className="text-gray-300">
            Once you perform diagnostic analyses, they will appear here for easy reference.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="bg-tesla-dark-gray rounded-xl shadow-2xl border border-tesla-medium-gray p-6">
        <h2 className="text-2xl font-semibold text-tesla-white mb-2 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-tesla-red" />
          Diagnostic History
        </h2>
        <p className="text-gray-300 mb-6">
          View your previous diagnostic analyses and track your vehicle's maintenance history.
        </p>
      </div>

      {history.map((entry) => {
        const isExpanded = expandedItems.has(entry.id);

        return (
          <div key={entry.id} className="bg-tesla-dark-gray rounded-xl shadow-2xl border border-tesla-medium-gray overflow-hidden">
            <div 
              className="p-6 cursor-pointer hover:bg-tesla-medium-gray transition-colors"
              onClick={() => toggleExpanded(entry.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  {/* Header Info */}
                  <div className="flex items-center gap-3 mb-2">
                    <Car className="w-5 h-5 text-tesla-red" />
                    <span className="font-semibold text-tesla-white">
                      {entry.vehicleInfo.year} {entry.vehicleInfo.make} {entry.vehicleInfo.model}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(entry.result.urgency)}`}>
                      {entry.result.urgency.toUpperCase()}
                    </span>
                  </div>

                  {/* Date and Summary */}
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{formatDate(entry.date)}</span>
                    {entry.codes.length > 0 && (
                      <span className="flex items-center gap-1">
                        <Code className="w-4 h-4" />
                        {entry.codes.length} code{entry.codes.length !== 1 ? 's' : ''}
                      </span>
                    )}
                    {entry.symptoms.length > 0 && (
                      <span className="flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" />
                        {entry.symptoms.length} symptom{entry.symptoms.length !== 1 ? 's' : ''}
                      </span>
                    )}
                    {entry.result.estimatedCost && (
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        ${entry.result.estimatedCost.min} - ${entry.result.estimatedCost.max}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
              <div className="border-t border-gray-200 p-6 space-y-6">
                {/* Vehicle Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Vehicle Information</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Make:</span>
                      <p className="font-medium">{entry.vehicleInfo.make}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Model:</span>
                      <p className="font-medium">{entry.vehicleInfo.model}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Year:</span>
                      <p className="font-medium">{entry.vehicleInfo.year}</p>
                    </div>
                    {entry.vehicleInfo.mileage && (
                      <div>
                        <span className="text-gray-600">Mileage:</span>
                        <p className="font-medium">{entry.vehicleInfo.mileage.toLocaleString()} miles</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Diagnostic Codes */}
                {entry.codes.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Diagnostic Codes</h3>
                    <div className="space-y-2">
                      {entry.codes.map((code, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-mono font-bold">{code.code}</span>
                            <span className={`px-2 py-1 rounded-full text-xs border ${getSeverityColor(code.severity)}`}>
                              {code.severity.toUpperCase()}
                            </span>
                            <span className="text-sm text-gray-600">{code.system}</span>
                          </div>
                          <p className="text-sm text-gray-700">{code.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Symptoms */}
                {entry.symptoms.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Reported Symptoms</h3>
                    <ul className="space-y-1">
                      {entry.symptoms.map((symptom, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span className="text-gray-700">{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* AI Analysis */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">AI Analysis</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{entry.result.analysis}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Possible Causes */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Possible Causes</h4>
                      <ul className="space-y-1">
                        {entry.result.possibleCauses.map((cause, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span className="text-gray-700">{cause}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recommended Actions */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Recommended Actions</h4>
                      <ul className="space-y-1">
                        {entry.result.recommendedActions.map((action, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span className="text-gray-700">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Cost Estimate */}
                  {entry.result.estimatedCost && (
                    <div className="mt-4 bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        Estimated Repair Cost
                      </h4>
                      <p className="text-lg font-bold text-green-600">
                        ${entry.result.estimatedCost.min} - ${entry.result.estimatedCost.max}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DiagnosticHistory;