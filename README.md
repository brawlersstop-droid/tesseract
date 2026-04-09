# Tesseract Frontend

A modern, responsive frontend for the Tesseract gaming and events platform, designed to integrate seamlessly with the Tesseract backend API.

## Features

### 🔐 Authentication
- **OTP-based login** for IITM students (`@ds.study.iitm.ac.in`, `@es.study.iitm.ac.in`)
- **JWT token management** with automatic refresh
- **Role-based access control** (GUEST, MEMBER, CORE, ADMIN)

### 🎯 Core Functionality
- **Dashboard** with personalized stats and activity feed
- **Events management** (browse, join, create for CORE+)
- **Gaming system** with score tracking and leaderboards
- **Membership system** with role progression
- **Admin panel** for user and system management

### 🎨 Modern UI/UX
- **shadcn/ui inspired components** with TailwindCSS
- **Framer Motion animations** for smooth interactions
- **Responsive design** for mobile and desktop
- **Toast notifications** for user feedback
- **Role-based navigation** and permissions

## Tech Stack

- **React 19** with modern hooks
- **React Router** for navigation
- **Framer Motion** for animations
- **TailwindCSS** for styling
- **Vite** for development and building

## Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Tesseract backend running on `http://localhost:5000`

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tesseract
```

2. Install dependencies:
```bash
npm install
```

3. Environment setup:
```bash
cp .env.example .env
# Edit .env with your API URL if needed
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Environment
NODE_ENV=development
```

## User Roles & Permissions

### GUEST
- Can view public content
- Can authenticate with OTP
- Can join Tesseract to become MEMBER
- Limited access to events and games

### MEMBER
- Full access to events and games
- Can join events and submit game scores
- Can view dashboard and leaderboard
- Can manage profile

### CORE
- All MEMBER permissions
- Can create and manage events
- Can create and manage games
- Can view event participants and activity logs

### ADMIN
- All CORE permissions
- Full admin panel access
- Can manage users and roles
- Can view system statistics and activity

## API Integration

The frontend integrates with the Tesseract backend API:

- **Base URL**: `http://localhost:5000/api`
- **Authentication**: Bearer JWT tokens
- **Error handling**: Standardized error responses
- **Auto-refresh**: Automatic token refresh on expiry

### Key Endpoints

#### Authentication
- `POST /auth/request-otp` - Send OTP to email
- `POST /auth/verify-otp` - Verify OTP and get tokens
- `POST /auth/refresh` - Refresh access token
- `GET /auth/me` - Get current user profile

#### Dashboard
- `GET /users/me/dashboard` - Get dashboard data

#### Events
- `GET /events` - List events
- `POST /events` - Create event (CORE+)
- `POST /events/:id/join` - Join event

#### Games
- `GET /games` - List games
- `POST /games` - Create game (CORE+)
- `POST /games/:id/scores` - Submit score

## Component Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Card.jsx
│   │   ├── Badge.jsx
│   │   └── Toast.jsx
│   └── layout/          # Layout components
│       └── Navbar.jsx
├── contexts/
│   └── AuthContext.jsx  # Authentication context
├── pages/               # Page components
├── services/
│   └── api.js          # API service layer
└── utils/
    └── cn.js           # Utility functions
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

- Uses modern React patterns with hooks
- Follows component-driven architecture
- Implements proper error boundaries
- Uses TypeScript-style JSDoc comments
- Responsive-first design approach

## Deployment

### Production Build

1. Build the application:
```bash
npm run build
```

2. Preview the build:
```bash
npm run preview
```

3. Deploy the `dist` folder to your hosting service.

### Environment Configuration

For production, ensure:

```env
VITE_API_URL=https://your-api-domain.com/api
NODE_ENV=production
```

## Contributing

1. Follow the existing code style and patterns
2. Use the established component structure
3. Test thoroughly before submitting changes
4. Update documentation as needed

## Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Ensure backend is running on correct port
   - Check `VITE_API_URL` environment variable
   - Verify CORS settings on backend

2. **Authentication Issues**
   - Clear browser localStorage
   - Check JWT token expiration
   - Verify email domain restrictions

3. **Build Errors**
   - Clear node_modules and reinstall
   - Check for missing dependencies
   - Verify environment variables

## License

This project is proprietary. All rights reserved.

## Support

For support and questions, please contact the development team.
