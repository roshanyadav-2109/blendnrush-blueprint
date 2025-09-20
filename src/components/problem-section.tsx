import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

export function ProblemSection() {
  const problems = [
    {
      title: "The bulky mixer you never use",
      description: "Takes up precious counter space and only does one thing"
    },
    {
      title: "The juicer that's impossible to clean",
      description: "Complex parts and messy cleanup make it more trouble than it's worth"
    },
    {
      title: "The single-use grinder taking up space",
      description: "Another appliance for one simple task, cluttering your kitchen"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">Tired of a Different Appliance for Everything?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your kitchen doesn't need to look like an appliance showroom. There's a better way.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <Card key={index} className="relative border-2 border-destructive/20 bg-card/50">
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                  <X className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold">{problem.title}</h3>
                <p className="text-muted-foreground">{problem.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}