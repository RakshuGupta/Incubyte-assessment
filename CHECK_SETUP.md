# Quick Setup Verification

Follow these steps to ensure everything is working:

## Step 1: Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (new terminal)
cd frontend
npm install
```

## Step 2: Start Backend Server

```bash
cd backend
npm run dev
```

**Expected output:**
```
Database initialized successfully
Server is running on port 3001
Health check: http://localhost:3001/health
API base URL: http://localhost:3001/api
```

If you see errors, check:
- Node.js version (should be 18+): `node --version`
- All dependencies installed: `npm list --depth=0`

## Step 3: Verify Backend is Running

Open in browser: http://localhost:3001/health

Should see: `{"status":"ok","message":"Sweet Shop API is running"}`

## Step 4: Start Frontend

```bash
cd frontend
npm run dev
```

**Expected output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

## Step 5: Test Registration

1. Open http://localhost:3000
2. Click "Register here" or go to http://localhost:3000/register
3. Fill in the form:
   - Username: (min 3 characters)
   - Email: (valid email)
   - Password: (min 6 characters)
4. Click Register

**If registration fails:**
- Check browser console (F12) for errors
- Check backend console for errors
- Verify backend is running on port 3001
- Check that `sweet_shop.db` file exists in `backend/` directory

## Step 6: Test Login

1. After successful registration, you'll be redirected to dashboard
2. Or go to http://localhost:3000/login
3. Use your registered email and password

## Common Issues

### Backend won't start
- Check if port 3001 is already in use
- Delete `sweet_shop.db` and try again
- Check for TypeScript errors: `cd backend && npm run build`

### Frontend can't connect
- Verify backend is running
- Check browser console for CORS errors
- Verify API URL in `frontend/src/services/api.ts`

### Database errors
- Delete `backend/sweet_shop.db`
- Restart backend server
- Check file permissions

## Need Help?

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed troubleshooting steps.

