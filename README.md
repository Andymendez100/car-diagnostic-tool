# AutoDiagnostic AI

An advanced car diagnostic tool powered by Google Gemini AI that provides intelligent analysis of diagnostic trouble codes, symptom checking, and repair recommendations.

![AutoDiagnostic AI](https://img.shields.io/badge/AI%20Powered-Gemini-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-TypeScript-blue?style=for-the-badge&logo=react)
![Tailwind](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-blue?style=for-the-badge&logo=tailwindcss)

## 🚗 Features

### 🔧 OBD Scanner Analysis
- **Diagnostic Code Input**: Enter OBD-II trouble codes manually
- **Pre-populated Database**: Common diagnostic codes with descriptions and severity levels
- **AI-Powered Analysis**: Get comprehensive explanations and repair recommendations
- **Cost Estimation**: Receive estimated repair costs for identified issues

### 🩺 Symptom Checker
- **Comprehensive Symptom Database**: 40+ common car symptoms organized by system
- **Category Filtering**: Filter by Engine, Transmission, Brakes, Electrical, etc.
- **Search Functionality**: Quickly find specific symptoms
- **Multi-Select Interface**: Select multiple symptoms for accurate diagnosis

### 📊 Diagnostic History
- **Session Tracking**: Keep records of all diagnostic analyses
- **Vehicle Information**: Store make, model, year, and mileage data
- **Expandable Details**: View full analysis results and recommendations
- **Cost Tracking**: Monitor repair cost estimates over time

### 🤖 AI Integration
- **Google Gemini AI**: Advanced natural language processing for diagnostic analysis
- **Contextual Analysis**: Considers vehicle age, mileage, and system relationships
- **Intelligent Recommendations**: Prioritized repair actions based on urgency
- **Plain English Explanations**: Complex technical issues explained simply

## 🛠️ Installation

### Prerequisites
- **Node.js** (version 16.0 or higher)
- **npm** (comes with Node.js)
- **Google Gemini API Key** (free tier available)

### Setup Steps

1. **Clone or Download the Project**
   ```bash
   cd car-diagnostic-tool
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Gemini API**
   - Get your free API key from [Google AI Studio](https://ai.google.dev)
   - Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   - Add your API key to `.env`:
   ```
   REACT_APP_GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Start the Development Server**
   ```bash
   npm start
   ```
   The app will open at [http://localhost:3000](http://localhost:3000)

## 🎯 Usage Guide

### Getting Started
1. **Enter Vehicle Information**: Provide your car's make, model, and year for accurate analysis
2. **Choose Your Method**:
   - **OBD Scanner**: If you have diagnostic codes from an OBD-II scanner
   - **Symptom Checker**: If you're experiencing issues but don't have codes

### Using the OBD Scanner
1. Enter diagnostic codes (e.g., P0300, P0171) in the input field
2. Codes are automatically recognized and categorized by severity
3. Click "Analyze with Gemini AI" for comprehensive analysis
4. Review AI recommendations and cost estimates

### Using the Symptom Checker
1. Browse symptoms by category or use the search function
2. Select all symptoms you're experiencing
3. Click "Analyze Symptoms with Gemini AI"
4. Get possible causes and recommended diagnostic steps

### Viewing History
- Access the History tab to review past analyses
- Click on any entry to expand full details
- Track recurring issues and repair costs over time

## 📋 Technical Details

### Architecture
- **Frontend**: React 18 with TypeScript for type safety
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide React for consistent iconography
- **AI Integration**: Google Generative AI SDK for Gemini API
- **State Management**: React hooks for local state

### Key Components
- `DiagnosticTool`: OBD code analysis interface
- `SymptomChecker`: Symptom selection and analysis
- `DiagnosticHistory`: Historical analysis viewer
- `VehicleInfoForm`: Vehicle data collection
- `GeminiService`: AI integration service

### Data Models
- **DiagnosticCode**: OBD trouble code definitions
- **Symptom**: User-reportable vehicle symptoms
- **DiagnosticResult**: AI analysis results
- **VehicleInfo**: Vehicle specification data

## 🔒 Privacy & Safety

- **Local Storage**: Vehicle data stored locally in browser
- **API Communication**: Only diagnostic data sent to Gemini AI
- **No Personal Data**: No collection of personal or location information
- **Educational Purpose**: Tool provides guidance only - always consult professionals

## 📱 Browser Compatibility

- **Chrome** 80+
- **Firefox** 75+
- **Safari** 13+
- **Edge** 80+

## 🚀 Development Scripts

```bash
# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build

# Analyze bundle size
npm run build && npx serve -s build
```

## 🤝 Contributing

This is a demonstration project showcasing AI integration in automotive diagnostics. For production use, consider:
- Professional mechanical consultation
- Real OBD-II scanner integration
- Enhanced error handling
- User authentication
- Cloud data storage

## 📄 License

This project is for educational and demonstration purposes. Always consult qualified automotive professionals for actual vehicle repairs.

## 🆘 Troubleshooting

### Common Issues

**API Key Error**
- Ensure `.env` file exists with correct API key
- Verify API key is active in Google AI Studio
- Restart development server after adding API key

**Build Errors**
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check Node.js version compatibility

**Styling Issues**
- Ensure Tailwind CSS is properly configured
- Check PostCSS configuration

## 📞 Support

For technical issues or questions about the implementation, review the code structure and component documentation. This project demonstrates modern React patterns and AI integration techniques suitable for automotive applications.
