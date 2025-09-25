import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Users, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { validatePassword, validateEmail } from "@/lib/validation";

const StudentSignup = () => {
  const { toast } = useToast();
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [emailErrors, setEmailErrors] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    grade: "",
    subjects: "",
    location: ""
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
      // Sign up the user - the trigger will automatically create student profile
      const { data: authData, error: authError } = await signUp(
        formData.email,
        formData.password,
        {
          full_name: formData.fullName,
          phone: formData.phone,
          role: 'student',
          grade: formData.grade,
          subjects: formData.subjects,
          location: formData.location
        }
      );

      if (authError) throw authError;

      toast({
        title: "Registration successful!",
        description: "Please check your email to verify your account.",
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
      <Card className="w-full max-w-md">
        <CardHeader>
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-6 h-6 text-primary" />
            <CardTitle className="text-2xl">Student Registration</CardTitle>
          </div>
          <CardDescription>
            Create your account to find the perfect tutor. First 3 months free!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="Enter your full name" 
                required 
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="student@example.com" 
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
              <Label htmlFor="grade">Grade/Class</Label>
              <Input 
                id="grade" 
                placeholder="e.g., Class 10, B.Tech 2nd Year" 
                required 
                value={formData.grade}
                onChange={(e) => setFormData({...formData, grade: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="subjects">Subjects of Interest</Label>
              <Input 
                id="subjects" 
                placeholder="Mathematics, Physics, English" 
                required 
                value={formData.subjects}
                onChange={(e) => setFormData({...formData, subjects: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                placeholder="City, State" 
                required 
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
            
            <Button 
              type="submit" 
              variant="gradient" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Student Account"
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

export default StudentSignup;