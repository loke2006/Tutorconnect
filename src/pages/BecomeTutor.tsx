import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Users, BookOpen, Home, TrendingUp, Award, Clock, Globe, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const BecomeTutor = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-5xl font-bold mb-6">
            Become a Tutor & Shape Future Minds
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Join India's fastest-growing tutoring platform. Teach on your terms, earn on your schedule.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/home-tutor-signup">
              <Button variant="premium" size="xl">
                Become Home Tutor
              </Button>
            </Link>
            <Link to="/online-tutor-signup">
              <Button variant="hero" size="xl">
                Become Online Tutor
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            ✓ First 3 months FREE ✓ Verified platform ✓ 1000+ active students
          </p>
        </div>

        {/* Why Join Us Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Tutors Choose EduConnect</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-xl transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Grow Your Income</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Set your own rates and schedule. Our top tutors earn over ₹50,000 per month teaching part-time.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-xl transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>Verified Students</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All students are OTP verified and serious about learning. No time wasters, only genuine learners.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-xl transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Build Your Reputation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get ratings, reviews, and build your teaching profile. Stand out as a top-rated educator.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tutor Types Comparison */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Teaching Style</h2>
          <Tabs defaultValue="home" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="home">Home Tutor</TabsTrigger>
              <TabsTrigger value="online">Online Tutor</TabsTrigger>
            </TabsList>
            
            <TabsContent value="home" className="mt-8">
              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Home className="w-8 h-8 text-secondary" />
                    <div>
                      <CardTitle className="text-2xl">Home Tutor</CardTitle>
                      <CardDescription>Teach students at their location</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold mb-4">Benefits</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-success mt-0.5" />
                          <span>Personal connection with students</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-success mt-0.5" />
                          <span>Higher hourly rates (₹500-2000/hour)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-success mt-0.5" />
                          <span>Build local reputation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-success mt-0.5" />
                          <span>Flexible scheduling</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4">Requirements</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-primary mt-0.5" />
                          <span>Minimum graduate degree</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-primary mt-0.5" />
                          <span>Local travel capability</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-primary mt-0.5" />
                          <span>ID & qualification proof</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-primary mt-0.5" />
                          <span>₹150/month after free trial</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Average Earnings:</strong> ₹25,000-40,000/month teaching 15-20 hours/week
                    </p>
                  </div>
                  <Link to="/home-tutor-signup">
                    <Button variant="premium" className="w-full mt-6">
                      Apply as Home Tutor <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="online" className="mt-8">
              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Globe className="w-8 h-8 text-accent" />
                    <div>
                      <CardTitle className="text-2xl">Online Tutor</CardTitle>
                      <CardDescription>Teach students virtually from anywhere</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold mb-4">Benefits</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-success mt-0.5" />
                          <span>Teach from anywhere</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-success mt-0.5" />
                          <span>Access to global students</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-success mt-0.5" />
                          <span>No travel time or costs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-success mt-0.5" />
                          <span>Teach multiple students at once</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4">Requirements</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-primary mt-0.5" />
                          <span>Stable internet connection</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-primary mt-0.5" />
                          <span>Laptop/computer with webcam</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-primary mt-0.5" />
                          <span>Quiet teaching space</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-primary mt-0.5" />
                          <span>₹250/month after free trial</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Average Earnings:</strong> ₹30,000-60,000/month teaching 20-30 hours/week
                    </p>
                  </div>
                  <Link to="/online-tutor-signup">
                    <Button variant="hero" className="w-full mt-6">
                      Apply as Online Tutor <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">How to Get Started</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Sign Up</h3>
              <p className="text-sm text-muted-foreground">
                Create your account with basic information
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Verify OTP</h3>
              <p className="text-sm text-muted-foreground">
                Complete phone verification for security
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Upload Documents</h3>
              <p className="text-sm text-muted-foreground">
                Submit ID and qualification proofs
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Start Teaching</h3>
              <p className="text-sm text-muted-foreground">
                Get approved and start accepting students
              </p>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 text-warning fill-warning">★</div>
                  ))}
                </div>
                <p className="text-sm mb-4">
                  "EduConnect transformed my teaching career. I now earn ₹45,000/month teaching just 4 hours daily from home!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Priya Sharma</p>
                    <p className="text-xs text-muted-foreground">Online Mathematics Tutor</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 text-warning fill-warning">★</div>
                  ))}
                </div>
                <p className="text-sm mb-4">
                  "The platform is amazing! Verified students, timely payments, and great support. Best decision I made!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Rajesh Kumar</p>
                    <p className="text-xs text-muted-foreground">Home Physics Tutor</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 text-warning fill-warning">★</div>
                  ))}
                </div>
                <p className="text-sm mb-4">
                  "Started with 2 students, now teaching 15+ students regularly. The growth has been phenomenal!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Sarah Johnson</p>
                    <p className="text-xs text-muted-foreground">Online English Tutor</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How much can I earn as a tutor?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Earnings depend on your subject, experience, and hours. Home tutors typically earn ₹500-2000/hour, 
                  while online tutors earn ₹400-1500/hour. Top tutors make ₹50,000+ monthly.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is there really a 3-month free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! All new tutors get 3 months completely free. After that, it's only ₹150/month for home tutors 
                  and ₹250/month for online tutors.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How are payments handled?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Students pay you directly for sessions. The platform fee is charged separately through Razorpay. 
                  You keep 100% of your teaching fees.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Teaching Journey?</h2>
            <p className="text-xl mb-8">Join 500+ tutors already making a difference</p>
            <div className="flex gap-4 justify-center">
              <Link to="/home-tutor-signup">
                <Button variant="hero" size="xl">
                  Apply as Home Tutor
                </Button>
              </Link>
              <Link to="/online-tutor-signup">
                <Button variant="hero" size="xl">
                  Apply as Online Tutor
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm">
              <Clock className="w-4 h-4 inline mr-1" />
              Application review within 24 hours
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default BecomeTutor;