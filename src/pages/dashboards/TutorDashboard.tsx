import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Calendar, Users, DollarSign, Star, TrendingUp, Clock, Bell, Settings, LogOut, Check, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const TutorDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [tutorData, setTutorData] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [stats, setStats] = useState({
    activeStudents: 0,
    weeklyClasses: 0,
    rating: 0,
    monthlyEarnings: 0,
    totalEarnings: 0,
    pendingEarnings: 0
  });

  useEffect(() => {
    if (user) {
      fetchTutorData();
      fetchBookings();
      fetchNotifications();
      subscribeToUpdates();
    }
  }, [user]);

  const fetchTutorData = async () => {
    try {
      const { data, error } = await supabase
        .from('tutors')
        .select('*, profiles!tutors_user_id_fkey(*)')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      setTutorData(data);
      
      setStats(prev => ({
        ...prev,
        rating: data?.rating || 0
      }));
    } catch (error) {
      console.error('Error fetching tutor data:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          students!bookings_student_id_fkey (
            *,
            profiles!students_user_id_fkey (*)
          )
        `)
        .eq('tutor_id', user?.id)
        .order('date', { ascending: true });

      if (error) throw error;
      setBookings(data || []);
      
      // Calculate stats
      const uniqueStudents = new Set(data?.filter(b => b.status === 'confirmed').map(b => b.student_id));
      const weeklyClasses = data?.filter(b => {
        const bookingDate = new Date(b.date);
        const now = new Date();
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 7);
        return bookingDate >= weekStart && bookingDate < weekEnd && b.status === 'confirmed';
      }).length || 0;
      
      // Calculate earnings
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const monthlyEarnings = data?.filter(b => 
        b.status === 'completed' && new Date(b.date) >= monthStart
      ).reduce((acc, b) => acc + Number(b.total_price), 0) || 0;
      
      const totalEarnings = data?.filter(b => b.status === 'completed')
        .reduce((acc, b) => acc + Number(b.total_price), 0) || 0;
      
      const pendingEarnings = data?.filter(b => b.status === 'confirmed')
        .reduce((acc, b) => acc + Number(b.total_price), 0) || 0;

      setStats(prev => ({
        ...prev,
        activeStudents: uniqueStudents.size,
        weeklyClasses,
        monthlyEarnings,
        totalEarnings,
        pendingEarnings
      }));

      // Set unique students
      const studentsMap = new Map();
      data?.forEach(booking => {
        if (booking.students && (booking.status === 'confirmed' || booking.status === 'completed')) {
          studentsMap.set(booking.student_id, booking.students);
        }
      });
      setStudents(Array.from(studentsMap.values()));
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user?.id)
        .eq('is_read', false)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setNotifications(data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const subscribeToUpdates = () => {
    const bookingsChannel = supabase
      .channel('tutor-bookings')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'bookings',
        filter: `tutor_id=eq.${user?.id}`
      }, () => {
        fetchBookings();
      })
      .subscribe();

    const notificationsChannel = supabase
      .channel('tutor-notifications')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${user?.id}`
      }, () => {
        fetchNotifications();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(bookingsChannel);
      supabase.removeChannel(notificationsChannel);
    };
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleBookingAction = async (bookingId: string, action: 'confirmed' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: action })
        .eq('id', bookingId);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: `Booking ${action === 'confirmed' ? 'accepted' : 'declined'} successfully`,
      });
      
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking:', error);
      toast({
        title: "Error",
        description: "Failed to update booking",
        variant: "destructive",
      });
    }
  };

  const getTodaysClasses = () => {
    const today = new Date().toDateString();
    return bookings.filter(b => 
      new Date(b.date).toDateString() === today && b.status === 'confirmed'
    );
  };

  const getPendingBookings = () => {
    return bookings.filter(b => b.status === 'pending');
  };
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {tutorData?.profiles?.full_name || 'Tutor'}!</h1>
            <p className="text-muted-foreground">Manage your teaching schedule and students</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="w-4 h-4" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full" />
              )}
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleSignOut}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeStudents}</div>
              <p className="text-xs text-muted-foreground">Currently teaching</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.weeklyClasses}</div>
              <p className="text-xs text-muted-foreground">Classes scheduled</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center gap-1">
                {stats.rating.toFixed(1)} <Star className="w-5 h-5 text-warning fill-warning" />
              </div>
              <p className="text-xs text-muted-foreground">Average rating</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.monthlyEarnings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Today's Classes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Today's Classes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {getTodaysClasses().length > 0 ? (
                    getTodaysClasses().map((booking) => (
                      <div key={booking.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">
                            {booking.students?.profiles?.full_name || 'Student'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {booking.subject} • {booking.time_slot}
                          </p>
                        </div>
                        <Button size="sm" variant="gradient">Start</Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">No classes today</p>
                  )}
                </CardContent>
              </Card>

              {/* Pending Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Pending Bookings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {getPendingBookings().length > 0 ? (
                    getPendingBookings().slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">
                            {booking.students?.profiles?.full_name || 'New student'} request
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {booking.subject} • {new Date(booking.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleBookingAction(booking.id, 'cancelled')}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="gradient"
                            onClick={() => handleBookingAction(booking.id, 'confirmed')}
                          >
                            <Check className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">No pending bookings</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Teaching Schedule</CardTitle>
                <CardDescription>Manage your availability and classes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-8">
                  Calendar view will be available after Supabase integration
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Students</CardTitle>
                <CardDescription>Manage your student roster</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {students.length > 0 ? (
                    students.map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{student.profiles?.full_name || 'Student'}</p>
                          <p className="text-sm text-muted-foreground">
                            Grade: {student.grade || 'N/A'} • {student.location || 'Location not specified'}
                          </p>
                        </div>
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No students yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Overview</CardTitle>
                <CardDescription>Track your income and payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">This Month</p>
                    <p className="text-2xl font-bold">₹{stats.monthlyEarnings.toLocaleString()}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold">₹{stats.pendingEarnings.toLocaleString()}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Earned</p>
                    <p className="text-2xl font-bold">₹{stats.totalEarnings.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Management</CardTitle>
                <CardDescription>Update your profile and documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Verification Status</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm text-muted-foreground">Verified</span>
                    </div>
                  </div>
                  <div>
                    <Label>Subscription</Label>
                    <p className="text-sm text-muted-foreground">Free trial - 72 days remaining</p>
                  </div>
                  <Button variant="outline">Update Profile</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TutorDashboard;