import React, { useState } from 'react';
import { Car, Wrench, AlertTriangle, History } from 'lucide-react';
import DiagnosticTool from './components/DiagnosticTool';
import SymptomChecker from './components/SymptomChecker';
import DiagnosticHistory from './components/DiagnosticHistory';
import { DiagnosticHistory as DiagnosticHistoryType } from './types/diagnostic';

type ActiveTab = 'diagnostic' | 'symptoms' | 'history';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('diagnostic');
  const [history, setHistory] = useState<DiagnosticHistoryType[]>([]);

  const addToHistory = (entry: DiagnosticHistoryType) => {
    setHistory(prev => [entry, ...prev]);
  };

  return (
    <div className="min-h-screen bg-tesla-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Car className="w-10 h-10 text-tesla-red" />
            <h1 className="text-4xl font-bold text-tesla-white">AutoDiagnostic AI</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Advanced car diagnostic tool powered by Google Gemini AI. 
            Get instant analysis of diagnostic codes, symptoms, and repair recommendations.
          </p>
        </header>

        {/* Navigation Tabs */}
        <nav className="flex justify-center mb-8">
          <div className="bg-tesla-dark-gray rounded-lg p-1 shadow-2xl border border-tesla-medium-gray">
            <button
              onClick={() => setActiveTab('diagnostic')}
              className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all ${
                activeTab === 'diagnostic'
                  ? 'bg-tesla-red text-tesla-white shadow-lg'
                  : 'text-gray-300 hover:bg-tesla-medium-gray hover:text-tesla-white'
              }`}
            >
              <Wrench className="w-5 h-5" />
              Describe Issues
            </button>
            <button
              onClick={() => setActiveTab('symptoms')}
              className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all ${
                activeTab === 'symptoms'
                  ? 'bg-tesla-red text-tesla-white shadow-lg'
                  : 'text-gray-300 hover:bg-tesla-medium-gray hover:text-tesla-white'
              }`}
            >
              <AlertTriangle className="w-5 h-5" />
              Symptom Checker
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all ${
                activeTab === 'history'
                  ? 'bg-tesla-red text-tesla-white shadow-lg'
                  : 'text-gray-300 hover:bg-tesla-medium-gray hover:text-tesla-white'
              }`}
            >
              <History className="w-5 h-5" />
              History ({history.length})
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main>
          {activeTab === 'diagnostic' && (
            <DiagnosticTool onAddToHistory={addToHistory} />
          )}
          {activeTab === 'symptoms' && (
            <SymptomChecker onAddToHistory={addToHistory} />
          )}
          {activeTab === 'history' && (
            <DiagnosticHistory history={history} />
          )}
        </main>

        {/* Footer */}
        <footer className="text-center mt-12 pt-8 border-t border-tesla-medium-gray">
          <p className="text-gray-400">
            Powered by Google Gemini AI • For informational purposes only • Always consult a professional mechanic
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
