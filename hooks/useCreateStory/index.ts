import { useMutation } from "react-query";
import { FormEvent } from "react";

export default function useCreateStory() {
  return useMutation(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const target = event.target as HTMLFormElement;
      const params = new FormData(target);

      const response = await fetch("/api/stories", {
        method: "POST",
        body: JSON.stringify({
          story: {
            sourceTitle: params.get("title")!,
            sourceUrl: params.get("sourceUrl")!,
            sourcePaywalled: false,
            // TODO: Don't do this, we should get the userId from the session.
            userId: params.get("userId")!,
            topicIds: params.getAll("topicId"),
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
    }
  );
}
