-- Migration to add email_status and total_amount to bookings table
alter table public.bookings 
add column if not exists email_status text not null default 'pending' check (email_status in ('pending', 'sent', 'failed'));

alter table public.bookings 
add column if not exists total_amount integer not null default 0;
