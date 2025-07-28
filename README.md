# Business Strategy Generator

An AI-powered full-stack web application that helps businesses generate:
- **Strategy Analysis** (AI-driven strategies based on uploaded data & context)
- **Risk Assessment** (Identify risks & mitigation strategies)
- **Market Research** (Market insights & competitor analysis)
- **Reports** (AI-generated reports based on user activity)

---

## 🏗 Tech Stack

### Frontend
- React (Vite/CRA)
- Tailwind CSS
- Fetch API for backend communication

### Backend
- Node.js with Express
- OpenAI API for AI-generated insights

---

## 🚀 Features

- Upload CSV data and preview it directly in the app.
- Get AI-generated:
  - Business strategies
  - Risk assessments
  - Market insights and competitor analysis
- Save user activities and analytics in localStorage.
- Generate structured reports dynamically.

---

## 📂 Project Structure

```
BusinessStrategyGenerator/
│
├── backend/             # Express server and OpenAI API integration
│   ├── server.js
│   ├── package.json
│   └── .env (ignored by git)
│
├── my-ai-app/           # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/BusinessStrategyGenerator.git
cd BusinessStrategyGenerator
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` and add your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

Start the backend:
```bash
node server.js
```
Backend will run at: **http://localhost:5000**

---

### 3. Setup Frontend

In a separate terminal:
```bash
cd my-ai-app
npm install
npm start
```

Frontend will run at: **http://localhost:3000**

---

## 📝 How It Works

1. **Upload CSV (optional)** and/or provide business details.
2. Click **Generate** buttons:
   - Strategy → `/api/generate-strategy`
   - Risk Assessment → `/api/generate-risk`
   - Market Research → `/api/generate-market`
3. The backend sends the data to OpenAI API and returns insights.
4. Activities and analytics are updated locally.

---

## 🔒 Environment Variables

Only **backend** requires `.env`:

```
OPENAI_API_KEY=your_api_key_here
```

This file is **not pushed to GitHub** (listed in `.gitignore`).

---

## 🛑 Important Notes

- Make sure you have a valid OpenAI API key with billing enabled.
- This app stores user data (activities, analytics) in browser localStorage (no external DB).

---

## 📜 License
This project is for educational/demo purposes.

---

### Author
Created by Zainab Naaz 
