import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Aisha K.",
      review: "I bought this for smoothies, but the grinder is a game-changer! I make my own garam masala now. So fresh!",
      rating: 5,
      location: "Mumbai"
    },
    {
      name: "Rohan P.",
      review: "This has replaced three things on my kitchen counter. It's powerful, easy to clean, and looks cute. Absolutely love it.",
      rating: 5,
      location: "Bangalore"
    },
    {
      name: "Priya & Sameer",
      review: "Perfect for our morning routine. I make fresh orange juice, and then my wife grinds her coffee beans with the same device. Incredible.",
      rating: 5,
      location: "Delhi"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">See What Our First Customers Are Saying</h2>
          <p className="text-xl text-muted-foreground">
            Real people, real results. Join thousands who've already simplified their kitchens.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card/80 backdrop-blur border-0 shadow-md">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="text-card-foreground leading-relaxed italic">
                  "{testimonial.review}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <cite className="font-semibold not-italic">– {testimonial.name}</cite>
                  <span className="text-sm text-muted-foreground">{testimonial.location}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full">
            <Star className="h-4 w-4 fill-current" />
            <span className="font-semibold">4.9/5 from 2,847+ verified customers</span>
          </div>
        </div>
      </div>
    </section>
  );
}