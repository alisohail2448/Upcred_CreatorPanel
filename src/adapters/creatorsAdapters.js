import useStorage from "src/hooks/useStorage";
import {
  getAllCreator,
  getCreator,
  getCreatorAddress,
  getCreatorAllAddresses,
  getCreatorAllFundAccount,
  getCreatorAllPlatform,
  getCreatorAllPricing,
  getCreatorCategory,
  getCreatorFundAccount,
  getCreatorLanguages,
  getCreatorLocations,
  getCreatorPlatform,
  getCreatorPricing,
} from "src/services/creatorRequests";
import useSWR from "swr";
import { swrConfigs } from "./swrConfigs";

export function useCreator({ id }) {
  const { token } = useStorage();
  const { data, mutate, error } = useSWR(token ? id : null, getCreator);

  const loading = !data && !error;

  return {
    loading,
    creator: data,
    mutate,
  };
}

export function useAllCreator(params) {
  const { data, mutate, error } = useSWR([params, "all_creators"], getAllCreator);

  const loading = !data && !error;

  return {
    loading,
    creators: data?.response_data,
    meta: data?.meta,
    mutate,
  };
}

export function useCreatorAllAddresses(creatorId) {
  const { data, mutate, error } = useSWR([creatorId, "creator_addresses"], getCreatorAllAddresses);
  const loading = !data && !error;
  return {
    loading,
    creatorAllAddress: data,
    mutate,
  };
}

export function useCreatorAddress(creatorId, addressId) {
  const { data, mutate, error } = useSWR(
    [creatorId, addressId, "creator_address"],
    getCreatorAddress
  );
  const loading = !data && !error;

  return {
    loading,
    address: data,
    mutate,
  };
}

export function useCreatorCategories(creatorId) {
  const { data, mutate, error } = useSWR([creatorId, "creator_category"], getCreatorCategory);
  const loading = !data && !error;
  return {
    loading,
    creatorCategories: data?.creator_category,
    mutate,
  };
}

export function useCreatorAllFundAccount(creatorId) {
  const { data, mutate, error } = useSWR(
    [creatorId, "creator_all_funds"],
    getCreatorAllFundAccount
  );
  const loading = !data && !error;
  return {
    loading,
    creatorAllFundAccounts: data,
    mutate,
  };
}

export function useCreatorFundAccount(creatorId, fundId) {
  const { data, mutate, error } = useSWR(
    [creatorId, fundId, "creator_fund"],
    getCreatorFundAccount
  );
  const loading = !data && !error;
  return {
    loading,
    creatorAllFundAccounts: data,
    mutate,
  };
}

export function useCreatorAllPlatforms(creatorId) {
  const { data, mutate, error } = useSWR(
    [creatorId, "creator_all_platforms"],
    getCreatorAllPlatform
  );
  const loading = !data && !error;
  return {
    loading,
    creatorAllPlatform: data,
    mutate,
  };
}

export function useCreatorPlatform(creatorId) {
  const { data, mutate, error } = useSWR(
    [creatorId, "creator_platform"],
    getCreatorPlatform,
    swrConfigs
  );
  const loading = !data && !error;
  return {
    loading,
    creatorPlatform: data,
    mutate,
  };
}

export function useCreatorLanguages(creatorId) {
  const { data, mutate, error } = useSWR(
    [creatorId, "creator_languages"],
    getCreatorLanguages,
    swrConfigs
  );
  const loading = !data && !error;
  return {
    loading,
    creatorLanguages: data,
    mutate,
  };
}

export function useCreatorPricing(creatorId, pricingId) {
  const { data, mutate, error } = useSWR(
    [creatorId, pricingId, "creator_pricing"],
    getCreatorPricing,
    swrConfigs
  );

  const loading = !data && !error;
  return {
    loading,
    creatorPricing: data,
    mutate,
  };
}

export function useCreatorLocations(creatorId) {
  const { data, mutate, error } = useSWR(
    [creatorId, "creator_location"],
    getCreatorLocations,
    swrConfigs
  );
  const loading = !data && !error;
  return {
    loading,
    creatorLocations: data,
    mutate,
  };
}

export function useCreatorAllPricing(creatorId, params) {
  const { data, mutate, error } = useSWR(
    [creatorId, params, "all_creator_pricing"],
    getCreatorAllPricing,
    swrConfigs
  );
  const loading = !data && !error;
  return {
    loading,
    allCreatorPricing: data,
    creatorLocations: data,
    mutate,
  };
}
