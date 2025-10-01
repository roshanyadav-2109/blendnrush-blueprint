import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import heroProduct from "@/assets/hero-product.jpg";
import { CreditCard, Smartphone, Banknote, Landmark } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Payment() {
  const [searchParams] = useSearchParams();
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const quantity = parseInt(searchParams.get("quantity") || "1");
  const price = parseInt(searchParams.get("price") || "449");
  const isTest = searchParams.get("test") === "true";
  const name = searchParams.get("name") || "";
  const contact = searchParams.get("contact") || "";
  const email = searchParams.get("email") || "";
  const address = searchParams.get("address") || "";
  const pincode = searchParams.get("pincode") || "";

  const totalAmount = price * quantity;

  const paymentMethods = [
    { value: "UPI", label: "UPI", icon: Smartphone },
    { value: "Credit Card", label: "Credit Card", icon: CreditCard },
    { value: "Debit Card", label: "Debit Card", icon: CreditCard },
    { value: "Net Banking", label: "Net Banking", icon: Landmark },
    { value: "Cash on Delivery", label: "Cash on Delivery", icon: Banknote },
  ];

  const handlePayment = async () => {
    if (!paymentMethod) {
      toast({
        title: "Select Payment Method",
        description: "Please select a payment method to continue",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // For Cash on Delivery or Test Mode, create order directly
      if (paymentMethod === "Cash on Delivery" || (isTest && totalAmount === 0)) {
        const { error: dbError } = await supabase.from("orders").insert([
          {
            customer_email: email,
            customer_name: name,
            customer_contact: contact,
            address: address,
            pincode: pincode,
            total_pricing: totalAmount,
            order_status: "Pending",
            quantity: quantity,
            mode_of_payment: paymentMethod,
          },
        ]);

        if (dbError) {
          toast({
            title: "Order Creation Failed",
            description: "Could not create your order.",
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Order Placed Successfully",
          description: paymentMethod === "Cash on Delivery" 
            ? "Your order will be delivered in 3-5 days. Pay on delivery!"
            : "Your test order has been placed successfully!",
        });
        
        window.location.href = "/";
        return;
      }

      // For online payment methods, use Razorpay
      const { data: order, error: orderError } =
        await supabase.functions.invoke("razorpay", {
          body: {
            action: "create-order",
            amount: totalAmount,
          },
        });

      if (orderError) throw orderError;

      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "BlendNRush",
        description: "BlendNRush Product Purchase",
        order_id: order.orderId,
        handler: async function (response: any) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          const { error: verifyError } = await supabase.functions.invoke(
            "razorpay",
            {
              body: {
                action: "verify-payment",
                paymentId: razorpay_payment_id,
                orderId: razorpay_order_id,
                signature: razorpay_signature,
              },
            }
          );

          if (verifyError) {
            toast({
              title: "Payment Verification Failed",
              description: "There was an issue verifying your payment.",
              variant: "destructive",
            });
            return;
          }

          const { error: dbError } = await supabase.from("orders").insert([
            {
              customer_email: email,
              customer_name: name,
              customer_contact: contact,
              address: address,
              pincode: pincode,
              total_pricing: totalAmount,
              order_status: "Pending",
              quantity: quantity,
              mode_of_payment: paymentMethod,
            },
          ]);

          if (dbError) {
            toast({
              title: "Order Creation Failed",
              description:
                "Your payment was successful but we could not create your order.",
              variant: "destructive",
            });
            return;
          }

          toast({
            title: "Payment Successful",
            description: "Your order has been placed successfully!",
          });
          
          window.location.href = "/";
        },
        prefill: {
          name: name,
          email: email,
          contact: contact,
        },
        theme: {
          color: "#F56565",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: any) {
      toast({
        title: "Payment Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />

      <main className="container px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Payment</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Payment Methods */}
          <div>
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">
                  Select Payment Method
                </h2>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.value}
                        className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-all ${
                          paymentMethod === method.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setPaymentMethod(method.value)}
                      >
                        <RadioGroupItem value={method.value} id={method.value} />
                        <method.icon className="h-5 w-5 text-muted-foreground" />
                        <Label
                          htmlFor={method.value}
                          className="flex-1 cursor-pointer"
                        >
                          {method.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing || !paymentMethod}
                  className="w-full mt-6"
                  size="lg"
                >
                  {isProcessing
                    ? "Processing..."
                    : paymentMethod === "Cash on Delivery"
                    ? "Place Order"
                    : `Pay ₹${totalAmount}`}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="mb-4">
                  <img
                    src={heroProduct}
                    alt="Product"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold">
                      All-in-One Kitchen Appliance
                    </h3>
                    {isTest && (
                      <Badge className="bg-warning/10 text-warning mt-2">
                        TEST MODE
                      </Badge>
                    )}
                  </div>

                  <div className="border-t pt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">{name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Contact:</span>
                      <span className="font-medium">{contact}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium">{email}</span>
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Quantity:</span>
                      <span className="font-medium">{quantity}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-muted-foreground">
                        Price per unit:
                      </span>
                      <span className="font-medium">₹{price}</span>
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-primary">
                        ₹{totalAmount}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
