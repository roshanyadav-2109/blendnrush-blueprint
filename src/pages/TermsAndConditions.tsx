import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <p>
              For the purpose of these Terms and Conditions, The term "we", "us", "our" used anywhere on this page shall mean GURSHANT ARORA, whose registered/operational office is a9 kuber nagar society Mahesana GUJARAT 382715. "you", "your", "user", "visitor" shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us.
            </p>
            
            <p>
              Your use of the website and/or purchase from us are governed by following Terms and Conditions:
            </p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li>The content of the pages of this website is subject to change without notice.</li>
              <li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose.</li>
              <li>You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</li>
              <li>Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable.</li>
              <li>It shall be your own responsibility to ensure that any products, services or information available through our website and/or product pages meet your specific requirements.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Intellectual Property</h2>
            <p>
              Our website contains material which is owned by or licensed to us. This material includes, but are not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
            </p>
            
            <p>
              All trademarks reproduced in our website which are not the property of, or licensed to, the operator are acknowledged on the website. Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">External Links</h2>
            <p>
              From time to time our website may also include links to other websites. These links are provided for your convenience to provide further information. You may not create a link to our website from another website or document without GURSHANT ARORA's prior written consent.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Governing Law</h2>
            <p>
              Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India. We, shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <div className="bg-muted p-6 rounded-lg">
              <p><strong>Merchant Legal entity name:</strong> GURSHANT ARORA</p>
              <p><strong>Registered Address:</strong> a9 kuber nagar society Mahesana GUJARAT 382715</p>
              <p><strong>Telephone No:</strong> 9953293821</p>
              <p><strong>E-Mail ID:</strong> aroramanya801@gmail.com</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;