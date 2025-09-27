-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL,
  tutor_id UUID NOT NULL,
  subject TEXT NOT NULL,
  date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  duration_hours NUMERIC NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  total_price NUMERIC NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create schedules table for tutors
CREATE TABLE public.schedules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tutor_id UUID NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(tutor_id, day_of_week, start_time, end_time)
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS policies for bookings
CREATE POLICY "Students can view their bookings" 
ON public.bookings 
FOR SELECT 
USING (auth.uid() = student_id);

CREATE POLICY "Tutors can view their bookings" 
ON public.bookings 
FOR SELECT 
USING (auth.uid() = tutor_id);

CREATE POLICY "Students can create bookings" 
ON public.bookings 
FOR INSERT 
WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update their pending bookings" 
ON public.bookings 
FOR UPDATE 
USING (auth.uid() = student_id AND status = 'pending');

CREATE POLICY "Tutors can update booking status" 
ON public.bookings 
FOR UPDATE 
USING (auth.uid() = tutor_id);

-- RLS policies for schedules
CREATE POLICY "Everyone can view schedules" 
ON public.schedules 
FOR SELECT 
USING (true);

CREATE POLICY "Tutors can manage their schedules" 
ON public.schedules 
FOR ALL 
USING (auth.uid() = tutor_id);

-- RLS policies for notifications
CREATE POLICY "Users can view their notifications" 
ON public.notifications 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their notifications" 
ON public.notifications 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create function to notify tutor on booking
CREATE OR REPLACE FUNCTION public.notify_tutor_on_booking()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.notifications (user_id, type, title, message, data)
  VALUES (
    NEW.tutor_id,
    'new_booking',
    'New Booking Request',
    'You have received a new booking request',
    jsonb_build_object(
      'booking_id', NEW.id,
      'student_id', NEW.student_id,
      'subject', NEW.subject,
      'date', NEW.date,
      'time_slot', NEW.time_slot
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for booking notifications
CREATE TRIGGER on_booking_created
  AFTER INSERT ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_tutor_on_booking();

-- Add triggers for updated_at
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tutors;