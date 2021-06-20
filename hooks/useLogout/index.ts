import { useMutation, useQueryClient } from "react-query";

export default function useLogout() {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      const response = await fetch("/api/logout");

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return await response.json();
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["api", "viewer"]);
      },
    }
  );
}
