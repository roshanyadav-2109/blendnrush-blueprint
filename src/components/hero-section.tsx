import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4";

export function HeroSection() {
  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex items-center justify-center overflow-hidden pt-20 pb-12 md:pt-24 md:pb-16">
      <div className="absolute inset-0 bg-gradient-muted" />
      
      <div className="container relative z-10 px-4">
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
                className="text-lg px-6 py-4 sm:px-8 sm:py-6 shadow-brand hover:shadow-xl transition-all duration-300"
                onClick={scrollToFeatures}
              >
                See How It Works
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-success rounded-full"></span>
                <span>Complete Device</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-success rounded-full"></span>
                <span>Perfect Smoothies</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-success rounded-full"></span>
                <span>Fresh Juices</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-success rounded-full"></span>
                <span>Precision Grinding</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <video
              src={heroVideo}
              autoPlay
              loop
              muted
              playsInline
              className="relative z-10 w-full h-auto rounded-2xl shadow-xl"
            >
              Your browser does not support the video tag.
            </video>
          </div>

        </div>
      </div>
    </section>
  );
}
