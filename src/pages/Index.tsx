import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ProblemSection } from "@/components/problem-section";
import { FeaturesSection } from "@/components/features-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FaqSection } from "@/components/faq-section";
import { CtaSection } from "@/components/cta-section";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <FeaturesSection />
        <TestimonialsSection />
        <FaqSection />
        <CtaSection />
      </main>
      <footer className="border-t py-12 bg-muted/30">
        <div className="container px-4">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-primary">BlendNRush</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Simplifying kitchens, one appliance at a time. 
              Your all-in-one solution for blending, juicing, and grinding.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
              <span>© 2024 BlendNRush. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
