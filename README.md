# HRMS Portal - Human Resource Management System

## 📋 Project Overview

A modern, AI-powered Human Resource Management System (HRMS) with integrated chatbot, leave management, attendance tracking, and financial dashboard. Built with vanilla HTML5/CSS3/JavaScript and Node.js backend with Power Automate integration.

## 🚀 Features

- **Employee Portal**: Profile management, personal data, and document access
- **Leave Management**: Request leaves with AI-assisted review via Gemini
- **Attendance Tracking**: Monitor attendance and generate reports
- **Financial Dashboard**: View salary, payslips, benefits, and deductions
- **AI Chatbot**: Integrated Gemini API chatbot for employee support
- **Secure Authentication**: Power Automate workflow-based authentication
- **Responsive Design**: Mobile-friendly dark and light themes

## 📁 Project Structure

```
HRMS-main/
├── api/
│   ├── chat.js              # Gemini API proxy endpoint
│   ├── powerautomate.js     # Power Automate workflow proxy
│   └── config.js            # API configuration
├── react-components/        # React JSX components
│   ├── MyDataPage.jsx
│   └── MyDataPage.css
├── html files/              # Employee portal pages
│   ├── hrms_employee_login_page.html
│   ├── hrms_my_track.html   # Leave & Attendance
│   ├── hrms_my_finance.html # Financial Dashboard
│   ├── hrms_my_profile.html
│   ├── hrms_my_data_page.html
│   └── ... (other pages)
├── chatbot.js              # Chatbot functionality
├── chatbot.css             # Chatbot styles
├── users_dataset.csv       # Sample employee data
├── package.json            # Dependencies
├── vercel.json             # Vercel deployment config
├── .env                    # Environment variables
└── .gitignore              # Git ignore rules
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Vercel CLI (for deployment)
- Google Gemini API key
- Power Automate workflows configured

### 1. Clone Repository
```bash
git clone <repository-url>
cd HRMS-main
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create or update `.env` file with:

```env
# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here

# Power Automate Workflows (from your Power Automate setup)
POWER_AUTOMATE_GET_PROFILE_URL=https://default7359f89671e24daeb8a315cdf97f2f.10.environment.api.powerplatform.com/...
POWER_AUTOMATE_POST_PROFILE_URL=https://default7359f89671e24daeb8a315cdf97f2f.10.environment.api.powerplatform.com/...
POWER_AUTOMATE_LOGIN_AUTH_URL=https://default7359f89671e24daeb8a315cdf97f2f.10.environment.api.powerplatform.com/...
POWER_AUTOMATE_POST_LEAVE_URL=https://default7359f89671e24daeb8a315cdf97f2f.10.environment.api.powerplatform.com/...
POWER_AUTOMATE_GET_LEAVE_URL=https://default7359f89671e24daeb8a315cdf97f2f.10.environment.api.powerplatform.com/...
POWER_AUTOMATE_GET_ATTENDANCE_URL=https://default7359f89671e24daeb8a315cdf97f2f.10.environment.api.powerplatform.com/...
```

### 4. Local Development
```bash
npm start
# This runs 'vercel dev' for local testing
```

### 5. Deploy to Vercel
```bash
npm run deploy
# Follow prompts to deploy
```

**IMPORTANT**: Set all environment variables in Vercel project settings after deployment.

## 🔐 Security Features Implemented

✅ **Removed Hardcoded Secrets**
- Power Automate URLs moved from source code to environment variables
- API keys managed via .env file (excluded from Git)

✅ **Password Security**
- Plaintext passwords replaced with SHA256 hashes in sample dataset
- Column renamed from "Password" to "PasswordHash"

✅ **Git Protection**
- `.gitignore` configured to exclude:
  - Environment variables (.env)
  - Node modules
  - Sensitive files (users_dataset.csv, credentials)
  - Build artifacts

## 📝 Key API Endpoints

### `/api/chat` - Gemini AI Chatbot
**POST** - Process employee queries and leave reviews
```json
{
  "contents": [
    {
      "role": "user",
      "parts": [{ "text": "message here" }]
    }
  ]
}
```

### `/api/powerautomate` - Power Automate Proxy
**POST** - Route requests to Power Automate workflows
```json
{
  "action": "getProfile",  // or postProfile, loginAuth, postLeave, getLeave, getAttendance
  "payload": { "email": "user@company.com" }
}
```

## 🎯 Core Features Details

### Leave Management (`hrms_my_track.html`)
- Submit leave requests
- AI-assisted review via Gemini before submission
- View leave history and attendance reports
- Responsive attendance tracking

### Financial Dashboard (`hrms_my_finance.html`)
- Multiple sections: Pay Slip, SDF, Salary, Group Insurance
- Dynamic salary data by department
- Metrics: Net Pay, Gross Salary, Deductions, Coverage
- Department-based salary snapshots (default, IT, Finance, Sales, HR)

### Employee Login
- Power Automate based authentication
- Secure credential validation
- Session management via employee email

## 🧪 Testing

### Test Login Credentials (from users_dataset.csv)
```
Email: nikeshkumarpottabathina@gmail.com (IT - Software Engineer)
Email: tarun123@gmail.com (Finance - Accountant)
Email: manga@gmail.com (IT - Frontend Developer)
```

**Note**: Passwords are hashed. Use actual credentials from your Power Automate setup.

## 📊 Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Vercel Serverless Functions
- **APIs**: 
  - Google Gemini API (AI/Chatbot)
  - Microsoft Power Automate (Authentication, Workflows)
  - SharePoint (Data storage)
- **Styling**: CSS Grid, Flexbox, Custom Properties
- **Deployment**: Vercel

## 🔄 Workflow Integration

### Leave Request Flow
1. Employee submits leave request
2. System sends to Gemini AI for review
3. AI provides feedback/validation
4. Request forwarded to Power Automate workflow
5. Confirmation sent to employee with AI summary

### Authentication Flow
1. Employee enters credentials
2. Power Automate `loginAuth` validates against external system
3. Session established upon successful validation
4. Profile data fetched via `getProfile` workflow

## ⚠️ Pre-Deployment Checklist

- [ ] All environment variables configured in `.env`
- [ ] Power Automate workflow URLs obtained and set
- [ ] Gemini API key is valid and has quota
- [ ] All dependencies installed (`npm install`)
- [ ] No syntax errors (`npm test` if available)
- [ ] `.gitignore` in place to protect secrets
- [ ] Vercel project created and linked
- [ ] Environment variables added to Vercel dashboard

## 🚀 Deployment Steps

1. **Create Vercel Project**
   ```bash
   vercel
   ```

2. **Configure Environment Variables** in Vercel Dashboard:
   - Go to Project Settings → Environment Variables
   - Add all 6 POWER_AUTOMATE_* URLs
   - Add GEMINI_API_KEY

3. **Deploy**
   ```bash
   npm run deploy
   ```

4. **Verify Deployment**
   - Test login functionality
   - Verify AI chatbot works
   - Test leave submission flow
   - Check finance dashboard loads correctly

## 📧 Support

For issues or questions:
- Check `.env` configuration
- Verify Power Automate workflow URLs
- Ensure Gemini API quota is available
- Review browser console for errors

## 📄 License

© 2025 HRMS Portal. All rights reserved.

## 🎉 Status

✅ **READY FOR SUBMISSION**
- All security vulnerabilities addressed
- Code cleaned and optimized
- Environment configuration template provided
- Comprehensive documentation included
