import { useEffect, useRef, useState } from "react";
import { formatPrice } from "../utils/formatPrice.js";

const FALLBACK_IMAGE = "/images/products/placeholder.svg";

export default function ProductDetail({ product, site, onClose }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);

  const images = product.images?.length ? product.images : [FALLBACK_IMAGE];

  useEffect(() => {
    closeButtonRef.current?.focus();

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="modal-overlay" onMouseDown={handleOverlayClick}>
      <div
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-detail-title"
        ref={dialogRef}
      >
        <button className="modal-close" onClick={onClose} ref={closeButtonRef} aria-label="Đóng">
          ×
        </button>

        <div className="modal-body">
          <div className="modal-gallery">
            <img
              src={images[activeImageIndex]}
              alt={product.name}
              className="modal-main-image"
              onError={(e) => {
                if (e.currentTarget.src.indexOf(FALLBACK_IMAGE) === -1) {
                  e.currentTarget.src = FALLBACK_IMAGE;
                }
              }}
            />
            {images.length > 1 && (
              <div className="modal-thumbnails">
                {images.map((img, idx) => (
                  <button
                    key={img + idx}
                    className={`modal-thumb ${idx === activeImageIndex ? "is-active" : ""}`}
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`Xem ảnh ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt=""
                      onError={(e) => {
                        if (e.currentTarget.src.indexOf(FALLBACK_IMAGE) === -1) {
                          e.currentTarget.src = FALLBACK_IMAGE;
                        }
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="modal-info">
            {product.featured && <span className="badge badge-featured">Nổi bật</span>}
            <h2 id="product-detail-title">{product.name}</h2>
            <p className="product-card-sku">SKU: {product.sku}</p>
            <p className="modal-price">{formatPrice(product)}</p>
            <p className="modal-description">{product.description}</p>

            {product.material?.length > 0 && (
              <p>
                <strong>Vật liệu:</strong> {product.material.join(", ")}
              </p>
            )}
            {product.colors?.length > 0 && (
              <p>
                <strong>Màu sắc:</strong> {product.colors.join(", ")}
              </p>
            )}

            <a
              className="btn btn-primary btn-large"
              href={site.zaloUrl}
              target="_blank"
              rel="noreferrer"
            >
              Liên hệ đặt hàng
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
