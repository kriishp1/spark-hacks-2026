# Parsley 🌿

**Never lose money on returns again.**

Parsley is an AI-powered receipt tracker that helps you remember return deadlines and warranty expirations before it's too late. Just snap a photo of your receipt, and we'll remind you when it matters.

---

## 💡 The Problem

We've all been there: you buy something with good intentions to return it if it doesn't work out. Life gets busy. Weeks pass. By the time you remember, the return window has closed. That money is gone—not because the store made returns difficult, but because life is chaotic and our brains aren't built to remember arbitrary deadlines.

Americans leave hundreds of dollars on the table each year through:
- Missed return windows
- Expired warranties they paid for
- Unused protection plans

**Parsley solves this.** One photo. Automatic tracking. Money back in your pocket.

---

## ✨ Features

- **📸 Instant Receipt Scanning** - Snap a photo of any receipt and our AI extracts all the important details
- **🤖 AI-Powered Analysis** - Claude AI reads the fine print so you don't have to, pulling out:
  - Product names
  - Purchase prices
  - Return deadlines
  - Warranty expiration dates
- **⏰ Smart Reminders** - Get a text notification a few days before deadlines, when you can still act
- **🔒 Secure Storage** - All your receipts safely stored and accessible whenever you need them
- **📱 Mobile-First Design** - Built for the way you actually shop—on the go

---

## 🛠️ Tech Stack

**Frontend**
- React.js - Component-based UI
- Tailwind CSS - Utility-first styling with custom color palette

**Backend**
- Express.js - API server
- Supabase - Database and real-time functionality
- Google Cloud - Authentication

**AI & Analysis**
- Claude AI - Receipt image analysis and data extraction

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account
- Google Cloud account (for authentication)
- Anthropic API key (for Claude AI)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/parsley.git
   cd parsley
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ANTHROPIC_API_KEY=your_anthropic_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to see Parsley in action!

---

## 📱 How It Works

1. **Snap** - Take a photo of your receipt after any purchase
2. **Scan** - Claude AI automatically extracts product details, prices, and deadlines
3. **Relax** - We track everything and send you a text reminder before deadlines expire
4. **Act** - Get your money back while you still can

---

## 🎯 Roadmap

### Short-term
- [ ] Native mobile app (iOS & Android)
- [ ] Push notifications for reminders
- [ ] Receipt export functionality
- [ ] Multi-language support

### Long-term
- [ ] Automatic email receipt integration
- [ ] Credit card linking for automatic tracking
- [ ] Partnership with major retailers
- [ ] Analytics dashboard (track spending and return patterns)

---


## 🏆 Hackathon Project

Parsley was built during Sparkhacks 2026. Key learnings:
- **Real-time learning** - Most of the team learned Tailwind CSS on the fly
- **Collaboration** - Navigating merge conflicts and coordinating across the codebase
- **Problem decomposition** - Breaking big features into shippable chunks
- **AI integration** - Successfully implementing Claude AI for receipt analysis

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

Built with ❤️ by a team of developers who've lost too much money to API keys...

---

**Stop losing money. Start using Parsley.** 🌿
