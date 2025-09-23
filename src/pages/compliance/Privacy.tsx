import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose max-w-none">
          <p className="mb-4">EduConnect respects your privacy and protects your personal data.</p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Data Collection</h2>
          <p>We collect information necessary for providing tutoring services including name, contact details, and educational information.</p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Data Security</h2>
          <p>All data is encrypted and stored securely. Payment information is processed through Razorpay.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;