import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({ products, onSelectProduct }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <p>Không tìm thấy sản phẩm phù hợp.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onSelect={onSelectProduct} />
      ))}
    </div>
  );
}
