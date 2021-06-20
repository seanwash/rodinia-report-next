import { useMutation, useQueryClient } from "react-query";
import { FormEvent } from "react";

export default function useSignUp() {
  const queryClient = useQueryClient();
  return useMutation(
    async (event: FormEvent<HTMLFormElement>) => {
      const params = new FormData(event.target as HTMLFormElement);

      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: params.get("email")!,
          password: params.get("password")!,
        }),
      });

      if (!response.ok) {
        throw new Error((await response.json()).message);
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
