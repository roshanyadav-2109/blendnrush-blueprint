import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Star, ThumbsUp, Filter } from "lucide-react";

const reviewStats = [
  { stars: 5, count: 1847, percentage: 65 },
  { stars: 4, count: 692, percentage: 24 },
  { stars: 3, count: 231, percentage: 8 },
  { stars: 2, count: 54, percentage: 2 },
  { stars: 1, count: 23, percentage: 1 }
];

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    date: "2024-09-15",
    verified: true,
    title: "Game-changer for my kitchen!",
    content: "This device has completely transformed my morning routine. The blending is incredibly smooth, and the grinding feature works perfectly for my spices. Highly recommended!",
    helpful: 24,
    images: []
  },
  {
    id: 2,
    name: "Raj K.",
    rating: 5,
    date: "2024-09-12",
    verified: true,
    title: "Excellent build quality",
    content: "Very impressed with the sturdy construction and powerful motor. The multiple attachments are well-designed and easy to clean. Worth every penny!",
    helpful: 18,
    images: []
  },
  {
    id: 3,
    name: "Priya S.",
    rating: 4,
    date: "2024-09-10",
    verified: true,
    title: "Good product, minor issues",
    content: "Overall great product that works as advertised. The only issue is that it can be a bit noisy during operation. But the results are excellent.",
    helpful: 12,
    images: []
  },
  {
    id: 4,
    name: "Mike D.",
    rating: 5,
    date: "2024-09-08",
    verified: true,
    title: "Perfect for small kitchen",
    content: "Living in a small apartment, this device is perfect. It replaces multiple appliances and saves so much space. The juice extraction is phenomenal!",
    helpful: 31,
    images: []
  }
];

export function ProductReviews() {
  const overallRating = 4.8;
  const totalReviews = reviewStats.reduce((sum, stat) => sum + stat.count, 0);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'fill-warning text-warning' : 'text-muted-foreground'}`} 
      />
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Customer Reviews</span>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Rating Overview */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold">{overallRating}</div>
            <div className="flex justify-center">
              {renderStars(5)}
            </div>
            <p className="text-sm text-muted-foreground">
              Based on {totalReviews.toLocaleString()} reviews
            </p>
          </div>
          
          <div className="space-y-2">
            {reviewStats.map((stat) => (
              <div key={stat.stars} className="flex items-center gap-3 text-sm">
                <span className="w-8">{stat.stars}★</span>
                <Progress value={stat.percentage} className="flex-1" />
                <span className="w-12 text-muted-foreground">{stat.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="space-y-4 mt-6">
          {reviews.map((review) => (
            <Card key={review.id} className="border-l-4 border-l-primary/20">
              <CardContent className="pt-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.name}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">{review.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{review.content}</p>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-3 border-t">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Helpful ({review.helpful})
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="text-center pt-4">
            <Button variant="outline">
              Load More Reviews
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
