# Quick Setup Guide

## Prerequisites Check

```bash
node --version  # Should be v18+
npm --version
# No database server needed - SQLite is included!
```

## Step-by-Step Setup

### 1. Database Setup

**No setup needed!** SQLite database is automatically created when you start the server. The database file (`sweet_shop.db`) will be created in the `backend` directory.

### 2. Backend Setup

```bash
cd backend
npm install
# .env file is optional - defaults work fine
npm run build
npm run dev
# Database will be auto-created on first run
```

### 3. Frontend Setup (New Terminal)

```bash
cd frontend
npm install
npm run dev
```

### 4. Access Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Health Check: http://localhost:3001/health

### 5. Seed Database (Optional but Recommended)

Seed the database with sample data including an admin user:
```bash
cd backend
npm run seed
```

This creates:
- Admin user: admin@sweetshop.com / admin123
- Sample sweets for testing

Alternatively, you can create an admin user manually:
```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

## Troubleshooting

### Database Connection Issues
- Check PostgreSQL is running: `pg_isready`
- Verify credentials in `.env`
- Check database exists: `psql -l | grep sweet_shop`

### Port Already in Use
- Change PORT in backend `.env`
- Update frontend proxy in `vite.config.ts`

### Module Not Found
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

