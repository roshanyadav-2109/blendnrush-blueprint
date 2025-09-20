import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  const faqs = [
    {
      question: "How strong is the grinder? Can it handle hard spices?",
      answer: "The BlendNRush features hardened stainless steel blades that can easily grind hard spices like cardamom, cinnamon sticks, and even coffee beans. The 300W motor provides enough power for consistent, fine grinding."
    },
    {
      question: "How do I switch between the juicer and blender functions?",
      answer: "Switching is incredibly simple! The device comes with two attachments - one for blending/grinding and one for juicing. Just twist off one attachment and twist on the other. It takes less than 5 seconds."
    },
    {
      question: "Is it easy to clean after grinding something oily like nuts?",
      answer: "Yes! All parts are dishwasher safe, and the smooth surfaces make hand-washing quick and easy. For oily residues, a drop of dish soap and warm water is all you need. The parts dry quickly too."
    },
    {
      question: "What's included in the box?",
      answer: "You get the main motor unit, blender/grinder jar, juicer attachment, travel lid, cleaning brush and user manual. Everything you need to start using all three functions immediately."
    },
    {
      question: "How long does the battery last?",
      answer: "The rechargeable battery provides up to 15 complete blending cycles or 25 grinding sessions on a single charge. It charges fully in just 2 hours via USB-C cable (included)."
    }
  ];

  return (
    <section className="py-20">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">Everything You Need to Know</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers. Here are the most common questions about the BlendNRush.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border rounded-lg px-6 bg-card/50"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
