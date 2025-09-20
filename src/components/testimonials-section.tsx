"use client";

import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CardTransformed,
  CardsContainer,
  ContainerScroll,
  ReviewStars,
} from "@/components/ui/animated-cards-stack";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const { theme } = useTheme();
  
  const testimonials = [
    {
      id: "testimonial-1",
      name: "Aisha K.",
      profession: "Home Cook",
      review: "I bought this for smoothies, but the grinder is a game-changer! I make my own garam masala now. So fresh!",
      rating: 5,
      location: "Mumbai",
      avatarUrl: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: "testimonial-2", 
      name: "Rohan P.",
      profession: "Fitness Enthusiast",
      review: "This has replaced three things on my kitchen counter. It's powerful, easy to clean, and looks cute. Absolutely love it.",
      rating: 5,
      location: "Bangalore",
      avatarUrl: "https://i.pravatar.cc/150?img=2"
    },
    {
      id: "testimonial-3",
      name: "Priya S.",
      profession: "Working Professional",
      review: "Perfect for our morning routine. I make fresh orange juice, and then my husband grinds his coffee beans with the same device. Incredible.",
      rating: 5,
      location: "Delhi",
      avatarUrl: "https://i.pravatar.cc/150?img=3"
    }
  ];

  const getCardVariant = (theme: string | undefined) => {
    return theme === "dark" ? "dark" : "light";
  };

  const getReviewStarsClass = (theme: string | undefined) => {
    return theme === "dark" ? "text-primary" : "text-primary";
  };

  const getTextClass = (theme: string | undefined) => {
    return theme === "dark" ? "text-primary-foreground" : "";
  };

  const getAvatarClass = (theme: string | undefined) => {
    return theme === "dark"
      ? "!size-12 border border-border"
      : "!size-12 border border-border";
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-4xl font-bold">See What Our Customers Are Saying</h2>
          <p className="text-xl text-muted-foreground">
            Real people, real results. Join thousands who've already simplified their kitchens.
          </p>
        </div>
        
        <ContainerScroll className="h-[120vh]">
          <div className="sticky left-0 top-0 h-screen w-full py-12">
            <CardsContainer className="mx-auto size-full max-h-[450px] w-full max-w-[350px]">
              {testimonials.map((testimonial, index) => (
                <CardTransformed
                  arrayLength={testimonials.length}
                  key={testimonial.id}
                  variant={getCardVariant(theme)}
                  index={index + 1}
                  role="article"
                  aria-labelledby={`card-${testimonial.id}-title`}
                  aria-describedby={`card-${testimonial.id}-content`}
                >
                  <div className="flex flex-col items-center space-y-4 text-center">
                    <ReviewStars
                      className={getReviewStarsClass(theme)}
                      rating={testimonial.rating}
                    />
                    <div className={`mx-auto w-4/5 text-lg ${getTextClass(theme)}`}>
                      <blockquote cite="#">"{testimonial.review}"</blockquote>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar className={getAvatarClass(theme)}>
                      <AvatarImage
                        src={testimonial.avatarUrl}
                        alt={`Portrait of ${testimonial.name}`}
                      />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="block text-lg font-semibold tracking-tight md:text-xl">
                        {testimonial.name}
                      </span>
                      <span className="block text-sm text-muted-foreground">
                        {testimonial.profession} • {testimonial.location}
                      </span>
                    </div>
                  </div>
                </CardTransformed>
              ))}
            </CardsContainer>
          </div>
        </ContainerScroll>
        
        <div className="text-center -mt-24 md:-mt-48">
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full">
            <Star className="h-4 w-4 fill-current" />
            <span className="font-semibold">4.9/5 from 2,847+ verified customers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
