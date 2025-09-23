import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, BookOpen, Home, Shield, Check, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
            <Button variant="hero" size="xl">
              Get Started - First 3 Months Free
            </Button>
            <Button variant="outline" size="xl">
              Learn More
            </Button>
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

      <Footer />
    </div>
  );
};

export default Index;