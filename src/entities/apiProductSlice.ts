import { apiService } from '../app/service/apiService';
import type { ProductsResponse } from '../features/table/types/product.types';

export const apiProductSlice = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, string | void>({
      query: (searchQuery) =>
        searchQuery && searchQuery.trim()
          ? `https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery.trim())}`
          : 'https://dummyjson.com/products',
    }),
  }),
});

export const { useGetProductsQuery } = apiProductSlice;
