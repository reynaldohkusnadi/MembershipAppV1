-- Sample seed data for Artisan Membership App
-- Run this after the initial migration

-- Insert sample brands
INSERT INTO public.brands (name, logo_url, description) VALUES
  ('Social Affair', 'https://via.placeholder.com/150x150/D4AF37/FFFFFF?text=SA', 'Upscale restaurant and wine bar with international cuisine and curated wine selection'),
  ('SuperYumcha', 'https://via.placeholder.com/150x150/CD7F32/FFFFFF?text=SY', 'Modern dim sum restaurant serving authentic Cantonese delicacies and tea culture'),
  ('Bakerman', 'https://via.placeholder.com/150x150/8B4513/FFFFFF?text=BM', 'Artisan bakery specializing in handcrafted breads, pastries, and premium coffee'),
  ('Kakaw', 'https://via.placeholder.com/150x150/4682B4/FFFFFF?text=KW', 'Premium Indonesian bean-to-bar chocolate maker using finest local cacao beans'),
  ('Canton108', 'https://via.placeholder.com/150x150/DAA520/FFFFFF?text=C108', 'Contemporary Cantonese restaurant blending traditional flavors with modern presentation'),
  ('Noesaka', 'https://via.placeholder.com/150x150/2F4F4F/FFFFFF?text=NS', 'Premium Japanese restaurant specializing in fresh sushi, sashimi, and authentic washoku'),
  ('Pier12', 'https://via.placeholder.com/150x150/1E90FF/FFFFFF?text=P12', 'Fresh seafood restaurant with fish market concept and harbor-to-table dining'),
  ('Jullien', 'https://via.placeholder.com/150x150/800080/FFFFFF?text=JL', 'Fine dining French restaurant offering exquisite cuisine and wine pairing experiences')
ON CONFLICT (name) DO NOTHING;

-- Insert sample outlets with detailed restaurant information
INSERT INTO public.outlets (
  brand_id, name, address, lat, lng, phone, 
  opening_hours, menu_url, website_url, instagram_url, email, image_url, description
) VALUES
  -- Social Affair locations
  ((SELECT id FROM public.brands WHERE name = 'Social Affair'), 
   'Social Affair Grand Indonesia', 
   'Grand Indonesia Mall, East Mall, Jl. MH Thamrin No.1, Jakarta Pusat', 
   -6.1944, 106.8229, '+62 21 2358 1818',
   '{"monday": "11:00-22:00", "tuesday": "11:00-22:00", "wednesday": "11:00-22:00", "thursday": "11:00-22:00", "friday": "11:00-23:00", "saturday": "11:00-23:00", "sunday": "11:00-22:00"}',
   'https://drive.google.com/file/d/1example_social_affair_gi_menu/view',
   'https://socialaffair.com',
   'https://instagram.com/socialaffair.jakarta',
   'grandindo@socialaffair.com',
   'https://picsum.photos/800/400?random=101',
   'Upscale dining destination featuring international cuisine and an extensive wine collection in the heart of Jakarta.'
  ),
  
  ((SELECT id FROM public.brands WHERE name = 'Social Affair'), 
   'Social Affair Senayan City', 
   'Senayan City Mall, Ground Floor, Jl. Asia Afrika, Jakarta Selatan', 
   -6.2253, 106.7979, '+62 21 7278 8000',
   '{"monday": "10:00-22:00", "tuesday": "10:00-22:00", "wednesday": "10:00-22:00", "thursday": "10:00-22:00", "friday": "10:00-23:00", "saturday": "10:00-23:00", "sunday": "10:00-22:00"}',
   'https://drive.google.com/file/d/1example_social_affair_sc_menu/view',
   'https://socialaffair.com',
   'https://instagram.com/socialaffair.jakarta',
   'senayan@socialaffair.com',
   'https://picsum.photos/800/400?random=102',
   'Modern restaurant and wine bar offering sophisticated dining experience with panoramic city views.'
  ),

  -- SuperYumcha locations
  ((SELECT id FROM public.brands WHERE name = 'SuperYumcha'), 
   'SuperYumcha Plaza Indonesia', 
   'Plaza Indonesia, Level 4, Jl. MH Thamrin Kav. 28-30, Jakarta Pusat', 
   -6.1925, 106.8217, '+62 21 3193 7777',
   '{"monday": "10:00-22:00", "tuesday": "10:00-22:00", "wednesday": "10:00-22:00", "thursday": "10:00-22:00", "friday": "10:00-22:30", "saturday": "09:30-22:30", "sunday": "09:30-22:00"}',
   'https://drive.google.com/file/d/1example_superyumcha_pi_menu/view',
   'https://superyumcha.com',
   'https://instagram.com/superyumcha.jkt',
   'plazaindonesia@superyumcha.com',
   'https://picsum.photos/800/400?random=103',
   'Authentic Cantonese dim sum restaurant bringing traditional Hong Kong tea culture to Jakarta.'
  ),
  
  ((SELECT id FROM public.brands WHERE name = 'SuperYumcha'), 
   'SuperYumcha Kelapa Gading', 
   'Mall of Indonesia, Level 2, Jl. Boulevard Barat Raya, Jakarta Utara', 
   -6.1589, 106.8989, '+62 21 4587 0123',
   '{"monday": "10:00-21:30", "tuesday": "10:00-21:30", "wednesday": "10:00-21:30", "thursday": "10:00-21:30", "friday": "10:00-22:00", "saturday": "09:30-22:00", "sunday": "09:30-21:30"}',
   'https://drive.google.com/file/d/1example_superyumcha_kg_menu/view',
   'https://superyumcha.com',
   'https://instagram.com/superyumcha.jkt',
   'kelapagading@superyumcha.com',
   'https://picsum.photos/800/400?random=104',
   'Modern dim sum experience with traditional steaming techniques and premium tea selections.'
  ),

  -- Bakerman locations
  ((SELECT id FROM public.brands WHERE name = 'Bakerman'), 
   'Bakerman Kemang', 
   'Jl. Kemang Raya No. 45, Jakarta Selatan', 
   -6.2662, 106.8157, '+62 21 7179 5678',
   '{"monday": "06:00-21:00", "tuesday": "06:00-21:00", "wednesday": "06:00-21:00", "thursday": "06:00-21:00", "friday": "06:00-22:00", "saturday": "06:00-22:00", "sunday": "07:00-21:00"}',
   'https://drive.google.com/file/d/1example_bakerman_kemang_menu/view',
   'https://bakerman.id',
   'https://instagram.com/bakerman.jakarta',
   'kemang@bakerman.id',
   'https://picsum.photos/800/400?random=105',
   'Artisan bakery offering freshly baked breads, pastries, and specialty coffee in a cozy neighborhood setting.'
  ),
  
  ((SELECT id FROM public.brands WHERE name = 'Bakerman'), 
   'Bakerman PIK Avenue', 
   'PIK Avenue Mall, Ground Floor, Pantai Indah Kapuk, Jakarta Utara', 
   -6.1067, 106.7469, '+62 21 5088 9012',
   '{"monday": "07:00-21:00", "tuesday": "07:00-21:00", "wednesday": "07:00-21:00", "thursday": "07:00-21:00", "friday": "07:00-22:00", "saturday": "07:00-22:00", "sunday": "07:00-21:00"}',
   'https://drive.google.com/file/d/1example_bakerman_pik_menu/view',
   'https://bakerman.id',
   'https://instagram.com/bakerman.jakarta',
   'pikavenue@bakerman.id',
   'https://picsum.photos/800/400?random=106',
   'Modern bakery concept featuring premium breads, European pastries, and artisan coffee blends.'
  ),

  -- Kakaw locations
  ((SELECT id FROM public.brands WHERE name = 'Kakaw'), 
   'Kakaw Menteng', 
   'Jl. Menteng Tengah No. 12, Jakarta Pusat', 
   -6.1875, 106.8317, '+62 21 3904 5678',
   '{"monday": "09:00-21:00", "tuesday": "09:00-21:00", "wednesday": "09:00-21:00", "thursday": "09:00-21:00", "friday": "09:00-22:00", "saturday": "09:00-22:00", "sunday": "10:00-21:00"}',
   'https://drive.google.com/file/d/1example_kakaw_menteng_menu/view',
   'https://kakaw.co.id',
   'https://instagram.com/kakaw.chocolate',
   'menteng@kakaw.co.id',
   'https://picsum.photos/800/400?random=107',
   'Bean-to-bar chocolate maker showcasing the finest Indonesian cacao with tasting experiences and artisan confections.'
  ),
  
  ((SELECT id FROM public.brands WHERE name = 'Kakaw'), 
   'Kakaw Ubud Outpost', 
   'Jl. Monkey Forest Road, Ubud, Bali (Partner Location)', 
   -8.5069, 115.2625, '+62 361 975 432',
   '{"monday": "08:00-20:00", "tuesday": "08:00-20:00", "wednesday": "08:00-20:00", "thursday": "08:00-20:00", "friday": "08:00-20:00", "saturday": "08:00-20:00", "sunday": "08:00-20:00"}',
   'https://drive.google.com/file/d/1example_kakaw_ubud_menu/view',
   'https://kakaw.co.id',
   'https://instagram.com/kakaw.chocolate',
   'ubud@kakaw.co.id',
   'https://picsum.photos/800/400?random=108',
   'Bali outpost featuring single-origin chocolates made from local Balinese cacao beans in the heart of Ubud.'
  ),

  -- Canton108 locations
  ((SELECT id FROM public.brands WHERE name = 'Canton108'), 
   'Canton108 Central Park', 
   'Neo Soho Mall, Level 3, Jl. Letjen S. Parman, Jakarta Barat', 
   -6.1785, 106.7919, '+62 21 2930 1088',
   '{"monday": "11:00-22:00", "tuesday": "11:00-22:00", "wednesday": "11:00-22:00", "thursday": "11:00-22:00", "friday": "11:00-23:00", "saturday": "11:00-23:00", "sunday": "11:00-22:00"}',
   'https://drive.google.com/file/d/1example_canton108_cp_menu/view',
   'https://canton108.com',
   'https://instagram.com/canton108.jakarta',
   'centralpark@canton108.com',
   'https://picsum.photos/800/400?random=109',
   'Contemporary Cantonese cuisine featuring elevated traditional dishes with modern presentation techniques.'
  ),
  
  ((SELECT id FROM public.brands WHERE name = 'Canton108'), 
   'Canton108 SCBD', 
   'Pacific Place Mall, Level 5, Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan', 
   -6.2234, 106.8060, '+62 21 5140 1088',
   '{"monday": "11:30-22:00", "tuesday": "11:30-22:00", "wednesday": "11:30-22:00", "thursday": "11:30-22:00", "friday": "11:30-23:00", "saturday": "11:30-23:00", "sunday": "11:30-22:00"}',
   'https://drive.google.com/file/d/1example_canton108_scbd_menu/view',
   'https://canton108.com',
   'https://instagram.com/canton108.jakarta',
   'scbd@canton108.com',
   'https://picsum.photos/800/400?random=110',
   'Premium Cantonese dining destination offering refined dishes and exceptional service in Jakarta\'s business district.'
  ),

  -- Noesaka locations
  ((SELECT id FROM public.brands WHERE name = 'Noesaka'), 
   'Noesaka Senopati', 
   'Jl. Senopati Raya No. 88, Jakarta Selatan', 
   -6.2359, 106.8080, '+62 21 7221 9999',
   '{"monday": "18:00-24:00", "tuesday": "18:00-24:00", "wednesday": "18:00-24:00", "thursday": "18:00-24:00", "friday": "18:00-01:00", "saturday": "18:00-01:00", "sunday": "18:00-24:00"}',
   'https://drive.google.com/file/d/1example_noesaka_senopati_menu/view',
   'https://noesaka.com',
   'https://instagram.com/noesaka.jakarta',
   'senopati@noesaka.com',
   'https://picsum.photos/800/400?random=111',
   'Authentic Japanese omakase experience featuring fresh ingredients flown from Tsukiji market daily.'
  ),
  
  ((SELECT id FROM public.brands WHERE name = 'Noesaka'), 
   'Noesaka Pondok Indah', 
   'Pondok Indah Mall 2, Level 3, Jl. Metro Pondok Indah, Jakarta Selatan', 
   -6.2656, 106.7836, '+62 21 7592 8888',
   '{"monday": "17:30-22:00", "tuesday": "17:30-22:00", "wednesday": "17:30-22:00", "thursday": "17:30-22:00", "friday": "17:30-23:00", "saturday": "17:30-23:00", "sunday": "17:30-22:00"}',
   'https://drive.google.com/file/d/1example_noesaka_pi_menu/view',
   'https://noesaka.com',
   'https://instagram.com/noesaka.jakarta',
   'pondokindah@noesaka.com',
   'https://picsum.photos/800/400?random=112',
   'Premium Japanese restaurant offering traditional washoku cuisine and sake pairing in elegant setting.'
  ),

  -- Pier12 locations
  ((SELECT id FROM public.brands WHERE name = 'Pier12'), 
   'Pier12 Ancol', 
   'Jl. Lodan Timur No. 12, Taman Impian Jaya Ancol, Jakarta Utara', 
   -6.1226, 106.8539, '+62 21 6471 2345',
   '{"monday": "11:00-23:00", "tuesday": "11:00-23:00", "wednesday": "11:00-23:00", "thursday": "11:00-23:00", "friday": "11:00-24:00", "saturday": "10:00-24:00", "sunday": "10:00-23:00"}',
   'https://drive.google.com/file/d/1example_pier12_ancol_menu/view',
   'https://pier12.com',
   'https://instagram.com/pier12.jakarta',
   'ancol@pier12.com',
   'https://picsum.photos/800/400?random=113',
   'Waterfront seafood restaurant featuring daily fresh catch and harbor views in Jakarta\'s premier recreational area.'
  ),
  
  ((SELECT id FROM public.brands WHERE name = 'Pier12'), 
   'Pier12 Muara Karang', 
   'Pluit Village Mall, Jl. Pluit Karang Ayu, Jakarta Utara', 
   -6.1184, 106.7842, '+62 21 6686 7890',
   '{"monday": "11:00-22:00", "tuesday": "11:00-22:00", "wednesday": "11:00-22:00", "thursday": "11:00-22:00", "friday": "11:00-23:00", "saturday": "11:00-23:00", "sunday": "11:00-22:00"}',
   'https://drive.google.com/file/d/1example_pier12_mk_menu/view',
   'https://pier12.com',
   'https://instagram.com/pier12.jakarta',
   'muarakarang@pier12.com',
   'https://picsum.photos/800/400?random=114',
   'Modern seafood dining concept featuring fish market selections and innovative cooking techniques.'
  ),

  -- Jullien locations
  ((SELECT id FROM public.brands WHERE name = 'Jullien'), 
   'Jullien SCBD', 
   'The Energy Building, Level 2, SCBD, Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan', 
   -6.2234, 106.8060, '+62 21 5140 2525',
   '{"monday": "18:00-24:00", "tuesday": "18:00-24:00", "wednesday": "18:00-24:00", "thursday": "18:00-24:00", "friday": "18:00-01:00", "saturday": "18:00-01:00", "sunday": "closed"}',
   'https://drive.google.com/file/d/1example_jullien_scbd_menu/view',
   'https://jullien.com',
   'https://instagram.com/jullien.jakarta',
   'scbd@jullien.com',
   'https://picsum.photos/800/400?random=115',
   'Fine French dining experience featuring classical techniques and premium wine selection in sophisticated ambiance.'
  ),
  
  ((SELECT id FROM public.brands WHERE name = 'Jullien'), 
   'Jullien Gunawarman', 
   'Jl. Gunawarman No. 34, Kebayoran Baru, Jakarta Selatan', 
   -6.2358, 106.8050, '+62 21 7278 8001',
   '{"monday": "18:00-23:00", "tuesday": "18:00-23:00", "wednesday": "18:00-23:00", "thursday": "18:00-23:00", "friday": "18:00-24:00", "saturday": "18:00-24:00", "sunday": "closed"}',
   'https://drive.google.com/file/d/1example_jullien_gunawarman_menu/view',
   'https://jullien.com',
   'https://instagram.com/jullien.jakarta',
   'gunawarman@jullien.com',
   'https://picsum.photos/800/400?random=116',
   'Intimate French bistro offering seasonal menu and carefully curated wine cellar in the heart of Kebayoran.'
  )

ON CONFLICT (brand_id, name) DO NOTHING;

-- Insert sample rewards
INSERT INTO public.rewards (category_code, title, description, image_url, cost, available) VALUES
  -- Discounts
  ('discount', '15% Off Social Affair', 'Get 15% off your total bill at any Social Affair outlet including wine selection', 'https://via.placeholder.com/300x200/D4AF37/FFFFFF?text=15%25+OFF', 300, true),
  ('discount', '20% Off Dim Sum at SuperYumcha', 'Enjoy 20% off all dim sum items during lunch hours at SuperYumcha', 'https://via.placeholder.com/300x200/CD7F32/FFFFFF?text=20%25+DIM+SUM', 250, true),
  ('discount', '10% Off Bakerman Pastries', 'Get 10% off all artisan breads and pastries at Bakerman', 'https://via.placeholder.com/300x200/8B4513/FFFFFF?text=10%25+PASTRY', 150, true),
  ('discount', '25% Off Canton108 Weekend', 'Special weekend discount on all Cantonese dishes at Canton108', 'https://via.placeholder.com/300x200/DAA520/FFFFFF?text=25%25+WEEKEND', 400, true),
  
  -- Freebies
  ('freebie', 'Free Chocolate Tasting at Kakaw', 'Complimentary bean-to-bar chocolate tasting session for 2 people', 'https://via.placeholder.com/300x200/4682B4/FFFFFF?text=FREE+TASTING', 200, true),
  ('freebie', 'Free Sake with Sushi Set', 'Complimentary premium sake with any sushi set at Noesaka', 'https://via.placeholder.com/300x200/2F4F4F/FFFFFF?text=FREE+SAKE', 350, true),
  ('freebie', 'Free Seafood Appetizer', 'Complimentary fresh seafood appetizer with main course at Pier12', 'https://via.placeholder.com/300x200/1E90FF/FFFFFF?text=FREE+SEAFOOD', 280, true),
  ('freebie', 'Free French Dessert', 'Complimentary chef''s special dessert with dinner at Jullien', 'https://via.placeholder.com/300x200/800080/FFFFFF?text=FREE+DESSERT', 320, true),
  
  -- Experiences
  ('experience', 'Wine Pairing Dinner at Social Affair', 'Exclusive 5-course wine pairing dinner for 2 with sommelier', 'https://via.placeholder.com/300x200/D4AF37/FFFFFF?text=WINE+PAIRING', 1200, true),
  ('experience', 'Dim Sum Masterclass at SuperYumcha', 'Learn to make traditional dim sum with head chef for 2 people', 'https://via.placeholder.com/300x200/CD7F32/FFFFFF?text=DIM+SUM+CLASS', 800, true),
  ('experience', 'Chocolate Making Workshop at Kakaw', 'Private bean-to-bar chocolate making session for 2 people', 'https://via.placeholder.com/300x200/4682B4/FFFFFF?text=CHOCOLATE+WORKSHOP', 1000, true),
  ('experience', 'Omakase Experience at Noesaka', 'Chef''s choice 12-course omakase dinner for 2 with sake pairing', 'https://via.placeholder.com/300x200/2F4F4F/FFFFFF?text=OMAKASE', 1800, true),
  ('experience', 'Chef''s Table at Jullien', 'Exclusive chef''s table experience with wine pairing for 2 people', 'https://via.placeholder.com/300x200/800080/FFFFFF?text=CHEF+TABLE', 2000, true);

-- Insert sample promotions
INSERT INTO public.promotions (brand_id, title, content_md, image_url, start_date, end_date, urgent) VALUES
  ((SELECT id FROM public.brands WHERE name = 'Social Affair'), 'Extended Happy Hour', 'Join us for extended happy hour from 5PM-8PM every weekday! Enjoy 30% off selected wines, cocktails, and appetizers. Perfect for after-work socializing in our elegant atmosphere.', 'https://via.placeholder.com/400x300/D4AF37/FFFFFF?text=HAPPY+HOUR', '2024-01-01', '2024-12-31', false),
  
  ((SELECT id FROM public.brands WHERE name = 'SuperYumcha'), 'Weekend Yum Cha Special', 'Traditional weekend yum cha experience now available! Every Saturday and Sunday, enjoy unlimited tea service with your dim sum selection. Authentic Hong Kong style dining.', 'https://via.placeholder.com/400x300/CD7F32/FFFFFF?text=YUM+CHA', '2024-01-01', '2024-12-31', false),
  
  ((SELECT id FROM public.brands WHERE name = 'Bakerman'), 'Fresh Bread Daily', 'Artisan breads baked fresh every 3 hours from 6AM-6PM daily. Try our signature sourdough, croissants, and seasonal pastries made with premium imported ingredients.', 'https://via.placeholder.com/400x300/8B4513/FFFFFF?text=FRESH+DAILY', '2024-01-01', '2024-12-31', false),
  
  ((SELECT id FROM public.brands WHERE name = 'Kakaw'), 'Single Origin Chocolate Launch', 'New limited edition single origin chocolate bars from Flores and Sulawesi now available! Experience the unique terroir of Indonesian cacao in every bite.', 'https://via.placeholder.com/400x300/4682B4/FFFFFF?text=NEW+ORIGIN', '2024-01-15', '2024-03-15', true),
  
  ((SELECT id FROM public.brands WHERE name = 'Canton108'), 'Lunar New Year Feast', 'Celebrate Lunar New Year with our special banquet menu featuring traditional Cantonese delicacies and prosperity dishes. Bookings now open for family gatherings.', 'https://via.placeholder.com/400x300/DAA520/FFFFFF?text=LUNAR+NEW+YEAR', '2024-02-01', '2024-02-29', true),
  
  ((SELECT id FROM public.brands WHERE name = 'Noesaka'), 'Premium Omakase Season', 'Limited time premium omakase menu featuring seasonal Japanese ingredients flown in fresh from Tsukiji market. Only 8 seats available per night.', 'https://via.placeholder.com/400x300/2F4F4F/FFFFFF?text=OMAKASE+SEASON', '2024-01-01', '2024-03-31', true),
  
  ((SELECT id FROM public.brands WHERE name = 'Pier12'), 'Fresh Catch Daily', 'Daily fresh catch selection direct from Muara Angke fish market. Our chefs prepare your choice of fish with various Indonesian and international cooking styles.', 'https://via.placeholder.com/400x300/1E90FF/FFFFFF?text=FRESH+CATCH', '2024-01-01', '2024-12-31', false),
  
  ((SELECT id FROM public.brands WHERE name = 'Jullien'), 'Wine Dinner Series', 'Monthly wine dinner series featuring French vintages paired with chef''s seasonal menu. Limited to 20 guests per session for intimate dining experience.', 'https://via.placeholder.com/400x300/800080/FFFFFF?text=WINE+DINNER', '2024-01-01', '2024-12-31', false),
  
  -- Cross-brand events
  (NULL, 'Jakarta Food Festival', 'Annual Jakarta Food Festival featuring all our partner restaurants! Special tasting menus, chef collaborations, and exclusive member pricing across all brands.', 'https://via.placeholder.com/400x300/228B22/FFFFFF?text=FOOD+FESTIVAL', '2024-03-15', '2024-03-17', true),
  
  (NULL, 'Artisan Market Weekend', 'Monthly artisan market every first weekend featuring local producers, our brand specialties, and exclusive member discounts. Meet the chefs and discover new flavors.', 'https://via.placeholder.com/400x300/FF6347/FFFFFF?text=ARTISAN+MARKET', '2024-01-01', '2024-12-31', false);

-- Insert sample points ledger entries for testing (requires actual user IDs)
-- This will be populated when users sign up and make transactions 