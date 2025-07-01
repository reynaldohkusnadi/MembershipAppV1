-- Sample seed data for Artisan Membership App
-- Run this after the initial migration

-- Insert sample brands
INSERT INTO public.brands (name, logo_url, description) VALUES
  ('Bar Luca', 'https://via.placeholder.com/150x150/D4AF37/FFFFFF?text=BL', 'Artisan cocktail bar with premium spirits'),
  ('Bistecca', 'https://via.placeholder.com/150x150/CD7F32/FFFFFF?text=BS', 'Fine dining steakhouse with premium cuts'),
  ('Café Luca', 'https://via.placeholder.com/150x150/8B4513/FFFFFF?text=CL', 'Specialty coffee roastery and café'),
  ('Osteria Luca', 'https://via.placeholder.com/150x150/4682B4/FFFFFF?text=OL', 'Authentic Italian restaurant'),
  ('Boulangerie Luca', 'https://via.placeholder.com/150x150/DAA520/FFFFFF?text=BL', 'French bakery with artisan pastries')
ON CONFLICT (name) DO NOTHING;

-- Insert sample outlets
INSERT INTO public.outlets (brand_id, name, address, lat, lng, phone) VALUES
  ((SELECT id FROM public.brands WHERE name = 'Bar Luca'), 'Bar Luca Central', '123 Orchard Road, Singapore 238876', 1.3040, 103.8340, '+65 6123 4567'),
  ((SELECT id FROM public.brands WHERE name = 'Bar Luca'), 'Bar Luca Marina', '456 Marina Bay Ave, Singapore 018956', 1.2836, 103.8607, '+65 6234 5678'),
  ((SELECT id FROM public.brands WHERE name = 'Bistecca'), 'Bistecca Clarke Quay', '789 Clarke Quay, Singapore 179024', 1.2884, 103.8467, '+65 6345 6789'),
  ((SELECT id FROM public.brands WHERE name = 'Café Luca'), 'Café Luca Tanjong Pagar', '321 Tanjong Pagar Road, Singapore 088537', 1.2771, 103.8434, '+65 6456 7890'),
  ((SELECT id FROM public.brands WHERE name = 'Osteria Luca'), 'Osteria Luca Dempsey', '654 Dempsey Road, Singapore 247699', 1.3048, 103.8101, '+65 6567 8901'),
  ((SELECT id FROM public.brands WHERE name = 'Boulangerie Luca'), 'Boulangerie Luca Holland V', '987 Holland Village, Singapore 278628', 1.3117, 103.7961, '+65 6678 9012');

-- Insert sample rewards
INSERT INTO public.rewards (category_code, title, description, image_url, cost, available) VALUES
  -- Discounts
  ('discount', '10% Off Bar Luca', 'Get 10% off your total bill at any Bar Luca outlet', 'https://via.placeholder.com/300x200/D4AF37/FFFFFF?text=10%25+OFF', 200, true),
  ('discount', '15% Off Bistecca Dinner', 'Enjoy 15% off dinner service at Bistecca Clarke Quay', 'https://via.placeholder.com/300x200/CD7F32/FFFFFF?text=15%25+OFF', 500, true),
  ('discount', '20% Off Weekend Brunch', 'Get 20% off weekend brunch at Café Luca', 'https://via.placeholder.com/300x200/8B4513/FFFFFF?text=20%25+OFF', 300, true),
  
  -- Freebies
  ('freebie', 'Free Appetizer', 'Complimentary appetizer with main course at Osteria Luca', 'https://via.placeholder.com/300x200/4682B4/FFFFFF?text=FREE+APP', 250, true),
  ('freebie', 'Free Coffee', 'Free coffee of your choice at Café Luca', 'https://via.placeholder.com/300x200/8B4513/FFFFFF?text=FREE+COFFEE', 150, true),
  ('freebie', 'Free Dessert', 'Complimentary dessert with any purchase at Boulangerie Luca', 'https://via.placeholder.com/300x200/DAA520/FFFFFF?text=FREE+DESSERT', 180, true),
  
  -- Experiences
  ('experience', 'Wine Tasting Experience', 'Private wine tasting session for 2 at Bar Luca', 'https://via.placeholder.com/300x200/D4AF37/FFFFFF?text=WINE+TASTING', 800, true),
  ('experience', 'Cooking Class', 'Learn to make pasta from our chef at Osteria Luca', 'https://via.placeholder.com/300x200/4682B4/FFFFFF?text=COOKING+CLASS', 1200, true),
  ('experience', 'Coffee Cupping Session', 'Professional coffee tasting and education at Café Luca', 'https://via.placeholder.com/300x200/8B4513/FFFFFF?text=COFFEE+CUPPING', 400, true);

-- Insert sample promotions
INSERT INTO public.promotions (brand_id, title, content_md, image_url, start_date, end_date, urgent) VALUES
  ((SELECT id FROM public.brands WHERE name = 'Bar Luca'), 'Happy Hour Extended', 'Enjoy extended happy hour prices from 5PM-8PM on all cocktails and wines. Perfect for after-work drinks with colleagues!', 'https://via.placeholder.com/400x300/D4AF37/FFFFFF?text=HAPPY+HOUR', '2024-01-01', '2024-12-31', false),
  
  ((SELECT id FROM public.brands WHERE name = 'Bistecca'), 'Weekend Steak Special', 'Premium Wagyu A5 now available every weekend. Limited quantities - book your table now!', 'https://via.placeholder.com/400x300/CD7F32/FFFFFF?text=WAGYU+WEEKEND', '2024-01-01', '2024-12-31', true),
  
  ((SELECT id FROM public.brands WHERE name = 'Café Luca'), 'New Single Origin Launch', 'Introducing our new Ethiopian Yirgacheffe single origin coffee. Notes of bergamot and dark chocolate.', 'https://via.placeholder.com/400x300/8B4513/FFFFFF?text=NEW+ORIGIN', '2024-01-15', '2024-02-15', false),
  
  ((SELECT id FROM public.brands WHERE name = 'Osteria Luca'), 'Truffle Season', 'Fresh white truffles from Alba are here! Available in limited quantities throughout the season.', 'https://via.placeholder.com/400x300/4682B4/FFFFFF?text=TRUFFLE+SEASON', '2024-01-01', '2024-03-31', true),
  
  ((SELECT id FROM public.brands WHERE name = 'Boulangerie Luca'), 'Fresh Croissants Daily', 'Our croissants are now baked fresh every 2 hours from 6AM-6PM. Always warm and flaky!', 'https://via.placeholder.com/400x300/DAA520/FFFFFF?text=FRESH+DAILY', '2024-01-01', '2024-12-31', false),
  
  -- Events
  (NULL, 'Wine & Dine Festival', 'Join us for our annual Wine & Dine Festival featuring all our brands under one roof!', 'https://via.placeholder.com/400x300/800080/FFFFFF?text=WINE+FESTIVAL', '2024-03-15', '2024-03-17', true),
  
  (NULL, 'Artisan Market', 'Monthly artisan market featuring local producers and our signature products. Every first Saturday of the month.', 'https://via.placeholder.com/400x300/228B22/FFFFFF?text=ARTISAN+MARKET', '2024-01-01', '2024-12-31', false);

-- Insert sample points ledger entries for testing (requires actual user IDs)
-- This will be populated when users sign up and make transactions 