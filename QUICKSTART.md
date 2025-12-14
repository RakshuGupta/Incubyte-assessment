# Quick Start Guide

Get the Sweet Shop Management System running in 5 minutes!

## Prerequisites

- Node.js 18+
- npm or yarn
- **No database server needed!** (Uses SQLite)

## Steps

### 1. Database Setup (0 minutes!)

**No setup needed!** SQLite database is automatically created when the server starts.

### 2. Backend Setup (2 minutes)

```bash
cd backend
npm install
# .env file is optional - defaults work fine
npm run seed      # Add sample data (optional but recommended)
npm run dev       # Start server (database auto-creates)
```

### 3. Frontend Setup (1 minute)

```bash
# In a new terminal
cd frontend
npm install
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

### 5. Login

If you ran the seed script:
- **Email**: admin@sweetshop.com
- **Password**: admin123

Or register a new account through the UI!

## Troubleshooting

**Database connection error?**
- Delete `backend/sweet_shop.db` and restart the server
- Check file permissions in the backend directory

**Port already in use?**
- Change PORT in `backend/.env`
- Update proxy in `frontend/vite.config.ts`

**Module not found?**
- Delete `node_modules` and run `npm install` again

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [SETUP.md](SETUP.md) for detailed setup instructions
- Review [TEST_REPORT.md](TEST_REPORT.md) for test information

Happy coding! 🍬

