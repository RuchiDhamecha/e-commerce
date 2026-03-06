export function getUniqueBrands(products: { brand?: string }[]): string[] {
  const brands = new Set(products.map((p) => p.brand).filter((b): b is string => Boolean(b)));
  return Array.from(brands).sort();
}

export function matchesProductSearch(
  product: { title?: string; description?: string; brand?: string },
  query: string
): boolean {
  const q = (query || '').toLowerCase().trim();
  if (!q) return true;
  const title = (product.title ?? '').toLowerCase();
  const description = (product.description ?? '').toLowerCase();
  const brand = (product.brand ?? '').toLowerCase();
  return title.includes(q) || description.includes(q) || brand.includes(q);
}
