import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Shield, ArrowLeft, Lock, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const AdminLogin = () => {
  const { toast } = useToast();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    securityCode: ""
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // For admin login, we'll check the security code on the frontend
      // In production, this should be verified on the backend
      if (formData.securityCode !== "123456") {
        throw new Error("Invalid security code");
      }

      const { data, error } = await signIn(formData.email, formData.password);
      
      if (error) throw error;

      toast({
        title: "Admin login successful!",
        description: "Redirecting to admin dashboard...",
      });
      
    } catch (error: any) {
      toast({
        title: "Admin login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-2 border-primary/20">
        <CardHeader>
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-6 h-6 text-primary" />
            <CardTitle className="text-2xl">Super Admin Login</CardTitle>
          </div>
          <CardDescription>
            Restricted access - Admin credentials required
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="adminEmail">Admin Email</Label>
              <Input 
                id="adminEmail" 
                type="email" 
                placeholder="admin@educonnect.in" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="adminPassword">Admin Password</Label>
              <Input 
                id="adminPassword" 
                type="password" 
                placeholder="Enter admin password" 
                required 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="securityCode">Security Code</Label>
              <Input 
                id="securityCode" 
                type="text" 
                placeholder="Enter 6-digit security code" 
                maxLength={6}
                required 
                value={formData.securityCode}
                onChange={(e) => setFormData({...formData, securityCode: e.target.value})}
              />
              <p className="text-xs text-muted-foreground mt-1">
                For testing: Use security code <strong>123456</strong>
              </p>
            </div>
            
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-warning mt-0.5" />
                <div className="text-xs text-muted-foreground">
                  <p className="font-semibold mb-1">Security Notice:</p>
                  <p>This area is restricted to authorized administrators only. All login attempts are logged and monitored.</p>
                </div>
              </div>
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
                  Verifying credentials...
                </>
              ) : (
                "Access Admin Dashboard"
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Need help? Contact IT support at{" "}
              <a href="mailto:it@educonnect.in" className="text-primary hover:underline">
                it@educonnect.in
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;