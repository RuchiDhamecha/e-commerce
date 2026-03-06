export const API = {
  PRODUCTS: '/products',
  PRODUCTS_PAGINATED: (limit: number, skip: number) =>
    `${API.PRODUCTS}?limit=${limit}&skip=${skip}`,
  CATEGORIES: '/products/categories',
  PRODUCT: (id: number) => `/products/${id}`,
  PRODUCTS_BY_CATEGORY: (category: string) => `/products/category/${category}`,
};