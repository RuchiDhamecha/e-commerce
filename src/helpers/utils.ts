export function getUniqueBrands(products: { brand: string }[]): string[] {
  const brands = new Set(products.map((p) => p.brand).filter(Boolean));
  return Array.from(brands).sort();
}
