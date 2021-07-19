import { QueryClient, QueryFunctionContext, useQuery } from "react-query";
import { Topic } from "../../lib/db";
import { BASE_URL } from "../../lib/constants";

async function fetchTopicBySlug(context: QueryFunctionContext, slug: string) {
  const request = await fetch(`${BASE_URL}/api/topics/${slug}`);
  const { topic } = await request.json();
  return topic;
}

export async function prefetchTopicBySlug(queryClient: QueryClient, slug: string) {
  const client = queryClient || new QueryClient();

  await client.prefetchQuery<Topic>(["topics", slug], (context) => fetchTopicBySlug(context, slug));

  return client;
}

export default function useFetchTopicBySlug(slug: string) {
  return useQuery<Topic, Error>(["topics", slug], (context) => fetchTopicBySlug(context, slug));
}
