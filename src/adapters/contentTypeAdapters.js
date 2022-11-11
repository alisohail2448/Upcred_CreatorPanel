import { getAllContentType, getContentType } from "src/services/contentTypeRequest";
import useSWR from "swr";
import { swrConfigs } from "./swrConfigs";

export function useContentType({ id }) {
  const { token } = useStorage();
  const { data, mutate, error } = useSWR(token ? id : null, getContentType, swrConfigs);

  const loading = !data && !error;

  return {
    loading,
    contentType: data,
    mutate,
  };
}

export function useAllContentType(params) {
  const { data, mutate, error } = useSWR(
    [params, "all_content_type"],
    getAllContentType,
    swrConfigs
  );

  const loading = !data && !error;

  return {
    loading,
    allContentTypes: data,
    mutate,
  };
}
