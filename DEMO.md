# AutoDiagnostic AI Demo

## 🚀 Quick Start

The application is now running at **http://localhost:3000**

### Demo Features to Try:

## 🔧 OBD Scanner Tab

1. **Enter Vehicle Information**:
   - Make: Toyota
   - Model: Camry  
   - Year: 2018

2. **Add Diagnostic Codes** (try these examples):
   - `P0300` - Random/Multiple Cylinder Misfire
   - `P0171` - System Too Lean (Bank 1)
   - `P0420` - Catalyst System Efficiency Below Threshold

3. **Click "Analyze with Gemini AI"** to get:
   - Detailed explanations in plain English
   - Possible causes ranked by likelihood
   - Step-by-step repair recommendations
   - Cost estimates for repairs

## 🩺 Symptom Checker Tab

1. **Enter Same Vehicle Info** as above

2. **Select Symptoms** (try combining these):
   - Engine → "Engine idles roughly or irregularly"
   - Engine → "Engine misfires or runs unevenly"
   - Warning Lights → "Check Engine light is on"

3. **Search Feature**: Type "rough" to filter symptoms

4. **Category Filter**: Select "Engine" to see only engine-related symptoms

5. **Analyze Symptoms** to get AI-powered diagnosis without codes

## 📊 History Tab

- View all your previous analyses
- Click entries to expand full details
- Track repair costs over time
- Compare different diagnostic sessions

## 🤖 AI Features Showcased

- **Contextual Analysis**: AI considers vehicle age, mileage, and system interactions
- **Prioritized Recommendations**: Repairs ranked by urgency and safety
- **Cost Estimation**: Realistic repair cost ranges
- **Plain English**: Technical issues explained simply

## 🛠️ For Testing Without Gemini API Key

If you don't have a Gemini API key yet:
1. The app will show fallback messages for AI features
2. All UI components and interactions work normally  
3. Vehicle info, symptom selection, and history features are fully functional
4. Get your free API key at: https://ai.google.dev

## 🎯 Production Considerations

This demo showcases:
- Modern React + TypeScript architecture
- Responsive Tailwind CSS design
- Professional UX patterns
- AI integration best practices
- Type-safe development

For production deployment:
- Add environment variable validation
- Implement proper error boundaries
- Add loading states and offline support
- Include more comprehensive OBD code database
- Add user authentication and data persistence