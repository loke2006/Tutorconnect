import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  UserPlus, 
  Search, 
  Calendar, 
  Video, 
  BookOpen, 
  Trophy,
  Shield,
  CreditCard,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Users,
  Home,
  Globe,
  FileCheck
} from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6">How It Works</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of students and tutors on our platform. Follow these simple steps to start your learning journey or teaching career.
          </p>
        </div>

        {/* Process Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">For Students</h3>
              <p className="text-sm text-muted-foreground">
                Find, book, and learn from verified tutors in your area or online
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">For Home Tutors</h3>
              <p className="text-sm text-muted-foreground">
                Teach students at their homes and grow your local tutoring business
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">For Online Tutors</h3>
              <p className="text-sm text-muted-foreground">
                Reach students worldwide through virtual teaching sessions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Student Journey */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Student Journey</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: 1,
                icon: UserPlus,
                title: "Sign Up Free",
                description: "Create your account with OTP verification. First 3 months absolutely free!",
                image: "bg-gradient-to-br from-blue-400 to-blue-600"
              },
              {
                step: 2,
                icon: Search,
                title: "Find Your Tutor",
                description: "Browse verified tutors by subject, location, price, and ratings",
                image: "bg-gradient-to-br from-purple-400 to-purple-600"
              },
              {
                step: 3,
                icon: Calendar,
                title: "Book Sessions",
                description: "Schedule classes at your convenient time with instant confirmation",
                image: "bg-gradient-to-br from-green-400 to-green-600"
              },
              {
                step: 4,
                icon: BookOpen,
                title: "Start Learning",
                description: "Attend classes online or at home with quality tutors",
                image: "bg-gradient-to-br from-orange-400 to-orange-600"
              },
              {
                step: 5,
                icon: MessageSquare,
                title: "Track Progress",
                description: "Monitor your learning journey and communicate with tutors",
                image: "bg-gradient-to-br from-pink-400 to-pink-600"
              },
              {
                step: 6,
                icon: Trophy,
                title: "Achieve Goals",
                description: "Excel in your studies with personalized guidance",
                image: "bg-gradient-to-br from-yellow-400 to-yellow-600"
              }
            ].map((item) => (
              <Card key={item.step} className="hover:shadow-xl transition-all">
                <CardContent className="p-6">
                  <div className={`h-32 ${item.image} rounded-lg mb-4 flex items-center justify-center`}>
                    <item.icon className="w-16 h-16 text-white" />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tutor Journey */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Tutor Journey</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  icon: UserPlus,
                  title: "Register & Choose Your Type",
                  description: "Sign up as a Home Tutor or Online Tutor with OTP verification"
                },
                {
                  icon: FileCheck,
                  title: "Complete Profile & Verification",
                  description: "Upload documents, qualifications, and complete verification process"
                },
                {
                  icon: Shield,
                  title: "Admin Approval",
                  description: "Your profile is reviewed and approved by our admin team"
                },
                {
                  icon: Search,
                  title: "Get Discovered",
                  description: "Students find you through search and book your sessions"
                },
                {
                  icon: Calendar,
                  title: "Manage Your Schedule",
                  description: "Set availability, accept bookings, and organize your classes"
                },
                {
                  icon: CreditCard,
                  title: "Earn & Grow",
                  description: "Receive payments securely and build your teaching reputation"
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-primary text-primary-foreground rounded-full flex items-center justify-center">
                      <item.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                    {index < 5 && (
                      <div className="w-0.5 h-8 bg-border ml-6 mt-4" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Platform Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "100% Verified",
                description: "All users undergo strict verification process"
              },
              {
                icon: Video,
                title: "Online & Offline",
                description: "Choose between virtual or in-person classes"
              },
              {
                icon: CreditCard,
                title: "Secure Payments",
                description: "Razorpay powered secure transactions"
              },
              {
                icon: CheckCircle,
                title: "Quality Assured",
                description: "Rated and reviewed by real students"
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Video Tutorial Section */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Watch How It Works</h2>
                  <p className="text-muted-foreground mb-6">
                    Get a quick overview of our platform in this 2-minute video tutorial
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span>Step-by-step registration guide</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span>How to find and book tutors</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span>Dashboard walkthrough</span>
                    </div>
                  </div>
                </div>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Video className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-muted-foreground">Video Tutorial Coming Soon</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-gradient-primary text-primary-foreground">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join our platform today and enjoy 3 months free!
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/student-signup">
                  <Button variant="hero" size="lg">
                    Start as Student <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <Link to="/become-tutor">
                  <Button variant="outline" size="lg" className="bg-white/10 border-white/20 hover:bg-white/20">
                    Become a Tutor <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;