import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RazorpayTerms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-8">Payment Terms - Razorpay</h1>
        <div className="prose max-w-none">
          <p className="mb-4">All payments are securely processed through Razorpay payment gateway.</p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Supported Payment Methods</h2>
          <ul className="list-disc ml-6">
            <li>Credit/Debit Cards</li>
            <li>UPI</li>
            <li>Net Banking</li>
            <li>Wallets</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RazorpayTerms;