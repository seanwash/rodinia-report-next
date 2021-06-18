import { useMutation } from "react-query";
import { FormEvent } from "react";

export default function useCreateStory() {
  return useMutation((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);

    return fetch("/api/stories", { method: "POST", body: formData });
  });
}
