import { useState } from 'react';
import Image from '@/components/AppImage';
import Icon from '@/components/AppIcon';
import Button from '@/components/ui/Button';

const CustomerReviews = ({ productId, averageRating, totalReviews }) => {
  const [reviews] = useState([
  {
    id: 1,
    author: "Sarah Johnson",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_170699746-1763294878713.png",
    avatarAlt: "Professional headshot of woman with shoulder-length brown hair wearing navy blue blazer smiling warmly",
    rating: 5,
    date: "2026-01-05",
    verified: true,
    title: "Excellent product quality!",
    content: "This product exceeded my expectations in every way. The build quality is outstanding, and it performs exactly as advertised. I've been using it daily for two weeks now and couldn't be happier with my purchase.",
    helpful: 24,
    images: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_11c34c539-1766921324472.png",
      alt: "Close-up product photo showing detailed craftsmanship and premium materials in natural lighting"
    }]

  },
  {
    id: 2,
    author: "Michael Chen",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1bd15b436-1763300581767.png",
    avatarAlt: "Professional headshot of Asian man with short black hair wearing gray suit and glasses",
    rating: 4,
    date: "2026-01-03",
    verified: true,
    title: "Great value for money",
    content: "Very satisfied with this purchase. The product works well and the price point is competitive. Only minor issue is the setup instructions could be clearer, but overall a solid choice.",
    helpful: 18,
    images: []
  },
  {
    id: 3,
    author: "Emily Rodriguez",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_162a57531-1763296100992.png",
    avatarAlt: "Professional headshot of Hispanic woman with long dark hair wearing white blouse with friendly expression",
    rating: 5,
    date: "2025-12-28",
    verified: false,
    title: "Highly recommend!",
    content: "I've tried several similar products and this one stands out. The attention to detail is impressive and customer service was excellent when I had questions. Will definitely buy from this brand again.",
    helpful: 31,
    images: []
  }]
  );

  const [showAllReviews, setShowAllReviews] = useState(false);
  const displayedReviews = showAllReviews ? reviews : reviews?.slice(0, 2);

  const ratingDistribution = [
  { stars: 5, count: 156, percentage: 62 },
  { stars: 4, count: 68, percentage: 27 },
  { stars: 3, count: 18, percentage: 7 },
  { stars: 2, count: 7, percentage: 3 },
  { stars: 1, count: 3, percentage: 1 }];


  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 md:mb-6">
        Customer Reviews
      </h2>
      {/* Rating Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-border">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-5xl md:text-6xl font-bold text-foreground mb-2">
            {averageRating?.toFixed(1)}
          </div>
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)]?.map((_, i) =>
            <Icon
              key={i}
              name="Star"
              size={20}
              color={i < Math.floor(averageRating) ? 'var(--color-warning)' : 'var(--color-muted)'}
              className={i < Math.floor(averageRating) ? 'fill-warning' : 'fill-muted'} />

            )}
          </div>
          <p className="text-sm md:text-base text-muted-foreground">
            Based on {totalReviews} reviews
          </p>
        </div>

        <div className="space-y-2">
          {ratingDistribution?.map((dist) =>
          <div key={dist?.stars} className="flex items-center gap-3">
              <span className="text-sm md:text-base text-foreground font-medium w-12 whitespace-nowrap">
                {dist?.stars} star
              </span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                className="h-full bg-warning transition-all duration-250"
                style={{ width: `${dist?.percentage}%` }} />

              </div>
              <span className="text-sm md:text-base text-muted-foreground w-12 text-right font-mono">
                {dist?.count}
              </span>
            </div>
          )}
        </div>
      </div>
      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews?.map((review) =>
        <div key={review?.id} className="pb-6 border-b border-border last:border-0">
            <div className="flex items-start gap-3 md:gap-4 mb-3">
              <Image
              src={review?.avatar}
              alt={review?.avatarAlt}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover flex-shrink-0" />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-sm md:text-base font-medium text-foreground">
                    {review?.author}
                  </span>
                  {review?.verified &&
                <span className="flex items-center gap-1 px-2 py-0.5 bg-success/20 text-success text-xs rounded">
                      <Icon name="CheckCircle2" size={12} />
                      Verified
                    </span>
                }
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1">
                    {[...Array(5)]?.map((_, i) =>
                  <Icon
                    key={i}
                    name="Star"
                    size={14}
                    color={i < review?.rating ? 'var(--color-warning)' : 'var(--color-muted)'}
                    className={i < review?.rating ? 'fill-warning' : 'fill-muted'} />

                  )}
                  </div>
                  <span className="text-xs md:text-sm text-muted-foreground">
                    {new Date(review.date)?.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                  </span>
                </div>
              </div>
            </div>

            <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
              {review?.title}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
              {review?.content}
            </p>

            {review?.images?.length > 0 &&
          <div className="flex gap-2 mb-3">
                {review?.images?.map((img, idx) =>
            <div key={idx} className="w-20 h-20 md:w-24 md:h-24 rounded-md overflow-hidden">
                    <Image
                src={img?.url}
                alt={img?.alt}
                className="w-full h-full object-cover" />

                  </div>
            )}
              </div>
          }

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="ThumbsUp" size={16} />
                <span>Helpful ({review?.helpful})</span>
              </button>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Report
              </button>
            </div>
          </div>
        )}
      </div>
      {reviews?.length > 2 &&
      <div className="mt-6 text-center">
          <Button
          variant="outline"
          onClick={() => setShowAllReviews(!showAllReviews)}>

            {showAllReviews ? 'Show Less' : `View All ${reviews?.length} Reviews`}
          </Button>
        </div>
      }
    </div>);

};

export default CustomerReviews;