import { Link } from 'react-router-dom';
import type { ProductCardProps } from './ProductCard.types';

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) stars.push(<span key={i} className="text-yellow-400">★</span>);
    else if (i === fullStars && hasHalf) stars.push(<span key={i} className="text-yellow-400">★</span>);
    else stars.push(<span key={i} className="text-gray-300">★</span>);
  }
  return <span className="inline-flex">{stars}</span>;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className="rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link
        to={`/product/${product.id}`}
        className="block overflow-hidden rounded-lg"
      >
        <div className="aspect-square bg-white p-4 flex items-center justify-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div className="p-4">
          <h3 className="mb-1 line-clamp-2 font-medium text-gray-900">{product.title}</h3>
          <p className="mb-1 text-lg font-semibold text-gray-900">${product.price}</p>
          <p className="flex items-center gap-1.5 text-sm text-gray-600">
            <StarRating rating={product.rating} />
            <span>({product.rating})</span>
          </p>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;
