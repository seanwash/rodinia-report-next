import { QueryClient, useQuery } from "react-query";
import { ReactionOption } from "../../lib/db";
import { BASE_URL } from "../../lib/constants";

const QUERY_KEY = ["reactionOptions"];

async function fetchReactionOptions(): Promise<ReactionOption[]> {
  const request = await fetch(`${BASE_URL}/api/reactions/options`);
  const { reactionOptions } = await request.json();
  return reactionOptions;
}

export async function prefetchReactionOptions(queryClient: QueryClient) {
  const client = queryClient || new QueryClient();
  await client.prefetchQuery(QUERY_KEY, fetchReactionOptions, {
    staleTime: 30000,
  });
  return client;
}

export default function useFetchReactionOptions() {
  return useQuery<ReactionOption[], Error>(QUERY_KEY, fetchReactionOptions);
}
