# 🚀 Deployment Guide - Fix "Failed to List" Error

## The Problem

When you deploy your app to production (Vercel, Netlify, etc.), you're seeing **"failed to list"** errors because your production environment doesn't have the Supabase credentials configured.

---

## ✅ Solution: Add Environment Variables to Production

### For Vercel Deployment:

1. **Go to your Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your project

2. **Open Project Settings**
   - Click on **Settings** tab
   - Click on **Environment Variables** in the sidebar

3. **Add Your Supabase Credentials**
   
   Add these two environment variables:
   
   **Variable 1:**
   - **Name:** `NEXT_PUBLIC_SUPABASE_URL`
   - **Value:** `https://your-project-id.supabase.co`
   - **Environment:** Production, Preview, Development (check all)
   
   **Variable 2:**
   - **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value:** Your Supabase anon key (long string starting with `eyJ...`)
   - **Environment:** Production, Preview, Development (check all)

4. **Get Your Supabase Credentials**
   
   If you don't have these values:
   - Go to: https://supabase.com/dashboard
   - Select your project
   - Click **Settings** (gear icon) → **API**
   - Copy:
     - **Project URL** → This is your `NEXT_PUBLIC_SUPABASE_URL`
     - **Project API keys** → **anon/public** key → This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

5. **Redeploy Your App**
   - Go to **Deployments** tab in Vercel
   - Click the **⋯** menu on your latest deployment
   - Click **Redeploy**
   - ✅ Your app should now work!

---

### For Netlify Deployment:

1. **Go to Netlify Dashboard**
   - Visit: https://app.netlify.com
   - Select your site

2. **Open Site Settings**
   - Click **Site settings**
   - Click **Environment variables** in the sidebar

3. **Add Environment Variables**
   - Click **Add a variable** → **Add a single variable**
   - Add:
     - Key: `NEXT_PUBLIC_SUPABASE_URL`
     - Value: `https://your-project-id.supabase.co`
   - Click **Create variable**
   
   - Click **Add a variable** again
   - Add:
     - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - Value: Your Supabase anon key
   - Click **Create variable**

4. **Trigger a Redeploy**
   - Go to **Deploys** tab
   - Click **Trigger deploy** → **Deploy site**
   - ✅ Your app should now work!

---

## 🔍 How to Verify It's Working

After redeploying with environment variables:

1. **Visit your production URL**
2. **Go to the marketplace page**
3. **Open browser console** (F12)
4. **Check for:**
   - ✅ No "Supabase environment variables not found" warnings
   - ✅ Listings should load (or show "No racket listings yet")
   - ❌ No "failed to list" errors

---

## 🗄️ Database Setup (If Not Done Yet)

If you haven't set up your Supabase database:

1. **Go to Supabase Dashboard**
   - https://supabase.com/dashboard
   - Select your project

2. **Run the Database Schema**
   - Click **SQL Editor** in sidebar
   - Click **New Query**
   - Copy the contents of `supabase-schema.sql`
   - Paste and click **Run**

3. **Verify Tables Were Created**
   - Click **Table Editor**
   - You should see:
     - ✅ `listings` table
     - ✅ `favorites` table

---

## 🐛 Troubleshooting

### Still seeing "failed to list"?

1. **Check environment variables are set correctly**
   ```bash
   # In your deployment dashboard, verify:
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co  # Correct format
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxxx...           # Should start with eyJ
   ```

2. **Verify database tables exist**
   - Go to Supabase Dashboard → Table Editor
   - Check that `listings` table exists

3. **Check Row Level Security (RLS) Policies**
   - The `supabase-schema.sql` includes policies that allow anyone to view active listings
   - If you see RLS errors, temporarily disable RLS for testing:
   ```sql
   ALTER TABLE public.listings DISABLE ROW LEVEL SECURITY;
   ```

4. **Check Supabase logs**
   - Supabase Dashboard → Logs
   - Look for any errors when querying listings

5. **Redeploy after making changes**
   - Environment variable changes require a redeploy
   - Clear cache if necessary

---

## 🔐 Security Note

The `NEXT_PUBLIC_` prefix means these variables are exposed to the browser. This is **safe** because:
- They're meant to be public (client-side access)
- Row Level Security (RLS) protects your data
- The anon key has limited permissions
- Never use your `service_role` key in the frontend!

---

## 📋 Quick Checklist

- [ ] Supabase project created
- [ ] Database schema run (`supabase-schema.sql`)
- [ ] Environment variables added to deployment platform
- [ ] Environment variables include `NEXT_PUBLIC_` prefix
- [ ] Supabase URL format: `https://xxxxx.supabase.co`
- [ ] App redeployed after adding variables
- [ ] Marketplace page loads without errors
- [ ] Can create and view listings

---

## 🎉 Success!

Once environment variables are configured and you've redeployed, your marketplace should work perfectly in production!

**Test it:**
1. Visit your production URL
2. Go to `/sell` and create a test listing
3. Go to `/marketplace` and verify it appears
4. ✅ No more "failed to list" errors!

---

## 🆘 Still Having Issues?

Common causes:
1. **Typo in environment variable names** - Must be exact: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. **Forgot to redeploy** - Changes only take effect after redeploying
3. **Wrong Supabase key** - Use the **anon/public** key, not the service role key
4. **Database not set up** - Run `supabase-schema.sql` in Supabase SQL Editor
5. **Caching issues** - Hard refresh (Ctrl+Shift+R) or clear browser cache

If all else fails, check browser console and Supabase logs for specific error messages.

