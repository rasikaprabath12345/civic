# 🇱🇰 CivicLink LK - Sri Lankan Government Service Digitizer

> A comprehensive MERN stack web application that digitalizes and streamlines Sri Lankan government services for citizens and administrators.

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green?style=flat)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-v18+-blue?style=flat)](https://react.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?style=flat)](https://mongodb.com)
[![License](https://img.shields.io/badge/License-ISC-blue?style=flat)](LICENSE)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Security Features](#security-features)
- [File Structure Details](#file-structure-details)
- [Development Guide](#development-guide)
- [Deployment Guide](#deployment-guide)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Support](#support)

---

## 🎯 Overview

CivicLink LK is a modern, responsive web application designed to make Sri Lankan government services accessible online. Citizens can book appointments, request certificates, submit complaints, and track their requests in real-time. Government administrators can manage requests, update statuses, and view analytics through a dedicated dashboard.

**Key Objectives:**
- 🚀 Reduce bureaucratic delays
- 📱 Provide 24/7 service accessibility
- 🔒 Ensure data security and privacy
- 📊 Enable data-driven decision making for administrators
- 🌐 Support both Sinhala and English interfaces

---

## ✨ Features

### 👤 Citizen Features
- **📅 Online Appointments**
  - Schedule appointments with Grama Sevaka offices
  - Choose preferred date and time slots
  - View appointment history
  - Cancel appointments if needed
  - Receive appointment confirmation

- **📜 Certificate Requests**
  - Apply for birth, death, marriage certificates
  - Request residence certificates
  - Track application status in real-time
  - Download certificates when ready
  - Re-order past certificates

- **📢 Complaint Management**
  - Submit complaints about government services
  - Categorize complaints (Road, Water, Electricity, Garbage, Other)
  - Track complaint resolution
  - Receive updates via notifications
  - View complaint history

- **📊 Status Tracking**
  - Real-time status updates
  - Request history
  - Notification system
  - Document management

- **🤖 AI Chatbot** (Coming Soon)
  - Get instant support in Sinhala & English
  - Answer common questions
  - Guide users through processes

### 👨‍💼 Admin Features
- **🎛️ Admin Dashboard**
  - Overview of all requests
  - Real-time statistics and metrics
  - System performance monitoring
  - User activity logs

- **📋 Appointment Management**
  - View all appointment requests
  - Filter and search appointments
  - Approve or reject requests
  - Add admin notes
  - Track approved appointments
  - Mark appointments as completed

- **✅ Certificate Processing**
  - Manage certificate requests
  - Update processing status
  - View applicant details
  - Send status notifications
  - Generate certificates

- **💬 Complaint Resolution**
  - View all submitted complaints
  - Categorize and prioritize complaints
  - Add responses and solutions
  - Mark as resolved/rejected
  - Track resolution time

- **📈 Analytics & Reports**
  - Request statistics
  - Processing time analytics
  - User engagement metrics
  - Service performance reports
  - Export data

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React.js** | UI library with Hooks |
| **Vite** | Lightning-fast build tool |
| **Tailwind CSS** | Utility-first CSS framework |
| **React Router v6** | Client-side routing |
| **Axios** | HTTP client for API calls |
| **Context API** | Global state management |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web server framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB ODM |
| **JWT** | Secure authentication |
| **bcryptjs** | Password hashing (10 rounds) |
| **CORS** | Cross-origin requests |
| **Nodemailer** | Email notifications |

### Development Tools
- **Nodemon** - Auto-restart server on changes
- **ESLint** - Code quality
- **Prettier** - Code formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - Browser compatibility

---

## 📁 Project Structure

```
civiclink-lk/
│
├── 📂 client/                          # React Frontend (Vite)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── 📂 components/
│   │   │   ├── Navbar.jsx             # Navigation bar with responsive menu
│   │   │   ├── Footer.jsx             # Footer with links
│   │   │   └── ProtectedRoute.jsx     # Route guard with role checking
│   │   ├── 📂 pages/
│   │   │   ├── Home.jsx               # Landing page
│   │   │   ├── Login.jsx              # Login form page
│   │   │   ├── Register.jsx           # Registration form page
│   │   │   ├── CitizenDashboard.jsx   # Citizen main dashboard
│   │   │   ├── AdminDashboard.jsx     # Admin main dashboard
│   │   │   ├── Appointments.jsx       # Appointments list & booking
│   │   │   ├── Certificates.jsx       # Certificates management
│   │   │   └── Complaints.jsx         # Complaints submission & tracking
│   │   ├── 📂 context/
│   │   │   └── AuthContext.jsx        # Global auth state (useAuth hook)
│   │   ├── 📂 services/
│   │   │   └── api.js                 # Axios instance with JWT interceptor
│   │   ├── App.jsx                    # Main router component
│   │   ├── main.jsx                   # React entry point
│   │   └── index.css                  # Global Tailwind styles
│   ├── vite.config.js                 # Vite configuration
│   ├── tailwind.config.js             # Tailwind CSS customization
│   ├── postcss.config.cjs             # PostCSS configuration
│   ├── .env                           # Environment variables
│   ├── .gitignore
│   └── package.json
│
├── 📂 server/                          # Node.js Backend (Express)
│   ├── 📂 config/
│   │   └── db.js                      # MongoDB connection setup
│   ├── 📂 models/
│   │   ├── User.js                    # User schema with password hashing
│   │   ├── Appointment.js             # Appointment schema
│   │   ├── Certificate.js             # Certificate schema
│   │   └── Complaint.js               # Complaint schema
│   ├── 📂 controllers/
│   │   ├── authController.js          # Auth logic (register, login)
│   │   ├── appointmentController.js   # Appointment CRUD & logic
│   │   ├── certificateController.js   # Certificate CRUD & logic
│   │   └── complaintController.js     # Complaint CRUD & logic
│   ├── 📂 routes/
│   │   ├── authRoutes.js              # Auth endpoints
│   │   ├── appointmentRoutes.js       # Appointment endpoints
│   │   ├── certificateRoutes.js       # Certificate endpoints
│   │   └── complaintRoutes.js         # Complaint endpoints
│   ├── 📂 middleware/
│   │   ├── authMiddleware.js          # JWT verification & role checking
│   │   └── errorHandler.js            # Error handling middleware
│   ├── server.js                      # Express server setup & initialization
│   ├── .env                           # Environment variables
│   ├── .gitignore
│   └── package.json
│
├── README.md                          # Project documentation
├── .gitignore
└── package.json                       # Root package.json (optional)
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### System Requirements
- **Node.js** version 14.0 or higher
- **npm** version 6.0 or higher (comes with Node.js)
- **MongoDB** (either local installation or MongoDB Atlas cloud account)
- **Git** for version control
- **A text editor or IDE** (VS Code recommended)

### Required Accounts
- **MongoDB Atlas** account (for cloud database) - https://www.mongodb.com/cloud/atlas
- **Gmail account** (for email notifications, optional)

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/yourusername/civiclink-lk.git
cd civiclink-lk

# Using SSH
git clone git@github.com:yourusername/civiclink-lk.git
cd civiclink-lk
```

### Step 2: Setup Backend

```bash
cd server

# Install dependencies
npm install

# Verify installation
npm list
```

### Step 3: Setup Frontend

```bash
cd ../client

# Install dependencies
npm install

# Verify installation
npm list
```

---

## ⚙️ Configuration

### Backend Configuration (.env)

Create a `.env` file in the `server/` directory:

```env
# MongoDB Connection
# Option 1: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/civiclink-lk

# Option 2: MongoDB Atlas (Cloud)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/civiclink-lk?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_chars

# Server Configuration
PORT=5000
NODE_ENV=development

# Email Configuration (Optional - for Nodemailer)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

# CORS
FRONTEND_URL=http://localhost:5173
```

**Important Security Notes:**
- Change `JWT_SECRET` to a strong, random string (32+ characters)
- Never commit `.env` file to Git
- Keep credentials private and secure

### Frontend Configuration (.env)

Create a `.env` file in the `client/` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000

# App Configuration
VITE_APP_NAME=CivicLink LK
VITE_APP_VERSION=1.0.0
```

### MongoDB Setup

#### Option A: MongoDB Atlas (Recommended - Cloud)

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free
   - Verify email

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "Free" tier
   - Select a region close to Sri Lanka (Asia)
   - Click "Create Cluster"

3. **Create Database User**
   - Go to Database Access
   - Click "Add New Database User"
   - Create username and password
   - Save credentials

4. **Add IP Whitelist**
   - Go to Network Access
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (for development)
   - In production, whitelist specific IPs

5. **Get Connection String**
   - Go back to Clusters
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database user password
   - Paste into `.env` as `MONGODB_URI`

#### Option B: Local MongoDB Installation

**Windows:**
```bash
# Download and install from
# https://www.mongodb.com/try/download/community

# Start MongoDB Service
net start MongoDB

# Or use Windows Services Manager
```

**macOS:**
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Verify
mongo --version
```

**Linux (Ubuntu/Debian):**
```bash
# Install MongoDB
sudo apt-get install mongodb

# Start service
sudo systemctl start mongodb

# Enable on boot
sudo systemctl enable mongodb
```

---

## ▶️ Running the Application

### Start Backend Server

```bash
cd server

# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

**Expected Output:**
```
╔════════════════════════════════════════╗
║   CivicLink LK Backend Server          ║
║   🚀 Running on http://localhost:5000  ║
╚════════════════════════════════════════╝

✅ MongoDB connected successfully
```

### Start Frontend Server

In a **new terminal**:

```bash
cd client

# Development mode
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

**Expected Output:**
```
VITE v4.5.14 ready in 388 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Access the Application

Open your browser and navigate to:
```
http://localhost:5173/
```

---

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "NIC": "123456789V",
  "email": "john@example.com",
  "phone": "+94701234567",
  "password": "SecurePass123"
}

Response (201):
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "NIC": "123456789V",
    "phone": "+94701234567",
    "role": "citizen"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response (200):
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "citizen"
  }
}
```

#### Get Current User (Protected)
```http
GET /api/auth/me
Authorization: Bearer <JWT_TOKEN>

Response (200):
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "NIC": "123456789V",
    "phone": "+94701234567",
    "role": "citizen"
  }
}
```

### Appointment Endpoints

#### Get User Appointments
```http
GET /api/appointments
Authorization: Bearer <JWT_TOKEN>

Response (200):
{
  "success": true,
  "appointments": [
    {
      "id": "507f1f77bcf86cd799439011",
      "userId": "507f1f77bcf86cd799439010",
      "purpose": "NIC",
      "date": "2026-06-15T00:00:00.000Z",
      "timeSlot": "09:00 AM",
      "status": "pending",
      "adminNote": "",
      "createdAt": "2026-06-03T12:00:00.000Z"
    }
  ]
}
```

#### Book Appointment
```http
POST /api/appointments
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "purpose": "NIC",
  "date": "2026-06-15",
  "timeSlot": "09:00 AM"
}

Response (201):
{
  "success": true,
  "message": "Appointment booked successfully",
  "appointment": { ...appointment object }
}
```

#### Update Appointment Status (Admin)
```http
PUT /api/appointments/:id
Authorization: Bearer <ADMIN_JWT_TOKEN>
Content-Type: application/json

{
  "status": "approved",
  "adminNote": "Approved for processing"
}

Response (200):
{
  "success": true,
  "message": "Appointment updated successfully"
}
```

#### Cancel Appointment
```http
DELETE /api/appointments/:id
Authorization: Bearer <JWT_TOKEN>

Response (200):
{
  "success": true,
  "message": "Appointment cancelled successfully"
}
```

### Certificate Endpoints

#### Get Certificates
```http
GET /api/certificates
Authorization: Bearer <JWT_TOKEN>

Response (200):
{
  "success": true,
  "certificates": [...]
}
```

#### Request Certificate
```http
POST /api/certificates
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "type": "Birth",
  "applicantName": "John Doe",
  "details": "For passport renewal"
}

Response (201):
{
  "success": true,
  "message": "Certificate request submitted",
  "certificate": {...}
}
```

#### Update Certificate Status (Admin)
```http
PUT /api/certificates/:id
Authorization: Bearer <ADMIN_JWT_TOKEN>
Content-Type: application/json

{
  "status": "ready"
}

Response (200):
{
  "success": true,
  "message": "Certificate status updated"
}
```

### Complaint Endpoints

#### Get Complaints
```http
GET /api/complaints
Authorization: Bearer <JWT_TOKEN>

Response (200):
{
  "success": true,
  "complaints": [...]
}
```

#### Submit Complaint
```http
POST /api/complaints
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "category": "Road",
  "description": "Pothole on Main Street",
  "location": "Main Street, Colombo"
}

Response (201):
{
  "success": true,
  "message": "Complaint submitted successfully",
  "complaint": {...}
}
```

#### Update Complaint Status (Admin)
```http
PUT /api/complaints/:id
Authorization: Bearer <ADMIN_JWT_TOKEN>
Content-Type: application/json

{
  "status": "resolved",
  "response": "Issue has been fixed"
}

Response (200):
{
  "success": true,
  "message": "Complaint updated"
}
```

---

## 🗄️ Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String (required, 2-100 chars),
  NIC: String (required, unique, 10-12 chars),
  email: String (required, unique, valid email),
  phone: String (optional, 10-15 chars),
  password: String (required, hashed with bcryptjs),
  role: String (enum: ['citizen', 'admin'], default: 'citizen'),
  createdAt: Date (default: now),
  updatedAt: Date
}
```

### Appointment Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User, required),
  purpose: String (enum: ['NIC', 'Birth Certificate', 'Marriage Certificate', 
                          'Death Certificate', 'Land Document', 'Other']),
  date: Date (required, future date),
  timeSlot: String (required, e.g., "09:00 AM", "02:00 PM"),
  status: String (enum: ['pending', 'approved', 'rejected', 'completed'], 
                  default: 'pending'),
  adminNote: String (optional),
  createdAt: Date (default: now),
  updatedAt: Date
}
```

### Certificate Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User, required),
  type: String (enum: ['Birth', 'Death', 'Marriage', 'Residence']),
  applicantName: String (required),
  details: String (required, 10-500 chars),
  status: String (enum: ['pending', 'processing', 'ready', 'rejected'], 
                  default: 'pending'),
  createdAt: Date (default: now),
  updatedAt: Date
}
```

### Complaint Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User, required),
  category: String (enum: ['Road', 'Water', 'Electricity', 'Garbage', 'Other']),
  description: String (required, 10-1000 chars),
  location: String (optional),
  status: String (enum: ['submitted', 'reviewing', 'resolved', 'rejected'], 
                  default: 'submitted'),
  response: String (optional, admin response),
  createdAt: Date (default: now),
  updatedAt: Date
}
```

---

## 🔒 Security Features

### ✅ Implemented Security

1. **Password Security**
   - Hashing with bcryptjs (10 salt rounds)
   - Never stored in plain text
   - Minimum 6 characters required
   - Validated on backend

2. **Authentication**
   - JWT (JSON Web Tokens) for stateless auth
   - 7-day token expiration
   - Secure HTTP-only cookies (when deployed)
   - Token refresh mechanism (recommended for future)

3. **Authorization**
   - Role-based access control (RBAC)
   - Protected routes verify JWT
   - Admin endpoints require admin role
   - Citizen endpoints require citizen role

4. **Data Protection**
   - CORS configuration to allow only trusted origins
   - Input validation on all endpoints
   - SQL injection prevention (using Mongoose)
   - XSS protection through React escaping
   - CSRF tokens (recommended for future)

5. **API Security**
   - Rate limiting (recommended for future)
   - Input sanitization
   - Error messages don't leak sensitive info
   - Secure headers (HSTS, X-Frame-Options, etc.)

6. **Environment Security**
   - Sensitive data in .env files
   - Never commit .env to Git
   - Different configs for dev/prod
   - API keys hidden from client

### 🛡️ Security Best Practices

```javascript
// ✅ DO: Hash passwords
const hashedPassword = await bcrypt.hash(password, 10);

// ❌ DON'T: Store plain text passwords
database.save({ password: password });

// ✅ DO: Verify JWT
const decoded = jwt.verify(token, JWT_SECRET);

// ✅ DO: Use parameterized queries (Mongoose does this)
User.findOne({ email: userEmail });

// ❌ DON'T: Concatenate user input into queries
User.findOne("SELECT * FROM users WHERE email = '" + email + "'");

// ✅ DO: Validate input
if (!email.match(/^\S+@\S+\.\S+$/)) { /* invalid */ }

// ✅ DO: Use HTTPS in production
if (NODE_ENV === 'production') { /* use HTTPS */ }
```

---

## 📂 File Structure Details

### Frontend Components

#### Navbar.jsx
- Responsive navigation bar
- Mobile hamburger menu
- Dynamic links based on auth status
- User menu with logout
- Logo/branding

#### Footer.jsx
- Quick links
- Contact information
- About section
- Copyright notice

#### ProtectedRoute.jsx
- Route guard component
- Checks authentication status
- Role-based access control
- Redirects to login if unauthorized
- Shows loading state

### Frontend Pages

#### Home.jsx
- Landing page with hero section
- Services showcase
- Features highlights
- Call-to-action buttons
- Responsive design

#### Login.jsx
- Email and password form
- Form validation
- Error handling
- Links to register page
- Demo credentials display

#### Register.jsx
- Multi-field form (name, NIC, email, phone, password)
- Form validation
- Password confirmation
- Error messages
- Links to login page

#### CitizenDashboard.jsx (Placeholder - To be built)
- Appointments tab
- Certificates tab
- Complaints tab
- Status tracking
- Recent requests

#### AdminDashboard.jsx (Placeholder - To be built)
- Statistics overview
- Requests management
- Analytics charts
- User activity log

### Backend Controllers

#### authController.js
- `register()` - Create new user account
- `login()` - Authenticate and return JWT
- `getCurrentUser()` - Get authenticated user details

#### appointmentController.js (To be built)
- `getUserAppointments()` - Get user's appointments
- `bookAppointment()` - Create new appointment
- `updateAppointmentStatus()` - Admin update status
- `cancelAppointment()` - Delete appointment

#### certificateController.js (To be built)
- `getUserCertificates()` - Get user's certificates
- `requestCertificate()` - Create certificate request
- `updateCertificateStatus()` - Admin update status

#### complaintController.js (To be built)
- `getUserComplaints()` - Get user's complaints
- `submitComplaint()` - Create complaint
- `updateComplaintStatus()` - Admin update status

### Backend Models

#### User.js
- Schema definition
- Pre-save password hashing middleware
- `matchPassword()` method for login
- Indexes on unique fields

#### Appointment.js (To be built)
- Schema with date validation
- Time slot management
- Status tracking
- Timestamps

#### Certificate.js (To be built)
- Certificate type enum
- Application details
- Processing status
- Document management

#### Complaint.js (To be built)
- Category enum
- Location tracking
- Resolution response
- Status workflow

---

## 👨‍💻 Development Guide

### Code Style & Standards

```javascript
// Use functional components with Hooks
export const MyComponent = () => {
  const [state, setState] = useState(null);
  
  useEffect(() => {
    // Effect logic
  }, []);
  
  return <div>Component JSX</div>;
};

// Use async/await for API calls
const handleLogin = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
  }
};

// Always include error handling
try {
  const data = await fetchData();
} catch (error) {
  setError(error.message);
}

// Use Tailwind CSS for styling (NO inline styles)
<div className="bg-blue-600 text-white px-4 py-2 rounded">
  Button
</div>

// Include PropTypes validation
import PropTypes from 'prop-types';

Component.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number,
};
```

### Adding New Features

1. **Create Backend Endpoint**
   - Create controller function
   - Add route in routes file
   - Add error handling
   - Test with Postman/curl

2. **Create Frontend Component**
   - Create component file
   - Use AuthContext for auth state
   - Handle loading/error states
   - Use Tailwind for styling

3. **Connect Frontend to Backend**
   - Use api service from services/api.js
   - Add JWT token to headers
   - Handle response/errors
   - Update UI accordingly

4. **Test Thoroughly**
   - Test happy path
   - Test error scenarios
   - Test with different roles
   - Test responsive design

### Debugging Tips

```javascript
// 1. Check Network Tab
// Open DevTools → Network → Check API responses

// 2. Use Console Logs (temporary)
console.log('Data:', data);
console.error('Error:', error);

// 3. Check MongoDB
// mongo <connection_string>
// use civiclink-lk
// db.users.find()

// 4. Verify JWT Token
// Decode at jwt.io

// 5. Check .env files
// Ensure all variables are set correctly

// 6. Clear Browser Cache
// Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
```

---

## 🚀 Deployment Guide

### Frontend Deployment (Vercel)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to vercel.com
   - Sign up with GitHub
   - Import civiclink-lk repository
   - Set environment variables
   - Deploy

3. **Configure Domain**
   - Add custom domain
   - Configure DNS records
   - Enable HTTPS (automatic)

### Backend Deployment (Render.com)

1. **Create Render Account**
   - Go to render.com
   - Sign up

2. **Deploy Backend**
   - New Web Service
   - Connect GitHub repository
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variables from .env
   - Deploy

3. **Configure Database**
   - Use MongoDB Atlas (cloud)
   - Update connection string in .env
   - Whitelist Render IP in MongoDB

### Database Deployment (MongoDB Atlas)

1. **Create Atlas Account**
   - Go to mongodb.com/cloud/atlas
   - Create free cluster

2. **Secure Database**
   - Create database user
   - Whitelist production server IP
   - Enable encryption
   - Regular backups

3. **Update Connection String**
   - Use production URI in backend .env
   - Ensure SSL/TLS enabled
   - Test connection

---

## 🐛 Troubleshooting

### Frontend Issues

#### Port 5173 already in use
```bash
# Kill process on port 5173
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5173
kill -9 <PID>

# Use different port
npm run dev -- --port 3000
```

#### Module not found errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
```

#### Tailwind CSS not working
```bash
# Ensure postcss.config.cjs exists
# Restart dev server
npm run dev
```

#### API calls fail
```bash
# Check backend is running
# Check API_URL in .env
# Check JWT token in localStorage
# Check CORS configuration in backend
```

### Backend Issues

#### MongoDB connection fails
```bash
# Check MongoDB is running
mongod --version

# Check connection string
# Verify username/password
# Check IP whitelist in Atlas
# Test connection with mongo shell
mongo <connection_string>
```

#### JWT errors
```bash
# Check JWT_SECRET in .env
# Verify token format (Bearer <token>)
# Check token expiration
# Decode token at jwt.io
```

#### Port 5000 already in use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

#### Memory/Performance issues
```bash
# Clear npm cache
npm cache clean --force

# Check for memory leaks
# Use Chrome DevTools → Performance

# Optimize MongoDB queries
# Add indexes on frequently queried fields
```

### Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| `EADDRINUSE` | Port already in use | Kill process or use different port |
| `MongoError: bad auth` | Wrong credentials | Check MongoDB user/password |
| `CORS error` | Frontend/backend mismatch | Check FRONTEND_URL in .env |
| `JWT malformed` | Invalid token format | Re-login to get new token |
| `Cannot find module` | Missing dependency | Run `npm install` |
| `ENOENT: no such file` | Missing .env file | Create .env with required variables |

---

## 🤝 Contributing

### How to Contribute

1. **Fork the Repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/civiclink-lk.git
   cd civiclink-lk
   ```

3. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Changes**
   - Write code following project standards
   - Add comments for complex logic
   - Test thoroughly

5. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   # Use conventional commits: feat:, fix:, docs:, style:, refactor:, etc.
   ```

6. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Write description
   - Wait for review

### Code Standards

- ✅ Use functional components and Hooks
- ✅ Follow ESLint rules
- ✅ Add PropTypes for components
- ✅ Write error handling
- ✅ Use Tailwind CSS only
- ✅ Add comments for complex code
- ✅ Test on multiple screen sizes
- ✅ Commit messages should be descriptive

---

## 📞 Support & Contact

### Getting Help

- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Ask questions in GitHub Discussions
- **Email**: support@civiclink.lk
- **Phone**: +94-11-2-345-678

### Documentation

- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Resources

- [JWT Authentication](https://jwt.io)
- [MERN Stack Tutorial](https://www.mongodb.com/mern-stack)
- [REST API Best Practices](https://restfulapi.net)
- [Web Security](https://owasp.org)

---

## 📄 License

This project is licensed under the ISC License. See LICENSE file for details.

---

## 🙏 Acknowledgments

- Sri Lankan Government for inspiring this initiative
- Open source community for amazing tools and libraries
- Contributors and testers

---

## 📈 Project Roadmap

### Phase 1: Core Features (Current)
- ✅ User authentication
- ⏳ Appointment system
- ⏳ Certificate system
- ⏳ Complaint system
- ⏳ Admin dashboard

### Phase 2: Enhancement
- 🔄 AI Chatbot integration
- 🔄 Email notifications
- 🔄 SMS notifications
- 🔄 Payment integration
- 🔄 Sinhala language support

### Phase 3: Advanced
- 🔄 Mobile app (React Native)
- 🔄 Advanced analytics
- 🔄 API rate limiting
- 🔄 Audit logging
- 🔄 Backup & recovery

---

## 🌟 Support This Project

If you find this project helpful:
- ⭐ Star this repository
- 🐛 Report bugs
- 💡 Suggest features
- 🤝 Contribute code
- 📢 Share with others

---

**Made with ❤️ for Sri Lanka**

Last Updated: June 3, 2026
Version: 1.0.0
