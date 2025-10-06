# Open Waste Exchange

A community-driven marketplace platform connecting waste generators with recyclers to promote sustainable waste management and circular economy practices.

## Problem Statement

Urban areas generate massive amounts of recyclable waste daily, yet a significant portion never reaches recycling facilities due to lack of coordination, visibility, and motivation. Open Waste Exchange bridges this gap by providing a transparent, gamified platform for recycling.

## Features

- **Post Recyclable Items**: Users can list items with photos, descriptions, categories, and location
- **Browse & Filter**: Search recyclable items by category (Plastic, E-Waste, Paper, Clothes, Metal)
- **Claim Items**: NGOs and recyclers can claim items for pickup
- **Impact Dashboard**: Track recycling statistics (items recycled, CO₂ saved, weight)
- **Gamification**: Badges and community leaderboard to encourage participation
- **Real-time Updates**: Items are tracked from posting to claiming to completion

## Tech Stack

### Frontend
- **Next.js 15.5.4** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS 3.4** - Styling
- **Lucide React** - Icons

### Backend
- **Node.js + Express** - REST API server
- **Firebase Firestore** - NoSQL database
- **Firebase Admin SDK** - Backend authentication and database management

## Project Structure
waste-exchange-project/
├── frontend/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   ├── lib/
│   │   ├── api.js
│   │   └── firebase.js
│   ├── tailwind.config.mjs
│   ├── postcss.config.mjs
│   └── package.json
│
└── backend/
├── config/
│   └── firebase.js
├── routes/
│   ├── items.js
│   ├── auth.js
│   └── claims.js
├── middleware/
│   └── auth.js
├── utils/
│   └── calculations.js
├── server.js
├── .env
├── serviceAccountKey.json (DO NOT COMMIT)
└── package.json
## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase account

### 1. Clone the Repository
```bash
git clone https://github.com/NavyaMal04/HackAura.git
cd HackAura

2.Firebase Setup
Go to Firebase Console
Create a new project
Enable Firestore Database (Test mode for development)
Enable Authentication (Email/Password)
Download service account key (Project Settings → Service Accounts)
Save as backend/serviceAccountKey.json
Get your web app config from Project Settings

3. Backend Setup
cd backend
npm install

# Create .env file
echo "PORT=5000\nNODE_ENV=development" > .env

# Start backend server
npm run dev
Backend runs on: http://localhost:5000
4. Frontend Setup
Update frontend/lib/firebase.js with your Firebase config:
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

Install and run:
cd frontend
npm install
npm run dev

Usage
Post Items: Go to "Post Item" tab, fill details, and submit
Browse Items: View all available recyclable items, filter by category
Claim Items: Click "Claim Item" to request pickup (requires login)
Track Impact: View your recycling stats in "My Impact" tab

Future Enhancements

 Image upload functionality
 Google Maps integration for location
 Real-time notifications
 Chat between poster and claimer
 Admin dashboard
 Mobile app (React Native)
 QR code scanning
 Advanced analytics

License
MIT License - feel free to use this project for learning or commercial purposes.

Acknowledgments

Firebase for backend infrastructure
Next.js team for the excellent framework
Tailwind CSS for styling utilities
Lucide for beautiful icons
