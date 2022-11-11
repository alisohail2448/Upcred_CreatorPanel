import { getAllBrands, getBrand } from "src/services/brandRequests";

import useSWR from "swr";
import { swrConfigs } from "./swrConfigs";

export function useAllBrands(params) {
  const { data, mutate, error } = useSWR([params, "all_brands"], getAllBrands, swrConfigs);

  const loading = !data && !error;

  return {
    loading,
    brands: data,
    mutate,
    error,
  };
}










export function useBrand(id) {
  const { data, mutate, error } = useSWR([{ brandId: id }, "brand"], getBrand, swrConfigs);

  const loading = !data && !error;

  return {
    loading,
    brand: data,
    mutate,
  };
}
