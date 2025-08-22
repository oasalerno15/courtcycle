# Supabase Authentication Setup

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new account
2. Click "New Project"
3. Choose your organization and enter project details:
   - **Name**: `courtcycle-auth`
   - **Database Password**: Generate a secure password
   - **Region**: Choose closest to your users
4. Click "Create new project"

## 2. Get Project Credentials

Once your project is created:

1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (something like `https://xxxxx.supabase.co`)
   - **Project API Keys** → **anon public** (starts with `eyJ...`)
   - **Project API Keys** → **service_role** (starts with `eyJ...`)

## 3. Configure Environment Variables

Create a `.env.local` file in your project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Site URL for OAuth redirects
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 4. Enable Google OAuth

1. In your Supabase dashboard, go to **Authentication** → **Providers**
2. Click on **Google**
3. Enable the Google provider
4. You'll need to set up Google OAuth credentials:

### Google OAuth Setup:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client IDs**
5. Configure the OAuth consent screen
6. For Application type, choose **Web application**
7. Add authorized redirect URIs:
   - `https://your-project-id.supabase.co/auth/v1/callback`
   - For local development: `http://localhost:3000/auth/callback`
8. Copy the **Client ID** and **Client Secret**
9. Paste them into your Supabase Google provider settings

## 5. Configure Supabase Auth Settings

1. Go to **Authentication** → **Settings**
2. Set **Site URL** to `http://localhost:3000` (for development)
3. Add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - For production: `https://yourdomain.com/auth/callback`

## 6. Database Tables (Optional)

The authentication works out of the box, but you can extend user profiles:

```sql
-- Create a profiles table
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  
  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Create a trigger to automatically create a profile for new users
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

## 7. Test Authentication

1. Start your development server: `npm run dev`
2. Click the "Sign In" button in the header
3. Test both Google OAuth and email/password authentication
4. Check that users appear in **Authentication** → **Users** in Supabase

## 8. Production Deployment

For production:

1. Update environment variables with production URLs
2. Update Google OAuth redirect URIs
3. Update Supabase Auth settings with production domain
4. Ensure HTTPS is enabled

## Troubleshooting

### Common Issues:

1. **OAuth redirect mismatch**: Ensure redirect URIs match exactly in Google Console and Supabase
2. **Environment variables not loading**: Restart your development server after adding `.env.local`
3. **CORS errors**: Check that your site URL is correctly configured in Supabase
4. **Email not working**: Configure SMTP settings in Supabase for custom email flows

### Debugging:

- Check browser developer tools for console errors
- Monitor Supabase logs in **Logs** → **Auth**
- Verify network requests in browser dev tools

## Next Steps

- Implement protected routes
- Add user profile management
- Set up database relationships with authenticated users
- Add more OAuth providers (GitHub, Facebook, etc.) 