

# ♻️ HackAura – Waste Marketplace (Frontend)

HackAura Waste Marketplace is a community-driven platform built with **Next.js 13 (App Router)**, **NextAuth.js**, and **MongoDB**.
It connects individuals, hostels, and offices generating recyclable waste with NGOs, recyclers, and volunteers who can collect it.

This repo contains the **frontend implementation** of the application.

---

## 🚀 Features

* **Authentication**

  * User signup & signin with NextAuth.js
  * Session handling using JWT
* **Waste Marketplace**

  * Add recyclable waste listings
  * Browse marketplace entries
* **User Dashboard**

  * Personalized dashboard for managing activity
* **Leaderboard**

  * Gamification for encouraging recycling contributions
* **Profile Page**

  * Manage personal details and progress
* **Database Integration**

  * MongoDB models for `User` and `Waste`

---

## 📂 Project Structure

```
frontend/
│── public/                # Static assets
│── src/
│   ├── app/               # Next.js App Router
│   │   ├── add-waste/     # Waste submission form
│   │   ├── auth/          # Authentication (signin, signup)
│   │   ├── dashboard/     # User dashboard
│   │   ├── leaderboard/   # Leaderboard page
│   │   ├── marketplace/   # Waste marketplace
│   │   ├── profile/       # Profile management
│   │   └── api/           # API routes (NextAuth, register, etc.)
│   ├── components/        # Reusable UI components
│   ├── lib/               # MongoDB connection utility
│   ├── models/            # Mongoose models (User, Waste)
│   └── styles/            # Global & Tailwind CSS styles
│
├── .env.local             # Environment variables
├── next.config.js         # Next.js configuration
├── package.json           # Dependencies & scripts
├── README.md              # Documentation
└── ...
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/hackaura-frontend.git
cd hackaura-frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env.local` file in the root:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

### 4️⃣ Run Development Server

```bash
npm run dev
```

Visit 👉 [http://localhost:3000](http://localhost:3000)

---

## 🧩 Tech Stack

* **Frontend:** Next.js 13 (App Router), React
* **Auth:** NextAuth.js (JWT-based)
* **Database:** MongoDB with Mongoose
* **Styling:** Tailwind CSS
* **State Management:** React hooks & context

---

## 📌 Available Pages

* `/signin` → User login
* `/signup` → User registration
* `/dashboard` → Dashboard view
* `/marketplace` → Browse waste items
* `/add-waste` → Add waste entry
* `/leaderboard` → Gamified leaderboard
* `/profile` → Manage user profile

---

## 🛠️ Future Enhancements

* Notifications for waste pickups
* Enhanced leaderboard with badges
* Filtering & sorting in marketplace
* Mobile-friendly PWA support
* AI-based waste category suggestions

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch (`feature/your-feature`)
3. Commit your changes
4. Push to your fork
5. Create a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---

Do you want me to make this README more **professional & minimal (for recruiters)** or **detailed (for open-source contributors)**?
