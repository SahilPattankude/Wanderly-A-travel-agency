-- Wanderly bookings table
-- Supports booking + Razorpay payment status.

create table public.bookings (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  reference text not null unique,

  search jsonb not null,

  items jsonb not null,

  status text not null default 'pending'
    check (
      status in (
        'pending',
        'confirmed',
        'cancelled'
      )
    ),

  email_status text not null default 'pending'
    check (
      email_status in (
        'pending',
        'sent',
        'failed'
      )
    ),

  total_amount integer not null default 0,

  payment_status text not null default 'pending'
    check (
      payment_status in (
        'pending',
        'paid',
        'failed',
        'refunded'
      )
    ),

  payment_provider text,

  payment_order_id text,

  payment_id text,

  payment_signature text,

  created_at timestamptz not null default now()
);


-- Enable Row Level Security
alter table public.bookings enable row level security;


-- Users can view their own bookings
create policy "Users can view their own bookings"
on public.bookings
for select
to authenticated
using (
  auth.uid() = user_id
);


-- Users can create their own bookings
create policy "Users can create their own bookings"
on public.bookings
for insert
to authenticated
with check (
  auth.uid() = user_id
);


-- Users can update their own bookings
create policy "Users can update their own bookings"
on public.bookings
for update
to authenticated
using (
  auth.uid() = user_id
)
with check (
  auth.uid() = user_id
);