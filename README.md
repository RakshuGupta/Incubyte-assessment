# Sweet Shop Management System

A full-stack web application for managing a sweet shop inventory, built with modern technologies following Test-Driven Development (TDD) principles.

## 🎯 Project Overview

This application provides a complete solution for managing a sweet shop, including:
- User authentication and authorization (JWT-based)
- CRUD operations for sweets inventory
- Search and filter functionality
- Purchase and restock operations
- Admin panel for inventory management
- Responsive and modern UI

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: SQLite (sqlite3) - No build tools required!
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Jest with Supertest
- **Validation**: express-validator

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS3 with modern design patterns

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn package manager
- Git

**Note**: This project uses SQLite, so no separate database server installation is required!

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd sweet-shop-management
```

### 2. Database Setup

The database is automatically initialized when the server starts! SQLite creates a database file (`sweet_shop.db`) in the backend directory. No manual setup required.

If you need to reinitialize the database, simply delete the `sweet_shop.db` file and restart the server.

### 3. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

**Note:** SQLite3 has prebuilt binaries for Windows - no build tools required!

3. Create a `.env` file in the `backend` directory (optional):
```bash
# Create .env file manually or copy from example
```

4. Update the `.env` file (optional - defaults work fine):
```env
# SQLite Database (optional - defaults to ./sweet_shop.db)
DB_PATH=./sweet_shop.db

JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h

PORT=3001
NODE_ENV=development
```

5. (Optional) Seed the database with sample data:
```bash
npm run seed
```
This creates an admin user (admin@sweetshop.com / admin123) and sample sweets.

6. Build the TypeScript code:
```bash
npm run build
```

7. Run the backend server:
```bash
# Development mode (with hot reload)
npm run dev

# Production mode
npm start
```

The backend API will be available at `http://localhost:3001`

### 4. Frontend Setup

1. Navigate to the frontend directory (in a new terminal):
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional, defaults to localhost:3001):
```env
VITE_API_URL=http://localhost:3001/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 🧪 Running Tests

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in CI mode
npm run test:ci
```

### Frontend Tests

```bash
cd frontend

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Body: {
  "username": "string",
  "email": "string",
  "password": "string"
}
```

#### Login
```
POST /api/auth/login
Body: {
  "email": "string",
  "password": "string"
}
```

### Sweets Endpoints (Protected - Requires JWT Token)

#### Get All Sweets
```
GET /api/sweets
Headers: Authorization: Bearer <token>
```

#### Search Sweets
```
GET /api/sweets/search?name=chocolate&category=Chocolate&minPrice=1&maxPrice=10
Headers: Authorization: Bearer <token>
```

#### Create Sweet (Admin Only)
```
POST /api/sweets
Headers: Authorization: Bearer <token>
Body: {
  "name": "string",
  "category": "string",
  "price": number,
  "quantity": number
}
```

#### Update Sweet (Admin Only)
```
PUT /api/sweets/:id
Headers: Authorization: Bearer <token>
Body: {
  "name": "string" (optional),
  "category": "string" (optional),
  "price": number (optional),
  "quantity": number (optional)
}
```

#### Delete Sweet (Admin Only)
```
DELETE /api/sweets/:id
Headers: Authorization: Bearer <token>
```

#### Purchase Sweet
```
POST /api/sweets/:id/purchase
Headers: Authorization: Bearer <token>
Body: {
  "quantity": number
}
```

#### Restock Sweet (Admin Only)
```
POST /api/sweets/:id/restock
Headers: Authorization: Bearer <token>
Body: {
  "quantity": number
}
```

## 🎨 Features

### User Features
- ✅ User registration and login
- ✅ Browse all available sweets
- ✅ Search sweets by name, category, and price range
- ✅ Purchase sweets (decreases inventory)
- ✅ View stock availability
- ✅ Responsive design for mobile and desktop

### Admin Features
- ✅ All user features
- ✅ Add new sweets to inventory
- ✅ Edit existing sweets
- ✅ Delete sweets
- ✅ Restock inventory
- ✅ Admin-only access control

## 📸 Screenshots

### Login Page
![Login Page](screenshots/login.png)

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Admin Panel
![Admin Panel](screenshots/admin.png)

*Note: Screenshots should be added to the `screenshots/` directory*

## 🏗️ Project Structure

```
sweet-shop-management/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   └── database.sql
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   └── sweet.controller.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   └── sweet.routes.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   └── sweet.service.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   └── jwt.ts
│   │   ├── validators/
│   │   │   ├── auth.validator.ts
│   │   │   └── sweet.validator.ts
│   │   ├── __tests__/
│   │   │   └── integration/
│   │   └── server.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── jest.config.js
├── frontend/
│   ├── src/
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── AdminPanel.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── .gitignore
└── README.md
```

## 🔒 Security Features

- Password hashing using bcrypt
- JWT token-based authentication
- Protected routes with middleware
- Role-based access control (Admin/User)
- Input validation and sanitization
- SQL injection prevention (parameterized queries)

## 🧪 Test Coverage

The project follows TDD principles with comprehensive test coverage:

- **Backend**: Unit tests for services, integration tests for API endpoints
- **Frontend**: Component tests and integration tests

Run `npm run test:coverage` in both backend and frontend directories to view coverage reports.

## 🤖 My AI Usage

### AI Tools Used

During the development of this project, I utilized the following AI tools:

1. **Cursor AI (Auto)** - Primary AI coding assistant
2. **GitHub Copilot** - For code suggestions and completions

### How AI Was Used

#### 1. **Project Structure and Architecture**
- Used Cursor AI to brainstorm the overall project structure and architecture
- Asked for recommendations on folder organization and separation of concerns
- Got suggestions on best practices for Express.js and React applications

#### 2. **Code Generation**
- Used AI to generate boilerplate code for:
  - Express route handlers and controllers
  - React component structures
  - TypeScript type definitions
  - Database schema design
  - API service layer implementations

#### 3. **Test Writing**
- Leveraged AI to generate comprehensive test cases following TDD principles
- Used AI to create test fixtures and mock data
- Got suggestions on test coverage and edge cases

#### 4. **Debugging and Problem Solving**
- Used AI to identify and fix bugs in:
  - Authentication flow
  - Database query issues
  - React state management problems
  - API endpoint errors

#### 5. **Code Review and Refactoring**
- Asked AI to review code for:
  - SOLID principles adherence
  - Code readability and maintainability
  - Performance optimizations
  - Security best practices

#### 6. **Documentation**
- Used AI to help structure the README file
- Got suggestions on API documentation format
- Used AI to generate clear commit messages

### Reflection on AI Impact

**Positive Impacts:**
1. **Speed**: AI significantly accelerated development by generating boilerplate code and suggesting implementations
2. **Learning**: AI explanations helped me understand best practices and patterns I wasn't familiar with
3. **Quality**: AI suggestions helped catch potential bugs and security issues early
4. **Consistency**: AI helped maintain consistent coding style and patterns throughout the project

**Challenges and Learning:**
1. **Critical Thinking**: I learned to always review and understand AI-generated code rather than blindly accepting it
2. **Customization**: AI suggestions often needed customization to fit the specific requirements
3. **Testing**: AI-generated code still required thorough testing and validation
4. **Ownership**: I ensured I understood every piece of code, even if AI helped generate it

**Responsible Usage:**
- I reviewed all AI-generated code before committing
- I tested all AI-suggested implementations thoroughly
- I customized AI suggestions to match project requirements
- I maintained full understanding of the codebase

**Conclusion:**
AI tools were invaluable in accelerating development and improving code quality. However, they served as assistants rather than replacements for critical thinking, testing, and understanding. The final codebase represents a collaboration between AI assistance and human oversight, ensuring both efficiency and quality.

## 📝 Commit History

This project follows a clear commit history demonstrating TDD principles:
- Red phase: Writing failing tests
- Green phase: Implementing minimal code to pass tests
- Refactor phase: Improving code while maintaining tests

Each commit includes clear messages describing the changes and, where applicable, AI co-authorship.

## 🚀 Deployment

### Backend Deployment

The backend can be deployed to platforms like:
- Heroku
- AWS (EC2, Elastic Beanstalk)
- Railway
- Render

Ensure environment variables are set in your deployment platform.

### Frontend Deployment

The frontend can be deployed to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

Update the `VITE_API_URL` environment variable to point to your deployed backend.

## 🔧 Troubleshooting

If you encounter issues:

1. **Registration/Login fails**: 
   - Ensure backend server is running on port 3001
   - Check browser console (F12) for detailed error messages
   - Verify database file exists: `backend/sweet_shop.db`
   - See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed help

2. **Can't connect to server**:
   - Verify backend is running: http://localhost:3001/health
   - Check CORS settings in `backend/src/server.ts`
   - Ensure frontend proxy is configured in `frontend/vite.config.ts`

3. **Database errors**:
   - Delete `backend/sweet_shop.db` and restart server
   - Database will be automatically recreated

For more help, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md) or [CHECK_SETUP.md](CHECK_SETUP.md)

## 🤝 Contributing

This is a kata project, but if you'd like to contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes following TDD principles
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

This project is created for educational purposes as part of a TDD kata assignment.

## 👤 Author

[Your Name]

## 🙏 Acknowledgments

- Express.js community
- React team
- PostgreSQL community
- All open-source contributors whose packages made this project possible

---

**Note**: This project was developed as a TDD kata to demonstrate full-stack development skills, test-driven development practices, and modern development workflows including AI tool usage.

