import { Link } from "react-router-dom";
import blendnrushLogo from "@/assets/blendnrush.png";

export function Footer() {
  return (
    <footer className="border-t py-12 bg-muted/30">
      <div className="container px-4">
        <div className="text-center space-y-4">
          <img src={blendnrushLogo} alt="BlendNRush Logo" className="h-10 mx-auto" />
          <p className="text-muted-foreground max-w-md mx-auto">
            Simplifying kitchens, one appliance at a time. 
            Your all-in-one solution for blending, juicing, and grinding.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mb-4">
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms & Conditions</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/shipping" className="hover:text-foreground transition-colors">Shipping Policy</Link>
            <Link to="/cancellation" className="hover:text-foreground transition-colors">Cancellation & Refunds</Link>
          </div>
          <div className="text-sm text-muted-foreground">
            <span>© 2025 BlendNRush. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}