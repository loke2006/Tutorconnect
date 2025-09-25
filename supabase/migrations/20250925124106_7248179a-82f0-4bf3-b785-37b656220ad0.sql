-- Create enum for tutor types
CREATE TYPE public.tutor_type AS ENUM ('home', 'online');

-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('student', 'tutor', 'admin');

-- Create profiles table (base user data)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create students table
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  grade TEXT,
  subjects TEXT[],
  location TEXT,
  free_trial_used BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create tutors table
CREATE TABLE public.tutors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  tutor_type tutor_type NOT NULL,
  qualification TEXT,
  experience_years INTEGER,
  subjects TEXT[],
  languages TEXT[],
  hourly_rate DECIMAL(10,2),
  bio TEXT,
  service_areas TEXT[],
  availability TEXT,
  timezone TEXT,
  teaching_methodology TEXT,
  is_verified BOOLEAN DEFAULT false,
  rating DECIMAL(3,2) DEFAULT 0,
  total_students INTEGER DEFAULT 0,
  documents_url TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create admins table
CREATE TABLE public.admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  permissions TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
USING (true);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- Students policies
CREATE POLICY "Students can view own data" 
ON public.students FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Students can update own data" 
ON public.students FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Students can insert own data" 
ON public.students FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Tutors policies
CREATE POLICY "Tutors are viewable by everyone" 
ON public.tutors FOR SELECT 
USING (true);

CREATE POLICY "Tutors can update own data" 
ON public.tutors FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Tutors can insert own data" 
ON public.tutors FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Admins policies
CREATE POLICY "Admins can view own data" 
ON public.admins FOR SELECT 
USING (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'phone',
    (NEW.raw_user_meta_data->>'role')::app_role
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('tutor-documents', 'tutor-documents', false);

-- Storage policies for tutor documents
CREATE POLICY "Tutors can upload own documents" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'tutor-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Tutors can view own documents" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'tutor-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Tutors can update own documents" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'tutor-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Tutors can delete own documents" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'tutor-documents' AND auth.uid()::text = (storage.foldername(name))[1]);