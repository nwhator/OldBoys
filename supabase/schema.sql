-- Add missing graduation_set column
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS graduation_set text;

-- Update the handle_new_user trigger to validate registration code and copy graduation_set
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  provided_code text;
BEGIN
  provided_code := NEW.raw_user_meta_data ->> 'registration_code';

  IF provided_code IS NULL OR provided_code <> 'OldBoys-Alumni-Invite' THEN
    RAISE EXCEPTION 'Registration is restricted. A valid access code is required.'
      USING ERRCODE = 'P0001';
  END IF;

  INSERT INTO public.users (id, full_name, graduation_set, membership_status, role)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'graduation_set',
    'pending',
    'member'
  );

  RETURN NEW;
END;
$$;
