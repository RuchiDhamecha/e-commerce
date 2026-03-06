export const API = {
  PRODUCTS: '/products',
  CATEGORIES: '/products/categories',
  PRODUCT: (id: number) => `/products/${id}`,
  PRODUCTS_BY_CATEGORY: (category: string) => `/products/category/${category}`,
};