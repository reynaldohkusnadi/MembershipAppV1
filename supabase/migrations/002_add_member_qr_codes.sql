-- Add member QR code fields to profiles table
-- Migration: Add member QR code support for POS integration

-- Add QR code fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS member_qr_token text,
ADD COLUMN IF NOT EXISTS qr_code_data text,
ADD COLUMN IF NOT EXISTS qr_code_updated_at timestamp with time zone DEFAULT timezone('utc', now());

-- Create index on QR token for fast lookups by POS system
CREATE INDEX IF NOT EXISTS profiles_qr_token_idx ON public.profiles (member_qr_token);

-- Function to generate a secure QR token
CREATE OR REPLACE FUNCTION public.fn_generate_member_qr_token(p_user_id uuid) RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  qr_token text;
  qr_data jsonb;
BEGIN
  -- Generate a secure random token
  qr_token := encode(gen_random_bytes(16), 'hex');
  
  -- Create QR code data structure
  qr_data := jsonb_build_object(
    'member_id', p_user_id,
    'token', qr_token,
    'issued_at', timezone('utc', now()),
    'type', 'member_scan'
  );
  
  -- Update profile with new QR code data
  UPDATE public.profiles 
  SET 
    member_qr_token = qr_token,
    qr_code_data = qr_data::text,
    qr_code_updated_at = timezone('utc', now())
  WHERE id = p_user_id;
  
  RETURN qr_data::text;
END;
$$;

-- Trigger to generate QR code for new profiles
CREATE OR REPLACE FUNCTION public.fn_create_member_qr_on_insert() RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Generate QR code for new profile
  PERFORM public.fn_generate_member_qr_token(NEW.id);
  RETURN NEW;
END;
$$;

-- Create trigger for new profiles
DROP TRIGGER IF EXISTS trg_create_member_qr ON public.profiles;
CREATE TRIGGER trg_create_member_qr
  AFTER INSERT ON public.profiles
  FOR EACH ROW 
  EXECUTE FUNCTION public.fn_create_member_qr_on_insert();

-- Backfill QR codes for existing profiles
DO $$
DECLARE
  profile_record RECORD;
BEGIN
  FOR profile_record IN SELECT id FROM public.profiles WHERE member_qr_token IS NULL
  LOOP
    PERFORM public.fn_generate_member_qr_token(profile_record.id);
  END LOOP;
END $$;

-- Add RLS policy for QR code access
CREATE POLICY "Users can view own QR code" ON public.profiles
  FOR SELECT USING ( id = auth.uid() );

-- Helper function for POS systems to validate QR tokens
CREATE OR REPLACE FUNCTION public.fn_validate_member_qr_token(p_qr_token text) 
RETURNS TABLE(
  member_id uuid,
  display_name text,
  points integer,
  tier_name text,
  is_valid boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.display_name,
    p.points,
    t.name as tier_name,
    true as is_valid
  FROM public.profiles p
  JOIN public.tiers t ON p.tier_id = t.id
  WHERE p.member_qr_token = p_qr_token;
  
  -- Return false if no match found
  IF NOT FOUND THEN
    RETURN QUERY SELECT NULL::uuid, NULL::text, NULL::integer, NULL::text, false;
  END IF;
END;
$$;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION public.fn_generate_member_qr_token(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.fn_validate_member_qr_token(text) TO authenticated; 