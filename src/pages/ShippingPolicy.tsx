import { Header } from "@/components/header";

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Shipping Policy</h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <h2 className="text-2xl font-semibold mt-8 mb-4">International Shipping</h2>
            <p>
              For International buyers, orders are shipped and delivered through registered international courier companies and/or International speed post only.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Domestic Shipping</h2>
            <p>
              For domestic buyers, orders are shipped through registered domestic courier companies and/or speed post only.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Processing & Delivery Time</h2>
            <p>
              Orders are shipped within 6-8 days or as per the delivery date agreed at the time of order confirmation and delivering of the shipment subject to Courier Company / post office norms.
            </p>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-6">
              <h3 className="text-lg font-semibold text-amber-800 mb-2">Important Notice</h3>
              <p className="text-amber-700">
                GURSHANT ARORA is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within 6-8 days from the date of the order and payment or as per the delivery date agreed at the time of order confirmation.
              </p>
            </div>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Delivery Address</h2>
            <p>
              Delivery of all orders will be to the address provided by the buyer. Delivery of our services will be confirmed on your mail ID as specified during registration.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Support</h2>
            <p>
              For any issues in utilizing our services you may contact our helpdesk:
            </p>
            <div className="bg-muted p-6 rounded-lg">
              <p><strong>Phone:</strong> 9953293821</p>
              <p><strong>Email:</strong> aroramanya801@gmail.com</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShippingPolicy;