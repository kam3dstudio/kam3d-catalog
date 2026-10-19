export function filterProducts(products, { search, categoryId }) {
  const term = (search || "").trim().toLowerCase();

  return products
    .filter((p) => p.active)
    .filter((p) => (categoryId ? p.category === categoryId : true))
    .filter((p) => {
      if (!term) return true;
      const haystack = `${p.name} ${p.sku}`.toLowerCase();
      return haystack.includes(term);
    })
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export function getActiveCategories(categories, products) {
  const activeProductCategoryIds = new Set(
    products.filter((p) => p.active).map((p) => p.category)
  );
  return categories
    .filter((c) => c.active && activeProductCategoryIds.has(c.id))
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export function getContactUrl(site) {
  return site.zaloUrl || `tel:${site.phone}`;
}
