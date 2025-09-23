import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, LogIn, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">EduConnect</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </Link>
            <Link to="/find-tutors" className="text-muted-foreground hover:text-foreground transition-colors">
              Find Tutors
            </Link>
            <Link to="/become-tutor" className="text-muted-foreground hover:text-foreground transition-colors">
              Become a Tutor
            </Link>
            <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">
                Login
              </Button>
            </Link>
            <Link to="/student-signup">
              <Button variant="gradient">
                Sign Up
              </Button>
            </Link>
            <Link to="/admin-login">
              <Button variant="outline" size="sm">
                <LogIn className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                How it Works
              </Link>
              <Link to="/find-tutors" className="text-muted-foreground hover:text-foreground transition-colors">
                Find Tutors
              </Link>
              <Link to="/become-tutor" className="text-muted-foreground hover:text-foreground transition-colors">
                Become a Tutor
              </Link>
              <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/student-signup">
                  <Button variant="gradient" className="w-full">
                    Sign Up
                  </Button>
                </Link>
                <Link to="/admin-login">
                  <Button variant="outline" size="sm" className="w-full">
                    <LogIn className="w-4 h-4 mr-2" />
                    Admin Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;