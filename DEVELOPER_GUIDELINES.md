# Developer Checklist & Guidelines

## ✅ Pre-Development Setup

- [ ] Clone repository
- [ ] Install Node.js 14+
- [ ] Run `npm install` in client folder
- [ ] Copy `.env.example` to `.env.local`
- [ ] Update `VITE_API_URL` in `.env.local`
- [ ] Start backend server on port 5000
- [ ] Run `npm run dev` to start frontend

## 📦 Code Organization Standards

### File Naming
- Components: PascalCase (e.g., `UserProfile.jsx`)
- Pages: PascalCase (e.g., `UserProfile.jsx`)
- Utilities: camelCase (e.g., `helpers.js`)
- Styling: component-based or inline Tailwind

### Folder Structure
```
src/
├── components/   # Reusable components only
├── pages/        # One per route
├── context/      # State management
├── services/     # API calls
├── utils/        # Helper functions
└── App.jsx       # Main router
```

### Component Structure
```jsx
/**
 * Component Name
 * ===============
 * Brief description
 */

import React from 'react';
// Imports...

/**
 * Main component with JSDoc comments
 * explaining key functions
 */
const ComponentName = () => {
  // Hooks
  // State
  // Effects
  // Functions
  // Render
};

export default ComponentName;
```

## 🎨 Styling Guidelines

### Use Tailwind CSS Classes
```jsx
// ✅ Good
<div className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
  
// ❌ Avoid
<div style={{ backgroundColor: 'blue', padding: '8px 16px' }}>
```

### Color System
```jsx
// Primary: Blue
className="bg-blue-600"

// Secondary: Gold
className="text-amber-500"

// Status Colors
className="bg-green-100 text-green-800"  // Success
className="bg-blue-100 text-blue-800"    // Info
className="bg-yellow-100 text-yellow-800" // Warning
className="bg-red-100 text-red-800"      // Error
```

### Responsive Design
```jsx
// Mobile first, then breakpoints
<div className="px-4 md:px-6 lg:px-8">
  {/* Mobile: 16px, Tablet: 24px, Desktop: 32px */}
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 column mobile, 2 tablet, 3 desktop */}
</div>
```

## 🔐 Authentication

### Always Use Protected Routes
```jsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute 
      element={<Dashboard />}
      requiredRole="citizen"
    />
  }
/>
```

### Check Authentication in Components
```jsx
const { isAuthenticated, user, logout } = useAuth();

if (!isAuthenticated) {
  return <Navigate to="/login" />;
}
```

## 🔄 API Integration

### Always Handle Errors
```jsx
try {
  const response = await api.get('/endpoint');
  setData(response.data.data);
} catch (err) {
  setError(err.response?.data?.message || 'Failed to load');
} finally {
  setLoading(false);
}
```

### Use Constants for Endpoints
```jsx
// ✅ Good
const ENDPOINTS = {
  APPOINTMENTS: '/appointments',
  REQUESTS: '/requests',
};

// ❌ Avoid
api.get('/appointments')
api.get('/appointments')
```

### JWT Token Handling
```jsx
// Automatically added by interceptor
// No need to manually add Authorization header
```

## 📝 Form Handling Pattern

```jsx
const [formData, setFormData] = useState({
  field1: '',
  field2: '',
});
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);

const handleChange = (e) => {
  setFormData(prev => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  
  // Validation
  if (!formData.field1) {
    setError('Field is required');
    return;
  }
  
  try {
    setLoading(true);
    const response = await api.post('/endpoint', formData);
    if (response.data.success) {
      // Success action
    }
  } catch (err) {
    setError(err.response?.data?.message || 'Error occurred');
  } finally {
    setLoading(false);
  }
};

return (
  <form onSubmit={handleSubmit}>
    {error && <div className="bg-red-100 text-red-700 p-3">{error}</div>}
    <input
      name="field1"
      value={formData.field1}
      onChange={handleChange}
      required
    />
    <button type="submit" disabled={loading}>
      {loading ? 'Submitting...' : 'Submit'}
    </button>
  </form>
);
```

## ✨ Best Practices

### Do ✅
- Use semantic HTML (button, form, input, etc.)
- Add ARIA labels for accessibility
- Provide loading states
- Show user feedback (success/error messages)
- Validate form inputs
- Handle API errors gracefully
- Use React hooks for state management
- Create reusable components
- Document complex functions
- Test on mobile devices

### Don't ❌
- Don't hardcode API URLs
- Don't ignore error states
- Don't skip form validation
- Don't forget loading states
- Don't mix styled-components with Tailwind
- Don't create mega components (keep them small)
- Don't forget to handle 401 responses
- Don't expose sensitive data in errors
- Don't ignore accessibility
- Don't commit environment variables

## 🧪 Testing Checklist

### Before Submitting Code
- [ ] Page renders without console errors
- [ ] Forms validate correctly
- [ ] API calls work
- [ ] Error handling works
- [ ] Loading states display
- [ ] Mobile view looks good
- [ ] Links navigate correctly
- [ ] Logout clears authentication

### Manual Testing Flow
1. **Registration**: Create new account
2. **Login**: Login with created account
3. **Navigation**: Check all menu links work
4. **Forms**: Test form validation and submission
5. **Mobile**: Test on mobile view
6. **Errors**: Intentionally trigger errors and check handling
7. **Logout**: Verify logout and redirect

## 📱 Mobile Testing

### Required Breakpoints
- 360px (small phone)
- 480px (mobile)
- 768px (tablet)
- 1024px (desktop)

### Testing Tools
```bash
# Chrome DevTools
F12 → Toggle device toolbar (Ctrl+Shift+M on Windows)

# Or use real device
Connect via USB or use ngrok
```

## 🐛 Debugging Tips

### Console Logging
```jsx
// ✅ Good for development
console.log('State:', { user, data });

// ❌ Avoid in production
console.error('API Error:', response);
```

### React DevTools
```jsx
// Install React DevTools browser extension
// Use Profiler to check render performance
// Use Components tab to inspect state
```

### Network Tab
```jsx
// Open DevTools → Network tab
// Check API requests and responses
// Verify status codes (200, 401, 500, etc.)
```

## 🚀 Deployment Checklist

### Before Build
- [ ] No console errors
- [ ] All endpoints configured
- [ ] Environment variables set
- [ ] No hardcoded URLs
- [ ] Error messages are user-friendly

### Build Process
```bash
npm run build
npm run preview
```

### After Deployment
- [ ] Test login flow
- [ ] Test all major features
- [ ] Check mobile responsiveness
- [ ] Verify API connectivity
- [ ] Monitor error tracking

## 📚 Adding New Features

### To Add a New Page
1. Create file: `src/pages/NewPage.jsx`
2. Create component with proper structure
3. Import in `src/App.jsx`
4. Add route in Routes section
5. Add navigation link in `Navbar.jsx`
6. Test navigation and functionality

### To Add a New Component
1. Create file: `src/components/NewComponent.jsx`
2. Export as default
3. Add JSDoc comments
4. Create examples in components using it
5. Document in `COMPONENTS.md`

### To Add a New Utility
1. Create or update: `src/utils/helpers.js`
2. Add JSDoc comments
3. Export the function
4. Use in components
5. Add examples in comments

## 🔍 Code Review Checklist

- [ ] Code follows naming conventions
- [ ] Components are properly commented
- [ ] Error handling is complete
- [ ] Loading states are present
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Proper use of hooks
- [ ] No hardcoded values
- [ ] Accessibility considered
- [ ] Documentation updated

## 📞 Getting Help

### If Something Breaks
1. Check browser console (F12)
2. Check Network tab for API errors
3. Verify backend is running
4. Check environment variables
5. Review component comments
6. Check React DevTools state

### Common Fixes
- **Page blank**: Check route in App.jsx
- **Styling wrong**: Restart dev server
- **API error**: Check backend running
- **Login loop**: Clear localStorage
- **Build error**: Delete node_modules, reinstall

---

## 🎯 Development Workflow

```
1. Create feature branch
   git checkout -b feature/feature-name

2. Make changes
   npm run dev to test

3. Code review checklist
   Review against guidelines above

4. Commit changes
   git commit -m "feat: add feature description"

5. Push and create PR
   git push origin feature/feature-name

6. Merge to main after review
```

---

**Last Updated**: June 4, 2026  
**Version**: 1.0.0
