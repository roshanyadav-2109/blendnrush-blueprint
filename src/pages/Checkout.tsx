import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroProduct from "@/assets/imagejuicer.jpg";

export default function Checkout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const quantity = parseInt(searchParams.get("quantity") || "1");
  const price = parseInt(searchParams.get("price") || "449");
  const isTest = searchParams.get("test") === "true";

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    address: "",
    pincode: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams({
      quantity: quantity.toString(),
      price: price.toString(),
      test: isTest.toString(),
      name: formData.name,
      contact: formData.contact,
      email: formData.email,
      address: formData.address,
      pincode: formData.pincode,
    });
    
    navigate(`/payment?${params.toString()}`);
  };

  const totalAmount = price * quantity;

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="container px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Form */}
          <div>
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Customer Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contact">Contact Number *</Label>
                    <Input
                      id="contact"
                      required
                      type="tel"
                      value={formData.contact}
                      onChange={(e) =>
                        setFormData({ ...formData, contact: e.target.value })
                      }
                      placeholder="Enter your contact number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Textarea
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      placeholder="Enter your complete address"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      required
                      value={formData.pincode}
                      onChange={(e) =>
                        setFormData({ ...formData, pincode: e.target.value })
                      }
                      placeholder="Enter your pincode"
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Continue to Payment
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Product Summary */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="mb-4">
                  <img
                    src={heroProduct}
                    alt="Product"
                    className="w-full h-32 object-contain rounded-lg mb-4"
                  />
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold">All-in-One Kitchen Appliance</h3>
                    {isTest && (
                      <Badge className="bg-warning/10 text-warning mt-2">
                        TEST MODE
                      </Badge>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quantity:</span>
                    <span className="font-medium">{quantity}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price per unit:</span>
                    <span className="font-medium">₹{price}</span>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-primary">
                        ₹{totalAmount}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
