import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '@/components/AppImage';
import Icon from '@/components/AppIcon';

const RelatedProducts = ({ currentProductId, category }) => {
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const loadRelatedProducts = () => {
      const products = [
      {
        id: 2,
        name: "Premium Wireless Headphones",
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1119295e3-1765076790006.png",
        imageAlt: "Black over-ear wireless headphones with cushioned ear cups on white background showing premium audio equipment",
        price: 199.99,
        rating: 4.7,
        reviewCount: 892
      },
      {
        id: 3,
        name: "Smart Fitness Tracker",
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d26f8cdb-1765113715116.png",
        imageAlt: "Modern black fitness tracker smartwatch with digital display showing health metrics on wrist",
        price: 149.99,
        rating: 4.5,
        reviewCount: 1247
      },
      {
        id: 4,
        name: "Portable Bluetooth Speaker",
        image: "https://images.unsplash.com/photo-1691864774578-ce90082a3658",
        imageAlt: "Compact cylindrical bluetooth speaker in matte black finish with metallic grille on wooden surface",
        price: 79.99,
        rating: 4.6,
        reviewCount: 634
      },
      {
        id: 5,
        name: "USB-C Fast Charger",
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_17866f217-1767477118300.png",
        imageAlt: "White USB-C wall charger adapter with folding prongs on clean white background showing compact design",
        price: 29.99,
        rating: 4.8,
        reviewCount: 2156
      }];


      setRelatedProducts(products?.filter((p) => p?.id !== currentProductId));
    };

    loadRelatedProducts();
  }, [currentProductId]);

  const handleProductClick = (productId) => {
    navigate(`/product-detail-view?id=${productId}`);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 md:mb-6">
        Related Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {relatedProducts?.map((product) =>
        <button
          key={product?.id}
          onClick={() => handleProductClick(product?.id)}
          className="group bg-muted rounded-lg overflow-hidden hover:shadow-lg transition-all duration-250 text-left">

            <div className="relative overflow-hidden">
              <Image
              src={product?.image}
              alt={product?.imageAlt}
              className="w-full object-cover group-hover:scale-105 transition-transform duration-250" />

            </div>
            
            <div className="p-3 md:p-4">
              <h3 className="text-sm md:text-base font-medium text-foreground mb-2 line-clamp-2">
                {product?.name}
              </h3>
              
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)]?.map((_, i) =>
                <Icon
                  key={i}
                  name="Star"
                  size={12}
                  color={i < Math.floor(product?.rating) ? 'var(--color-warning)' : 'var(--color-muted)'}
                  className={i < Math.floor(product?.rating) ? 'fill-warning' : 'fill-muted'} />

                )}
                </div>
                <span className="text-xs text-muted-foreground">
                  ({product?.reviewCount})
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-lg md:text-xl font-bold text-foreground">
                  ${product?.price?.toFixed(2)}
                </span>
                <Icon name="ArrowRight" size={18} color="var(--color-primary)" />
              </div>
            </div>
          </button>
        )}
      </div>
    </div>);

};

export default RelatedProducts;