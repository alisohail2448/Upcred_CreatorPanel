import useStorage from "src/hooks/useStorage";
import {
  getAllCategory,
  getCategory,
  getAllPlatforms,
  getPlatform,
  getAllLanguages,
  getAllLocations,
  getAllCountries,
  getAllStates,
  getAllContentTypes,
  getAllSkills,
  getAllAudiences,
  getStatesByCountryId,
} from "src/services/commonRequests";
import useSWR from "swr";
import { swrConfigs } from "./swrConfigs";

export function useAllCategory(params) {
  const { data, mutate, error } = useSWR([params, "all_categories"], getAllCategory, swrConfigs);

  const loading = !data && !error;

  return {
    loading,
    categories: data?.response_data,
    meta: data?.meta,
    mutate,
  };
}

export function useCategory(id) {
  const { data, mutate, error } = useSWR(id, getCategory, swrConfigs);

  const loading = !data && !error;

  return {
    loading,
    category: data,
    mutate,
  };
}

export function useAllLanguage(params) {
  const { data, mutate, error } = useSWR([params, "all_languages"], getAllLanguages, swrConfigs);

  const loading = !data && !error;

  return {
    loading,
    languages: data?.response_data,
    meta: data?.meta,
    mutate,
  };
}

export function useAllLocation(params) {
  const { data, mutate, error } = useSWR([params, "all_locations"], getAllLocations, swrConfigs);

  const loading = !data && !error;

  return {
    loading,
    locations: data?.response_data || [],
    meta: data?.meta,
    mutate,
  };
}
export function useAllCountry(params) {
  const { data, mutate, error } = useSWR([params, "all_countries"], getAllCountries, swrConfigs);

  const loading = !data && !error;

  return {
    loading,
    countries: data?.response_data,
    meta: data?.meta,
    mutate,
  };
}
export function useAllState(params) {
  const { data, mutate, error } = useSWR([params, "all_states"], getAllStates, swrConfigs);

  const loading = !data && !error;

  return {
    loading,
    states: data?.response_data,
    meta: data?.meta,
    mutate,
  };
}

export function useGetStatesByCountryId(countryId, params) {
  const { data, mutate, error } = useSWR(
    [{ countryId, params }, "state"],
    getStatesByCountryId,
    swrConfigs
  );

  const loading = !data && !error;

  return {
    loading,
    states: data?.response_data || [],
    meta: data?.meta,
    mutate,
  };
}
export function useAllContentType(params) {
  const { data, mutate, error } = useSWR(
    [params, "all_contenttype"],
    getAllContentTypes,
    swrConfigs
  );

  const loading = !data && !error;

  return {
    loading,
    contenttypes: data,
    mutate,
  };
}

export function useAllPlatforms() {
  const { data, mutate, error } = useSWR("all_platform", getAllPlatforms, swrConfigs);

  const loading = !data && !error;

  return {
    loading,
    platforms: data,
    mutate,
  };
}
export function useAllSkill(params) {
  const { data, mutate, error } = useSWR([params, "all_skill"], getAllSkills, swrConfigs);

  const loading = !data && !error;

  return {
    loading,
    skills: data,
    mutate,
  };
}
export function useAllAudience() {
  const { data, mutate, error } = useSWR("all_audience", getAllAudiences, swrConfigs);

  const loading = !data && !error;

  return {
    loading,
    audiences: data,
    mutate,
  };
}

export function usePlatform(id) {
  const { data, mutate, error } = useSWR([id, "platform"], getPlatform, swrConfigs);

  const loading = !data && !error;

  return {
    loading,
    platform: data,
    mutate,
  };
}
