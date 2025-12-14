# Windows Installation Guide for better-sqlite3

`better-sqlite3` requires native compilation on Windows. Here are the options:

## Option 1: Install Windows Build Tools (Recommended)

1. **Install Visual Studio Build Tools:**
   - Download from: https://visualstudio.microsoft.com/downloads/
   - Select "Build Tools for Visual Studio"
   - During installation, select "Desktop development with C++" workload
   - This includes the C++ compiler needed for native modules

2. **After installing Build Tools, run:**
   ```bash
   cd backend
   npm install
   ```

## Option 2: Use Pre-built Binaries (Easier)

Try installing with the `--build-from-source=false` flag to use pre-built binaries:

```bash
cd backend
npm install better-sqlite3 --build-from-source=false
```

If that doesn't work, try:

```bash
npm install better-sqlite3 --target_arch=x64 --target_platform=win32
```

## Option 3: Use Alternative SQLite Package

If you continue having issues, we can switch to `sqlite3` which has better Windows support:

```bash
npm uninstall better-sqlite3
npm install sqlite3
```

Then we'll need to update the database.ts file to use sqlite3's async API instead.

## Quick Fix: Try This First

1. Open PowerShell as Administrator
2. Run:
   ```powershell
   npm install -g windows-build-tools
   ```
3. Then in the backend directory:
   ```bash
   npm install
   ```

## Verify Installation

After installation, verify it works:

```bash
cd backend
npm run build
```

If you see no errors, the installation was successful!

