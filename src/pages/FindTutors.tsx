import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Map from '@/components/Map';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Star, MapPin, Clock, Users, Filter, Map as MapIcon, Grid, ChevronRight, BookOpen, Video, Home, Search, X, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { indianStates, citiesByState } from '@/data/indianLocations';
import { useAuth } from '@/contexts/AuthContext';

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

const FindTutors = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showMap, setShowMap] = useState(false);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [searchSubject, setSearchSubject] = useState('');
  const [tutorType, setTutorType] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');

  // Fetch tutors from database
  useEffect(() => {
    fetchTutors();
    const subscription = subscribeToTutors();
    return () => {
      subscription();
    };
  }, []);

  const fetchTutors = async () => {
    try {
      setLoading(true);
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

  // Get available cities based on selected state
  const availableCities = useMemo(() => {
    return citiesByState[selectedState] || citiesByState['all'];
  }, [selectedState]);

  // When state changes, reset city selection
  useEffect(() => {
    setSelectedCity('all');
  }, [selectedState]);

  // Filter and sort tutors
  const filteredTutors = useMemo(() => {
    let filtered = [...tutors];

    // Filter by search subject
    if (searchSubject) {
      filtered = filtered.filter(tutor =>
        tutor.subjects?.some(subject =>
          subject.toLowerCase().includes(searchSubject.toLowerCase())
        )
      );
    }

    // Filter by tutor type
    if (tutorType !== 'all') {
      filtered = filtered.filter(tutor =>
        tutor.tutor_type === tutorType || tutor.tutor_type === 'both'
      );
    }

    // Filter by price range
    filtered = filtered.filter(tutor =>
      tutor.hourly_rate >= priceRange[0] && tutor.hourly_rate <= priceRange[1]
    );

    // Filter by rating
    if (selectedRating > 0) {
      filtered = filtered.filter(tutor =>
        tutor.rating >= selectedRating
      );
    }

    // Filter by location (state and city)
    if (selectedState !== 'all') {
      const stateName = indianStates.find(s => s.value === selectedState)?.label;
      if (stateName) {
        filtered = filtered.filter(tutor =>
          tutor.service_areas?.some(area =>
            area.toLowerCase().includes(stateName.toLowerCase())
          )
        );
      }
    }

    if (selectedCity !== 'all') {
      const cityName = availableCities.find(c => c.value === selectedCity)?.label;
      if (cityName) {
        filtered = filtered.filter(tutor =>
          tutor.service_areas?.some(area =>
            area.toLowerCase().includes(cityName.toLowerCase())
          )
        );
      }
    }

    // Sort tutors
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.hourly_rate - b.hourly_rate);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.hourly_rate - a.hourly_rate);
        break;
      case 'experience':
        filtered.sort((a, b) => b.experience_years - a.experience_years);
        break;
      default:
        // Keep original order for relevance
        break;
    }

    return filtered;
  }, [searchSubject, tutorType, priceRange, selectedRating, selectedState, selectedCity, sortBy, tutors, availableCities]);

  const handleBookTutor = (tutorId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to book a session",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    navigate(`/book-tutor/${tutorId}`);
  };

  const clearFilters = () => {
    setSearchSubject('');
    setTutorType('all');
    setPriceRange([0, 5000]);
    setSelectedRating(0);
    setSelectedState('all');
    setSelectedCity('all');
    setSortBy('relevance');
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset",
    });
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchSubject) count++;
    if (tutorType !== 'all') count++;
    if (priceRange[0] > 0 || priceRange[1] < 5000) count++;
    if (selectedRating > 0) count++;
    if (selectedState !== 'all') count++;
    if (selectedCity !== 'all') count++;
    if (sortBy !== 'relevance') count++;
    return count;
  }, [searchSubject, tutorType, priceRange, selectedRating, selectedState, selectedCity, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16"> {/* Add padding for fixed navbar */}
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-6 sm:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-2 sm:mb-4">Find Your Perfect Tutor</h1>
          <p className="text-center text-muted-foreground mb-4 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
            Connect with qualified tutors across India for personalized learning experiences
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by subject (e.g., Mathematics, Physics)"
                  value={searchSubject}
                  onChange={(e) => setSearchSubject(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                {/* Mobile Filter Sheet */}
                <Sheet>
                  <SheetTrigger asChild className="sm:hidden">
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                      {activeFiltersCount > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="space-y-4 mt-6">
                      {/* Mobile Filters Content */}
                      <div>
                        <label className="text-sm font-medium mb-2 block">Tutor Type</label>
                        <Select value={tutorType} onValueChange={setTutorType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Tutor Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="online">Online Only</SelectItem>
                            <SelectItem value="home">Home Tuition</SelectItem>
                            <SelectItem value="both">Both Available</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">State</label>
                        <Select value={selectedState} onValueChange={setSelectedState}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px]">
                            {indianStates.map(state => (
                              <SelectItem key={state.value} value={state.value}>
                                {state.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">City</label>
                        <Select value={selectedCity} onValueChange={setSelectedCity} disabled={selectedState === 'all'}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select City" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px]">
                            {availableCities.map(city => (
                              <SelectItem key={city.value} value={city.value}>
                                {city.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Minimum Rating</label>
                        <Select value={selectedRating.toString()} onValueChange={(val) => setSelectedRating(parseFloat(val))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Minimum Rating" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Any Rating</SelectItem>
                            <SelectItem value="4">4+ Stars</SelectItem>
                            <SelectItem value="4.5">4.5+ Stars</SelectItem>
                            <SelectItem value="4.8">4.8+ Stars</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Sort By</label>
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sort By" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="relevance">Relevance</SelectItem>
                            <SelectItem value="rating">Highest Rated</SelectItem>
                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                            <SelectItem value="experience">Most Experienced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                        </label>
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          max={5000}
                          min={0}
                          step={100}
                          className="mt-2"
                        />
                      </div>

                      <Button onClick={clearFilters} variant="outline" className="w-full">
                        Clear All Filters
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>

                <Button onClick={() => setShowMap(!showMap)} variant="outline" size="icon" className="sm:hidden">
                  {showMap ? <Grid className="h-4 w-4" /> : <MapIcon className="h-4 w-4" />}
                </Button>
                
                <Button onClick={() => setShowMap(!showMap)} variant="outline" className="hidden sm:flex">
                  {showMap ? <Grid className="w-4 h-4 mr-2" /> : <MapIcon className="w-4 h-4 mr-2" />}
                  {showMap ? 'Grid View' : 'Map View'}
                </Button>
              </div>
            </div>
            
            {/* Desktop Filters */}
            <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Select value={tutorType} onValueChange={setTutorType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tutor Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="online">Online Only</SelectItem>
                  <SelectItem value="home">Home Tuition</SelectItem>
                  <SelectItem value="both">Both Available</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  {indianStates.map(state => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCity} onValueChange={setSelectedCity} disabled={selectedState === 'all'}>
                <SelectTrigger>
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  {availableCities.map(city => (
                    <SelectItem key={city.value} value={city.value}>
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedRating.toString()} onValueChange={(val) => setSelectedRating(parseFloat(val))}>
                <SelectTrigger>
                  <SelectValue placeholder="Minimum Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any Rating</SelectItem>
                  <SelectItem value="4">4+ Stars</SelectItem>
                  <SelectItem value="4.5">4.5+ Stars</SelectItem>
                  <SelectItem value="4.8">4.8+ Stars</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="experience">Most Experienced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="hidden sm:flex items-center gap-4">
              <span className="text-sm font-medium whitespace-nowrap">Price Range:</span>
              <div className="flex-1 flex items-center gap-4">
                <span className="text-sm">₹{priceRange[0]}</span>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={5000}
                  min={0}
                  step={100}
                  className="flex-1"
                />
                <span className="text-sm">₹{priceRange[1]}</span>
              </div>
              <Button onClick={clearFilters} variant="ghost" size="sm">
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-6 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <p className="text-sm sm:text-base text-muted-foreground">
              {loading ? 'Loading tutors...' : `Showing ${filteredTutors.length} tutors`}
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : showMap ? (
            <Map />
          ) : filteredTutors.length === 0 ? (
            <Card className="p-8 sm:p-12 text-center">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">No Tutors Found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters to see more results.</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredTutors.map((tutor) => (
                <Card key={tutor.id} className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-semibold line-clamp-1">
                        {tutor.profiles?.full_name || 'Tutor'}
                      </h3>
                      {tutor.is_verified && (
                        <Badge className="mt-1 bg-success text-success-foreground text-xs">Verified</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-primary text-primary" />
                      <span className="text-sm font-medium">{tutor.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-3 sm:mb-4">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                      {tutor.tutor_type === 'online' ? (
                        <Video className="w-3 h-3 sm:w-4 sm:h-4" />
                      ) : tutor.tutor_type === 'home' ? (
                        <Home className="w-3 h-3 sm:w-4 sm:h-4" />
                      ) : (
                        <>
                          <Video className="w-3 h-3 sm:w-4 sm:h-4" />
                          <Home className="w-3 h-3 sm:w-4 sm:h-4" />
                        </>
                      )}
                      <span className="capitalize">{tutor.tutor_type} Tutor</span>
                    </div>

                    {tutor.service_areas && tutor.service_areas.length > 0 && (
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="line-clamp-1">{tutor.service_areas[0]}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{tutor.experience_years} years exp.</span>
                    </div>
                  </div>

                  {tutor.subjects && tutor.subjects.length > 0 && (
                    <div className="mb-3 sm:mb-4">
                      <div className="flex flex-wrap gap-1">
                        {tutor.subjects.slice(0, 3).map((subject, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                        {tutor.subjects.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{tutor.subjects.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div>
                      <span className="text-lg sm:text-2xl font-bold">₹{tutor.hourly_rate}</span>
                      <span className="text-xs sm:text-sm text-muted-foreground">/hour</span>
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      {tutor.total_students} students
                    </span>
                  </div>

                  <Button
                    className="w-full text-sm"
                    onClick={() => handleBookTutor(tutor.id)}
                  >
                    Book Session
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {!loading && filteredTutors.length > 0 && (
        <section className="py-8 sm:py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base">
              Post your requirements and let qualified tutors reach out to you
            </p>
            <Button size="lg" className="text-sm sm:text-base">
              Post Your Requirements
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
          </div>
        </section>
      )}
      </div>
      <Footer />
    </div>
  );
};

export default FindTutors;
