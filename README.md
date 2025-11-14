# 🎾 CourtCycle - Racket Marketplace

A modern, full-stack marketplace for buying and selling squash, tennis, and padel rackets. Built with Next.js, TypeScript, and Supabase.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)

---

## ⚡ Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Get your credentials:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project (or select existing)
3. Settings → API → Copy **Project URL** and **anon public** key

### 3. Set Up Database

1. In Supabase Dashboard, go to **SQL Editor**
2. Run the SQL from `supabase-schema.sql`
3. Verify tables were created in **Table Editor**

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your marketplace!

---

## 🚀 Deploying to Production

### Quick Deploy to Vercel

1. **Push your code to GitHub**

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository

3. **⚠️ CRITICAL: Add Environment Variables**
   - In Vercel: **Settings** → **Environment Variables**
   - Add these two variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
     ```
   - ✅ Apply to: Production, Preview, and Development

4. **Redeploy**
   - Go to **Deployments** → **⋯** → **Redeploy**

5. **Verify It Works**
   - Visit your production URL
   - Check browser console (F12) for any errors
   - Test creating and viewing listings

**🐛 Still seeing "failed to list"?** See [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) for detailed troubleshooting.

---

## 📁 Project Structure

```
squash-marketplace/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── marketplace/        # Browse listings
│   │   ├── sell/              # Create new listings
│   │   └── auth/              # Authentication flows
│   ├── components/            # React components
│   │   ├── Auth/              # Auth-related components
│   │   ├── ui/                # UI components
│   │   └── SupabaseStatus.tsx # Connection status indicator
│   ├── contexts/              # React contexts (Auth, etc.)
│   └── lib/                   # Utilities and configs
│       ├── supabase.ts        # Supabase client
│       └── utils.ts           # Helper functions
├── supabase-schema.sql        # Database schema
├── DATABASE_SETUP.md          # Database setup guide
└── DEPLOYMENT_GUIDE.md        # Production deployment guide
```

---

## ✨ Features

### 🛍️ Marketplace
- Browse listings with real-time updates
- Filter by racket type, condition, and price
- Search by brand or title
- View detailed product information
- Image galleries with navigation
- Favorites system

### 💰 Selling
- Create listings with multiple images
- Base64 image encoding (no storage needed)
- Detailed specifications
- Manage your listings
- Edit and delete functionality

### 🔐 Authentication
- Supabase Auth integration
- Email/password authentication
- Row Level Security (RLS) for data protection

### 📱 Modern UI
- Fully responsive design
- Dark theme
- Smooth animations (Framer Motion)
- Glass-morphism effects
- Mobile-optimized interface

---

## 🗄️ Database Schema

### Listings Table
- **id**: UUID (Primary Key)
- **title**: Racket title
- **brand**: Brand name
- **price**: Price in USD
- **condition**: New, Like New, Good, Fair
- **type**: squash, tennis, padel
- **description**: Product description
- **seller_email**: Seller's email
- **images**: Array of image URLs/base64
- **specifications**: JSON object (weight, head size, etc.)
- **is_active**: Boolean (listing active/inactive)
- **created_at**: Timestamp

### Favorites Table
- **id**: UUID (Primary Key)
- **user_email**: User who favorited
- **listing_id**: Reference to listing
- **created_at**: Timestamp

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Authentication**: [Supabase Auth](https://supabase.com/auth)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🐛 Troubleshooting

### "Failed to list" error in production

**Cause:** Missing environment variables in your deployment platform.

**Fix:**
1. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to your deployment settings
2. Redeploy your application
3. See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for step-by-step instructions

### Red status indicator in bottom-right corner

This indicator shows your Supabase connection status. If you see:
- 🟢 **Green**: All good!
- 🔴 **Red**: Configuration issue - check environment variables

### Database connection errors

1. Verify environment variables are set correctly
2. Check that database schema was run (`supabase-schema.sql`)
3. Verify RLS policies are enabled
4. Check Supabase Dashboard → Logs for errors

---

## 📚 Documentation

- [**SUPABASE_SETUP.md**](./SUPABASE_SETUP.md) - Complete Supabase setup guide
- [**DATABASE_SETUP.md**](./DATABASE_SETUP.md) - Database configuration
- [**DEPLOYMENT_GUIDE.md**](./DEPLOYMENT_GUIDE.md) - Production deployment guide

---

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Public access for viewing listings
- User-scoped access for creating/editing
- Environment variables for sensitive data
- Secure authentication via Supabase

---

## 🚧 Roadmap

- [ ] User profiles with avatar uploads
- [ ] Direct messaging between buyers/sellers
- [ ] Payment integration (Stripe/PayPal)
- [ ] Rating and review system
- [ ] Email notifications
- [ ] Advanced search with filters
- [ ] Saved searches
- [ ] Price history tracking

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📞 Support

If you encounter any issues:
1. Check the [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
2. Review browser console for errors
3. Check Supabase Dashboard → Logs
4. Open an issue on GitHub

---

**Built with ❤️ for the racket sports community**
