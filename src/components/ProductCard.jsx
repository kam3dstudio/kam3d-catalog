import { formatPrice } from "../utils/formatPrice.js";

const FALLBACK_IMAGE = "/images/products/placeholder.svg";

export default function ProductCard({ product, onSelect }) {
  const mainImage = product.images?.[0] || FALLBACK_IMAGE;

  return (
    <article className="product-card">
      <div className="product-card-image-wrap">
        {product.featured && <span className="badge badge-featured">Nổi bật</span>}
        <img
          src={mainImage}
          alt={product.name}
          className="product-card-image"
          loading="lazy"
          onError={(e) => {
            if (e.currentTarget.src.indexOf(FALLBACK_IMAGE) === -1) {
              e.currentTarget.src = FALLBACK_IMAGE;
            }
          }}
        />
      </div>
      <div className="product-card-body">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-sku">SKU: {product.sku}</p>
        <p className="product-card-price">{formatPrice(product)}</p>
        <button className="btn btn-secondary" onClick={() => onSelect(product)}>
          Xem chi tiết
        </button>
      </div>
    </article>
  );
}
