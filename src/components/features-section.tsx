import { Card, CardContent } from "@/components/ui/card";
import featureBlend from "@/assets/WhatsApp Image 2025-09-21 at 00.40.19_d930aaff.jpg";
import featureJuice from "@/assets/feature-juice.jpg";
import featureGrind from "@/assets/feature-grind.jpg";

export function FeaturesSection() {
  const features = [
    {
      title: "Silky Smoothies & Shakes",
      description: "A powerful motor and 6-point blade system turn fruit, ice, and powders into perfectly smooth drinks in seconds.",
      image: featureBlend,
      stats: "300W Motor • 6-Blade System • 500ml Capacity"
    },
    {
      title: "Fresh Juice, Anywhere",
      description: "A specially designed attachment lets you make vibrant, nutrient-rich juices without the hassle and cleanup of traditional juicers.",
      image: featureJuice,
      stats: "Citrus Specialist • 85% Juice Extraction • Easy Clean"
    },
    {
      title: "Freshly Ground Spices & Coffee",
      description: "The tough grinder base lets you make aromatic spice mixes and freshly ground coffee for the perfect brew.",
      image: featureGrind,
      stats: "Stainless Steel Blades • Fine to Coarse • 50g Capacity"
    }
  ];

  return (
    <section id="features" className="py-20">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">
            Blend, Juice, and Grind.{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              With One Simple Tool.
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Three powerful functions in one sleek, portable device. Finally, a kitchen appliance that earns its counter space.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                <div className="text-sm font-medium text-primary bg-primary/10 rounded-lg px-3 py-2">
                  {feature.stats}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
