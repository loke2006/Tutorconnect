import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Video, Home, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Tutor {
  id: string;
  user_id: string;
  tutor_type: 'online' | 'home' | 'both';
  subjects: string[];
  hourly_rate: number;
  rating: number;
  experience_years: number;
  bio: string;
  service_areas: string[];
  availability: string;
  is_verified: boolean;
  total_students: number;
  profiles: {
    full_name: string;
    email: string;
  };
}

const TutorList = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTutors();
    subscribeToTutors();
  }, []);

  const fetchTutors = async () => {
    try {
      const { data, error } = await supabase
        .from('tutors')
        .select(`
          *,
          profiles!tutors_user_id_fkey (
            full_name,
            email
          )
        `);

      if (error) throw error;
      setTutors(data || []);
    } catch (error) {
      console.error('Error fetching tutors:', error);
      toast({
        title: 'Error',
        description: 'Failed to load tutors',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const subscribeToTutors = () => {
    const channel = supabase
      .channel('tutors-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tutors',
        },
        () => {
          fetchTutors();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleBookTutor = (tutorId: string) => {
    navigate(`/book-tutor/${tutorId}`);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="h-12 bg-muted rounded mb-4" />
            <div className="h-4 bg-muted rounded mb-2" />
            <div className="h-4 bg-muted rounded w-2/3" />
          </Card>
        ))}
      </div>
    );
  }

  if (tutors.length === 0) {
    return (
      <Card className="p-12 text-center">
        <h3 className="text-xl font-semibold mb-2">No Tutors Available</h3>
        <p className="text-muted-foreground">Check back later for available tutors.</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tutors.map((tutor) => (
        <Card key={tutor.id} className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">
                {tutor.profiles?.full_name || 'Tutor'}
              </h3>
              {tutor.is_verified && (
                <Badge className="mt-1 bg-success text-success-foreground">Verified</Badge>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="font-medium">{tutor.rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {tutor.tutor_type === 'online' ? (
                <Video className="w-4 h-4" />
              ) : tutor.tutor_type === 'home' ? (
                <Home className="w-4 h-4" />
              ) : (
                <>
                  <Video className="w-4 h-4" />
                  <Home className="w-4 h-4" />
                </>
              )}
              <span className="capitalize">{tutor.tutor_type} Tutor</span>
            </div>

            {tutor.service_areas && tutor.service_areas.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{tutor.service_areas[0]}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{tutor.experience_years} years exp.</span>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">Subjects:</p>
            <div className="flex flex-wrap gap-1">
              {tutor.subjects?.slice(0, 3).map((subject, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {subject}
                </Badge>
              ))}
              {tutor.subjects?.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{tutor.subjects.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-bold">₹{tutor.hourly_rate}</span>
              <span className="text-sm text-muted-foreground">/hour</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {tutor.total_students} students
            </span>
          </div>

          <Button
            className="w-full"
            onClick={() => handleBookTutor(tutor.id)}
          >
            Book Session
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default TutorList;