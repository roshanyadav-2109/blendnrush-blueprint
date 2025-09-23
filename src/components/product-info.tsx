import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Star, Plus, Minus, ShieldCheck, Truck, Award, ChevronDown, Heart } from "lucide-react";

const variants = [
  { id: 1, name: "Standard Pack", price: 449, originalPrice: 999 },
  { id: 2, name: "Pro Pack", price: 749, originalPrice: 1499, comingSoon: true }
];

export function ProductInfo() {
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const discountPercentage = Math.round(
    ((selectedVariant.originalPrice - selectedVariant.price) / selectedVariant.originalPrice) * 100
  );

  return (
    <div className="space-y-6">
      {/* Product Title & Rating */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="bg-success/10 text-success font-medium">
            Best Seller
          </Badge>
          <Badge variant="outline">Free Shipping</Badge>
        </div>
        
        <h1 className="text-3xl font-bold mb-3">
          All-in-One Kitchen Appliance
        </h1>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-warning text-warning" />
            ))}
          </div>
          <span className="text-lg font-semibold">4.8</span>
          <span className="text-muted-foreground">(2,847 reviews)</span>
        </div>
      </div>

      {/* Price & Offers */}
      <Card className="bg-gradient-muted border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-baseline gap-3 mb-3">
            <span className="text-3xl font-bold text-primary">₹{selectedVariant.price}</span>
            <span className="text-xl text-muted-foreground line-through">₹{selectedVariant.originalPrice}</span>
            <Badge className="bg-destructive text-destructive-foreground">
              {discountPercentage}% OFF
            </Badge>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              Authentic Product
            </span>
            <span className="flex items-center gap-1">
              <Truck className="w-4 h-4" />
              Free Delivery
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Product Description */}
      <div className="space-y-3">
        <p className="text-muted-foreground leading-relaxed">
          Transform your kitchen with this revolutionary all-in-one device that blends, grinds, and juices with professional precision. Perfect for busy lifestyles and health-conscious individuals.
        </p>

        <Collapsible open={showFullDescription} onOpenChange={setShowFullDescription}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="p-0 h-auto font-medium text-primary">
              <span>View detailed description</span>
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${showFullDescription ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-4 mt-4">
            <div>
              <h3 className="font-semibold mb-2">Key Features:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                <li>• 3-in-1 functionality: Blend, grind, and juice</li>
                <li>• Powerful 1200W motor for smooth operation</li>
                <li>• BPA-free materials for safe food preparation</li>
                <li>• Compact design saves 60% counter space</li>
                <li>• Easy-clean detachable components</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Perfect For:</h3>
              <p className="text-sm text-muted-foreground">
                Smoothie enthusiasts, coffee lovers, health-conscious individuals, small kitchens, 
                and anyone looking to simplify their food preparation routine.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Variant Selection */}
      <div className="space-y-3">
        <h3 className="font-semibold">Choose Your Pack:</h3>
        <div className="grid gap-3">
          {variants.map((variant) => (
            <Card 
              key={variant.id}
              className={`cursor-pointer transition-all ${
                selectedVariant.id === variant.id 
                  ? 'border-primary shadow-brand' 
                  : variant.comingSoon 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:border-primary/50'
              }`}
              onClick={() => !variant.comingSoon && setSelectedVariant(variant)}
            >
              <CardContent className="pt-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{variant.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold">₹{variant.price}</span>
                      <span className="text-sm text-muted-foreground line-through">₹{variant.originalPrice}</span>
                    </div>
                  </div>
                  {variant.comingSoon && (
                    <Badge variant="outline">Coming Soon</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quantity & Add to Cart */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="font-medium">Quantity:</span>
          <div className="flex items-center border rounded-md">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleQuantityChange(-1)}
              className="h-10 w-10"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{quantity}</span>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleQuantityChange(1)}
              className="h-10 w-10"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-3">
          <Button size="lg" className="flex-1 h-12 text-lg font-semibold">
            Add to Cart
          </Button>
          <Button size="icon" variant="outline" className="h-12 w-12">
            <Heart className="h-5 w-5" />
          </Button>
        </div>

        <Button size="lg" className="w-full h-12 text-lg font-semibold bg-success hover:bg-success/90">
          Buy Now - ₹{selectedVariant.price * quantity}
        </Button>
      </div>

      <Separator />

      {/* Trust Badges */}
      <div className="text-center space-y-2">
        <div className="flex justify-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            Secure Payment
          </span>
          <span className="flex items-center gap-1">
            <Truck className="w-4 h-4" />
            Fast Shipping
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          30-day return policy • Secure transactions
        </p>
      </div>
    </div>
  );
}