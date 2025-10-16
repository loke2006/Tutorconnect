import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfWeek, addDays, isSameDay, parseISO } from 'date-fns';

interface BookingPlannerProps {
  bookings: any[];
}

const BookingPlanner: React.FC<BookingPlannerProps> = ({ bookings }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));

  const getBookingsForDay = (day: Date) => {
    return bookings.filter(booking => 
      isSameDay(parseISO(booking.date), day)
    );
  };

  const goToPreviousWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, -7));
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7));
  };

  const goToToday = () => {
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/10 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'completed':
        return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'cancelled':
        return 'bg-red-500/10 text-red-700 border-red-200';
      default:
        return 'bg-muted';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Weekly Planner
            </CardTitle>
            <CardDescription>
              {format(currentWeekStart, 'MMM dd')} - {format(addDays(currentWeekStart, 6), 'MMM dd, yyyy')}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={goToPreviousWeek}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={goToNextWeek}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
          {weekDays.map((day, index) => {
            const dayBookings = getBookingsForDay(day);
            const isToday = isSameDay(day, new Date());

            return (
              <div
                key={index}
                className={`border rounded-lg p-3 min-h-[200px] ${
                  isToday ? 'bg-primary/5 border-primary' : 'bg-card'
                }`}
              >
                <div className="text-center mb-2">
                  <div className="text-xs text-muted-foreground font-medium uppercase">
                    {format(day, 'EEE')}
                  </div>
                  <div className={`text-lg font-bold ${isToday ? 'text-primary' : ''}`}>
                    {format(day, 'd')}
                  </div>
                </div>

                <div className="space-y-2">
                  {dayBookings.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-xs text-muted-foreground">No classes</p>
                    </div>
                  ) : (
                    dayBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className={`p-2 rounded border text-xs space-y-1 ${getStatusColor(booking.status)}`}
                      >
                        <div className="flex items-start gap-1">
                          <Clock className="w-3 h-3 mt-0.5 flex-shrink-0" />
                          <span className="font-medium">{booking.time_slot}</span>
                        </div>
                        <div className="flex items-start gap-1">
                          <BookOpen className="w-3 h-3 mt-0.5 flex-shrink-0" />
                          <span>{booking.subject}</span>
                        </div>
                        <div className="flex items-start gap-1">
                          <User className="w-3 h-3 mt-0.5 flex-shrink-0" />
                          <span className="truncate">
                            {booking.tutors?.profiles?.full_name || 'Tutor'}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-[10px] px-1 py-0 h-4">
                          {booking.status}
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded bg-green-500/10 border border-green-200" />
            <span>Confirmed</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded bg-yellow-500/10 border border-yellow-200" />
            <span>Pending</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded bg-blue-500/10 border border-blue-200" />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded bg-red-500/10 border border-red-200" />
            <span>Cancelled</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingPlanner;
