import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Check, 
  X, 
  Star, 
  Users, 
  Home, 
  Globe,
  Clock,
  CreditCard,
  Shield,
  BookOpen,
  TrendingUp,
  Award
} from "lucide-react";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">Simple & Transparent Pricing</Badge>
          <h1 className="text-5xl font-bold mb-6">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start with 3 months FREE for all users. No credit card required to begin.
          </p>
        </div>

        {/* Pricing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-muted p-1 rounded-lg">
            <Button variant="ghost" className="data-[state=active]:bg-background data-[state=active]:shadow-sm" data-state="active">
              Monthly Billing
            </Button>
            <Button variant="ghost" disabled className="relative">
              Annual Billing
              <Badge className="absolute -top-2 -right-2" variant="default">Coming Soon</Badge>
            </Button>
          </div>
        </div>

        {/* Student Pricing */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">For Students</h2>
          <div className="max-w-lg mx-auto">
            <Card className="border-primary shadow-xl">
              <CardHeader className="text-center pb-8">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-3xl">Student Plan</CardTitle>
                <CardDescription>Access all tutors and features</CardDescription>
                <div className="mt-6">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold">₹10</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <Badge className="mt-2" variant="outline">After 3 months free trial</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {[
                    "Access to all verified tutors",
                    "Unlimited tutor searches",
                    "Direct messaging with tutors",
                    "Book unlimited sessions",
                    "Schedule management dashboard",
                    "Progress tracking tools",
                    "24/7 customer support",
                    "Secure payment processing",
                    "Session reminders & notifications",
                    "Mobile app access (coming soon)"
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-success flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link to="/student-signup" className="block">
                  <Button variant="gradient" size="lg" className="w-full">
                    Start Free Trial
                  </Button>
                </Link>
                
                <p className="text-center text-sm text-muted-foreground">
                  No credit card required • Cancel anytime
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tutor Pricing */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">For Tutors</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Home Tutor Plan */}
            <Card className="relative">
              <CardHeader className="text-center pb-8">
                <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-10 h-10 text-secondary" />
                </div>
                <CardTitle className="text-2xl">Home Tutor</CardTitle>
                <CardDescription>Teach students at their location</CardDescription>
                <div className="mt-6">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold">₹150</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <Badge className="mt-2" variant="outline">After 3 months free trial</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {[
                    "Local student connections",
                    "Set your own hourly rates",
                    "Flexible scheduling",
                    "Profile visibility in searches",
                    "Booking management system",
                    "Payment tracking dashboard",
                    "Student reviews & ratings",
                    "Document verification badge",
                    "Priority support",
                    "Marketing tools"
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-success flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Earning Potential */}
                <Card className="bg-secondary/5 border-secondary/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-secondary" />
                      <span className="font-semibold text-sm">Earning Potential</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Average: ₹500-1500/hour
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Based on subject and experience
                    </p>
                  </CardContent>
                </Card>
                
                <Link to="/home-tutor-signup" className="block">
                  <Button variant="premium" size="lg" className="w-full">
                    Start Teaching Locally
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Online Tutor Plan */}
            <Card className="relative border-accent">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-accent text-accent-foreground">Most Popular</Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-10 h-10 text-accent" />
                </div>
                <CardTitle className="text-2xl">Online Tutor</CardTitle>
                <CardDescription>Teach students worldwide</CardDescription>
                <div className="mt-6">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold">₹250</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <Badge className="mt-2" variant="outline">After 3 months free trial</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {[
                    "Global student reach",
                    "Set your own hourly rates",
                    "Integrated video tools",
                    "Screen sharing capabilities",
                    "Digital whiteboard access",
                    "Session recording feature",
                    "International payment support",
                    "Premium profile badge",
                    "Priority listing in searches",
                    "Advanced analytics dashboard"
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-success flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Earning Potential */}
                <Card className="bg-accent/5 border-accent/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-accent" />
                      <span className="font-semibold text-sm">Earning Potential</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Average: ₹600-2000/hour
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Higher rates for international students
                    </p>
                  </CardContent>
                </Card>
                
                <Link to="/online-tutor-signup" className="block">
                  <Button variant="hero" size="lg" className="w-full">
                    Start Teaching Online
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Feature Comparison</h2>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Features</th>
                      <th className="text-center p-4">
                        <div className="flex flex-col items-center gap-2">
                          <Users className="w-5 h-5 text-primary" />
                          <span>Students</span>
                        </div>
                      </th>
                      <th className="text-center p-4">
                        <div className="flex flex-col items-center gap-2">
                          <Home className="w-5 h-5 text-secondary" />
                          <span>Home Tutors</span>
                        </div>
                      </th>
                      <th className="text-center p-4">
                        <div className="flex flex-col items-center gap-2">
                          <Globe className="w-5 h-5 text-accent" />
                          <span>Online Tutors</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: "Monthly Price", student: "₹10", home: "₹150", online: "₹250" },
                      { feature: "Free Trial", student: "3 months", home: "3 months", online: "3 months" },
                      { feature: "Profile Creation", student: true, home: true, online: true },
                      { feature: "Document Verification", student: true, home: true, online: true },
                      { feature: "Search & Browse", student: true, home: false, online: false },
                      { feature: "Set Custom Rates", student: false, home: true, online: true },
                      { feature: "Booking Management", student: true, home: true, online: true },
                      { feature: "Video Calling", student: true, home: false, online: true },
                      { feature: "Payment Processing", student: true, home: true, online: true },
                      { feature: "Reviews & Ratings", student: true, home: true, online: true },
                      { feature: "Analytics Dashboard", student: false, home: true, online: true },
                      { feature: "Priority Support", student: false, home: true, online: true },
                    ].map((row) => (
                      <tr key={row.feature} className="border-b">
                        <td className="p-4 font-medium">{row.feature}</td>
                        <td className="p-4 text-center">
                          {typeof row.student === 'boolean' ? (
                            row.student ? (
                              <Check className="w-5 h-5 text-success mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-muted-foreground mx-auto" />
                            )
                          ) : (
                            <span>{row.student}</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {typeof row.home === 'boolean' ? (
                            row.home ? (
                              <Check className="w-5 h-5 text-success mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-muted-foreground mx-auto" />
                            )
                          ) : (
                            <span>{row.home}</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {typeof row.online === 'boolean' ? (
                            row.online ? (
                              <Check className="w-5 h-5 text-success mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-muted-foreground mx-auto" />
                            )
                          ) : (
                            <span>{row.online}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: "When does billing start?",
                a: "Billing starts after your 3-month free trial ends. No credit card required to start."
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes, you can cancel your subscription anytime from your dashboard. No questions asked."
              },
              {
                q: "How do tutors get paid?",
                a: "Tutors receive payments directly from students through our secure Razorpay integration."
              },
              {
                q: "Are there any hidden fees?",
                a: "No hidden fees. The platform fee is all you pay. Tutors set their own session rates."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-12 text-center">
            <Award className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">Start Your Free Trial Today</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of students and tutors already using our platform
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/">
                <Button variant="hero" size="lg">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" size="lg" className="bg-white/10 border-white/20 hover:bg-white/20">
                  Learn More
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Pricing;