export const swrConfigs = {
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    // Never retry on 404.
    if (error.status === 404) return;

    // Only retry up to 10 times.
    if (retryCount >= 10) return;

    // Retry after 5 seconds.
    setTimeout(() => revalidate({ retryCount }), 3000);
  },
};
