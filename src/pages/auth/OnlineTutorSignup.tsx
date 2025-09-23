import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BookOpen, ArrowLeft, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const OnlineTutorSignup = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Supabase Integration Required",
      description: "Please connect Supabase to enable OTP verification and document upload.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-6 h-6 text-accent" />
            <CardTitle className="text-2xl">Online Tutor Registration</CardTitle>
          </div>
          <CardDescription>
            Teach students worldwide through online sessions. ₹250/month after 3-month free trial.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="First name" required />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Last name" required />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="tutor@example.com" required />
            </div>
            
            <div>
              <Label htmlFor="phone">Mobile Number</Label>
              <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
              <p className="text-xs text-muted-foreground mt-1">OTP will be sent for verification</p>
            </div>
            
            <div>
              <Label htmlFor="qualification">Highest Qualification</Label>
              <Input id="qualification" placeholder="e.g., M.Sc Mathematics, B.Tech Computer Science" required />
            </div>
            
            <div>
              <Label htmlFor="experience">Teaching Experience (Years)</Label>
              <Input id="experience" type="number" placeholder="5" required />
            </div>
            
            <div>
              <Label htmlFor="subjects">Subjects You Can Teach</Label>
              <Input id="subjects" placeholder="Mathematics, Physics, Programming" required />
            </div>
            
            <div>
              <Label htmlFor="languages">Languages</Label>
              <Input id="languages" placeholder="English, Hindi, Regional Languages" required />
            </div>
            
            <div>
              <Label htmlFor="availability">Availability (Hours per week)</Label>
              <Input id="availability" type="number" placeholder="20" required />
            </div>
            
            <div>
              <Label htmlFor="timezone">Preferred Time Zone</Label>
              <Input id="timezone" placeholder="IST (UTC+5:30)" required />
            </div>
            
            <div>
              <Label htmlFor="bio">Teaching Methodology</Label>
              <Textarea 
                id="bio" 
                placeholder="Describe your online teaching approach and tools you use..."
                className="min-h-[100px]"
                required 
              />
            </div>
            
            <div>
              <Label htmlFor="documents">Upload Documents</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Upload ID Proof, Qualification Certificates, Teaching Certifications
                </p>
                <Input id="documents" type="file" className="mt-2" multiple accept=".pdf,.jpg,.png" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Documents will be verified by admin before profile activation
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="terms" required className="rounded" />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the <Link to="/terms" className="text-primary hover:underline">Terms & Conditions</Link>
                </Label>
              </div>
            </div>
            
            <Button type="submit" variant="hero" className="w-full">
              Register as Online Tutor
            </Button>
            
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnlineTutorSignup;