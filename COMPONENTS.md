# Component Documentation

## Pages

### CitizenDashboard.jsx
**Purpose**: Main hub for citizens
**Features**:
- Statistics overview
- Appointments list
- Requests list  
- Complaints list
- Tab-based navigation

**Props**: None (uses AuthContext)
**Usage**:
```jsx
<ProtectedRoute element={<CitizenDashboard />} requiredRole="citizen" />
```

### AdminDashboard.jsx
**Purpose**: Admin control panel
**Features**:
- System statistics
- Request management
- User management
- Status filtering

**Props**: None (uses AuthContext)
**Key Functions**:
- `handleStatusUpdate()` - Update request status

### AppointmentBooking.jsx
**Purpose**: Book appointments
**Features**:
- Service selection
- Date/time picker
- Notes field
- Confirmation modal

**Props**: None (uses AuthContext)
**API Endpoints**:
- POST `/appointments/book`

### ComplaintsPage.jsx
**Purpose**: Submit and view complaints
**Features**:
- Complaint submission form
- Complaint listing
- Status tracking
- Priority selection

**Props**: None (uses AuthContext)
**API Endpoints**:
- GET `/complaints/my-complaints`
- POST `/complaints/submit`

### CertificateRequest.jsx
**Purpose**: Request certificates
**Features**:
- Certificate type selection
- Date picker
- Purpose selection
- Delivery method selection

**Props**: None (uses AuthContext)
**API Endpoints**:
- POST `/certificates/request`

### RequestTracking.jsx
**Purpose**: Real-time request tracking
**Features**:
- Timeline visualization
- Progress bars
- Status filtering
- Request details

**Props**: None (uses AuthContext)
**API Endpoints**:
- GET `/requests/my-requests`

### ProfilePage.jsx
**Purpose**: User profile management
**Features**:
- Profile information editing
- Password change
- Account settings
- Logout

**Props**: None (uses AuthContext)
**API Endpoints**:
- PATCH `/auth/profile/:id`
- PATCH `/auth/change-password/:id`

### ServicesPage.jsx
**Purpose**: Services showcase
**Features**:
- Service cards grid
- Feature highlights
- Call-to-action

**Props**: None (uses AuthContext)

### Home.jsx
**Purpose**: Landing page
**Features**:
- Hero section
- Services showcase
- Features section
- Animations and scroll effects

**Props**: None (uses AuthContext)

### Login.jsx & Register.jsx
**Purpose**: Authentication
**Features**:
- Form validation
- Error handling
- Success redirect
- Loading states

## Components

### ServiceCard.jsx
**Purpose**: Display service cards
**Props**:
```jsx
{
  icon: string (emoji),
  title: string,
  description: string,
  href: string (path),
  color: string (Tailwind gradient),
  badge?: string
}
```
**Usage**:
```jsx
<ServiceCard 
  icon="📅" 
  title="Appointments"
  description="Book appointments"
  href="/appointments"
  color="from-blue-500 to-blue-600"
/>
```

### RequestCard.jsx
**Purpose**: Display request cards
**Props**:
```jsx
{
  request: object {
    _id: string,
    type: string,
    status: string,
    description: string,
    createdAt: string
  },
  onClick?: function
}
```
**Usage**:
```jsx
<RequestCard 
  request={request}
  onClick={(req) => handleClick(req)}
/>
```

### StatCard.jsx
**Purpose**: Display statistics
**Props**:
```jsx
{
  icon: string (emoji),
  label: string,
  value: number | string,
  color?: string (Tailwind gradient),
  trend?: number (percentage)
}
```
**Usage**:
```jsx
<StatCard 
  icon="📅"
  label="Appointments"
  value={5}
  color="from-blue-500 to-blue-600"
  trend={10}
/>
```

### ProtectedRoute.jsx
**Purpose**: Route protection wrapper
**Props**:
```jsx
{
  element: ReactElement,
  requiredRole?: string ('citizen' | 'admin')
}
```
**Behavior**:
- Redirects to login if not authenticated
- Redirects to home if role doesn't match

### Navbar.jsx
**Purpose**: Navigation bar
**Features**:
- Logo
- Desktop menu
- Mobile hamburger menu
- User profile section
- Auth buttons

**Updates Made**:
- Added links to: `/appointments`, `/certificates`, `/complaints`, `/requests`, `/profile`
- Added role-based navigation

### Footer.jsx
**Purpose**: Footer section
**Included**: Company info, links, copyright

## Hooks

### useAuth()
**Purpose**: Access authentication context
**Returns**:
```jsx
{
  user: object,
  isAuthenticated: boolean,
  login: function,
  register: function,
  logout: function,
  token: string,
  loading: boolean,
  error: string
}
```
**Usage**:
```jsx
const { user, isAuthenticated, logout } = useAuth();
```

## Utilities (helpers.js)

### Formatting Functions
- `formatDate(date)` - Format date to readable string
- `formatDateTime(date)` - Format with time
- `formatCurrency(amount)` - Format as LKR currency
- `formatPhone(phone)` - Format phone number

### Validation Functions
- `isValidEmail(email)` - Validate email format
- `isValidPhone(phone)` - Validate Sri Lankan phone
- `isValidNIC(nic)` - Validate Sri Lankan NIC

### Status Functions
- `getStatusColor(status)` - Get Tailwind color classes
- `getStatusIcon(status)` - Get status emoji
- `getProgressPercentage(status)` - Calculate progress

### Utility Functions
- `truncateText(text, maxLength)` - Truncate long text

### Constants
- `SERVICE_CATEGORIES` - Available services
- `REQUEST_STATUSES` - Status options
- `CERTIFICATE_TYPES` - Certificate types
- `DELIVERY_METHODS` - Delivery options

## Common Patterns

### Form Handling
```jsx
const [formData, setFormData] = useState({...});

const handleChange = (e) => {
  setFormData(prev => ({
    ...prev,
    [e.target.name]: e.target.value
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // API call
  } catch (err) {
    setError(err.message);
  }
};
```

### Data Fetching
```jsx
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/endpoint');
      setData(response.data.data);
    } catch (err) {
      setError('Failed to load');
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);
```

### Conditional Rendering
```jsx
{isAuthenticated ? (
  <div>Authenticated content</div>
) : (
  <div>Guest content</div>
)}
```

---

For full implementation details, see **FRONTEND_IMPLEMENTATION.md**
