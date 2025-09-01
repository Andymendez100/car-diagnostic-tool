import React, { useState } from 'react';
import { Key, Eye, EyeOff, AlertCircle, ExternalLink } from 'lucide-react';

interface Props {
  onApiKeySet: (apiKey: string) => void;
}

const ApiKeySetup: React.FC<Props> = ({ onApiKeySet }) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      setError('Please enter your Gemini API key');
      return;
    }

    if (!apiKey.startsWith('AIza')) {
      setError('Invalid API key format. Gemini API keys start with "AIza"');
      return;
    }

    setError('');
    onApiKeySet(apiKey.trim());
  };

  return (
    <div className="min-h-screen bg-tesla-gradient flex items-center justify-center px-4">
      <div className="bg-tesla-dark-gray rounded-xl shadow-2xl border border-tesla-medium-gray p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <Key className="w-12 h-12 text-tesla-red mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-tesla-white mb-2">
            API Key Required
          </h1>
          <p className="text-gray-300">
            Enter your Google Gemini API key to use the diagnostic tool
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Gemini API Key
            </label>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIza..."
                className="w-full px-4 py-3 bg-tesla-medium-gray border border-gray-600 rounded-lg 
                         text-tesla-white placeholder-gray-400 focus:outline-none focus:border-tesla-red 
                         focus:ring-1 focus:ring-tesla-red pr-12"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 
                         hover:text-tesla-white transition-colors"
              >
                {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {error && (
              <div className="mt-2 flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-tesla-red hover:bg-red-600 text-tesla-white font-semibold 
                     py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 
                     focus:ring-tesla-red focus:ring-offset-2 focus:ring-offset-tesla-dark-gray"
          >
            Continue to Diagnostic Tool
          </button>
        </form>

        <div className="mt-6 p-4 bg-tesla-medium-gray rounded-lg">
          <h3 className="text-sm font-semibold text-tesla-white mb-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-tesla-red" />
            Need a Gemini API Key?
          </h3>
          <p className="text-xs text-gray-300 mb-3">
            Get your free API key from Google AI Studio. It's free for moderate usage.
          </p>
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-tesla-red hover:text-red-400 text-xs font-medium 
                     inline-flex items-center gap-1 transition-colors"
          >
            Get API Key
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="mt-4 text-xs text-gray-400 text-center">
          Your API key is stored locally and never transmitted to our servers
        </div>
      </div>
    </div>
  );
};

export default ApiKeySetup;