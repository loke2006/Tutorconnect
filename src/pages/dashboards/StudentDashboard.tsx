import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, BookOpen, Users, Search, Bell, Settings, LogOut, Star, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import TutorList from "@/components/TutorList";

const StudentDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [myTutors, setMyTutors] = useState<any[]>([]);
  const [stats, setStats] = useState({
    activeTutors: 0,
    weeklyClasses: 0,
    totalHours: 0,
    freeTrialDays: 0
  });

  useEffect(() => {
    if (user) {
      fetchStudentData();
      fetchBookings();
      fetchNotifications();
      fetchStats();
      subscribeToUpdates();
    }
  }, [user]);

  const fetchStudentData = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*, profiles!students_user_id_fkey(*)')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      setStudentData(data);
      
      // Calculate free trial days remaining
      if (data?.created_at) {
        const createdDate = new Date(data.created_at);
        const now = new Date();
        const daysPassed = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
        const remainingDays = Math.max(0, 90 - daysPassed);
        setStats(prev => ({ ...prev, freeTrialDays: remainingDays }));
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          tutors!bookings_tutor_id_fkey (
            *,
            profiles!tutors_user_id_fkey (*)
          )
        `)
        .eq('student_id', user?.id)
        .order('date', { ascending: true });

      if (error) throw error;
      setBookings(data || []);
      
      // Calculate stats
      const uniqueTutors = new Set(data?.filter(b => b.status === 'confirmed').map(b => b.tutor_id));
      const weeklyClasses = data?.filter(b => {
        const bookingDate = new Date(b.date);
        const now = new Date();
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 7);
        return bookingDate >= weekStart && bookingDate < weekEnd && b.status === 'confirmed';
      }).length || 0;
      
      const totalHours = data?.filter(b => b.status === 'completed')
        .reduce((acc, b) => acc + Number(b.duration_hours), 0) || 0;

      setStats(prev => ({
        ...prev,
        activeTutors: uniqueTutors.size,
        weeklyClasses,
        totalHours
      }));

      // Set my tutors
      const tutorsMap = new Map();
      data?.forEach(booking => {
        if (booking.tutors && booking.status === 'confirmed') {
          tutorsMap.set(booking.tutor_id, booking.tutors);
        }
      });
      setMyTutors(Array.from(tutorsMap.values()));
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

  const fetchStats = async () => {
    // Stats are calculated in fetchBookings
  };

  const subscribeToUpdates = () => {
    const bookingsChannel = supabase
      .channel('student-bookings')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'bookings',
        filter: `student_id=eq.${user?.id}`
      }, () => {
        fetchBookings();
      })
      .subscribe();

    const notificationsChannel = supabase
      .channel('student-notifications')
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

  const markNotificationRead = async (id: string) => {
    try {
      await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', id);
      
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const getUpcomingClasses = () => {
    const now = new Date();
    return bookings
      .filter(b => new Date(b.date) >= now && b.status === 'confirmed')
      .slice(0, 2);
  };

  const getRecentActivities = () => {
    return bookings
      .filter(b => b.status === 'completed')
      .slice(0, 3)
      .map(b => ({
        title: `Completed ${b.subject} class with ${b.tutors?.profiles?.full_name || 'Tutor'}`,
        time: new Date(b.date).toLocaleString()
      }));
  };
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, {studentData?.profiles?.full_name || 'Student'}!
            </h1>
            <p className="text-muted-foreground">Manage your learning journey</p>
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
              <CardTitle className="text-sm font-medium">Active Tutors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeTutors}</div>
              <p className="text-xs text-muted-foreground">Currently enrolled</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Classes This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.weeklyClasses}</div>
              <p className="text-xs text-muted-foreground">Scheduled classes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalHours}</div>
              <p className="text-xs text-muted-foreground">Learning time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Free Trial</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.freeTrialDays}</div>
              <p className="text-xs text-muted-foreground">Days remaining</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">My Schedule</TabsTrigger>
            <TabsTrigger value="tutors">My Tutors</TabsTrigger>
            <TabsTrigger value="findTutors">Find Tutors</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Upcoming Classes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Upcoming Classes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {getUpcomingClasses().length > 0 ? (
                    getUpcomingClasses().map((booking) => (
                      <div key={booking.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">{booking.subject}</p>
                          <p className="text-sm text-muted-foreground">
                            {booking.tutors?.profiles?.full_name || 'Tutor'} • {new Date(booking.date).toLocaleDateString()} at {booking.time_slot}
                          </p>
                        </div>
                        <Button size="sm" variant={new Date(booking.date).toDateString() === new Date().toDateString() ? 'default' : 'outline'}>
                          {new Date(booking.date).toDateString() === new Date().toDateString() ? 'Join' : 'View'}
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">No upcoming classes</p>
                  )}
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {getRecentActivities().length > 0 ? (
                    getRecentActivities().map((activity, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">No recent activities</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Schedule</CardTitle>
                <CardDescription>Your upcoming classes for this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-8">
                  Schedule calendar will be displayed here after Supabase integration
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tutors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Tutors</CardTitle>
                <CardDescription>Tutors you're currently learning with</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {myTutors.length > 0 ? (
                  myTutors.map((tutor) => (
                    <div key={tutor.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{tutor.profiles?.full_name || 'Tutor'}</p>
                          <p className="text-sm text-muted-foreground">
                            {tutor.subjects?.join(', ') || 'Multiple subjects'} • {tutor.rating || 0} ⭐
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => navigate(`/book-tutor/${tutor.id}`)}>
                        Book Session
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">No enrolled tutors yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="findTutors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Find New Tutors</CardTitle>
                <CardDescription>Browse and book sessions with verified tutors</CardDescription>
              </CardHeader>
              <CardContent>
                <TutorList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your account and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Verification Status</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 bg-warning rounded-full"></div>
                      <span className="text-sm text-muted-foreground">Pending verification</span>
                    </div>
                  </div>
                  <Button variant="outline">Edit Profile</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentDashboard;