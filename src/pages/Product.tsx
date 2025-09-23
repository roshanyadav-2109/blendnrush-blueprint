import { Header } from "@/components/header";
import { ProductImageGallery } from "@/components/product-image-gallery";
import { ProductInfo } from "@/components/product-info";
import { ProductReviews } from "@/components/product-reviews";
import { ProductFAQ } from "@/components/product-faq";
import { RelatedProducts } from "@/components/related-products";

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
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-8">
            <ProductReviews />
            <ProductFAQ />
          </div>
          <div>
            <RelatedProducts />
          </div>
        </div>
      </main>
    </div>
  );
}