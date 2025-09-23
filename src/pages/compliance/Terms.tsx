import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mt-6 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">By accessing EduConnect, you agree to these Terms & Conditions.</p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">2. Platform Fees</h2>
          <ul className="list-disc ml-6 mb-4">
            <li>Students: ₹10/month after 3-month trial</li>
            <li>Home Tutors: ₹150/month after 3-month trial</li>
            <li>Online Tutors: ₹250/month after 3-month trial</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">3. User Verification</h2>
          <p>All users must complete OTP verification and document submission for profile activation.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;