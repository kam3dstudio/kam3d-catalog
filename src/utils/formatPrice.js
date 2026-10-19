export function formatPrice(product) {
  if (product.priceType === "quote") {
    return "Liên hệ báo giá";
  }
  const formatted = new Intl.NumberFormat("vi-VN").format(product.price);
  return `${formatted} ₫`;
}
