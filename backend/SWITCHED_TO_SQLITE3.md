# Switched to sqlite3

The backend has been successfully switched from `better-sqlite3` to `sqlite3` for better Windows compatibility.

## What Changed

1. **Package**: Changed from `better-sqlite3` to `sqlite3` + `sqlite` (wrapper)
2. **API**: Updated from synchronous to async/await pattern
3. **Database Connection**: Now uses promise-based API

## Installation

Simply run:

```bash
cd backend
npm install
```

No build tools required! `sqlite3` has prebuilt binaries for Windows.

## What's Different

- All database operations are now async (using `await`)
- Database connection is initialized when server starts
- Uses `sqlite` package which provides a clean promise-based API over `sqlite3`

## Files Updated

- `backend/src/config/database.ts` - Updated to use sqlite3
- `backend/src/services/auth.service.ts` - Updated to async API
- `backend/src/services/sweet.service.ts` - Updated to async API
- `backend/src/config/seed.ts` - Updated to async API
- `backend/src/config/init-db.ts` - Updated to async API
- `backend/src/server.ts` - Waits for database initialization

## Next Steps

1. Install dependencies: `npm install`
2. Start server: `npm run dev`
3. Database will be automatically created and initialized

No more Windows build tool issues! 🎉

