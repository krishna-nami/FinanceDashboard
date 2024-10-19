import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKpiResponse, GetProductsResponse } from "./types";
const url = import.meta.env.VITE_BASE_URL;
console.log(url);
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",
  tagTypes: ["Kpis", "Products"],
  endpoints: (build) => ({
    getKpis: build.query<Array<GetKpiResponse>, void>({
      query: () => "kpi/kpis/",
      providesTags: ["Kpis"],
    }),
    getProducts: build.query<Array<GetProductsResponse>, void>({
      query: () => "product/products/",
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetKpisQuery, useGetProductsQuery } = api;
