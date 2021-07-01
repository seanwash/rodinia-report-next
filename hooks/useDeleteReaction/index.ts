import { useMutation, useQueryClient } from "react-query";

interface DeleteReactionParams {
  reactionId: number;
}

export default function useDeleteReaction() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ reactionId }: DeleteReactionParams) => {
      const response = await fetch(`/api/reactions/${reactionId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(await response.json());
      }

      return response.statusText;
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
