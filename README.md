# 🎰  Gambling Platform

A full-stack, modern gambling platform with Next.js frontend, Express.js backend, and microservices architecture. Built for scalability, security, and exceptional user experience.

## 🌟 Platform Overview

### Frontend (Next.js + TypeScript)
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS + shadcn/ui components
- **Features**: Dashboard, Contest Pages, Live Games, User Management
- **Real-time**: WebSocket integration for live updates

### Backend (Express.js + JavaScript)  
- **Framework**: Express.js with robust middleware
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based secure authentication
- **Real-time**: Socket.io for live gaming
- **Caching**: Redis for performance optimization

### Microservices Architecture
- **Payment Service**: Secure payment processing
- **Notification Service**: Email, SMS, push notifications
- **Analytics Service**: User behavior and reporting
- **Compliance Service**: KYC/AML verification

## 🚀 Key Features

### 🎮 Gaming Features
- **Live Casino**: Real-time blackjack, roulette, poker
- **Slot Games**: Various themed slot machines
- **Sports Betting**: Live odds and betting
- **Contests**: Tournament-style competitions
- **Leaderboards**: Real-time player rankings

### 👤 User Experience
- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode**: Theme switching
- **Real-time Updates**: Live game states and notifications
- **Dashboard**: Comprehensive user analytics
- **Profile Management**: Complete user profile system

### 🛡️ Security & Compliance
- **Two-Factor Authentication**: Enhanced security
- **KYC/AML Integration**: Regulatory compliance
- **Audit Trails**: Complete transaction logging
- **Rate Limiting**: DDoS protection
- **Encryption**: End-to-end data encryption

### 💰 Financial Features
- **Multi-Currency Support**: Various payment methods
- **Instant Deposits/Withdrawals**: Real-time transactions
- **Wallet Management**: Secure balance handling
- **Transaction History**: Detailed financial records

## 📋 Prerequisites

- Node.js >= 18.0.0
- PostgreSQL >= 12
- Redis >= 6.0
- npm >= 9.0.0 or yarn >= 1.22.0

## 🏗️ Project Structure

```
gambling-platform/
├── web/                     # Next.js Frontend
│   ├── app/                 # App Router (Next.js 14)
│   │   ├── (auth)/         # Authentication pages
│   │   ├── dashboard/      # User dashboard
│   │   ├── games/          # Game pages
│   │   ├── contests/       # Contest pages
│   │   ├── admin/          # Admin panel
│   │   └── api/            # API routes
│   ├── components/         # Reusable components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── forms/          # Form components
│   │   ├── games/          # Game-specific components
│   │   └── dashboard/      # Dashboard components
│   ├── lib/                # Utilities and configs
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript definitions
│   ├── styles/             # Global styles
│   └── public/             # Static assets
├── backend/                # Express.js Backend
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   ├── websocket/      # WebSocket handlers
│   │   └── jobs/           # Background jobs
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── migrations/     # Database migrations
│   └── tests/              # Backend tests
└── services/               # Microservices
    ├── payment-service/    # Payment processing
    ├── notification-service/# Notifications
    ├── analytics-service/  # Analytics & reporting
    └── compliance-service/ # KYC/AML compliance
```

## 🛠️ Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/gambling-platform.git
cd gambling-platform
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your configuration

# Database setup
npx prisma generate
npm run migrate
npm run db:seed

# Start backend
npm run dev
```

### 3. Frontend Setup
```bash
cd ../web

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your configuration

# Start frontend
npm run dev
```

### 4. Services Setup (Optional)
```bash
# Payment Service
cd ../services/payment-service
npm install
npm run dev

# Notification Service
cd ../notification-service
npm install
npm run dev

# Analytics Service
cd ../analytics-service
npm install
npm run dev
```

## 🔧 Environment Configuration

### Frontend (.env.local)
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_WS_URL=ws://localhost:5001

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Stripe (Client-side)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Feature Flags
NEXT_PUBLIC_ENABLE_CONTESTS=true
NEXT_PUBLIC_ENABLE_LIVE_CHAT=true
```

### Backend (.env)
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/gambling_db"
REDIS_URL="redis://localhost:6379"

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-refresh-secret"
JWT_EXPIRE="24h"

# Payment
STRIPE_SECRET_KEY="sk_test_your_stripe_secret"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# WebSocket
WS_PORT=5001
```

## 🎨 Frontend Tech Stack

### Core Technologies
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: High-quality component library

### Key Libraries
```json
{
  "next": "^14.0.0",
  "react": "^18.2.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.3.0",
  "@radix-ui/react-*": "Latest",
  "framer-motion": "^10.16.0",
  "recharts": "^2.8.0",
  "socket.io-client": "^4.7.4",
  "zustand": "^4.4.0",
  "react-hook-form": "^7.47.0",
  "zod": "^3.22.0"
}
```

### Frontend Features
- **Responsive Design**: Mobile-first approach
- **Component Library**: shadcn/ui integration
- **State Management**: Zustand for global state
- **Form Handling**: React Hook Form + Zod validation
- **Charts & Analytics**: Recharts for data visualization
- **Animations**: Framer Motion for smooth interactions
- **Real-time**: Socket.io client for live updates

## 🔗 API Integration

### Frontend API Calls
```typescript
// lib/api.ts
export const api = {
  auth: {
    login: (credentials: LoginData) => post('/auth/login', credentials),
    register: (userData: RegisterData) => post('/auth/register', userData),
    refresh: () => post('/auth/refresh')
  },
  games: {
    getAll: () => get('/games'),
    play: (gameId: string, betData: BetData) => post(`/games/${gameId}/play`, betData)
  },
  user: {
    getProfile: () => get('/users/profile'),
    updateProfile: (data: ProfileData) => put('/users/profile', data),
    getBalance: () => get('/users/balance')
  }
}
```

### WebSocket Integration
```typescript
// hooks/useSocket.ts
export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  
  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_WS_URL);
    setSocket(newSocket);
    
    return () => newSocket.close();
  }, []);
  
  return socket;
};
```

## 📱 Frontend Pages & Components

### Main Pages
- **Landing Page**: Hero section, features, testimonials
- **Dashboard**: User stats, recent games, balance
- **Games**: Game lobby, individual game pages
- **Contests**: Tournament listings, leaderboards
- **Profile**: User settings, transaction history
- **Admin Panel**: User management, game configuration

### Key Components
```typescript
// Dashboard Components
- UserStats: Balance, wins, losses
- RecentGames: Game history with results
- QuickActions: Deposit, withdraw, play
- Notifications: Real-time alerts

// Game Components
- GameLobby: Available games grid
- GameRoom: Live game interface
- BettingPanel: Bet placement controls
- GameHistory: Past game results

// Contest Components
- ContestList: Active tournaments
- Leaderboard: Real-time rankings
- ContestDetails: Rules and prizes
```

## 🎮 Game Types & Features

### Available Games
- **Slots**: Various themed slot machines
- **Blackjack**: Classic card game with live dealer
- **Roulette**: European and American variants
- **Poker**: Texas Hold'em tournaments
- **Dice**: Crypto dice with provably fair
- **Crash**: Multiplier crash game
- **Sports Betting**: Live odds and betting

### Contest System
- **Daily Tournaments**: Regular competitions
- **Leaderboard Contests**: Ranking-based rewards
- **Special Events**: Seasonal tournaments
- **Prize Pools**: Guaranteed prize distributions

## 🛡️ Security Implementation

### Frontend Security
- **Input Validation**: Zod schema validation
- **XSS Protection**: Content sanitization
- **CSRF Protection**: Token-based protection
- **Secure Headers**: Next.js security headers

### Backend Security
- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**: Request throttling
- **Input Sanitization**: SQL injection prevention
- **Audit Logging**: Complete activity tracking

## 🧪 Testing Strategy

### Frontend Testing
```bash
cd web

# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Type checking
npm run type-check

# Linting
npm run lint
```

### Backend Testing
```bash
cd backend

# Unit tests
npm test

# Integration tests
npm run test:integration

# Coverage
npm run test:coverage
```

## 🚀 Deployment

### Development
```bash
# Start all services
npm run dev:all

# Frontend only
cd web && npm run dev

# Backend only
cd backend && npm run dev
```

### Production Build
```bash
# Frontend build
cd web
npm run build
npm start

# Backend production
cd backend
npm run build
npm start
```

### Docker Deployment
```yaml
# docker-compose.yml
version: '3.8'
services:
  frontend:
    build: ./web
    ports:
      - "3000:3000"
  
  backend:
    build: ./backend
    ports:
      - "5000:5000"
  
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: gambling_db
  
  redis:
    image: redis:7-alpine
```

## 📊 Monitoring & Analytics

### Frontend Analytics
- **User Behavior**: Page views, interactions
- **Performance**: Core Web Vitals, load times
- **Conversion**: Signup, deposit rates
- **Error Tracking**: Client-side error monitoring

### Backend Monitoring
- **API Performance**: Response times, error rates
- **Database**: Query performance, connections
- **Security**: Failed auth attempts, rate limiting
- **Business Metrics**: Revenue, active users

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Follow code style guidelines
4. Add tests for new features
5. Commit changes (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Create Pull Request

### Code Style
- **Frontend**: ESLint + Prettier + TypeScript strict mode
- **Backend**: ESLint + Prettier + JSDoc comments
- **Commits**: Conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚖️ Legal Compliance

**Important**: This is gambling software. Before deployment:
- ✅ Verify local gambling laws and regulations
- ✅ Obtain necessary licenses and permits
- ✅ Implement responsible gambling features
- ✅ Ensure age verification systems
- ✅ Set up player protection measures

## 🆘 Support & Documentation

- **Issues**: [GitHub Issues](https://github.com/yourusername/gambling-platform/issues)
- **Documentation**: [Wiki](https://github.com/yourusername/gambling-platform/wiki)
- **API Docs**: [Swagger/OpenAPI](http://localhost:5000/api-docs)
- **Discord**: [Community Server](https://discord.gg/your-server)

## 🔗 Related Repositories

- [Mobile App (React Native)](https://github.com/yourusername/gambling-platform-mobile)
- [Admin Dashboard](https://github.com/yourusername/gambling-platform-admin)
- [Game Engine](https://github.com/yourusername/gambling-game-engine)

---

**🎯 Built with modern technologies for scalability, security, and exceptional user experience.**

**⚠️ Gambling Notice**: Please gamble responsibly and ensure compliance with local laws.
