import { GoogleGenerativeAI } from '@google/generative-ai';
import { VehicleInfo, Symptom, DiagnosticResult } from '../types/diagnostic';
import { CarIssue } from '../data/commonIssues';

export class GeminiService {
  private apiKey: string;
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || localStorage.getItem('gemini-api-key') || process.env.REACT_APP_GEMINI_API_KEY || '';
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

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
        urgency: 'priority' as const
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
        urgency: 'priority' as const
      };
    }
  }

  async startDiagnosticConversation(
    userInput: string,
    vehicleInfo: VehicleInfo
  ): Promise<{
    conversationId: string;
    message: string;
    responseOptions: Array<{
      id: string;
      text: string;
      category: string;
    }>;
    currentStep: number;
    totalSteps: number;
    analysis?: string;
  }> {
    const prompt = `
You are an AI diagnostic assistant for qualified automotive technicians. A technician has described a customer complaint: "${userInput}"

Vehicle: ${vehicleInfo.year || 'Unknown'} ${vehicleInfo.make || 'Unknown'} ${vehicleInfo.model || 'Unknown'}
Mileage: ${vehicleInfo.mileage ? `${vehicleInfo.mileage} miles` : 'Unknown'}

Your role is to provide professional diagnostic guidance following industry-standard troubleshooting procedures. Start with systematic diagnostic questioning to isolate the root cause.

Respond in this JSON format:
{
  "conversationId": "diag_${Date.now()}",
  "message": "Professional diagnostic guidance acknowledging the complaint and outlining systematic approach",
  "responseOptions": [
    {
      "id": "option1", 
      "text": "Specific diagnostic test or symptom verification",
      "category": "operational_conditions|measurement|inspection|verification"
    }
  ],
  "currentStep": 1,
  "totalSteps": 5,
  "analysis": "Initial diagnostic assessment and strategy"
}

Focus on professional diagnostic procedures:
- "Symptom occurs during cold start operation"
- "Issue manifests under load conditions"
- "Verified with oscilloscope/scan tool readings"
- "Reproduced during road test at specific RPM range"
- "Confirmed through component isolation testing"

Use technical language appropriate for certified technicians and ASE-level diagnostics.
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
        conversationId: `diag_${Date.now()}`,
        message: 'Initiating systematic diagnostic procedure for reported complaint. Following industry-standard troubleshooting methodology.',
        responseOptions: [
          { id: 'operational1', text: 'Symptom occurs during engine start cycle', category: 'operational_conditions' },
          { id: 'operational2', text: 'Issue manifests during normal operation', category: 'operational_conditions' },
          { id: 'operational3', text: 'Problem occurs during idle/park conditions', category: 'operational_conditions' },
          { id: 'operational4', text: 'Intermittent fault - requires specific conditions', category: 'operational_conditions' }
        ],
        currentStep: 1,
        totalSteps: 5,
        analysis: 'Beginning with operational condition identification to isolate fault parameters.'
      };
    }
  }

  async continueDiagnosticConversation(
    conversationId: string,
    selectedOption: string,
    conversationHistory: Array<{question: string, answer: string}>,
    vehicleInfo: VehicleInfo
  ): Promise<{
    conversationId: string;
    message: string;
    responseOptions: Array<{
      id: string;
      text: string;
      category: string;
    }>;
    currentStep: number;
    totalSteps: number;
    analysis?: string;
    finalDiagnosis?: DiagnosticResult;
  }> {
    const historyText = conversationHistory.map(h => `Q: ${h.question}\nA: ${h.answer}`).join('\n\n');
    const currentStep = conversationHistory.length + 1;
    
    const prompt = `
You are an AI diagnostic assistant supporting professional automotive technicians.

Vehicle: ${vehicleInfo.year || 'Unknown'} ${vehicleInfo.make || 'Unknown'} ${vehicleInfo.model || 'Unknown'}
Diagnostic History:
${historyText}

Latest Test Result/Observation: "${selectedOption}"
Current Step: ${currentStep} of 5

Provide the next diagnostic procedure following systematic troubleshooting methodology. If this is step 5, provide comprehensive diagnostic conclusion with technical recommendations.

${currentStep < 5 ? `
Respond with JSON format:
{
  "conversationId": "${conversationId}",
  "message": "Technical guidance for next diagnostic procedure based on current findings",
  "responseOptions": [
    {"id": "option1", "text": "Specific test procedure or measurement", "category": "electrical_test|mechanical_test|scan_tool|visual_inspection"}
  ],
  "currentStep": ${currentStep},
  "totalSteps": 5,
  "analysis": "Diagnostic findings and next logical test sequence"
}
` : `
This is the final diagnostic step. Provide comprehensive technical diagnosis:
{
  "conversationId": "${conversationId}",
  "message": "Complete diagnostic conclusion with technical analysis",
  "responseOptions": [],
  "currentStep": 5,
  "totalSteps": 5,
  "finalDiagnosis": {
    "analysis": "Technical diagnostic analysis with root cause identification",
    "possibleCauses": ["Primary suspects with technical reasoning"],
    "recommendedActions": ["Specific repair procedures and parts replacement recommendations"],
    "estimatedCost": {"min": labor_and_parts_minimum, "max": labor_and_parts_maximum},
    "urgency": "routine|priority|immediate|safety_critical"
  }
}
`}

Use professional diagnostic terminology. Include specific test procedures, component isolation methods, and technical specifications where applicable.
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
        conversationId,
        message: 'Diagnostic sequence interrupted. Recommend manual troubleshooting procedures.',
        responseOptions: [],
        currentStep: 5,
        totalSteps: 5,
        finalDiagnosis: {
          analysis: 'Insufficient diagnostic data collected. Recommend comprehensive system inspection using appropriate test equipment.',
          possibleCauses: ['Multiple potential failure modes require systematic testing', 'Intermittent fault conditions may require extended monitoring'],
          recommendedActions: ['Perform complete system scan with professional diagnostic equipment', 'Document fault conditions and environmental factors', 'Consider component isolation testing'],
          urgency: 'priority' as const
        }
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