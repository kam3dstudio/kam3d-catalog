const SERVICES = [
  {
    title: "In theo file thiết kế",
    description: "Gửi file 3D (STL/OBJ...) có sẵn, chúng tôi in theo đúng thiết kế của bạn.",
  },
  {
    title: "In theo mẫu / ảnh tham khảo",
    description: "Gửi ảnh hoặc mẫu tham khảo, chúng tôi dựng lại mô hình và in theo yêu cầu.",
  },
  {
    title: "Tư vấn vật liệu, màu sắc, kích thước",
    description: "Hỗ trợ chọn vật liệu, màu sắc và kích thước phù hợp với mục đích sử dụng.",
  },
  {
    title: "Sản phẩm cá nhân hóa",
    description: "Khắc tên, lời chúc hoặc tùy chỉnh riêng theo yêu cầu của khách hàng.",
  },
];

export default function Services({ site }) {
  return (
    <section id="services" className="services container">
      <h2>Dịch vụ của chúng tôi</h2>
      <div className="services-grid">
        {SERVICES.map((s) => (
          <div className="service-card" key={s.title}>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </div>
        ))}
      </div>
      <div className="services-cta">
        <a className="btn btn-primary btn-large" href={site.zaloUrl} target="_blank" rel="noreferrer">
          Yêu cầu báo giá
        </a>
      </div>
    </section>
  );
}
