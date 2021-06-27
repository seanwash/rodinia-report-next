import { useQuery } from "react-query";
import { ReactionOption } from "../../lib/db";

export default function useFetchReactionOptions() {
  return useQuery<ReactionOption[], Error>(["reactionOptions"], async () => {
    const request = await fetch("/api/reactions/options");
    const { reactionOptions } = await request.json();
    return reactionOptions;
  });
}
