import useStorage from "src/hooks/useStorage";
import { getAllUser, getUser } from "src/services/userRequests";
import useSWR from "swr";
import { swrConfigs } from "./swrConfigs";

export function useUser({ id }) {
  const { token } = useStorage();
  const { data, mutate, error } = useSWR(token ? id : null, getUser, swrConfigs);

  const loading = !data && !error;

  return {
    loading,
    user: data,
    mutate,
  };
}

export function useAllUser( params) {
  const { data, mutate, error } = useSWR([ params , "all_users"], getAllUser, swrConfigs);

  const loading = !data && !error;

  return {
    loading,
    users: data,
    mutate,
  };
}
