# Troubleshooting Guide

## Registration/Login Errors

### "Failed to register" or "Failed to login"

1. **Check if backend server is running**
   ```bash
   cd backend
   npm run dev
   ```
   You should see: `Server is running on port 3001`

2. **Check backend health**
   Open http://localhost:3001/health in your browser
   Should return: `{"status":"ok","message":"Sweet Shop API is running"}`

3. **Check database file exists**
   ```bash
   ls backend/sweet_shop.db
   ```
   If it doesn't exist, the database will be created on first server start.

4. **Check console for errors**
   - Backend console should show: "Database initialized successfully"
   - Frontend browser console (F12) will show detailed error messages

### "Unable to connect to server"

1. **Verify backend is running on port 3001**
   ```bash
   # Check if port is in use
   netstat -ano | findstr :3001  # Windows
   lsof -i :3001                 # Mac/Linux
   ```

2. **Check CORS settings**
   - Backend should have `app.use(cors())` in server.ts
   - Frontend should be running on port 3000

3. **Check API URL**
   - Frontend uses: `http://localhost:3001/api`
   - Can be changed in `frontend/.env` with `VITE_API_URL`

### Database Errors

1. **Delete and recreate database**
   ```bash
   cd backend
   rm sweet_shop.db  # or delete manually
   npm run dev       # Database will be recreated
   ```

2. **Check file permissions**
   - Ensure backend directory is writable
   - SQLite needs write permissions to create .db file

### Common Issues

**Port already in use:**
```bash
# Change port in backend/.env
PORT=3002
# Update frontend vite.config.ts proxy target
```

**Module not found:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors:**
```bash
cd backend
npm run build
```

## Still Having Issues?

1. Check browser console (F12) for detailed error messages
2. Check backend console for server errors
3. Verify all dependencies are installed:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
4. Try deleting `node_modules` and reinstalling:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

