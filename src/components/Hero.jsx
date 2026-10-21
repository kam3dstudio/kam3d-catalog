export default function Hero({ site }) {
  function scrollToCatalog() {
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="top" className="hero">
      <div className="container hero-inner">
        <div className="hero-text">
          <span className="hero-eyebrow">In 3D theo yêu cầu</span>
          <h1>
            {site.heroTitle} <span className="hero-accent">chất lượng cao</span>
          </h1>
          <p>{site.heroDescription}</p>
          <button className="btn btn-primary btn-large" onClick={scrollToCatalog}>
            Khám phá sản phẩm
          </button>
        </div>
        <div className="hero-machines">
          <figure>
            <img src="/images/banner/snapmaker-u1.webp" alt="Máy in 3D Snapmaker U1" loading="eager" />
            <figcaption>Snapmaker U1</figcaption>
          </figure>
          <figure>
            <img src="/images/banner/bambulab-x2d.jpg" alt="Máy in 3D Bambu Lab X2D" loading="eager" />
            <figcaption>Bambu Lab X2D</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
