import { useQuery } from "react-query";
import { StoryWithTopics } from "../../lib/db";

export default function useFetchStories() {
  return useQuery<StoryWithTopics[], Error>(["stories"], async () => {
    const request = await fetch("/api/stories");
    const { stories } = await request.json();
    return stories;
  });
}
