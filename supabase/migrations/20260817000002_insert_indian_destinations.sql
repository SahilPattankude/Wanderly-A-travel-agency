-- Insert the new Indian destinations into the destinations table
insert into public.destinations
  (id, name, country, code, image, price_from, rating, reviews, tag, x, y)
values
  ('mumbai', 'Mumbai', 'India', 'BOM', 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1200&auto=format&fit=crop', 14500, 4.8, 3124, 'Trending', 72, 48),
  ('pune', 'Pune', 'India', 'PNQ', 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?q=80&w=1200&auto=format&fit=crop', 8500, 4.7, 942, 'Culture', 72, 50),
  ('delhi', 'Delhi', 'India', 'DEL', 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200&auto=format&fit=crop', 12500, 4.8, 4812, 'Heritage', 71, 43),
  ('hyderabad', 'Hyderabad', 'India', 'HYD', 'https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?q=80&w=1200&auto=format&fit=crop', 10500, 4.7, 1654, 'Heritage', 73, 52),
  ('bengaluru', 'Bengaluru', 'India', 'BLR', 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1200&auto=format&fit=crop', 11000, 4.7, 2341, 'Tech Hub', 72, 55)
on conflict (id) do update set
  name = excluded.name,
  country = excluded.country,
  code = excluded.code,
  image = excluded.image,
  price_from = excluded.price_from,
  rating = excluded.rating,
  reviews = excluded.reviews,
  tag = excluded.tag,
  x = excluded.x,
  y = excluded.y;
