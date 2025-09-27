-- Fix security warning: Set search_path for the function
ALTER FUNCTION public.notify_tutor_on_booking() SET search_path = public;