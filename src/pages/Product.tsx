import { Header } from "@/components/header";
import { ProductImageGallery } from "@/components/product-image-gallery";
import { ProductInfo } from "@/components/product-info";
import { ProductReviews } from "@/components/product-reviews";
import { ProductFAQ } from "@/components/product-faq";


export default function Product() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8">
        {/* Product Overview Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <ProductImageGallery />
          <ProductInfo />
        </div>

        {/* Product Details Sections */}
        <div className="space-y-8 mb-12">
          <ProductReviews />
          <ProductFAQ />
        </div>
      </main>
    </div>
  );
}