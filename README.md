
# Sentinel - AI Code Analysis (Frontend)

Sentinel is a modern, AI-powered code review and analysis platform. This repository contains the complete frontend application, built with React, that offers developers an intuitive interface to submit code snippets, receive detailed analysis, and track their progress over time.

---

## ✨ Key Features

* **AI-Powered Code Analysis**
  Submit code snippets in multiple languages and receive instant, in-depth reviews focusing on security, performance, and best practices.

* **User Authentication**
  Secure registration and login system to manage personal profiles and review history.

* **Interactive Dashboard**
  Personalized dashboard visualizing review history, code quality scores, language distribution, and more.

* **Sleek, Responsive UI**
  Minimal and professional user interface built with Tailwind CSS, fully responsive across devices.

* **Component-Based Architecture**
  Clean, maintainable codebase built with reusable React components.

---

## 🛠️ Tech Stack

* **Framework:** React
* **Routing:** React Router
* **Styling:** Tailwind CSS
* **State Management:** React Context API
* **Icons:** Lucide React
* **Linting:** ESLint
* **Package Manager:** npm / yarn

---

## 📂 Project Structure

```
/src
├── /components
│   ├── /layout       # Header, Footer, Layout components
│   └── /ui           # Reusable UI components like Button, Card, etc.
├── /context          # Context providers (e.g., AuthContext)
├── /pages            # Route components (Home, Dashboard, Review, Login)
├── App.js            # Main app component with routing
├── index.js          # Application entry point
└── ...
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v16 or higher recommended)
* npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/sentinel-frontend.git
   cd sentinel-frontend
   ```

2. **Install dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add any necessary environment variables. Example:

   ```
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   ```

4. **Run the development server:**

   ```bash
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## 📜 Available Scripts

In the project directory, you can run:

* `npm start` — Runs the app in development mode.
* `npm run build` — Builds the app for production into the `build` folder.
* `npm test` — Launches the test runner in interactive watch mode.
* `npm run eject` — Ejects from Create React App’s default configuration (use with caution).

---

## Contributing

Contributions are welcome! Please fork the repository and open a pull request with your improvements.

---

## License

[MIT](LICENSE)

