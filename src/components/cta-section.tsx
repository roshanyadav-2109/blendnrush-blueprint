import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Truck, RotateCcw, Star, ShieldCheck } from "lucide-react";

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
    { icon: RotateCcw, text: "30-Day Returns" }
  ];

  return (
    <>
      {/* Pricing Hero Section */}
      <section className="py-16 bg-gradient-primary text-primary-foreground">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold">Special Launch Offer</h2>
              <p className="text-xl opacity-90">
                Be among the first 1,000 customers and save big on your BlendNRush
              </p>
            </div>
            
            <div className="bg-background/10 backdrop-blur rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-4">
                  <span className="text-3xl line-through opacity-75">₹999</span>
                  <span className="text-6xl font-bold">₹549</span>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-semibold">Save ₹450 Today!</p>
                  <p className="opacity-90">That's 45% off the regular price</p>
                </div>
                
                <div className="flex justify-center space-x-8 pt-4">
                  {guarantees.map((guarantee, index) => (
                    <div key={index} className="text-center space-y-2">
                      <guarantee.icon className="h-8 w-8 mx-auto opacity-90" />
                      <span className="text-sm font-medium">{guarantee.text}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="w-full text-xl px-8 py-6 font-bold hover:scale-105 transition-all duration-300"
                >
                  Order Now - ₹549
                </Button>
                
                <div className="flex items-center justify-center space-x-2 pt-2">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm">4.9/5 from 2,847+ verified customers</span>
                </div>
              </div>
            </div>
            
            <p className="text-sm opacity-75">
              <strong>Limited Time:</strong> This offer expires in 48 hours or when we hit 1,000 orders
            </p>
          </div>
        </div>
      </section>

      {/* Detailed CTA Section */}
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
                          <p className="text-sm opacity-90">Your Investment</p>
                          <div className="flex items-center justify-center space-x-3">
                            <span className="text-2xl line-through opacity-75">₹999</span>
                            <span className="text-4xl font-bold">₹549</span>
                          </div>
                          <p className="text-sm opacity-90">45% Savings!</p>
                        </div>
                      </div>
                      
                      <div className="text-center space-y-4 p-4 bg-success/10 rounded-lg">
                        <ShieldCheck className="h-8 w-8 mx-auto text-success" />
                        <p className="text-sm font-medium text-success">
                          30-Day Money-Back Guarantee
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Try it risk-free. If you're not completely satisfied, get a full refund.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Button 
                      size="lg" 
                      className="w-full md:w-auto text-xl px-12 py-6 shadow-brand hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      Secure My BlendNRush - ₹549
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Secure Payments • Cash on Delivery Available • Free Shipping
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}