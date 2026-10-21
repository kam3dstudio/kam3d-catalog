import { useMemo, useState } from "react";
import productsData from "./data/products.json";
import categoriesData from "./data/categories.json";
import siteData from "./data/site.json";
import Hero from "./components/Hero.jsx";
import Header from "./components/Header.jsx";
import CategoryNav from "./components/CategoryNav.jsx";
import SearchFilter from "./components/SearchFilter.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import Services from "./components/Services.jsx";
import ContactFooter from "./components/ContactFooter.jsx";
import { filterProducts, getActiveCategories } from "./utils/filterProducts.js";

export default function App() {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const activeCategories = useMemo(
    () => getActiveCategories(categoriesData, productsData),
    []
  );

  const filtered = useMemo(
    () => filterProducts(productsData, { search, categoryId }),
    [search, categoryId]
  );

  function handleClearFilters() {
    setSearch("");
    setCategoryId("");
  }

  return (
    <div className="app">
      <Hero site={siteData} />
      <Header site={siteData} />
      <main id="catalog" className="container">
        <CategoryNav
          categories={activeCategories}
          selectedCategoryId={categoryId}
          onSelectCategory={setCategoryId}
        />
        <SearchFilter
          search={search}
          onSearchChange={setSearch}
          onClear={handleClearFilters}
          resultCount={filtered.length}
        />
        <ProductGrid products={filtered} onSelectProduct={setSelectedProduct} />
      </main>
      <Services site={siteData} />
      <ContactFooter site={siteData} />
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          site={siteData}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
