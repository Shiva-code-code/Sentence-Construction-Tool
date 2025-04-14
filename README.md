# Sentence Construction Tool – CA MONK Internship Assignment

An interactive sentence construction quiz tool built for the **Frontend Intern** role at **CA MONK**. This application tests users' ability to correctly arrange words into meaningful sentences under a time limit.

## 🔗 Live Demo
[Click to View Deployed App](https://sentence-construction-assignment.vercel.app)

## 🎯 Features
- Sentence construction with dynamic blanks.
- 4 word options per question.
- Click to fill and unfill blanks.
- 30-second timer per question.
- Auto-next question after timeout.
- Next button activates only when all blanks are filled.
- Final result screen with:
  - Correct/incorrect answers
  - Correct answers for incorrect ones
  - Final score out of 10

## 🛠 Tech Stack
- **Framework:** React + Vite
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Components:** shadcn/ui 
- **State Management:** React Context API
- **Deployment:** Vercel

## 🗂 Folder Structure
```
src/
├── components/
│   └── quiz/ (Timer, Sentence, Options)
├── pages/ (Home, Quiz, Result)
├── context/ (QuizContext)
├── data/ (questions.json)
└── main.tsx, App.tsx, index.css
```

## 🔄 Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/Shiva-code-code/Sentence-Construction-Tool.git
cd Sentence-Construction-Tool
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up JSON Server (for local API)
```bash
npm install -g json-server
json-server --watch questions.json --port 3001
```

### 4. Start the Development Server
```bash
npm run dev
```

App runs at: `http://localhost:5173`

JSON server runs at: `http://localhost:3001/questions`

## ✅ Assignment Requirements Checklist

| Feature | Status |
|--------|--------|
| Sentence blanks UI | ✅ |
| Word options (4) | ✅ |
| Click to unselect | ✅ |
| 30s Timer | ✅ |
| Auto-next question | ✅ |
| Next button enable only after all blanks filled | ✅ |
| Fetch data from JSON Server | ✅ |
| Final feedback screen | ✅ |
| Mobile responsive | ✅ |
| Vercel deployed | ✅ |
| GitHub with documentation | ✅ |

## 📝 Submission Details
- **Deadline:** Within 48 hours
- **Submission Form:** Google Form (as provided in the email)
- **Support:** developer@camonk.com

---

### 👏 Extra Enhancements (Optional)
- Dynamic progress bar
- Circular score chart
- Per-question feedback
- Sound/vibration feedback

---

© 2025 – Built with 💙 by [Shiva](https://github.com/Shiva-code-code)
