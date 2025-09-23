import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import featureGrind from "@/assets/33b1d_512.jpg";
import heroProduct from "@/assets/WhatsApp Image 2025-09-21 at 00.40.19_d930aaff.jpg";
import featureBlend from "@/assets/feature-blend.jpg";
import featureJuice from "@/assets/feature-juice.jpg";
import blendImage from "@/assets/blend.jpg";

const productImages = [
  featureGrind,
  heroProduct,
  featureBlend,
  featureJuice,
  blendImage
];

export function ProductImageGallery() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <Card className="relative overflow-hidden aspect-square group">
        <img 
          src={productImages[currentImage]}
          alt="Product main view"
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />
        
        {/* Navigation Arrows */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={prevImage}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={nextImage}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Zoom Icon */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>

        {/* Image Counter */}
        <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md text-sm">
          {currentImage + 1} / {productImages.length}
        </div>
      </Card>

      {/* Thumbnail Gallery */}
      <div className="flex gap-2 overflow-x-auto">
        {productImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
              currentImage === index 
                ? 'border-primary' 
                : 'border-border hover:border-primary/50'
            }`}
          >
            <img 
              src={image}
              alt={`Product view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
