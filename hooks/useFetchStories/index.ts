import { QueryClient, QueryFunctionContext, useQuery, useQueryClient } from "react-query";
import { StoryWithListEntities } from "../../lib/db";
import { BASE_URL } from "../../lib/constants";
import useFetchTopics from "../useFetchTopics";

interface Args {
  topic?: string;
}

const QUERY_KEY = ["stories"];

async function fetchStories(context: QueryFunctionContext, args?: Args): Promise<StoryWithListEntities[]> {
  let url = `${BASE_URL}/api/stories`;
  const slug = args?.topic;

  if (slug) {
    url = url + `?topic=${slug}`;
  }

  const request = await fetch(url);
  const { stories } = await request.json();

  return stories;
}

export async function prefetchStories(queryClient: QueryClient, args?: Args) {
  const client = queryClient || new QueryClient();

  await client.prefetchQuery<StoryWithListEntities[]>(QUERY_KEY, (context) => fetchStories(context, args), {
    staleTime: 30000,
  });

  return client;
}

export default function useFetchStories(args?: Args) {
  return useQuery<StoryWithListEntities[], Error>(QUERY_KEY, (context) => fetchStories(context, args));
}
