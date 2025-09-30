import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Star,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  ChevronDown,
  Heart,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";
import {
  CustomerDetailsDialog,
  CustomerDetails,
} from "@/components/customer-details-dialog";

const TEST_EMAILS = ["admin@blendnrush.com", "customer@test.com"];

const variants = [
  { id: 1, name: "Standard Pack", price: 449, originalPrice: 999 },
  {
    id: 2,
    name: "Pro Pack",
    price: 749,
    originalPrice: 1499,
    comingSoon: true,
  },
];

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function ProductInfo() {
  const { user } = useAuth();
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);

  const isTestUser = user?.email && TEST_EMAILS.includes(user.email);
  const effectivePrice = isTestUser ? 0 : selectedVariant.price;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleBuyNowClick = () => {
    setShowCustomerDialog(true);
  };

  const handleCustomerDetailsSubmit = async (details: CustomerDetails) => {
    setShowCustomerDialog(false);

    const totalAmount = effectivePrice * quantity;

    // If test user with ₹0, skip Razorpay and create order directly
    if (isTestUser && totalAmount === 0) {
      try {
        const { error: dbError } = await supabase.from("orders").insert([
          {
            customer_email: details.email,
            customer_name: details.name,
            customer_contact: details.contact,
            address: details.address,
            pincode: details.pincode,
            total_pricing: 0,
            order_status: "Pending",
            quantity: quantity,
          },
        ]);

        if (dbError) {
          toast({
            title: "Order Creation Failed",
            description: "Could not create your test order.",
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Test Order Created",
          description: "Your test order has been placed successfully (₹0)!",
        });
      } catch (error: any) {
        toast({
          title: "Order Error",
          description: error.message,
          variant: "destructive",
        });
      }
      return;
    }

    try {
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
          const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
          } = response;

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
              customer_email: details.email,
              customer_name: details.name,
              customer_contact: details.contact,
              address: details.address,
              pincode: details.pincode,
              total_pricing: totalAmount,
              order_status: "Pending",
              quantity: quantity,
            },
          ]);

          if (dbError) {
            toast({
              title: "Order Creation Failed",
              description: "Your payment was successful but we could not create your order.",
              variant: "destructive",
            });
            return;
          }

          toast({
            title: "Payment Successful",
            description: "Your order has been placed successfully!",
          });
        },
        prefill: {
          name: details.name,
          email: details.email,
          contact: details.contact,
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
    }
  };

  const discountPercentage = Math.round(
    ((selectedVariant.originalPrice - selectedVariant.price) /
      selectedVariant.originalPrice) *
      100
  );

  return (
    <div className="space-y-6">
      {/* Product Title & Rating */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge
            variant="secondary"
            className="bg-success/10 text-success font-medium"
          >
            Best Seller
          </Badge>
          <Badge variant="outline">Free Shipping</Badge>
          {isTestUser && (
            <Badge className="bg-warning/10 text-warning font-medium">
              TEST MODE
            </Badge>
          )}
        </div>

        <h1 className="text-3xl font-bold mb-3">
          All-in-One Kitchen Appliance
        </h1>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-warning text-warning" />
            ))}
          </div>
          <span className="text-lg font-semibold">4.8</span>
          <span className="text-muted-foreground">(2,847 reviews)</span>
        </div>
      </div>

      {/* Price & Offers */}
      <Card className="bg-gradient-muted border-primary/20">
        <CardContent className="pt-6">
          {isTestUser ? (
            <div className="mb-3">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-warning">₹0</span>
                <Badge className="bg-warning/10 text-warning">
                  TEST PAYMENT
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                You're using a test account. All purchases are free.
              </p>
            </div>
          ) : (
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-3xl font-bold text-primary">
                ₹{selectedVariant.price}
              </span>
              <span className="text-xl text-muted-foreground line-through">
                ₹{selectedVariant.originalPrice}
              </span>
              <Badge className="bg-destructive text-destructive-foreground">
                {discountPercentage}% OFF
              </Badge>
            </div>
          )}

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              Authentic Product
            </span>
            <span className="flex items-center gap-1">
              <Truck className="w-4 h-4" />
              Free Delivery
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Product Description */}
      <div className="space-y-3">
        <p className="text-muted-foreground leading-relaxed">
          Transform your kitchen with this revolutionary all-in-one device that
          blends, grinds, and juices with professional precision. Perfect for
          busy lifestyles and health-conscious individuals.
        </p>

        <Collapsible
          open={showFullDescription}
          onOpenChange={setShowFullDescription}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="p-0 h-auto font-medium text-primary"
            >
              <span>View detailed description</span>
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform ${
                  showFullDescription ? "rotate-180" : ""
                }`}
              />
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="space-y-4 mt-4">
            <div>
              <h3 className="font-semibold mb-2">Key Features:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                <li>• 3-in-1 functionality: Blend, grind, and juice</li>
                <li>• Powerful 1200W motor for smooth operation</li>
                <li>• BPA-free materials for safe food preparation</li>
                <li>• Compact design saves 60% counter space</li>
                <li>• Easy-clean detachable components</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Perfect For:</h3>
              <p className="text-sm text-muted-foreground">
                Smoothie enthusiasts, coffee lovers, health-conscious
                individuals, small kitchens, and anyone looking to simplify
                their food preparation routine.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Variant Selection */}
      <div className="space-y-3">
        <h3 className="font-semibold">Choose Your Pack:</h3>
        <div className="grid gap-3">
          {variants.map((variant) => (
            <Card
              key={variant.id}
              className={`cursor-pointer transition-all ${
                selectedVariant.id === variant.id
                  ? "border-primary shadow-brand"
                  : variant.comingSoon
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:border-primary/50"
              }`}
              onClick={() => !variant.comingSoon && setSelectedVariant(variant)}
            >
              <CardContent className="pt-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{variant.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold">₹{variant.price}</span>
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{variant.originalPrice}
                      </span>
                    </div>
                  </div>
                  {variant.comingSoon && (
                    <Badge variant="outline">Coming Soon</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quantity & Add to Cart */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="font-medium">Quantity:</span>
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleQuantityChange(-1)}
              className="h-10 w-10"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleQuantityChange(1)}
              className="h-10 w-10"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-3">
          <Button size="lg" className="flex-1 h-12 text-lg font-semibold">
            Add to Cart
          </Button>
          <Button size="icon" variant="outline" className="h-12 w-12">
            <Heart className="h-5 w-5" />
          </Button>
        </div>

        <Button
          size="lg"
          className="w-full h-12 text-lg font-semibold bg-success hover:bg-success/90"
          onClick={handleBuyNowClick}
        >
          Buy Now - ₹{effectivePrice * quantity}
        </Button>
      </div>

      <Separator />

      {/* Trust Badges */}
      <div className="text-center space-y-2">
        <div className="flex justify-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            Secure Payment
          </span>
          <span className="flex items-center gap-1">
            <Truck className="w-4 h-4" />
            Fast Shipping
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          30-day return policy • Secure transactions
        </p>
      </div>

      <CustomerDetailsDialog
        open={showCustomerDialog}
        onOpenChange={setShowCustomerDialog}
        onSubmit={handleCustomerDetailsSubmit}
        totalAmount={effectivePrice * quantity}
      />
    </div>
  );
}
