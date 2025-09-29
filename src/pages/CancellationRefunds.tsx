import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const CancellationRefunds = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Cancellation & Refunds</h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <p>
              GURSHANT ARORA believes in helping its customers as far as possible, and has therefore a liberal cancellation policy.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Cancellation Policy</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Under this policy:</h3>
              <ul className="list-disc pl-6 space-y-2 text-blue-700">
                <li>Cancellations will be considered only if the request is made within 1-2 days of placing the order.</li>
                <li>However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.</li>
                <li>GURSHANT ARORA does not accept cancellation requests for perishable items like flowers, eatables etc.</li>
                <li>However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.</li>
              </ul>
            </div>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Damaged or Defective Items</h2>
            <p>
              In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within 1-2 days of receipt of the products.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Product Expectations</h2>
            <p>
              In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 1-2 days of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Warranty Claims</h2>
            <p>
              In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Refund Processing</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <p className="text-green-700">
                <strong>Processing Time:</strong> In case of any Refunds approved by the GURSHANT ARORA, it'll take 3-5 days for the refund to be processed to the end customer.
              </p>
            </div>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Customer Service</h2>
            <div className="bg-muted p-6 rounded-lg">
              <p><strong>Phone:</strong> 9953293821</p>
              <p><strong>Email:</strong> aroramanya801@gmail.com</p>
              <p><strong>Address:</strong> a9 kuber nagar society Mahesana GUJARAT 382715</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CancellationRefunds;