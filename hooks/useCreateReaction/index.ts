import { useMutation, useQueryClient } from "react-query";

interface CreateReactionParams {
  storyId: number;
  reactionOptionId: number;
}

export default function useCreateReaction() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ storyId, reactionOptionId }: CreateReactionParams) => {
      const response = await fetch("/api/reactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reaction: {
            storyId,
            reactionOptionId,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(await response.json());
      }

      return response.json();
    },
    {
      retry: false,
      onSuccess: async () => {
        // TODO: Invalidate just the updated story.
        await queryClient.invalidateQueries(["stories"]);
      },
    }
  );
}
