-- Create listings table for marketplace items
create table if not exists public.listings (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Basic Information
  title text not null,
  brand text not null,
  price numeric not null check (price > 0),
  condition text not null check (condition in ('New', 'Like New', 'Good', 'Fair')),
  type text not null check (type in ('squash', 'tennis', 'padel')),
  description text not null,
  
  -- Seller Information
  seller_email text not null,
  seller_name text,
  
  -- Images (stored as array of base64 or URLs)
  images jsonb not null default '[]'::jsonb,
  
  -- Specifications
  specifications jsonb default '{}'::jsonb,
  
  -- Location and Rating
  location text default 'Location not specified',
  rating numeric default 4.8 check (rating >= 0 and rating <= 5),
  
  -- Status
  is_active boolean default true,
  is_sold boolean default false
);

-- Create indexes for better query performance
create index if not exists listings_created_at_idx on public.listings(created_at desc);
create index if not exists listings_type_idx on public.listings(type);
create index if not exists listings_condition_idx on public.listings(condition);
create index if not exists listings_seller_email_idx on public.listings(seller_email);
create index if not exists listings_is_active_idx on public.listings(is_active);
create index if not exists listings_price_idx on public.listings(price);

-- Enable Row Level Security
alter table public.listings enable row level security;

-- Policy: Anyone can view active listings
create policy "Anyone can view active listings"
  on public.listings for select
  using (is_active = true);

-- Policy: Anyone can insert listings (for now - you can restrict later)
create policy "Anyone can insert listings"
  on public.listings for insert
  with check (true);

-- Policy: Users can update their own listings (based on email)
create policy "Users can update own listings"
  on public.listings for update
  using (seller_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Policy: Users can delete their own listings (based on email)
create policy "Users can delete own listings"
  on public.listings for delete
  using (seller_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Create favorites table
create table if not exists public.favorites (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_email text not null,
  listing_id uuid references public.listings(id) on delete cascade not null,
  
  -- Prevent duplicate favorites
  unique(user_email, listing_id)
);

-- Enable Row Level Security for favorites
alter table public.favorites enable row level security;

-- Policy: Users can view their own favorites
create policy "Users can view own favorites"
  on public.favorites for select
  using (user_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Policy: Anyone can insert favorites (for now)
create policy "Anyone can insert favorites"
  on public.favorites for insert
  with check (true);

-- Policy: Users can delete their own favorites
create policy "Users can delete own favorites"
  on public.favorites for delete
  using (user_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Create indexes for favorites
create index if not exists favorites_user_email_idx on public.favorites(user_email);
create index if not exists favorites_listing_id_idx on public.favorites(listing_id);

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger to automatically update updated_at
create trigger handle_listings_updated_at
  before update on public.listings
  for each row
  execute function public.handle_updated_at();

