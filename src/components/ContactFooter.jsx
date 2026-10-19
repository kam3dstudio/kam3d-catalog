export default function ContactFooter({ site }) {
  return (
    <>
      <footer id="contact" className="footer">
        <div className="container footer-inner">
          <div>
            <h3>{site.brandName}</h3>
            <p>{site.footerText}</p>
          </div>
          <div className="footer-contact">
            <p>
              Điện thoại: <a href={`tel:${site.phone}`}>{site.phone}</a>
            </p>
            <p>
              <a href={site.zaloUrl} target="_blank" rel="noreferrer">
                Chat qua Zalo
              </a>
            </p>
            <p>
              <a href={site.facebookUrl} target="_blank" rel="noreferrer">
                Trang Facebook
              </a>
            </p>
          </div>
        </div>
      </footer>

      <a
        className="mobile-contact-bar"
        href={site.zaloUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={site.contactLabel}
      >
        {site.contactLabel}
      </a>
    </>
  );
}
