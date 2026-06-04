# Quick Start Guide

## 5-Minute Setup

### Step 1: Clone & Install
```bash
cd civiclink-lk/client
npm install
```

### Step 2: Environment Setup
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

### Step 3: Start Development Server
```bash
npm run dev
```

### Step 4: Access Application
- Open http://localhost:5173
- Backend should be running at http://localhost:5000

## Default Test Accounts

### Citizen Account
- Email: citizen@example.com
- Password: password123

### Admin Account
- Email: admin@example.com
- Password: admin123

## Available Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Formatting
npm run format       # Format code with Prettier
```

## Project Features at a Glance

### For Citizens
- 📅 Book appointments online
- 📜 Request certificates instantly
- ⚠️ Lodge complaints
- 📍 Track applications in real-time
- 👤 Manage profile and settings

### For Admins
- 📊 View analytics dashboard
- 📋 Manage user requests
- 👥 Manage users
- 📈 Track statistics

## Common Tasks

### Add a New Page
1. Create file in `src/pages/MyPage.jsx`
2. Add import in `src/App.jsx`
3. Add route in App.jsx Routes section
4. Add navigation link in `src/components/Navbar.jsx`

### Add a New Component
1. Create file in `src/components/MyComponent.jsx`
2. Export as default
3. Import and use in your page

### Update Styling
- Use Tailwind CSS classes in JSX
- Global styles in `src/index.css`
- Component-specific styles in component files

## File Organization

```
src/
├── components/        # Reusable UI components
├── pages/             # Page components (one per route)
├── context/           # React context providers
├── services/          # API and external services
├── utils/             # Utility functions
└── App.jsx            # Main app component
```

## Important Notes

1. **Authentication**: Always check `useAuth()` hook in pages that need auth
2. **Mobile**: Test on mobile (DevTools F12 > Toggle device toolbar)
3. **Backend**: Ensure backend API is running before testing
4. **Environment**: Create `.env.local` for local development

## Troubleshooting

### Page shows "Coming soon"
→ Check that page component is imported in App.jsx

### Cannot login
→ Check backend is running on port 5000

### Styling looks wrong
→ Try `npm run dev` again, Tailwind CSS needs to rebuild

### Build fails
→ Delete `node_modules` and run `npm install` again

## Next Steps

1. Review FRONTEND_IMPLEMENTATION.md for detailed documentation
2. Check component comments for usage details
3. Run backend and test the full flow
4. Customize branding and content as needed

---

For more details, see **FRONTEND_IMPLEMENTATION.md**
