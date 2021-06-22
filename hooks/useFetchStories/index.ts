import { useQuery } from "react-query";
import { StoryWithTopics } from "../../lib/db";

interface Result {
  stories: StoryWithTopics[],
  pages: number
}

export default function useFetchStories(page: number | undefined = 0) {
  return useQuery<Result, Error>(["stories", page], async () => {
    const request = await fetch(`/api/stories?page=${page}`);
    const result = await request.json();
    return result;
  },{
    keepPreviousData: true,
  });
}
