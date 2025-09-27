import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, BookOpen, Home, Shield, Check, ArrowRight, Award, TrendingUp, Zap, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Find Your Perfect Tutor
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Connect with verified home tutors and online educators for personalized learning
          </p>
          <div className="flex gap-4 justify-center mb-4">
            <Link to="/find-tutors">
              <Button variant="hero" size="xl">
                Get Started - First 3 Months Free
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="outline" size="xl">
                Learn More
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            ✓ OTP Verified Users ✓ Document Verification ✓ Secure Platform
          </p>
        </div>
      </section>

      {/* User Type Cards */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Role</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Student Card */}
          <div className="bg-card rounded-xl shadow-xl hover:shadow-2xl transition-all p-8 border border-border">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Students</h3>
            <p className="text-muted-foreground mb-6">
              Find qualified tutors for all subjects. Book sessions, track progress, and excel in your studies.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span className="text-sm">Access to verified tutors</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span className="text-sm">Flexible scheduling</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span className="text-sm">₹10/month after trial</span>
              </li>
            </ul>
            <Link to="/student-signup">
              <Button variant="gradient" className="w-full">
                Join as Student <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Home Tutor Card */}
          <div className="bg-card rounded-xl shadow-xl hover:shadow-2xl transition-all p-8 border border-border">
            <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Home className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Home Tutors</h3>
            <p className="text-muted-foreground mb-6">
              Teach students at their homes. Set your schedule, manage bookings, and grow your tutoring business.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span className="text-sm">Set your own rates</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span className="text-sm">Local student connections</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span className="text-sm">₹150/month after trial</span>
              </li>
            </ul>
            <Link to="/home-tutor-signup">
              <Button variant="premium" className="w-full">
                Join as Home Tutor <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Online Tutor Card */}
          <div className="bg-card rounded-xl shadow-xl hover:shadow-2xl transition-all p-8 border border-border">
            <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <BookOpen className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Online Tutors</h3>
            <p className="text-muted-foreground mb-6">
              Teach students worldwide through virtual sessions. Use our platform to deliver quality education online.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span className="text-sm">Global student reach</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span className="text-sm">Integrated video tools</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span className="text-sm">₹250/month after trial</span>
              </li>
            </ul>
            <Link to="/online-tutor-signup">
              <Button variant="hero" className="w-full">
                Join as Online Tutor <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Verified Profiles</h3>
            <p className="text-sm text-muted-foreground">All users undergo document verification</p>
          </div>
          <div className="text-center">
            <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-semibold mb-2">Quality Tutors</h3>
            <p className="text-sm text-muted-foreground">Experienced and qualified educators</p>
          </div>
          <div className="text-center">
            <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-semibold mb-2">All Subjects</h3>
            <p className="text-sm text-muted-foreground">From academics to skills training</p>
          </div>
          <div className="text-center">
            <div className="bg-success/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-success" />
            </div>
            <h3 className="font-semibold mb-2">Free Trial</h3>
            <p className="text-sm text-muted-foreground">First 3 months absolutely free</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="text-center p-8 bg-gradient-to-br from-primary/5 to-primary/10">
            <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-4xl font-bold mb-2">10,000+</h3>
            <p className="text-muted-foreground">Active Students</p>
          </Card>
          <Card className="text-center p-8 bg-gradient-to-br from-secondary/5 to-secondary/10">
            <Award className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h3 className="text-4xl font-bold mb-2">2,500+</h3>
            <p className="text-muted-foreground">Verified Tutors</p>
          </Card>
          <Card className="text-center p-8 bg-gradient-to-br from-accent/5 to-accent/10">
            <Star className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-4xl font-bold mb-2">4.8/5</h3>
            <p className="text-muted-foreground">Average Rating</p>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground mb-4">
              "Found an amazing math tutor within a day. The verification process gave me confidence in the platform."
            </p>
            <div className="flex items-center gap-3">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Student1" 
                alt="Student" 
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">Anjali Reddy</p>
                <p className="text-sm text-muted-foreground">Student, Class 10</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground mb-4">
              "The platform helped me connect with serious students. The scheduling tools are fantastic!"
            </p>
            <div className="flex items-center gap-3">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tutor1" 
                alt="Tutor" 
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">Rahul Verma</p>
                <p className="text-sm text-muted-foreground">Physics Tutor</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-primary to-primary-glow rounded-2xl p-12 text-center text-primary-foreground">
          <Zap className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of students and tutors on our platform</p>
          <div className="flex gap-4 justify-center">
            <Link to="/student-signup">
              <Button size="lg" variant="secondary">
                Sign Up as Student
              </Button>
            </Link>
            <Link to="/become-tutor">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white">
                Become a Tutor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;