import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Star, MapPin, Clock, BookOpen, Users, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const FindTutors = () => {
  const tutors = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      type: "Home Tutor",
      subjects: ["Mathematics", "Physics"],
      rating: 4.9,
      reviews: 127,
      experience: "12 years",
      location: "Mumbai, Maharashtra",
      price: "₹800/hour",
      availability: "Morning & Evening",
      verified: true,
      description: "IIT Bombay PhD, specializing in advanced mathematics and physics for JEE preparation"
    },
    {
      id: 2,
      name: "Priya Sharma",
      type: "Online Tutor",
      subjects: ["English", "Literature", "Creative Writing"],
      rating: 4.8,
      reviews: 89,
      experience: "8 years",
      location: "Delhi NCR",
      price: "₹600/hour",
      availability: "Flexible",
      verified: true,
      description: "MA English from JNU, published author with expertise in IELTS and TOEFL preparation"
    },
    {
      id: 3,
      name: "Amit Patel",
      type: "Home Tutor",
      subjects: ["Chemistry", "Biology"],
      rating: 4.7,
      reviews: 156,
      experience: "10 years",
      location: "Bangalore, Karnataka",
      price: "₹700/hour",
      availability: "Weekend",
      verified: true,
      description: "MSc Chemistry, NEET and medical entrance exam specialist"
    },
    {
      id: 4,
      name: "Sarah Johnson",
      type: "Online Tutor",
      subjects: ["Computer Science", "Programming", "Web Development"],
      rating: 5.0,
      reviews: 203,
      experience: "6 years",
      location: "Pune, Maharashtra",
      price: "₹1000/hour",
      availability: "Evening",
      verified: true,
      description: "Full-stack developer, teaching Python, JavaScript, and modern web technologies"
    },
    {
      id: 5,
      name: "Prof. Venkatesh Rao",
      type: "Home Tutor",
      subjects: ["Economics", "Business Studies", "Accountancy"],
      rating: 4.6,
      reviews: 74,
      experience: "15 years",
      location: "Chennai, Tamil Nadu",
      price: "₹900/hour",
      availability: "Morning",
      verified: true,
      description: "Former university professor, CA intermediate coach, expert in commerce subjects"
    },
    {
      id: 6,
      name: "Neha Gupta",
      type: "Online Tutor",
      subjects: ["Hindi", "Sanskrit", "Social Studies"],
      rating: 4.8,
      reviews: 112,
      experience: "7 years",
      location: "Jaipur, Rajasthan",
      price: "₹500/hour",
      availability: "Afternoon",
      verified: true,
      description: "MA Hindi Literature, specialized in CBSE and state board curriculum"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Tutor</h1>
          <p className="text-xl text-muted-foreground">
            Browse through verified tutors and book sessions that fit your schedule
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-1">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="search" 
                    placeholder="Subject or tutor name..." 
                    className="pl-9"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Select>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="computer">Computer Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="type">Tutor Type</Label>
                <Select>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="home">Home Tutor</SelectItem>
                    <SelectItem value="online">Online Tutor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="price">Price Range</Label>
                <Select>
                  <SelectTrigger id="price">
                    <SelectValue placeholder="Any Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Price</SelectItem>
                    <SelectItem value="0-500">Under ₹500/hour</SelectItem>
                    <SelectItem value="500-1000">₹500-1000/hour</SelectItem>
                    <SelectItem value="1000+">Above ₹1000/hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button variant="gradient">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
              <Button variant="outline">
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">6 tutors</span> matching your criteria
          </p>
          <Select defaultValue="relevance">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Most Relevant</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="experience">Most Experienced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tutor Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <Card key={tutor.id} className="hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <CardTitle className="text-lg">{tutor.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={tutor.type === "Online Tutor" ? "default" : "secondary"}>
                        {tutor.type}
                      </Badge>
                      {tutor.verified && (
                        <Badge variant="outline" className="text-success border-success">
                          ✓ Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-warning text-warning" />
                      <span className="font-semibold">{tutor.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{tutor.reviews} reviews</p>
                  </div>
                </div>
                <CardDescription className="line-clamp-2">
                  {tutor.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <span>{tutor.subjects.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{tutor.experience} experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{tutor.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{tutor.availability}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div>
                    <p className="text-lg font-bold text-primary">{tutor.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                    <Link to="/student-signup">
                      <Button variant="gradient" size="sm">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Tutors
          </Button>
        </div>

        {/* CTA Section */}
        <Card className="mt-12 bg-gradient-primary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Can't find the right tutor?</h2>
            <p className="mb-6">Post your requirements and let tutors apply to teach you</p>
            <Link to="/student-signup">
              <Button variant="hero" size="lg">
                Post Your Requirement <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default FindTutors;