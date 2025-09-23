import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-6 h-6 text-primary" />
              <span className="text-lg font-bold">EduConnect</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              India's trusted platform for connecting students with verified tutors. Quality education made accessible.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@educonnect.in</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, Maharashtra</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                  How it Works
                </Link>
              </li>
              <li>
                <Link to="/find-tutors" className="text-muted-foreground hover:text-foreground transition-colors">
                  Find Tutors
                </Link>
              </li>
              <li>
                <Link to="/become-tutor" className="text-muted-foreground hover:text-foreground transition-colors">
                  Become a Tutor
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* For Students */}
          <div>
            <h3 className="font-semibold mb-4">For Students</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/student-signup" className="text-muted-foreground hover:text-foreground transition-colors">
                  Student Registration
                </Link>
              </li>
              <li>
                <Link to="/browse-subjects" className="text-muted-foreground hover:text-foreground transition-colors">
                  Browse Subjects
                </Link>
              </li>
              <li>
                <Link to="/student-faqs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Student FAQs
                </Link>
              </li>
              <li>
                <Link to="/student-support" className="text-muted-foreground hover:text-foreground transition-colors">
                  Student Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h3 className="font-semibold mb-4">Legal & Compliance</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/razorpay-terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Payment Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2024 EduConnect. All rights reserved. | Made with ❤️ in India</p>
          <p className="mt-2">Payments secured by Razorpay | All users OTP verified</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;