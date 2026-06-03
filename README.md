# CivicLink LK - Sri Lankan Government Service Digitizer

A comprehensive web application that digitizes and streamlines Sri Lankan government services for citizens.

## Features

### For Citizens
- 📅 **Book Appointments** - Schedule appointments with Grama Sevaka offices online
- 📜 **Request Certificates** - Apply for birth, death, marriage, and residence certificates
- 📢 **Submit Complaints** - File complaints about government services
- 📊 **Track Status** - Monitor your requests in real-time
- 🤖 **AI Chatbot** - Get assistance in Sinhala and English (Coming Soon)

### For Admins
- 📋 **Manage Appointments** - Approve or reject appointment requests
- ✅ **Process Certificates** - Update certificate request status
- 💬 **Respond to Complaints** - Review and respond to citizen complaints
- 📊 **Dashboard & Stats** - View comprehensive analytics and reports

## Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router v6** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Project Structure

```
civiclink-lk/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── context/           # React Context
│   │   ├── services/          # API calls
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
├── server/                    # Node.js backend
│   ├── config/                # Database config
│   ├── models/                # MongoDB schemas
│   ├── controllers/           # Request handlers
│   ├── routes/                # API routes
│   ├── middleware/            # Auth middleware
│   ├── server.js              # Main server file
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

```bash
cd server
npm install

# Create .env file
MONGODB_URI=mongodb://localhost:27017/civiclink-lk
JWT_SECRET=your_secret_key
PORT=5000

# Start server
npm run dev    # with nodemon
# or
npm start      # normal start
```

### Frontend Setup

```bash
cd client
npm install

# Create .env file
VITE_API_URL=http://localhost:5000

# Start frontend
npm run dev
```

The app will be available at `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Appointments
- `GET /api/appointments` - Get user appointments
- `POST /api/appointments` - Book appointment
- `PUT /api/appointments/:id` - Update status (admin)
- `DELETE /api/appointments/:id` - Cancel appointment

### Certificates
- `GET /api/certificates` - Get user certificates
- `POST /api/certificates` - Request certificate
- `PUT /api/certificates/:id` - Update status (admin)

### Complaints
- `GET /api/complaints` - Get user complaints
- `POST /api/complaints` - Submit complaint
- `PUT /api/complaints/:id` - Update status (admin)

## Database Collections

### Users
```javascript
{
  name: String,
  NIC: String (unique),
  email: String (unique),
  phone: String,
  password: String (hashed),
  role: 'citizen' | 'admin',
  createdAt: Date
}
```

### Appointments
```javascript
{
  userId: ObjectId,
  purpose: String,
  date: Date,
  timeSlot: String,
  status: 'pending' | 'approved' | 'rejected' | 'completed',
  adminNote: String,
  createdAt: Date
}
```

### Certificates
```javascript
{
  userId: ObjectId,
  type: String,
  applicantName: String,
  details: String,
  status: 'pending' | 'processing' | 'ready' | 'rejected',
  createdAt: Date
}
```

### Complaints
```javascript
{
  userId: ObjectId,
  category: String,
  description: String,
  location: String,
  status: 'submitted' | 'reviewing' | 'resolved' | 'rejected',
  response: String,
  createdAt: Date
}
```

## Security Features

✅ Password hashing with bcryptjs (10 rounds)
✅ JWT token-based authentication
✅ Protected routes with role-based access
✅ CORS configuration
✅ Environment variables for sensitive data
✅ Error handling on all API calls

## Development

### Testing Login
**Email:** demo@example.com
**Password:** demo123456

### Available Scripts

**Backend:**
```bash
npm run dev    # Start with nodemon
npm start      # Start normally
```

**Frontend:**
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
```

## Next Steps

- [ ] Build citizen dashboard with all services
- [ ] Build admin dashboard with management panels
- [ ] Implement appointment booking system
- [ ] Implement certificate request system
- [ ] Implement complaint submission system
- [ ] Add AI chatbot integration
- [ ] Add email notifications
- [ ] Deploy to production (Vercel + Render)

## License

ISC

## Support

For support, email: support@civiclink.lk

---

**Made with ❤️ for Sri Lanka**
