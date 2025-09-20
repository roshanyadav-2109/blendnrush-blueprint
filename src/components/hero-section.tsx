import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroProduct from "@/assets/hero-product.jpg";

export function HeroSection() {
  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-muted" />
      
      <div className="container relative z-10 px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Your Little Kitchen{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Magician
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Meet the one portable device for your smoothies, fresh juices, and even ground spices. 
                Healthy living just got a whole lot simpler and less cluttered.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 shadow-brand hover:shadow-xl transition-all duration-300"
                onClick={scrollToFeatures}
              >
                See How It Works
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 border-2"
              >
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-success rounded-full"></span>
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-success rounded-full"></span>
                <span>30-Day Returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-success rounded-full"></span>
                <span>2-Year Warranty</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <img 
              src={heroProduct}
              alt="BlendNRush All-in-One Kitchen Appliance"
              className="relative z-10 w-full h-auto rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}