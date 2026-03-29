# Smart Library Management System

A comprehensive, production-quality frontend web application for managing a modern library. Built with React, Tailwind CSS, and modern UI patterns.

![Smart Library Dashboard](screenshot.png)

## ✨ Features

### 📊 Dashboard
- Real-time statistics (Total Students, Active Students, Today's Check-ins)
- Revenue overview and study hours tracking
- Smart suggestions panel with actionable insights
- Interactive charts (Attendance trends, Revenue graphs)

### 👥 Student Management
- Complete student directory with search and filters
- Add/Edit student profiles with modals
- Status tracking (Active, Expired, Inactive)
- Student tagging system (Serious, Average, Irregular)

### 💳 Fees & Validity System
- Membership status tracking with color-coded indicators
- Expiry date management
- Recovery priority list for expired memberships
- Payment collection interface

### 🪑 Seat & Shift Management
- Visual seat grid layout
- Three shifts: Morning, Afternoon, Evening
- Occupied/Available/Expired seat visualization
- Seat utilization insights

### ⏱️ Attendance & Study Clock
- Real-time study session tracking
- Student check-in/check-out system
- Attendance history with duration
- Today's attendance statistics

### 📋 Additional Modules
- **Student Detail Page**: Profile, study hours graph, attendance history, streak tracking
- **Notice Board**: Priority-based announcements
- **Leave/Absence Tracking**: Absence pattern monitoring
- **Drop Risk Detection**: AI-powered churn prediction
- **Gamification**: Leaderboards, badges, and achievements
- **Feedback System**: Student reviews and ratings

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone or navigate to the project:
```bash
cd smart-library
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:5173
```

### Login Credentials
The application uses a mock authentication system:
- Enter any 10-digit mobile number
- Enter any 6-digit OTP
- Click "Verify & Login"

## 🏗️ Project Structure

```
smart-library/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   ├── Topbar.jsx          # Header with search & notifications
│   │   └── ui/
│   │       ├── Button.jsx      # Reusable button component
│   │       ├── Card.jsx        # Card components with variants
│   │       ├── Charts.jsx      # Recharts wrappers
│   │       ├── Form.jsx        # Input, Select, Textarea
│   │       ├── Modal.jsx       # Dialog/modal component
│   │       └── Table.jsx       # Data table with pagination
│   ├── data/
│   │   └── mockData.js         # Mock data (30 students, seats, etc.)
│   ├── pages/
│   │   ├── Login.jsx           # Authentication page
│   │   ├── Dashboard.jsx       # Main dashboard
│   │   ├── Students.jsx        # Student management
│   │   ├── StudentDetail.jsx   # Individual student view
│   │   ├── Fees.jsx            # Fees & validity management
│   │   ├── Seats.jsx           # Seat & shift management
│   │   ├── Attendance.jsx      # Attendance tracking
│   │   ├── Notices.jsx         # Notice board
│   │   ├── Absence.jsx         # Absence tracking
│   │   ├── DropRisk.jsx        # Dropout risk detection
│   │   ├── Gamification.jsx    # Leaderboards & badges
│   │   └── Feedback.jsx        # Feedback system
│   ├── utils/
│   │   └── index.ts            # Utility functions
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Tailwind CSS imports
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🛠️ Tech Stack

- **React 18** - UI library with hooks
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **Vite** - Build tool
- **clsx + tailwind-merge** - Conditional class handling

## 🎨 Design System

### Colors
- Primary: Blue (`#3b82f6`)
- Success: Emerald (`#10b981`)
- Warning: Amber (`#f59e0b`)
- Danger: Red (`#ef4444`)

### Status Indicators
- **Active**: Green badge
- **Expired**: Red badge
- **Warning**: Amber badge
- **Inactive**: Gray badge

## 📱 Responsive Design

The application is fully responsive with:
- Desktop-first layout
- Collapsible sidebar for mobile
- Responsive data tables
- Touch-friendly interactions

## 🔮 Future Enhancements

This frontend is designed to be easily extendable with a Django backend:
- Multi-tenant support
- Real-time data synchronization
- Payment gateway integration
- SMS notifications
- Advanced analytics

## 📄 License

MIT License - feel free to use this for commercial purposes.

## 🤝 Support

For issues or feature requests, please contact the development team.

---

Built with ❤️ for modern library management.
