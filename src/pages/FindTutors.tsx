import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Map from '@/components/Map';
import TutorList from '@/components/TutorList';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Star, MapPin, Clock, Users, Filter, Map as MapIcon, Grid, ChevronRight, BookOpen, Video, Home } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const FindTutors = () => {
  const navigate = useNavigate();
  const [showMap, setShowMap] = useState(false);
  const [loadedTutors, setLoadedTutors] = useState(8);
  
  // Filter states
  const [searchSubject, setSearchSubject] = useState('');
  const [tutorType, setTutorType] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Complete tutors data
  const allTutors = [
    { 
      id: 1, 
      name: 'Dr. Rajesh Kumar', 
      subjects: ['Mathematics', 'Physics'], 
      rating: 4.8, 
      reviews: 234, 
      price: 1500, 
      experience: '10 years',
      location: 'Koramangala, Bangalore',
      type: 'online',
      availability: 'Mon-Fri, 6PM-9PM',
      bio: 'IIT Delhi alumnus with extensive teaching experience',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh'
    },
    { 
      id: 2, 
      name: 'Priya Sharma', 
      subjects: ['English', 'Literature'], 
      rating: 4.9, 
      reviews: 189, 
      price: 1200, 
      experience: '8 years',
      location: 'Indiranagar, Bangalore',
      type: 'home',
      availability: 'Flexible timings',
      bio: 'Specialized in CBSE and ICSE curriculum',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya'
    },
    { 
      id: 3, 
      name: 'Amit Patel', 
      subjects: ['Chemistry', 'Biology'], 
      rating: 4.7, 
      reviews: 156, 
      price: 1800, 
      experience: '12 years',
      location: 'Whitefield, Bangalore',
      type: 'both',
      availability: 'Weekends available',
      bio: 'NEET and JEE preparation specialist',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit'
    },
    { 
      id: 4, 
      name: 'Sarah Johnson', 
      subjects: ['Computer Science', 'Programming'], 
      rating: 5.0, 
      reviews: 98, 
      price: 2000, 
      experience: '5 years',
      location: 'HSR Layout, Bangalore',
      type: 'online',
      availability: 'Evening slots',
      bio: 'Industry professional from top tech companies',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    { 
      id: 5, 
      name: 'Prof. Venkatesh', 
      subjects: ['Economics', 'Business Studies'], 
      rating: 4.6, 
      reviews: 201, 
      price: 2500, 
      experience: '15 years',
      location: 'Jayanagar, Bangalore',
      type: 'home',
      availability: 'Morning batches',
      bio: 'Former university professor',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Venkatesh'
    },
    { 
      id: 6, 
      name: 'Neha Gupta', 
      subjects: ['Hindi', 'Sanskrit'], 
      rating: 4.5, 
      reviews: 145, 
      price: 1000, 
      experience: '6 years',
      location: 'BTM Layout, Bangalore',
      type: 'both',
      availability: 'All days',
      bio: 'Language expert with cultural insights',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Neha'
    },
    { 
      id: 7, 
      name: 'Michael Chen', 
      subjects: ['Music', 'Piano'], 
      rating: 4.9, 
      reviews: 87, 
      price: 1500, 
      experience: '9 years',
      location: 'Malleshwaram, Bangalore',
      type: 'home',
      availability: 'Flexible schedule',
      bio: 'Trinity College certified music instructor',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael'
    },
    { 
      id: 8, 
      name: 'Dr. Anjali Reddy', 
      subjects: ['Psychology', 'Counseling'], 
      rating: 4.8, 
      reviews: 112, 
      price: 3000, 
      experience: '11 years',
      location: 'Electronic City, Bangalore',
      type: 'online',
      availability: 'By appointment',
      bio: 'Clinical psychologist and career counselor',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali'
    },
    { 
      id: 9, 
      name: 'Rahul Verma', 
      subjects: ['History', 'Geography'], 
      rating: 4.4, 
      reviews: 76, 
      price: 1100, 
      experience: '4 years',
      location: 'Marathahalli, Bangalore',
      type: 'both',
      availability: 'Evening classes',
      bio: 'Interactive teaching with visual aids',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul'
    },
    { 
      id: 10, 
      name: 'Sofia Martinez', 
      subjects: ['Spanish', 'French'], 
      rating: 4.7, 
      reviews: 93, 
      price: 1600, 
      experience: '7 years',
      location: 'Yelahanka, Bangalore',
      type: 'online',
      availability: 'Weekday mornings',
      bio: 'Native speaker with international experience',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia'
    },
    { 
      id: 11, 
      name: 'Karthik Iyer', 
      subjects: ['Yoga', 'Meditation'], 
      rating: 4.9, 
      reviews: 165, 
      price: 800, 
      experience: '13 years',
      location: 'JP Nagar, Bangalore',
      type: 'home',
      availability: 'Early morning sessions',
      bio: 'Certified yoga instructor and wellness coach',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karthik'
    },
    { 
      id: 12, 
      name: 'Emma Wilson', 
      subjects: ['Art', 'Drawing'], 
      rating: 4.6, 
      reviews: 54, 
      price: 1300, 
      experience: '5 years',
      location: 'Richmond Town, Bangalore',
      type: 'both',
      availability: 'Weekend workshops',
      bio: 'Professional artist and illustrator',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma'
    }
  ];

  // Filter and sort tutors
  const filteredTutors = useMemo(() => {
    let filtered = [...allTutors];

    // Filter by search subject
    if (searchSubject) {
      filtered = filtered.filter(tutor =>
        tutor.subjects.some(subject =>
          subject.toLowerCase().includes(searchSubject.toLowerCase())
        )
      );
    }

    // Filter by tutor type
    if (tutorType !== 'all') {
      filtered = filtered.filter(tutor =>
        tutor.type === tutorType || tutor.type === 'both'
      );
    }

    // Filter by price range
    filtered = filtered.filter(tutor =>
      tutor.price >= priceRange[0] && tutor.price <= priceRange[1]
    );

    // Filter by rating
    if (selectedRating > 0) {
      filtered = filtered.filter(tutor =>
        tutor.rating >= selectedRating
      );
    }

    // Filter by location
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(tutor =>
        tutor.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    // Sort tutors
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'experience':
        filtered.sort((a, b) => parseInt(b.experience) - parseInt(a.experience));
        break;
      default:
        // Keep original order for relevance
        break;
    }

    return filtered;
  }, [searchSubject, tutorType, priceRange, selectedRating, selectedLocation, sortBy]);

  // Paginated tutors
  const displayedTutors = filteredTutors.slice(0, loadedTutors);

  const handleLoadMore = () => {
    setLoadedTutors(prev => Math.min(prev + 4, filteredTutors.length));
  };

  const handleTutorClick = (tutorId: number) => {
    toast({
      title: "Profile View",
      description: "Tutor profile feature coming soon!",
    });
  };

  const handleBookSession = (tutorName: string) => {
    toast({
      title: "Booking Request",
      description: `Booking session with ${tutorName}. Feature coming soon!`,
    });
  };

  const clearFilters = () => {
    setSearchSubject('');
    setTutorType('all');
    setPriceRange([0, 5000]);
    setSelectedRating(0);
    setSelectedLocation('all');
    setSortBy('relevance');
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16"> {/* Add padding for fixed navbar */}
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Find Your Perfect Tutor</h1>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with qualified tutors in Bangalore for personalized learning experiences
          </p>
          
          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex gap-4">
              <Input
                placeholder="Search by subject (e.g., Mathematics, Physics)"
                value={searchSubject}
                onChange={(e) => setSearchSubject(e.target.value)}
                className="flex-1"
              />
              <Button onClick={() => setShowMap(!showMap)} variant="outline">
                {showMap ? <Grid className="w-4 h-4 mr-2" /> : <MapIcon className="w-4 h-4 mr-2" />}
                {showMap ? 'Grid View' : 'Map View'}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="koramangala">Koramangala</SelectItem>
                  <SelectItem value="indiranagar">Indiranagar</SelectItem>
                  <SelectItem value="whitefield">Whitefield</SelectItem>
                  <SelectItem value="hsr">HSR Layout</SelectItem>
                  <SelectItem value="btm">BTM Layout</SelectItem>
                  <SelectItem value="jayanagar">Jayanagar</SelectItem>
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
            
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Price Range:</span>
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
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">
              Showing {displayedTutors.length} of {filteredTutors.length} tutors
            </p>
          </div>
          
          {showMap ? (
            <Map />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayedTutors.map((tutor) => (
                  <Card 
                    key={tutor.id} 
                    className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleTutorClick(tutor.id)}
                  >
                    <div className="flex flex-col items-center text-center">
                      <img 
                        src={tutor.image} 
                        alt={tutor.name}
                        className="w-20 h-20 rounded-full mb-4"
                      />
                      <h3 className="font-semibold text-lg mb-2">{tutor.name}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{tutor.rating}</span>
                        <span className="text-sm text-muted-foreground">({tutor.reviews})</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3 justify-center">
                        {tutor.subjects.map((subject, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{tutor.experience} experience</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                        <MapPin className="w-3 h-3" />
                        <span>{tutor.location}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        {tutor.type === 'online' || tutor.type === 'both' ? (
                          <Badge variant="outline" className="text-xs">
                            <Video className="w-3 h-3 mr-1" />
                            Online
                          </Badge>
                        ) : null}
                        {tutor.type === 'home' || tutor.type === 'both' ? (
                          <Badge variant="outline" className="text-xs">
                            <Home className="w-3 h-3 mr-1" />
                            Home
                          </Badge>
                        ) : null}
                      </div>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{tutor.bio}</p>
                      <div className="flex items-center justify-between w-full">
                        <span className="font-bold text-lg">₹{tutor.price}/hr</span>
                        <Button 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookSession(tutor.name);
                          }}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              {displayedTutors.length < filteredTutors.length && (
                <div className="text-center mt-8">
                  <Button onClick={handleLoadMore} variant="outline" size="lg">
                    Load More Tutors
                  </Button>
                </div>
              )}
              
              {filteredTutors.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No tutors found matching your criteria</p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear Filters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't find the right tutor?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Post your requirements and let tutors reach out to you with their proposals
          </p>
          <Button size="lg" onClick={() => navigate('/post-requirement')}>
            Post Your Requirement
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
      </div> {/* Close pt-16 div */}
      <Footer />
    </div>
  );
};

export default FindTutors;