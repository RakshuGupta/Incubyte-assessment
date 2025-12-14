# Fix Backend Errors

## Current Issues

1. **better-sqlite3 not installed** - Requires native compilation on Windows
2. **JWT type error** - Fixed in latest update

## Quick Fix Steps

### Step 1: Install better-sqlite3

**Option A: Try prebuilt binaries (Easiest)**
```bash
cd backend
npm install better-sqlite3 --build-from-source=false
```

**Option B: Install Windows Build Tools (If Option A fails)**

1. Download Visual Studio Build Tools:
   - Go to: https://visualstudio.microsoft.com/downloads/
   - Download "Build Tools for Visual Studio"
   - Run installer
   - Select "Desktop development with C++" workload
   - Install

2. After installation, run:
   ```bash
   cd backend
   npm install
   ```

**Option C: Use PowerShell script**
```powershell
cd backend
.\install-sqlite.ps1
```

### Step 2: Verify Installation

```bash
cd backend
npm run build
```

If you see no errors, you're good to go!

### Step 3: Start the Server

```bash
npm run dev
```

You should see:
```
Initializing database at: [path]
Database initialized successfully
Server is running on port 3001
```

## If Installation Still Fails

If you continue having issues with `better-sqlite3`, we can switch to an alternative. Let me know and I'll update the code to use a different SQLite package that works better on Windows without build tools.

## Common Errors

**Error: Cannot find module 'better-sqlite3'**
- Solution: Run `npm install` in the backend directory
- If that fails, install build tools (see Option B above)

**Error: node-gyp rebuild failed**
- Solution: Install Visual Studio Build Tools with C++ workload

**Error: JWT type error**
- Solution: Already fixed in the latest code update

## Need Help?

1. Check [INSTALL_WINDOWS.md](INSTALL_WINDOWS.md) for detailed Windows installation guide
2. Check [TROUBLESHOOTING.md](../TROUBLESHOOTING.md) for general troubleshooting
3. Make sure Node.js version is 18+ (`node --version`)

