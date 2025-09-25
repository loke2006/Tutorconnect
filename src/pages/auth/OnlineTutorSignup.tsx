import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, ArrowLeft, Upload, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const OnlineTutorSignup = () => {
  const { toast } = useToast();
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    qualification: "",
    experience: "",
    subjects: "",
    languages: "",
    availability: "",
    timezone: "",
    methodology: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sign up the user - the trigger will automatically create tutor profile
      const { data: authData, error: authError } = await signUp(
        formData.email,
        formData.password,
        {
          full_name: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          role: 'tutor',
          tutor_type: 'online',
          qualification: formData.qualification,
          experience_years: formData.experience,
          subjects: formData.subjects,
          languages: formData.languages,
          availability: formData.availability,
          timezone: formData.timezone,
          teaching_methodology: formData.methodology
        }
      );

      if (authError) throw authError;

      toast({
        title: "Registration successful!",
        description: "Please check your email to verify your account. Admin will verify your documents soon.",
      });
      
      navigate('/login');
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
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
                <Input 
                  id="firstName" 
                  placeholder="First name" 
                  required 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  placeholder="Last name" 
                  required 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="tutor@example.com" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Choose a strong password" 
                required 
                minLength={6}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Mobile Number</Label>
              <Input 
                id="phone" 
                type="tel" 
                placeholder="+91 98765 43210" 
                required 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="qualification">Highest Qualification</Label>
              <Input 
                id="qualification" 
                placeholder="e.g., M.Sc Mathematics, B.Tech Computer Science" 
                required 
                value={formData.qualification}
                onChange={(e) => setFormData({...formData, qualification: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="experience">Teaching Experience (Years)</Label>
              <Input 
                id="experience" 
                type="number" 
                placeholder="5" 
                required 
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="subjects">Subjects You Can Teach</Label>
              <Input 
                id="subjects" 
                placeholder="Mathematics, Physics, Programming" 
                required 
                value={formData.subjects}
                onChange={(e) => setFormData({...formData, subjects: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="languages">Languages</Label>
              <Input 
                id="languages" 
                placeholder="English, Hindi, Regional Languages" 
                required 
                value={formData.languages}
                onChange={(e) => setFormData({...formData, languages: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="availability">Availability (Hours per week)</Label>
              <Input 
                id="availability" 
                type="number" 
                placeholder="20" 
                required 
                value={formData.availability}
                onChange={(e) => setFormData({...formData, availability: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="timezone">Preferred Time Zone</Label>
              <Input 
                id="timezone" 
                placeholder="IST (UTC+5:30)" 
                required 
                value={formData.timezone}
                onChange={(e) => setFormData({...formData, timezone: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="methodology">Teaching Methodology</Label>
              <Textarea 
                id="methodology" 
                placeholder="Describe your online teaching approach and tools you use..."
                className="min-h-[100px]"
                required 
                value={formData.methodology}
                onChange={(e) => setFormData({...formData, methodology: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="documents">Upload Documents (Coming Soon)</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Document upload will be available after registration
                </p>
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
            
            <Button 
              type="submit" 
              variant="hero" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Register as Online Tutor"
              )}
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