export default function Hero({ site }) {
  function scrollToCatalog() {
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="top" className="hero">
      <img src={site.heroImage} alt="" className="hero-bg" aria-hidden="true" />
      <h1 className="sr-only">{site.heroTitle}</h1>
      <div className="container hero-content">
        <button className="btn btn-primary btn-large" onClick={scrollToCatalog}>
          Khám phá sản phẩm
        </button>
      </div>
    </section>
  );
}
