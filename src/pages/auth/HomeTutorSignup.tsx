import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Upload, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { validatePassword, validateEmail } from "@/lib/validation";

const HomeTutorSignup = () => {
  const { toast } = useToast();
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [emailErrors, setEmailErrors] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    qualification: "",
    experience: "",
    subjects: "",
    location: "",
    bio: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email and password
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    
    setEmailErrors(emailValidation.errors);
    setPasswordErrors(passwordValidation.errors);
    
    if (!emailValidation.valid || !passwordValidation.valid) {
      return;
    }
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
          tutor_type: 'home',
          qualification: formData.qualification,
          experience_years: formData.experience,
          subjects: formData.subjects,
          service_areas: formData.location,
          bio: formData.bio
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
            <Home className="w-6 h-6 text-secondary" />
            <CardTitle className="text-2xl">Home Tutor Registration</CardTitle>
          </div>
          <CardDescription>
            Join as a home tutor and teach students at their location. ₹150/month after 3-month free trial.
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
                onChange={(e) => {
                  setFormData({...formData, email: e.target.value});
                  setEmailErrors([]);
                }}
                className={emailErrors.length > 0 ? "border-destructive" : ""}
              />
              {emailErrors.length > 0 && (
                <div className="text-sm text-destructive mt-1">
                  {emailErrors.map((error, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {error}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Choose a strong password" 
                required 
                value={formData.password}
                onChange={(e) => {
                  setFormData({...formData, password: e.target.value});
                  setPasswordErrors([]);
                }}
                className={passwordErrors.length > 0 ? "border-destructive" : ""}
              />
              {passwordErrors.length > 0 && (
                <div className="text-sm text-destructive mt-1">
                  {passwordErrors.map((error, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {error}
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Password must be at least 8 characters with uppercase, lowercase, number and special character
              </p>
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
                placeholder="Mathematics, Physics, Chemistry" 
                required 
                value={formData.subjects}
                onChange={(e) => setFormData({...formData, subjects: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="location">Service Areas</Label>
              <Input 
                id="location" 
                placeholder="Mumbai, Thane, Navi Mumbai" 
                required 
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="bio">Brief Introduction</Label>
              <Textarea 
                id="bio" 
                placeholder="Tell us about your teaching experience and methodology..."
                className="min-h-[100px]"
                required 
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
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
              variant="premium" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Register as Home Tutor"
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

export default HomeTutorSignup;