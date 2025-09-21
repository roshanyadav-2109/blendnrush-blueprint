import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    const difference = endOfDay.getTime() - now.getTime();
    return difference > 0 ? {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    } : { hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearTimeout(timer);
  });

  const formatTime = (time: number) => String(time).padStart(2, '0');

  return (
    <div className="flex justify-center items-center gap-2">
      <div className="text-center">
        <div className="text-2xl font-bold bg-destructive/10 text-destructive px-3 py-2 rounded-md">
          {formatTime(timeLeft.hours)}
        </div>
        <div className="text-xs text-muted-foreground mt-1">Hours</div>
      </div>
      <div className="text-2xl font-bold text-destructive">:</div>
      <div className="text-center">
        <div className="text-2xl font-bold bg-destructive/10 text-destructive px-3 py-2 rounded-md">
          {formatTime(timeLeft.minutes)}
        </div>
        <div className="text-xs text-muted-foreground mt-1">Minutes</div>
      </div>
      <div className="text-2xl font-bold text-destructive">:</div>
      <div className="text-center">
        <div className="text-2xl font-bold bg-destructive/10 text-destructive px-3 py-2 rounded-md">
          {formatTime(timeLeft.seconds)}
        </div>
        <div className="text-xs text-muted-foreground mt-1">Seconds</div>
      </div>
    </div>
  );
};

export function CtaSection() {
  const pricingPlans = [
    {
      title: "Standard Pack",
      price: "449",
      originalPrice: "999",
      features: [
        "BlendNRush All-in-One Device",
        "Blender & Grinder Attachment",
        "Juicer Attachment",
      ],
      isBestValue: false,
    },
    {
      title: "Pro Pack",
      price: "749",
      originalPrice: "1499",
      features: [
        "Everything in Standard Pack",
        "Extra Travel Jar (500ml)",
        "Premium Cleaning Kit",
      ],
      isBestValue: true,
    },
  ];

  return (
    <section className="py-20 bg-gradient-muted">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">Choose Your BlendNRush Pack</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our welcome offer is ending soon. Select the perfect package to start simplifying your kitchen today.
          </p>
          <div className="pt-4">
            <CountdownTimer />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
          {pricingPlans.map((plan) => (
            <Card key={plan.title} className={cn("shadow-lg relative", plan.isBestValue && "border-primary border-2 shadow-brand")}>
              {plan.isBestValue && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Best Value
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.title}</CardTitle>
                <CardDescription>
                  <span className="text-4xl font-bold text-foreground">₹{plan.price}</span>
                  <span className="text-lg text-muted-foreground line-through ml-2">₹{plan.originalPrice}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-success flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.title === "Pro Pack" ? (
                  <Button
                    size="lg"
                    className="w-full text-lg h-12 font-bold"
                    disabled
                  >
                    Coming Soon
                  </Button>
                ) : (
                  <a href="https://rzp.io/rzp/blendnrush" target="_blank" rel="noopener noreferrer">
                    <Button
                      size="lg"
                      className={cn("w-full text-lg h-12 font-bold", !plan.isBestValue && "bg-secondary text-secondary-foreground hover:bg-secondary/80")}
                    >
                      Buy Now
                    </Button>
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            All packages include Free Shipping, and Secure Payments.
          </p>
        </div>
      </div>
    </section>
  );
}
