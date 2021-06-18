import { useMutation } from "react-query";
import { FormEvent } from "react";

export default function useCreateStory() {
  return useMutation(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const target = event.target as HTMLFormElement;
      const formData = new FormData(target);

      const response = await fetch("/api/stories", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return response.json();
    },
    {
      retry: false,
    }
  );
}
