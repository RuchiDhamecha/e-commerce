import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct } from '../../services/productService';
import type { Product } from '../../types/product.types';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { PRODUCT_CONSTANTS } from '../../constants/productConstants';

const { productDetail } = PRODUCT_CONSTANTS;

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

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getProduct(Number(id))
      .then(setProduct)
      .catch((e) =>
        setError(e instanceof Error ? e.message : productDetail.failedToFetch)
      )
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (error || !product)
    return (
      <section className="p-6">
        <ErrorMessage
          message={error || productDetail.productNotFound}
          onRetry={() => id && getProduct(Number(id)).then(setProduct)}
        />
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
          {productDetail.back}
        </Link>
      </section>
    );

  const reviews =
    (
      product as Product & {
        reviews?: { rating: number; comment: string; reviewerName: string }[];
      }
    ).reviews || [];

  return (
    <section className="flex-1 overflow-auto bg-gray-50 p-6" aria-labelledby="product-detail-heading">
      <article className="mx-auto max-w-6xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <span>←</span>
          {productDetail.back}
        </Link>

        <section className="flex flex-col gap-8 md:flex-row" aria-label="Product information">
          <figure className="flex flex-1 justify-center">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="aspect-square w-full max-w-sm object-contain"
            />
          </figure>

          <section className="flex-1" aria-labelledby="product-detail-heading">
            <header>
              <h1 id="product-detail-heading" className="mb-2 text-2xl font-bold text-gray-900">
                {product.title}
              </h1>
            </header>
            <p className="mb-2 text-2xl font-bold text-gray-900">${product.price}</p>
            <div className="mb-4 flex items-center gap-2">
              <StarRating rating={product.rating} />
              <span className="text-gray-600">({product.rating})</span>
            </div>
            <p className="mb-2">
              <span className="font-semibold">{productDetail.brand}:</span>{' '}
              {product.brand}
            </p>
            <p className="mb-4">
              <span className="font-semibold">{productDetail.category}:</span>{' '}
              {product.category}
            </p>

            <h3 className="mb-2 text-lg font-semibold">Description</h3>
            <p className="mb-6 text-gray-600">{product.description}</p>

            {reviews.length > 0 && (
              <section aria-labelledby="reviews-heading">
                <h3 id="reviews-heading" className="mb-2 text-lg font-semibold">
                  Reviews
                </h3>
                <div className="space-y-4">
                  {reviews.map((review, index) => (
                    <article
                      key={index}
                      className="border-b border-gray-200 pb-4 last:border-b-0"
                    >
                      <p className="font-semibold text-gray-800">
                        {review.reviewerName}
                      </p>
                      <div className="my-1 flex items-center gap-2">
                        <StarRating rating={review.rating} />
                        <span className="text-sm text-gray-600">
                          ({review.rating})
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{review.comment}</p>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </section>
        </section>

      </article>
    </section>
  );
};

export default ProductDetail;
