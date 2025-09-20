import { Card, CardContent } from "@/components/ui/card";

export function ProductGallerySection() {
  const productImages = [
    {
      src: "/src/assets/hero-product.jpg",
      alt: "BlendNRush All-in-One Device",
      title: "Complete Device"
    },
    {
      src: "/src/assets/feature-blend.jpg", 
      alt: "Blending smoothies and shakes",
      title: "Perfect Smoothies"
    },
    {
      src: "/src/assets/feature-juice.jpg",
      alt: "Fresh juice extraction",
      title: "Fresh Juices"
    },
    {
      src: "/src/assets/feature-grind.jpg",
      alt: "Grinding spices and coffee",
      title: "Precision Grinding"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">See BlendNRush in Action</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From silky smoothies to freshly ground spices, discover the versatility of your new kitchen companion.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {productImages.map((image, index) => (
            <Card key={index} className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg">{image.title}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            All attachments included with your BlendNRush device
          </p>
        </div>
      </div>
    </section>
  );
}