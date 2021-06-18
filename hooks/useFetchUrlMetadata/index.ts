import { useQuery } from "react-query";

export default function useFetchUrlMetadata(url?: string) {
  return useQuery(
    ["storyMetadata"],
    async () => {
      const request = await fetch(`/api/stories/metadata?url=${url}`);
      return await request.json();
    },
    {
      enabled: !!url,
      retry: false,
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
      refetchOnReconnect: false,
      cacheTime: 0, // Disable cache for this query
    }
  );
}
