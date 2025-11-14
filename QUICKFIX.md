# ⚡ QUICK FIX: "Failed to List" Error

## 🔴 Problem
Your marketplace shows **"failed to list"** error when deployed to production (Vercel/Netlify).

## ✅ Solution (5 minutes)

### Step 1: Get Your Supabase Credentials

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Click **Settings** (⚙️) → **API**
4. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

---

### Step 2: Add to Vercel

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Click **Settings** → **Environment Variables**
4. Add **TWO** new variables:

   **Variable #1:**
   ```
   Name: NEXT_PUBLIC_SUPABASE_URL
   Value: https://xxxxx.supabase.co  (paste your URL here)
   Environments: ✓ Production ✓ Preview ✓ Development
   ```

   **Variable #2:**
   ```
   Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: eyJxxxxx...  (paste your anon key here)
   Environments: ✓ Production ✓ Preview ✓ Development
   ```

5. Click **Save**

---

### Step 3: Redeploy

1. Go to **Deployments** tab
2. Click **⋯** (three dots) on latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

---

### Step 4: Verify

1. Visit your production URL
2. Open browser console (F12)
3. Look for green status indicator in bottom-right
4. Try creating a listing at `/sell`
5. Check it appears at `/marketplace`

✅ **It should work now!**

---

## 🔍 Still Not Working?

### Check #1: Environment Variables
- Names must be **exact**: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Both must have the `NEXT_PUBLIC_` prefix
- Must be applied to **all environments** (Production, Preview, Development)

### Check #2: Supabase Database
Run this SQL in Supabase SQL Editor:

```sql
-- Check if tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('listings', 'favorites');
```

If no results, run the full schema from `supabase-schema.sql`.

### Check #3: Browser Console
1. Open your production site
2. Press F12 (or Cmd+Option+I on Mac)
3. Look for errors in the Console tab
4. Look for the Supabase status indicator (bottom-right)
   - 🟢 Green = Working
   - 🔴 Red = Configuration issue

### Check #4: Supabase Logs
1. Go to Supabase Dashboard
2. Click **Logs** in sidebar
3. Check for any errors when you visit `/marketplace`

---

## 📞 Need More Help?

1. Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions
2. Check [DATABASE_SETUP.md](./DATABASE_SETUP.md) for database setup
3. Open browser console and look for specific error messages
4. Check Supabase Dashboard → Logs for database errors

---

## 🎯 Checklist

- [ ] Got Supabase URL from dashboard
- [ ] Got Supabase anon key from dashboard
- [ ] Added `NEXT_PUBLIC_SUPABASE_URL` to Vercel
- [ ] Added `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Vercel
- [ ] Both variables applied to all environments
- [ ] Redeployed the application
- [ ] Visited production URL
- [ ] Checked browser console (no errors)
- [ ] See green status indicator
- [ ] Can create and view listings

---

**Still stuck?** Look for the red/green status indicator in the bottom-right corner of your site. It will tell you exactly what's wrong!
