-- Drop the existing trigger first
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Update the handle_new_user function to also create student/tutor/admin records
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into profiles table
  INSERT INTO public.profiles (id, email, full_name, phone, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'phone',
    (NEW.raw_user_meta_data->>'role')::app_role
  );

  -- Insert into role-specific tables based on the role
  IF NEW.raw_user_meta_data->>'role' = 'student' THEN
    INSERT INTO public.students (user_id, grade, subjects, location)
    VALUES (
      NEW.id,
      NEW.raw_user_meta_data->>'grade',
      string_to_array(NEW.raw_user_meta_data->>'subjects', ','),
      NEW.raw_user_meta_data->>'location'
    );
  ELSIF NEW.raw_user_meta_data->>'role' = 'tutor' THEN
    INSERT INTO public.tutors (user_id, tutor_type, qualification, experience_years, subjects, hourly_rate, bio, languages, service_areas, availability, timezone, teaching_methodology)
    VALUES (
      NEW.id,
      (NEW.raw_user_meta_data->>'tutor_type')::tutor_type,
      NEW.raw_user_meta_data->>'qualification',
      (NEW.raw_user_meta_data->>'experience_years')::integer,
      string_to_array(NEW.raw_user_meta_data->>'subjects', ','),
      (NEW.raw_user_meta_data->>'hourly_rate')::numeric,
      NEW.raw_user_meta_data->>'bio',
      string_to_array(NEW.raw_user_meta_data->>'languages', ','),
      string_to_array(NEW.raw_user_meta_data->>'service_areas', ','),
      NEW.raw_user_meta_data->>'availability',
      NEW.raw_user_meta_data->>'timezone',
      NEW.raw_user_meta_data->>'teaching_methodology'
    );
  ELSIF NEW.raw_user_meta_data->>'role' = 'admin' THEN
    INSERT INTO public.admins (user_id)
    VALUES (NEW.id);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();