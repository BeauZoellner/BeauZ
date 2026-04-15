-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- Orders table
create table orders (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  items jsonb not null,
  notes text default '',
  status text default 'pending',
  created_at timestamptz default now()
);

-- Applications table
create table applications (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  dispensary_name text not null,
  license_number text not null,
  contact_name text not null,
  phone text not null,
  message text default '',
  status text default 'pending',
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table orders enable row level security;
alter table applications enable row level security;

-- Users can read their own orders
create policy "Users can view own orders"
  on orders for select
  using (auth.jwt() ->> 'email' = email);

-- Users can insert their own orders
create policy "Users can insert own orders"
  on orders for insert
  with check (auth.jwt() ->> 'email' = email);

-- Anyone can submit an application (they sign up during application)
create policy "Anyone can insert applications"
  on applications for insert
  with check (true);

-- Users can view their own application
create policy "Users can view own application"
  on applications for select
  using (auth.jwt() ->> 'email' = email);
