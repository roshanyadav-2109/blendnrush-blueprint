import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "What is included in the package?",
    answer: "Each package includes the main device, blending attachment, grinding attachment, juicing attachment, instruction manual, warranty card, and cleaning accessories."
  },
  {
    question: "Is this device compatible with all types of ingredients?",
    answer: "Yes, the device is designed to handle a wide variety of ingredients including fruits, vegetables, nuts, spices, coffee beans, and ice cubes. However, avoid extremely hard items like whole nutmeg or large ice blocks."
  },
  {
    question: "How do I clean and maintain the device?",
    answer: "All attachments are dishwasher safe. For the main unit, simply wipe with a damp cloth. We recommend deep cleaning weekly and descaling monthly for optimal performance."
  },
  {
    question: "What is the motor power and noise level?",
    answer: "The device features a powerful 1200W motor. While it operates efficiently, it does produce some noise during operation (approximately 70-75 dB), which is normal for high-performance blenders."
  },
  {
    question: "Do you offer warranty and what does it cover?",
    answer: "Yes, we provide a comprehensive 1-year warranty covering manufacturing defects, motor issues, and normal wear and tear. The warranty does not cover damage from misuse or accidents."
  },
  {
    question: "Can I use this device for commercial purposes?",
    answer: "This device is designed for home use. For commercial applications, please consider our commercial-grade models which are built for higher volume and frequency of use."
  },
  {
    question: "What are the safety features included?",
    answer: "The device includes overload protection, automatic shut-off, non-slip base, locking mechanisms for all attachments, and BPA-free food-grade materials for safe operation."
  },
  {
    question: "How long does shipping take and what are the costs?",
    answer: "We offer free shipping on all orders. Standard delivery takes 3-5 business days, while express delivery is available for 1-2 business days at an additional cost."
  },
  {
    question: "Can I return the product if I'm not satisfied?",
    answer: "Absolutely! We offer a 30-day money-back guarantee. If you're not completely satisfied, you can return the product in its original condition for a full refund."
  },
  {
    question: "Are replacement parts available?",
    answer: "Yes, all individual attachments and accessories are available for purchase separately. This ensures your device can serve you for years to come."
  }
];

export function ProductFAQ() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}