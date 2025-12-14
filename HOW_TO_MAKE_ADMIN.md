# How to Make a User an Admin

If you need to make your user account an admin to add sweets, you have a few options:

## Option 1: Use the Seed Script (Easiest)

The seed script creates an admin user automatically:

```bash
cd backend
npm run seed
```

This creates:
- **Email**: admin@sweetshop.com
- **Password**: admin123
- **Role**: admin

You can then login with these credentials to access the admin panel.

## Option 2: Update Existing User in Database

If you want to make your current user (22bcs16929) an admin:

1. **Using SQLite command line:**
   ```bash
   cd backend
   sqlite3 sweet_shop.db
   ```
   
2. **Then run:**
   ```sql
   UPDATE users SET role = 'admin' WHERE username = '22bcs16929';
   -- Or by email:
   UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
   ```
   
3. **Exit SQLite:**
   ```sql
   .exit
   ```

4. **Logout and login again** in the frontend to refresh your session.

## Option 3: Create Admin User via Database

You can also create a new admin user directly:

```bash
cd backend
sqlite3 sweet_shop.db
```

```sql
-- Note: You'll need to hash the password first using bcrypt
-- For now, use the seed script which handles this automatically
```

## Quick Check

To check if a user is admin:

```bash
cd backend
sqlite3 sweet_shop.db "SELECT username, email, role FROM users;"
```

## After Making Yourself Admin

1. **Logout** from the frontend
2. **Login again** with your credentials
3. You should now see:
   - "Admin Panel" button in the header
   - "+ Add New Sweet" button on the dashboard
   - Access to `/admin` route

## Need Help?

If you're still not seeing admin options:
- Check browser console (F12) for errors
- Verify the user role in database
- Make sure you logged out and logged back in after changing role

