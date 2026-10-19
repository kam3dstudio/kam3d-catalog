export default function CategoryNav({ categories, selectedCategoryId, onSelectCategory }) {
  return (
    <nav className="category-nav" aria-label="Danh mục sản phẩm">
      <button
        className={`category-chip ${selectedCategoryId === "" ? "is-active" : ""}`}
        onClick={() => onSelectCategory("")}
      >
        Tất cả
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`category-chip ${selectedCategoryId === cat.id ? "is-active" : ""}`}
          onClick={() => onSelectCategory(cat.id)}
          title={cat.description}
        >
          {cat.name}
        </button>
      ))}
    </nav>
  );
}
