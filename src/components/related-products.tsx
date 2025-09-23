import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";

const relatedProducts = [
  {
    id: 1,
    name: "Premium Cleaning Kit",
    price: 299,
    originalPrice: 499,
    image: "/src/assets/blend.jpg",
    rating: 4.6,
    reviews: 234,
    badge: "Accessory"
  },
  {
    id: 2,
    name: "Extra Travel Jar Set",
    price: 399,
    originalPrice: 599,
    image: "/src/assets/feature-blend.jpg",
    rating: 4.7,
    reviews: 156,
    badge: "Popular"
  },
  {
    id: 3,
    name: "Recipe Book & Guide",
    price: 199,
    originalPrice: 349,
    image: "/src/assets/feature-juice.jpg",
    rating: 4.8,
    reviews: 89,
    badge: "Digital"
  },
  {
    id: 4,
    name: "Replacement Blade Set",
    price: 799,
    originalPrice: 1199,
    image: "/src/assets/feature-grind.jpg",
    rating: 4.5,
    reviews: 67,
    badge: "Essential"
  }
];

export function RelatedProducts() {
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-lg">You Might Also Like</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {relatedProducts.map((product) => (
          <Card key={product.id} className="border-border/50 hover:border-primary/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </div>
                
                <div className="flex-1 space-y-2">
                  <div>
                    <Badge variant="secondary" className="mb-1 text-xs">
                      {product.badge}
                    </Badge>
                    <h3 className="font-medium text-sm leading-tight">
                      {product.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating) 
                              ? 'fill-warning text-warning' 
                              : 'text-muted-foreground'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({product.reviews})
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">₹{product.price}</span>
                        <span className="text-xs text-muted-foreground line-through">
                          ₹{product.originalPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Button size="sm" variant="outline" className="w-full h-8 text-xs">
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <div className="pt-2">
          <Button variant="ghost" className="w-full text-sm">
            View All Accessories
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}