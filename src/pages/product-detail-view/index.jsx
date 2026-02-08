import AssessmentProgressIndicator from "@/components/ui/AssessmentProgress";
import { ErrorBoundaryStatusIndicator } from "@/components/ui/ErrorBoundaryStatus";
import Header from "@/components/ui/Header";
import PerformanceMonitor from "@/components/ui/PerformanceMonitor";
import useCart from "@/context/cartContext";
import Icon  from "@/components/AppIcon";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CustomerReviews from "./components/CustomerReviews";
import ProductConfiguration from "./components/ProductConfiguration";
import ProductImageGallery from "./components/ProductImageGallery";
import ProductInfo from "./components/ProductInfo";
import ProductSpecifications from "./components/ProductSpecifications";
import RelatedProducts from "./components/RelatedProducts";

const ProductDetailView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');


  useEffect(() => {
    const loadProduct = () => {
      try {
        // Simulate product data loading
        const mockProduct = {
          id: 1,
          name: "Premium Wireless Earbuds Pro",
          sku: "WEP-2024-001",
          description: `Experience superior audio quality with our Premium Wireless Earbuds Pro. Featuring advanced noise cancellation technology, these earbuds deliver crystal-clear sound whether you're commuting, working out, or relaxing at home. The ergonomic design ensures all-day comfort, while the long-lasting battery provides up to 8 hours of continuous playback on a single charge.\n\nWith IPX7 water resistance, these earbuds can withstand sweat and light rain, making them perfect for active lifestyles. The intuitive touch controls allow you to manage calls, adjust volume, and control playback without reaching for your device.`,
          price: 299.99,
          discount: 15,
          rating: 4.8,
          reviewCount: 1247,
          inStock: true,
          stockCount: 47,
          category: "Electronics",
          images: [
          {
            url: "https://images.unsplash.com/photo-1722040456443-c644d014d43f",
            alt: "Premium white wireless earbuds in charging case with LED indicators on marble surface showing sleek modern design"
          },
          {
            url: "https://img.rocket.new/generatedImages/rocket_gen_img_1a5ccd24c-1767224182191.png",
            alt: "Close-up of wireless earbud showing touch control surface and ergonomic shape with premium matte finish"
          },
          {
            url: "https://images.unsplash.com/photo-1730848750011-4f1df6493f36",
            alt: "Wireless earbuds with charging case open displaying both earbuds and USB-C charging port"
          },
          {
            url: "https://img.rocket.new/generatedImages/rocket_gen_img_103e88a6c-1767281829508.png",
            alt: "Person wearing wireless earbuds during outdoor workout showing secure fit and water-resistant design"
          },
          {
            url: "https://images.unsplash.com/photo-1565267319814-d7591ba84ad9",
            alt: "Wireless earbuds packaging and accessories including charging cable and multiple ear tip sizes"
          }],

          colors: ["Midnight Black", "Pearl White", "Ocean Blue", "Rose Gold"],
          sizes: ["Standard", "Small", "Large"],
          features: [
          "Active Noise Cancellation (ANC) with transparency mode",
          "8 hours playback + 24 hours with charging case",
          "IPX7 water and sweat resistance rating",
          "Bluetooth 5.3 with multipoint connectivity",
          "Touch controls for calls, music, and voice assistant",
          "Fast charging: 15 minutes = 2 hours playback",
          "Premium audio drivers with deep bass response",
          "Ergonomic design with 3 ear tip sizes included"],

          specifications: {
            "Driver Size": "10mm dynamic drivers",
            "Frequency Response": "20Hz - 20kHz",
            "Bluetooth Version": "5.3",
            "Bluetooth Range": "Up to 33 feet (10 meters)",
            "Battery Life": "8 hours (earbuds) + 24 hours (case)",
            "Charging Time": "1.5 hours (full charge)",
            "Charging Port": "USB-C",
            "Water Resistance": "IPX7",
            "Weight": "4.5g per earbud",
            "Microphone": "Dual beamforming microphones",
            "Codec Support": "AAC, SBC",
            "Voice Assistant": "Siri, Google Assistant compatible"
          }
        };

        setTimeout(() => {
          setProduct(mockProduct);
          setLoading(false);
        }, 100);
      } catch (error) {
        throw new Error('ERR_PROD_LOAD_FAIL');
      }
    };

    loadProduct();
  }, [location?.search]);

  const handleAddToCart = (configuredProduct) => {
    console.log('Adding to cart:', configuredProduct);
    // Simulate cart addition
    alert(`Added ${configuredProduct?.quantity}x ${configuredProduct?.name} to cart`);
  };

  const tabs = [
  { id: 'overview', label: 'Overview', icon: 'Info' },
  { id: 'specifications', label: 'Specifications', icon: 'FileText' },
  { id: 'reviews', label: 'Reviews', icon: 'Star' }];


  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <PerformanceMonitor />
        <AssessmentProgressIndicator />
        <ErrorBoundaryStatusIndicator hasActiveErrors={false} />
        
        <div className="pt-[76px] px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="aspect-square bg-muted rounded-lg"></div>
                <div className="space-y-4">
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-32 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PerformanceMonitor />
      <AssessmentProgressIndicator />
      <ErrorBoundaryStatusIndicator hasActiveErrors={true} />
      <div className="pt-[76px] px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-6 md:py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm md:text-base mb-6 md:mb-8 overflow-x-auto">
            <button
              onClick={() => navigate('/product-assessment-dashboard')}
              className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">

              Dashboard
            </button>
            <Icon name="ChevronRight" size={16} color="var(--color-muted-foreground)" />
            <span className="text-foreground font-medium truncate">{product?.name}</span>
          </nav>

          {/* Main Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-12">
            {/* Left Column - Images */}
            <div>
              <ProductImageGallery images={product?.images} productName={product?.name} />
            </div>

            {/* Right Column - Info & Configuration */}
            <div className="space-y-6 md:space-y-8">
              <ProductInfo product={product} />
              <ProductConfiguration product={product} onAddToCart={handleAddToCart} />
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mb-8 md:mb-12">
            <div className="border-b border-border overflow-x-auto">
              <div className="flex gap-1 min-w-max">
                {tabs?.map((tab) =>
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`
                      flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 font-medium transition-all whitespace-nowrap
                      ${activeTab === tab?.id ?
                  'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}
                    `
                  }>

                    <Icon name={tab?.icon} size={18} />
                    <span className="text-sm md:text-base">{tab?.label}</span>
                  </button>
                )}
              </div>
            </div>

            <div className="py-6 md:py-8">
              {activeTab === 'overview' &&
              <div className="prose prose-sm md:prose-base max-w-none">
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                    Product Overview
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                    {product?.description}
                  </p>
                </div>
              }

              {activeTab === 'specifications' &&
              <ProductSpecifications specifications={product?.specifications} />
              }

              {activeTab === 'reviews' &&
              <CustomerReviews
                productId={product?.id}
                averageRating={product?.rating}
                totalReviews={product?.reviewCount} />

              }
            </div>
          </div>

          {/* Related Products */}
          <RelatedProducts currentProductId={product?.id} category={product?.category} />
        </div>
      </div>
    </div>);

};

export default ProductDetailView;