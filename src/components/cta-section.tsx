import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Shield, Truck, RotateCcw } from "lucide-react";

export function CtaSection() {
  const features = [
    "The BlendNRush All-in-One Device",
    "Blender & Grinder Blade Attachment",
    "On-the-Go Juicer Attachment",
    "Free, Fast Shipping Anywhere in India",
    "30-Day Happiness Guarantee"
  ];

  const guarantees = [
    { icon: Truck, text: "Free Shipping" },
    { icon: RotateCcw, text: "30-Day Returns" },
    { icon: Shield, text: "2-Year Warranty" }
  ];

  return (
    <section className="py-20 bg-gradient-muted">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl bg-card/95 backdrop-blur">
            <CardContent className="p-12">
              <div className="text-center space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold">Ready to Simplify Your Kitchen?</h2>
                  <p className="text-xl text-muted-foreground">
                    Join thousands who've already discovered the joy of having just one device that does it all.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 my-12">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-left">What's Included:</h3>
                    <ul className="space-y-3">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <Check className="h-5 w-5 text-success flex-shrink-0" />
                          <span className="text-left">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-gradient-primary rounded-xl text-primary-foreground">
                      <div className="space-y-2">
                        <p className="text-sm opacity-90">Special Welcome Offer</p>
                        <div className="flex items-center justify-center space-x-3">
                          <span className="text-2xl line-through opacity-75">₹999</span>
                          <span className="text-4xl font-bold">₹549</span>
                        </div>
                        <p className="text-sm opacity-90">Save ₹450 Today!</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      {guarantees.map((guarantee, index) => (
                        <div key={index} className="text-center space-y-2">
                          <guarantee.icon className="h-6 w-6 mx-auto text-success" />
                          <span className="text-xs text-muted-foreground">{guarantee.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Button 
                    size="lg" 
                    className="w-full md:w-auto text-xl px-12 py-6 shadow-brand hover:shadow-xl transition-all duration-300"
                  >
                    Add to Cart - ₹549
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Secure Payments • Cash on Delivery Available • Free Shipping
                  </p>
                </div>
                
                <div className="border-t pt-6 mt-8">
                  <p className="text-sm text-muted-foreground">
                    <strong>Limited Time:</strong> This welcome offer expires in 48 hours or when we hit 1,000 orders - whichever comes first.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}