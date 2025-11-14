# ✅ Production Deployment Checklist

Use this checklist to ensure your marketplace is properly configured for production.

---

## 🎯 Pre-Deployment

### Supabase Setup
- [ ] **Supabase project created**
  - Go to: https://supabase.com/dashboard
  - Click "New Project"
  - Wait for project to be ready

- [ ] **Database tables created**
  - Open SQL Editor in Supabase
  - Run contents of `supabase-schema.sql`
  - Verify tables in Table Editor:
    - ✓ `listings` table exists
    - ✓ `favorites` table exists

- [ ] **RLS Policies enabled**
  - Tables should show 🔒 lock icon
  - Policies should be listed under each table

- [ ] **API Keys obtained**
  - Settings → API
  - ✓ Project URL copied
  - ✓ anon/public key copied
  - ❌ Do NOT use service_role key

---

## 🚀 Deployment (Vercel)

### Environment Variables
- [ ] **Navigate to project settings**
  - Dashboard → Your Project → Settings → Environment Variables

- [ ] **Add NEXT_PUBLIC_SUPABASE_URL**
  - Name: `NEXT_PUBLIC_SUPABASE_URL`
  - Value: `https://xxxxx.supabase.co`
  - Environments: ✓ Production ✓ Preview ✓ Development

- [ ] **Add NEXT_PUBLIC_SUPABASE_ANON_KEY**
  - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - Value: `eyJxxxxx...`
  - Environments: ✓ Production ✓ Preview ✓ Development

- [ ] **Saved both variables**
  - Click "Save" after each variable

### Deployment
- [ ] **Trigger redeploy**
  - Deployments tab → Latest deployment → ⋯ → Redeploy
  - Or: Make a new commit and push to trigger auto-deploy

- [ ] **Wait for build to complete**
  - Status should show "Ready"
  - Check build logs for any errors

---

## ✅ Post-Deployment Verification

### Visit Your Site
- [ ] **Open production URL**
  - Example: `your-app.vercel.app`

- [ ] **Check browser console**
  - Press F12 (or Cmd+Option+I on Mac)
  - Console tab should show:
    - ✅ No red errors
    - ✅ No "SUPABASE CONFIGURATION ERROR"
    - ✅ No "failed to list" messages

- [ ] **Check status indicator**
  - Look in bottom-right corner
  - Should see:
    - 🟢 Green indicator = Everything working
    - 🔴 Red indicator = Configuration issue

### Test Core Functionality
- [ ] **Browse marketplace**
  - Visit `/marketplace`
  - Should load without errors
  - Either shows listings or "No racket listings yet"

- [ ] **Create a test listing**
  - Visit `/sell`
  - Fill out form with test data
  - Upload 3+ images
  - Submit listing
  - Should show success message

- [ ] **View your listing**
  - Go back to `/marketplace`
  - Your test listing should appear
  - Click to view details
  - All information should display correctly

- [ ] **Test in incognito/private window**
  - Open new incognito window
  - Visit your production URL
  - Listing should still be visible
  - This confirms real database persistence

### Test Advanced Features
- [ ] **Favorites system**
  - Click heart icon on a listing
  - Visit `/marketplace/favorites`
  - Favorited item should appear

- [ ] **My Listings page**
  - Visit `/marketplace/my-listings`
  - Your listings should appear
  - Edit button works
  - Delete button works

- [ ] **Contact seller**
  - Click on a listing
  - Click "Contact Seller"
  - Email client should open with pre-filled message

---

## 🐛 Troubleshooting

### Red Status Indicator
**Issue:** Red indicator in bottom-right corner

**Check:**
1. Environment variables are set correctly in Vercel
2. Variable names are exact (including `NEXT_PUBLIC_` prefix)
3. You've redeployed after adding variables
4. Hard refresh page (Ctrl+Shift+R or Cmd+Shift+R)

### "Failed to list" Error
**Issue:** Console shows "failed to list" or similar database error

**Check:**
1. Database tables were created (`supabase-schema.sql`)
2. Supabase project is not paused (free tier pauses after inactivity)
3. API keys are correct and not expired
4. RLS policies are properly configured

### No Listings Appear
**Issue:** Marketplace shows "No listings yet" even after creating one

**Check:**
1. Listing was actually created (check Supabase Table Editor)
2. `is_active` is set to `true` on the listing
3. No JavaScript errors in console
4. Real-time subscription is working (create listing in one tab, should appear in other tab)

### Environment Variables Not Working
**Issue:** Added env vars but still seeing errors

**Check:**
1. Variable names are **exactly**: 
   - `NEXT_PUBLIC_SUPABASE_URL` (not `SUPABASE_URL`)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (not `SUPABASE_KEY`)
2. Applied to **all** environments (Production, Preview, Development)
3. **Redeployed** after adding variables (this is required!)
4. No typos in the variable values
5. Using **anon** key, not service_role key

---

## 📊 Success Criteria

Your deployment is successful when:

- ✅ No errors in browser console
- ✅ Green status indicator in bottom-right
- ✅ Can browse `/marketplace` without errors
- ✅ Can create listings via `/sell`
- ✅ Listings persist and are visible to all users
- ✅ Can favorite listings
- ✅ Can edit/delete own listings in `/marketplace/my-listings`
- ✅ Real-time updates work (create in one tab, appears in another)

---

## 🔒 Security Checklist

- [ ] **Using correct keys**
  - ✓ Using `anon` key (safe for frontend)
  - ❌ NOT using `service_role` key (dangerous!)

- [ ] **RLS Enabled**
  - Row Level Security is ON for all tables
  - Policies control who can view/edit what

- [ ] **Environment variables secure**
  - Not committed to Git (.env.local is gitignored)
  - Set in platform dashboard only

- [ ] **.gitignore configured**
  - `.env*` is in .gitignore
  - No sensitive data in repository

---

## 📈 Performance Checklist

- [ ] **Images optimized**
  - Consider using Supabase Storage instead of base64 for large apps
  - Images are reasonably sized (< 5MB each)

- [ ] **Database indexed**
  - Schema includes indexes on commonly queried fields
  - Queries use indexed columns

- [ ] **Real-time subscriptions**
  - Only subscribed on pages that need updates
  - Cleaned up on component unmount

---

## 🎉 All Done!

If all items are checked, your marketplace is fully deployed and ready for users!

**Next Steps:**
1. Share your marketplace URL with friends
2. Collect feedback
3. Monitor Supabase usage (free tier limits)
4. Consider adding features from the roadmap

---

## 📞 Support Resources

- **Quick Fix:** [QUICKFIX.md](./QUICKFIX.md)
- **Deployment Guide:** [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Database Setup:** [DATABASE_SETUP.md](./DATABASE_SETUP.md)
- **Supabase Setup:** [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
- **Project README:** [README.md](./README.md)

---

**Remember:** The status indicator (bottom-right corner) is your friend! 
- 🟢 = Happy deploying! 
- 🔴 = Check the console logs
