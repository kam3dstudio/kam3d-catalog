import { useState } from "react";

export default function Header({ site }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function scrollTo(id) {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#top" className="header-brand" aria-label={site.brandName}>
          <img src={site.logoPath} alt={site.brandName} className="header-logo" />
        </a>

        <nav className={`header-nav ${menuOpen ? "is-open" : ""}`} aria-label="Điều hướng chính">
          <button className="nav-link" onClick={() => scrollTo("catalog")}>
            Sản phẩm
          </button>
          <button className="nav-link" onClick={() => scrollTo("services")}>
            Dịch vụ
          </button>
          <button className="nav-link" onClick={() => scrollTo("contact")}>
            Liên hệ
          </button>
          <a
            className="btn btn-primary header-contact-btn"
            href={site.zaloUrl}
            target="_blank"
            rel="noreferrer"
          >
            {site.contactLabel}
          </a>
        </nav>

        <button
          className="header-burger"
          aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
