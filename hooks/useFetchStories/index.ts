import { useQuery } from "react-query";
import { StoryWithListEntities } from "../../lib/db";

export default function useFetchStories() {
  return useQuery<StoryWithListEntities[], Error>(["stories"], async () => {
    const request = await fetch("/api/stories");
    const { stories } = await request.json();
    return stories;
  });
}
