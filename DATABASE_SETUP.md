# Database Setup Instructions

## ✅ What We've Done

We've migrated your marketplace from localStorage to **Supabase** - a real database that allows all users to see listings created by anyone!

### Changes Made:
1. ✅ Created database schema for listings and favorites tables
2. ✅ Updated sell page to save listings to Supabase
3. ✅ Updated marketplace to fetch listings from Supabase  
4. ✅ Updated my-listings page to manage Supabase data
5. ✅ Added real-time updates (listings appear instantly for everyone)

---

## 🚀 Setup Instructions

Follow these steps to get your database working:

### Step 1: Check Your Supabase Configuration

Make sure you have a `.env.local` file in the `squash-marketplace` directory with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Don't have these?** See SUPABASE_SETUP.md for detailed instructions on creating a Supabase project.

### Step 2: Create the Database Tables

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the entire contents of `supabase-schema.sql` 
6. Paste it into the SQL editor
7. Click **Run** (or press Cmd/Ctrl + Enter)

You should see a success message! ✅

### Step 3: Verify Tables Were Created

1. In your Supabase dashboard, click on **Table Editor**
2. You should see two new tables:
   - `listings` - stores all marketplace items
   - `favorites` - stores user favorites

### Step 4: Test It Out!

1. Start your development server:
   ```bash
   cd squash-marketplace
   npm run dev
   ```

2. Go to http://localhost:3000/sell

3. Create a test listing with:
   - Title, brand, price, condition
   - At least 3 images
   - Description

4. Submit the listing

5. Go to http://localhost:3000/marketplace

6. **Your listing should appear!** 🎉

7. Open the marketplace in a **different browser or incognito window** - the listing should be visible there too!

---

## 🔍 Troubleshooting

### Issue: "Failed to create listing"

**Solution:** Check that:
1. Your Supabase credentials in `.env.local` are correct
2. You've run the SQL schema to create the tables
3. You've restarted your dev server after adding the `.env.local` file

### Issue: "No listings appear"

**Solution:**
1. Open browser console (F12) and check for errors
2. Go to Supabase Dashboard → Table Editor → listings
3. Verify that listings exist in the database
4. Check that `is_active` is set to `true`

### Issue: RLS (Row Level Security) errors

**Solution:** The schema includes policies that allow:
- Anyone can view active listings
- Anyone can create listings (you can restrict this later)
- Users can update/delete their own listings

If you get RLS errors, you may need to temporarily disable RLS for testing:
```sql
ALTER TABLE listings DISABLE ROW LEVEL SECURITY;
```

---

## 🎯 What's Next?

Now that your database is set up, listings are **shared across all users**! Here's what works:

### ✅ Working Features:
- **Create listings** - Anyone can list items
- **View listings** - Everyone sees all active listings
- **Edit listings** - Via My Listings page
- **Delete listings** - Via My Listings page
- **Real-time updates** - New listings appear automatically
- **Search & filters** - By type, condition, price, etc.
- **Favorites** - Still using localStorage (can migrate later)

### 🔮 Future Enhancements:
- Authenticate users to track who created what
- Add image storage (currently using base64)
- Migrate favorites to Supabase
- Add user profiles
- Add messaging between buyers/sellers
- Add payment integration
- Add item reviews/ratings

---

## 📊 Database Schema

### Listings Table

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key (auto-generated) |
| created_at | timestamp | When listing was created |
| title | text | Item title |
| brand | text | Brand name |
| price | numeric | Price in USD |
| condition | text | New, Like New, Good, Fair |
| type | text | squash, tennis, padel |
| description | text | Item description |
| seller_email | text | Seller's email |
| seller_name | text | Seller's name |
| images | jsonb | Array of image URLs/base64 |
| specifications | jsonb | Item specs (weight, etc) |
| location | text | Seller location |
| rating | numeric | Seller rating (0-5) |
| is_active | boolean | Is listing active? |
| is_sold | boolean | Has item been sold? |

### Favorites Table

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key (auto-generated) |
| created_at | timestamp | When favorited |
| user_email | text | User who favorited |
| listing_id | uuid | Reference to listing |

---

## 🔐 Security Notes

- **Row Level Security (RLS)** is enabled on both tables
- Anyone can view active listings
- Anyone can create listings (restrict this later with auth)
- Only listing owners can edit/delete their listings
- Policies use JWT claims for user identification

---

## 📝 Important Files Changed

- `src/app/sell/page.tsx` - Now saves to Supabase
- `src/app/marketplace/page.tsx` - Now fetches from Supabase with real-time updates
- `src/app/marketplace/my-listings/page.tsx` - Now manages Supabase data
- `supabase-schema.sql` - Database schema (run this in Supabase SQL Editor)

---

## 🆘 Need Help?

If you run into issues:
1. Check the browser console for errors
2. Check Supabase logs in Dashboard → Logs
3. Verify your `.env.local` file is correct
4. Make sure you've run the SQL schema
5. Restart your dev server

---

## 🎉 Success!

Once set up, your marketplace is fully functional with a real database! All users can now see each other's listings, and changes are synced in real-time.

Happy selling! 🚀

