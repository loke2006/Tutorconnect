import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { format } from 'date-fns';
import { CalendarIcon, Clock, User, BookOpen } from 'lucide-react';

const BookingPage = () => {
  const { tutorId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tutor, setTutor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({
    date: new Date(),
    timeSlot: '',
    subject: '',
    duration: 1,
    notes: '',
  });

  useEffect(() => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please login to book a tutor',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }
    fetchTutorDetails();
  }, [tutorId, user]);

  const fetchTutorDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('tutors')
        .select(`
          *,
          profiles!tutors_user_id_fkey (
            full_name,
            email
          )
        `)
        .eq('id', tutorId)
        .single();

      if (error) throw error;
      setTutor(data);
    } catch (error) {
      console.error('Error fetching tutor:', error);
      toast({
        title: 'Error',
        description: 'Failed to load tutor details',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!booking.subject || !booking.timeSlot) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { data: studentData } = await supabase
        .from('students')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (!studentData) {
        toast({
          title: 'Profile Not Found',
          description: 'Please complete your student profile first',
          variant: 'destructive',
        });
        navigate('/student-dashboard');
        return;
      }

      const { error } = await supabase
        .from('bookings')
        .insert({
          student_id: user?.id,
          tutor_id: tutor.user_id,
          subject: booking.subject,
          date: format(booking.date, 'yyyy-MM-dd'),
          time_slot: booking.timeSlot,
          duration_hours: booking.duration,
          total_price: tutor.hourly_rate * booking.duration,
          notes: booking.notes,
        });

      if (error) throw error;

      toast({
        title: 'Booking Successful!',
        description: 'Your booking request has been sent to the tutor',
      });
      navigate('/student-dashboard');
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: 'Booking Failed',
        description: 'Failed to create booking. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <Card className="max-w-2xl mx-auto p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded mb-4" />
              <div className="h-4 bg-muted rounded mb-2" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </div>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <Card className="max-w-2xl mx-auto p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Tutor Not Found</h2>
            <Button onClick={() => navigate('/find-tutors')}>
              Back to Find Tutors
            </Button>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <Card className="max-w-2xl mx-auto p-8">
          <h1 className="text-3xl font-bold mb-6">Book a Session</h1>
          
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold flex items-center gap-2 mb-2">
              <User className="w-4 h-4" />
              {tutor.profiles?.full_name || 'Tutor'}
            </h3>
            <p className="text-sm text-muted-foreground">
              ₹{tutor.hourly_rate}/hour • {tutor.experience_years} years experience
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Subject
              </label>
              <Select
                value={booking.subject}
                onValueChange={(value) => setBooking({ ...booking, subject: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a subject" />
                </SelectTrigger>
                <SelectContent>
                  {tutor.subjects?.map((subject: string) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Select Date
              </label>
              <div className="border rounded-lg p-3">
                <Calendar
                  mode="single"
                  selected={booking.date}
                  onSelect={(date) => date && setBooking({ ...booking, date })}
                  disabled={(date) => date < new Date()}
                  className="rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Select Time Slot
              </label>
              <Select
                value={booking.timeSlot}
                onValueChange={(value) => setBooking({ ...booking, timeSlot: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a time slot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00-10:00">09:00 - 10:00 AM</SelectItem>
                  <SelectItem value="10:00-11:00">10:00 - 11:00 AM</SelectItem>
                  <SelectItem value="11:00-12:00">11:00 - 12:00 PM</SelectItem>
                  <SelectItem value="14:00-15:00">02:00 - 03:00 PM</SelectItem>
                  <SelectItem value="15:00-16:00">03:00 - 04:00 PM</SelectItem>
                  <SelectItem value="16:00-17:00">04:00 - 05:00 PM</SelectItem>
                  <SelectItem value="17:00-18:00">05:00 - 06:00 PM</SelectItem>
                  <SelectItem value="18:00-19:00">06:00 - 07:00 PM</SelectItem>
                  <SelectItem value="19:00-20:00">07:00 - 08:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Duration (hours)
              </label>
              <Select
                value={booking.duration.toString()}
                onValueChange={(value) => setBooking({ ...booking, duration: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour</SelectItem>
                  <SelectItem value="2">2 hours</SelectItem>
                  <SelectItem value="3">3 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Additional Notes (Optional)
              </label>
              <Textarea
                placeholder="Any specific topics or requirements..."
                value={booking.notes}
                onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
                rows={4}
              />
            </div>

            <div className="bg-muted rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Amount:</span>
                <span className="text-2xl font-bold">
                  ₹{tutor.hourly_rate * booking.duration}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleBooking}
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;