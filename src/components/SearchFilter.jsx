export default function SearchFilter({ search, onSearchChange, onClear, resultCount }) {
  return (
    <div className="search-filter">
      <label htmlFor="search-input" className="sr-only">
        Tìm kiếm sản phẩm theo tên hoặc mã SKU
      </label>
      <input
        id="search-input"
        type="search"
        className="search-input"
        placeholder="Tìm theo tên sản phẩm hoặc mã SKU..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className="search-filter-meta">
        <span className="result-count">{resultCount} sản phẩm</span>
        <button className="btn btn-ghost" onClick={onClear}>
          Xóa bộ lọc
        </button>
      </div>
    </div>
  );
}
