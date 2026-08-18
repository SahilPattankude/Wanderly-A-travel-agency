-- 1. Enable the pg_net extension (required for webhook HTTP calls)
create extension if not exists "pg_net" with schema extensions;

-- 2. Create the webhook trigger function
create or replace function public.send_booking_confirmation_webhook()
returns trigger
language plpgsql
security definer
as $$
declare
  -- Replace the URL below with your actual Supabase URL (e.g. from NEXT_PUBLIC_SUPABASE_URL in .env)
  web_url text := 'https://waaathuznykuefogrcld.supabase.co/functions/v1/send-booking-confirmation';
  
  -- Replace this with your actual service_role key (e.g. from SUPABASE_SECRET_KEY in .env)
  service_key text := 'YOUR_SUPABASE_SERVICE_ROLE_KEY';
begin
  -- Only trigger the webhook if the booking is confirmed, paid, and email status is pending
  if NEW.status = 'confirmed' and NEW.payment_status = 'paid' and NEW.email_status = 'pending' then
    perform net.http_post(
      url := web_url,
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || service_key
      ),
      body := jsonb_build_object(
        'type', 'UPDATE',
        'table', 'bookings',
        'schema', 'public',
        'record', row_to_json(NEW)
      ),
      timeout_milliseconds := 5000
    );
  end if;
  return NEW;
end;
$$;

-- 3. Bind the trigger to the public.bookings table for updates (and inserts if booking starts confirmed)
drop trigger if exists on_booking_created on public.bookings;
drop trigger if exists on_booking_confirmed on public.bookings;

create trigger on_booking_confirmed
after insert or update on public.bookings
for each row
execute function public.send_booking_confirmation_webhook();
