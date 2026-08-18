create table public.destinations (
  id text primary key,
  name text not null,
  country text not null,
  code text not null,
  image text not null,
  price_from integer not null check (price_from >= 0),
  rating numeric(2, 1) not null check (rating >= 0 and rating <= 5),
  reviews integer not null default 0 check (reviews >= 0),
  tag text not null,
  x numeric(5, 2) not null check (x >= 0 and x <= 100),
  y numeric(5, 2) not null check (y >= 0 and y <= 100),
  created_at timestamptz not null default now()
);

alter table public.destinations enable row level security;

create policy "Anyone can view destinations"
on public.destinations
for select
to anon
using (true);

insert into public.destinations
  (id, name, country, code, image, price_from, rating, reviews, tag, x, y)
values
  ('santorini', 'Santorini', 'Greece', 'JTR', 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop', 42000, 4.9, 2312, 'Trending', 54, 40),
  ('kyoto', 'Kyoto', 'Japan', 'UKY', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop', 58000, 4.8, 4109, 'Culture', 82, 38),
  ('bali', 'Bali', 'Indonesia', 'DPS', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop', 31000, 4.7, 5820, 'Best value', 76, 58),
  ('banff', 'Banff', 'Canada', 'YYC', 'https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1200&auto=format&fit=crop', 67000, 4.9, 1876, 'Nature', 16, 26),
  ('marrakech', 'Marrakech', 'Morocco', 'RAK', 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=1200&auto=format&fit=crop', 27000, 4.6, 2984, 'New', 46, 46),
  ('patagonia', 'Patagonia', 'Argentina', 'FTE', 'https://images.unsplash.com/photo-1531065208531-4036c0dba3ca?q=80&w=1200&auto=format&fit=crop', 74000, 4.9, 981, 'Adventure', 28, 78),
  ('mumbai', 'Mumbai', 'India', 'BOM', 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1200&auto=format&fit=crop', 14500, 4.8, 3124, 'Trending', 72, 48),
  ('pune', 'Pune', 'India', 'PNQ', 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?q=80&w=1200&auto=format&fit=crop', 8500, 4.7, 942, 'Culture', 72, 50),
  ('delhi', 'Delhi', 'India', 'DEL', 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200&auto=format&fit=crop', 12500, 4.8, 4812, 'Heritage', 71, 43),
  ('hyderabad', 'Hyderabad', 'India', 'HYD', 'https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?q=80&w=1200&auto=format&fit=crop', 10500, 4.7, 1654, 'Heritage', 73, 52),
  ('bengaluru', 'Bengaluru', 'India', 'BLR', 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1200&auto=format&fit=crop', 11000, 4.7, 2341, 'Tech Hub', 72, 55);
