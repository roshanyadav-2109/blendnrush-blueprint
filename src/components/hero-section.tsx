import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

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
                See{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  BlendNRush
                </span>
                {" "}in Action
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                From silky smoothies to freshly ground spices, discover the versatility of your new kitchen companion.
              </p>
            </div>
            

          
          {/* Video Player */}
          <div className="relative">
            <video 
              src="/assets/BlendnRush_Portable_Blender_Video.mp4" 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-auto rounded-2xl shadow-xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
