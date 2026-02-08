import { useState, useEffect } from 'react';
import Image from '@/components/AppImage';
import Icon from '@/components/AppIcon';

const ProductImageGallery = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageLoadStates, setImageLoadStates] = useState({});

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('Gallery auto-rotation active');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [selectedImage]);

  const handleImageLoad = (index) => {
    setImageLoadStates(prev => ({ ...prev, [index]: true }));
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images?.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images?.length) % images?.length);
  };

  return (
    <div className="w-full">
      <div className="relative bg-muted rounded-lg overflow-hidden mb-4">
        <Image
          src={images?.[selectedImage]?.url}
          alt={images?.[selectedImage]?.alt}
          className="w-full object-cover"
          onLoad={() => handleImageLoad(selectedImage)}
        />
        
        <button
          onClick={prevImage}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
          aria-label="Previous image"
        >
          <Icon name="ChevronLeft" size={20} />
        </button>
        
        <button
          onClick={nextImage}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
          aria-label="Next image"
        >
          <Icon name="ChevronRight" size={20} />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs md:text-sm font-mono">
          {selectedImage + 1} / {images?.length}
        </div>
      </div>
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3">
        {images?.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`
              relative aspect-square rounded-md overflow-hidden border-2 transition-all
              ${selectedImage === index 
                ? 'border-primary scale-95' :'border-border hover:border-muted-foreground'
              }
            `}
          >
            <Image
              src={image?.url}
              alt={image?.alt}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;