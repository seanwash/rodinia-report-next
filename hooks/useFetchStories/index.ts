import { QueryClient, useQuery, useQueryClient } from "react-query";
import { StoryWithListEntities } from "../../lib/db";
import { BASE_URL } from "../../lib/constants";

const QUERY_KEY = ["stories"];

async function fetchStories(): Promise<StoryWithListEntities[]> {
  const request = await fetch(`${BASE_URL}/api/stories`);
  const { stories } = await request.json();
  return stories;
}

export async function prefetchStories(queryClient: QueryClient) {
  const client = queryClient || new QueryClient();
  await client.prefetchQuery<StoryWithListEntities[]>(QUERY_KEY, fetchStories, {
    staleTime: 30000,
  });
  return client;
}

export default function useFetchStories() {
  return useQuery<StoryWithListEntities[], Error>(QUERY_KEY, fetchStories);
}
