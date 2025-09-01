import { GoogleGenerativeAI } from '@google/generative-ai';
import { VehicleInfo, Symptom, DiagnosticResult } from '../types/diagnostic';
import { CarIssue } from '../data/commonIssues';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY || '');

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  async analyzeCarIssues(
    issues: CarIssue[],
    vehicleInfo: VehicleInfo
  ): Promise<DiagnosticResult> {
    const prompt = `
You are an expert automotive diagnostic AI. A car owner is experiencing the following issues with their vehicle. Provide comprehensive diagnostic information.

Vehicle Information:
- Make: ${vehicleInfo.make}
- Model: ${vehicleInfo.model}
- Year: ${vehicleInfo.year}
- Engine: ${vehicleInfo.engine || 'Not specified'}
- Mileage: ${vehicleInfo.mileage ? `${vehicleInfo.mileage} miles` : 'Not specified'}

Issues Reported:
${issues.map(issue => `- ${issue.description} (${issue.category}, ${issue.severity} priority)
  Common causes: ${issue.commonCauses.join(', ')}`).join('\n\n')}

Please provide a detailed analysis in the following JSON format:
{
  "analysis": "Comprehensive explanation of what these issues indicate and how they might be related",
  "possibleCauses": ["Array of most likely root causes based on the symptoms"],
  "recommendedActions": ["Array of recommended diagnostic steps and repairs, prioritized by importance"],
  "estimatedCost": {
    "min": minimum_repair_cost_in_USD,
    "max": maximum_repair_cost_in_USD
  },
  "urgency": "low|medium|high|critical"
}

Focus on practical, actionable advice. Consider the vehicle's age and mileage in your recommendations. If multiple issues are related, explain the connections. Prioritize safety-critical issues.
`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      throw new Error('Failed to parse AI response');
    } catch (error) {
      console.error('Gemini API error:', error);
      return {
        analysis: 'Unable to analyze issues at this time. Please try again later.',
        possibleCauses: ['AI service temporarily unavailable'],
        recommendedActions: ['Retry analysis', 'Consult a professional mechanic'],
        urgency: 'medium' as const
      };
    }
  }

  async analyzeSymptoms(
    symptoms: Symptom[],
    vehicleInfo: VehicleInfo
  ): Promise<DiagnosticResult> {
    const selectedSymptoms = symptoms.filter(s => s.selected);
    
    const prompt = `
You are an expert automotive diagnostic AI. A vehicle owner is experiencing symptoms but doesn't have access to OBD-II codes. Analyze the symptoms and provide diagnostic guidance.

Vehicle Information:
- Make: ${vehicleInfo.make}
- Model: ${vehicleInfo.model}
- Year: ${vehicleInfo.year}
- Engine: ${vehicleInfo.engine || 'Not specified'}
- Mileage: ${vehicleInfo.mileage ? `${vehicleInfo.mileage} miles` : 'Not specified'}

Reported Symptoms:
${selectedSymptoms.map(symptom => `- ${symptom.category}: ${symptom.description}`).join('\n')}

Please provide a diagnostic analysis in the following JSON format:
{
  "analysis": "Explanation of what these symptoms typically indicate",
  "possibleCauses": ["Array of likely causes based on symptoms"],
  "recommendedActions": ["Array of diagnostic steps and potential solutions"],
  "estimatedCost": {
    "min": minimum_repair_cost_in_USD,
    "max": maximum_repair_cost_in_USD
  },
  "urgency": "low|medium|high|critical"
}

Consider the vehicle's age and mileage. If symptoms are safety-critical, prioritize urgent recommendations.
`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      throw new Error('Failed to parse AI response');
    } catch (error) {
      console.error('Gemini API error:', error);
      return {
        analysis: 'Unable to analyze symptoms at this time. Please try again later.',
        possibleCauses: ['API service temporarily unavailable'],
        recommendedActions: ['Retry analysis', 'Consult a professional mechanic'],
        urgency: 'medium' as const
      };
    }
  }

  async analyzeUserInput(
    userInput: string,
    vehicleInfo: VehicleInfo
  ): Promise<{
    suggestedIssues: Array<{
      description: string;
      category: string;
      severity: 'low' | 'medium' | 'high' | 'critical';
      reasoning: string;
    }>;
    clarifyingQuestions: string[];
    analysis: string;
  }> {
    const prompt = `
You are an expert automotive diagnostic AI. A car owner has described their vehicle problem, but it doesn't match our predefined issue database. Help them by analyzing their input and suggesting relevant car issues.

User's Description: "${userInput}"

Vehicle Information:
- Make: ${vehicleInfo.make || 'Not specified'}
- Model: ${vehicleInfo.model || 'Not specified'}
- Year: ${vehicleInfo.year || 'Not specified'}
- Mileage: ${vehicleInfo.mileage ? `${vehicleInfo.mileage} miles` : 'Not specified'}

Please provide a response in the following JSON format:
{
  "analysis": "Brief analysis of what the user might be experiencing based on their description",
  "suggestedIssues": [
    {
      "description": "Natural language description of a potential issue",
      "category": "Engine|Brakes|Transmission|Electrical|Suspension|Steering|Exhaust|Climate Control|Fuel System|Tires",
      "severity": "low|medium|high|critical",
      "reasoning": "Why this issue might match their description"
    }
  ],
  "clarifyingQuestions": [
    "Specific questions to help narrow down the problem",
    "Questions about when the issue occurs",
    "Questions about additional symptoms"
  ]
}

Focus on:
1. Interpreting their description even if it's vague or uses non-technical terms
2. Suggesting 2-4 most likely issues that could match their description
3. Asking 3-5 clarifying questions to help diagnose the problem more accurately
4. Being helpful and encouraging, not dismissive

Consider common car problems and how non-technical users might describe them.
`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      throw new Error('Failed to parse AI response');
    } catch (error) {
      console.error('Gemini API error:', error);
      return {
        analysis: 'I understand you\'re experiencing some issues with your vehicle. Could you provide more details?',
        suggestedIssues: [
          {
            description: 'General vehicle performance issue',
            category: 'Engine',
            severity: 'medium',
            reasoning: 'Based on your description, this could be related to engine performance'
          }
        ],
        clarifyingQuestions: [
          'When does this issue typically occur?',
          'Do you notice any unusual sounds, smells, or vibrations?',
          'Has this problem gotten worse over time?'
        ]
      };
    }
  }

  async explainCode(code: string): Promise<string> {
    const prompt = `
Explain the automotive diagnostic trouble code "${code}" in simple, easy-to-understand terms. 
Include:
1. What system it affects
2. What the code means in plain English
3. Common symptoms
4. Typical causes
5. General repair approach

Keep the explanation concise but informative for a car owner.
`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API error:', error);
      return `Unable to explain code ${code} at this time. This is typically related to your vehicle's diagnostic system. Please consult a professional mechanic for detailed information.`;
    }
  }
}