import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Users, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const StudentSignup = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Supabase Integration Required",
      description: "Please connect Supabase to enable OTP verification and user registration.",
    });
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
              <Input id="name" placeholder="Enter your full name" required />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="student@example.com" required />
            </div>
            <div>
              <Label htmlFor="phone">Mobile Number</Label>
              <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
              <p className="text-xs text-muted-foreground mt-1">OTP will be sent for verification</p>
            </div>
            <div>
              <Label htmlFor="grade">Grade/Class</Label>
              <Input id="grade" placeholder="e.g., Class 10, B.Tech 2nd Year" required />
            </div>
            <div>
              <Label htmlFor="subjects">Subjects of Interest</Label>
              <Input id="subjects" placeholder="Mathematics, Physics, English" required />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="City, State" required />
            </div>
            
            <Button type="submit" variant="gradient" className="w-full">
              Create Student Account
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