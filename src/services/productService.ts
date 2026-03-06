import axios from 'axios';
import { API } from '../constants/apiEndpoints';
import type { Product, ProductsResponse, Category } from '../types/product.types';

const api = axios.create({ baseURL: 'https://dummyjson.com' });

export async function getProducts(limit: number, skip: number) {
  const { data } = await api.get<ProductsResponse>(
    `${API.PRODUCTS}?limit=${limit}&skip=${skip}`
  );
  return data;
}

export async function getProductsByCategory(category: string) {
  const { data } = await api.get<ProductsResponse>(
    API.PRODUCTS_BY_CATEGORY(category)
  );
  return data;
}

export async function getProduct(id: number) {
  const { data } = await api.get<Product>(API.PRODUCT(id));
  return data;
}

export async function getCategories() {
  const { data } = await api.get<Category[]>(API.CATEGORIES);
  return data;
}
