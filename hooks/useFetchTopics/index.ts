import { useQuery } from "react-query";
import { Topic } from "../../lib/db";

export default function useFetchTopics() {
  return useQuery<Topic[], Error>(["topics"], async () => {
    const request = await fetch("/api/topics");
    const { topics } = await request.json();
    return topics;
  });
}
