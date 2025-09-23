import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
        <div className="prose max-w-none">
          <p className="mb-4">3-month free trial for all users. Refunds available within 7 days of payment for valid reasons.</p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Eligibility</h2>
          <p>Refunds are processed for technical issues or service unavailability.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RefundPolicy;