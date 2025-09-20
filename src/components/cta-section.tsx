import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Shield, Truck, RotateCcw, Star } from "lucide-react";
import React, { useState, useEffect } from "react";

// Countdown Timer Component
const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999); // Set to the end of the current day
    const difference = endOfDay.getTime() - now.getTime();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const formatTime = (time) => String(time).padStart(2, '0');

  return (
    <div className="flex justify-center items-center gap-2">
      <div className="text-center">
        <div className="text-2xl font-bold bg-primary/10 text-primary px-3 py-2 rounded-md">
          {formatTime(timeLeft.hours)}
        </div>
        <div className="text-xs text-muted-foreground mt-1">Hours</div>
      </div>
      <div className="text-2xl font-bold text-primary">:</div>
      <div className="text-center">
        <div className="text-2xl font-bold bg-primary/10 text-primary px-3 py-2 rounded-md">
          {formatTime(timeLeft.minutes)}
        </div>
        <div className="text-xs text-muted-foreground mt-1">Minutes</div>
      </div>
      <div className="text-2xl font-bold text-primary">:</div>
      <div className="text-center">
        <div className="text-2xl font-bold bg-primary/10 text-primary px-3 py-2 rounded-md">
          {formatTime(timeLeft.seconds)}
        </div>
        <div className="text-xs text-muted-foreground mt-1">Seconds</div>
      </div>
    </div>
  );
};

export function CtaSection() {
  const features = [
    "The BlendNRush All-in-One Device",
    "Blender & Grinder Blade Attachment",
    "On-the-Go Juicer Attachment",
    "USB-C Charging Cable",
    "Free, Fast Shipping Anywhere in India",
    "30-Day Happiness Guarantee"
  ];

  const guarantees = [
    { icon: Truck, text: "Free & Fast Shipping" },
    { icon: RotateCcw, text: "30-Day Money-Back Guarantee" },
    { icon: Shield, text: "2-Year Warranty" }
  ];

  return (
    <section className="py-20 bg-gradient-muted">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto">
          <Card className="border-0 shadow-2xl bg-card/95 backdrop-blur overflow-hidden">
            <CardContent className="p-6 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                
                {/* Left Column: What you get */}
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-left">Get Everything You Need to Start</h3>
                  <p className="text-muted-foreground text-left">
                    Your BlendNRush comes with everything required to blend, juice, and grind right out of the box.
                  </p>
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-success flex-shrink-0" />
                        <span className="text-left">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">"This has replaced three things on my kitchen counter. Absolutely love it." - Rohan P.</p>
                  </div>
                </div>
                
                {/* Right Column: Offer and CTA */}
                <div className="space-y-6 p-6 bg-background rounded-xl border">
                  <div className="text-center space-y-2">
                    <p className="font-semibold text-primary">Special Welcome Offer</p>
                    <div className="flex items-baseline justify-center space-x-3">
                      <span className="text-2xl line-through text-muted-foreground">₹999</span>
                      <span className="text-5xl font-bold text-foreground">₹549</span>
                    </div>
                    <p className="text-sm font-semibold text-success">You Save ₹450 (45% OFF)!</p>
                  </div>

                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground font-medium">Offer ends today!</p>
                    <CountdownTimer />
                  </div>
                  
                  <div className="space-y-4">
                    <Button 
                      size="lg" 
                      className="w-full text-xl h-14 font-bold shadow-brand hover:shadow-xl transition-all duration-300"
                    >
                      Claim My 45% Discount Now
                    </Button>
                    <div className="grid grid-cols-3 gap-4 pt-2">
                      {guarantees.map((guarantee, index) => (
                        <div key={index} className="text-center space-y-2">
                          <guarantee.icon className="h-6 w-6 mx-auto text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{guarantee.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Secure Payments • Cash on Delivery Available
                    </p>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
