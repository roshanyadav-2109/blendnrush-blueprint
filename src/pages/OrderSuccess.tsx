import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, PartyPopper, TrendingDown } from "lucide-react";

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);

  const totalAmount = parseFloat(searchParams.get("amount") || "0");
  const savedAmount = parseFloat(searchParams.get("saved") || "0");
  const orderNumber = searchParams.get("orderId") || Math.floor(Math.random() * 1000000);

  useEffect(() => {
    // Hide confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnnouncementBar />
      <Header />

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: [
                    "#FF6B6B",
                    "#4ECDC4",
                    "#FFE66D",
                    "#95E1D3",
                    "#F38181",
                    "#AA96DA",
                  ][Math.floor(Math.random() * 6)],
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            </div>
          ))}
        </div>
      )}

      <main className="container px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="text-center mb-8 animate-scale-in">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-success/10 rounded-full mb-4">
              <CheckCircle2 className="w-12 h-12 text-success" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <h1 className="text-4xl font-bold text-success">Congratulations!</h1>
              <PartyPopper className="w-8 h-8 text-warning animate-bounce" />
            </div>
            <p className="text-xl text-muted-foreground">
              Your order has been placed successfully!
            </p>
          </div>

          {/* Order Details Card */}
          <Card className="mb-6 animate-fade-in">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-muted-foreground">Order Number</span>
                  <Badge variant="secondary" className="text-lg">
                    #{orderNumber}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Order Total</span>
                  <span className="text-2xl font-bold text-primary">
                    ₹{totalAmount}
                  </span>
                </div>

                {savedAmount > 0 && (
                  <div className="flex justify-between items-center bg-success/10 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-5 h-5 text-success" />
                      <span className="font-semibold text-success">
                        You Saved
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-success">
                      ₹{savedAmount}
                    </span>
                  </div>
                )}

                <div className="bg-gradient-muted rounded-lg p-4 text-center">
                  <p className="text-lg font-medium mb-2">
                    🎉 Thank you for your purchase! 🎉
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Your order will be delivered in just 3-5 days. Get ready to experience the magic of BlendNRush!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <Button
              onClick={() => navigate("/dashboard")}
              className="flex-1"
              size="lg"
            >
              Track Your Order
            </Button>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              Continue Shopping
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center text-sm text-muted-foreground animate-fade-in">
            <p>
              We've sent a confirmation email with your order details. Check your inbox!
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
