export default function Hero({ site }) {
  function scrollToCatalog() {
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="top" className="hero">
      <img src={site.heroImage} alt="" className="hero-bg" aria-hidden="true" />
      <div className="container hero-content">
        <h1>{site.heroTitle}</h1>
        <p>{site.heroDescription}</p>
        <button className="btn btn-primary btn-large" onClick={scrollToCatalog}>
          Khám phá sản phẩm
        </button>
      </div>
    </section>
  );
}
