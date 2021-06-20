import { useEffect } from "react";
import Router from "next/router";
import { useQuery } from "react-query";

export default function useUser({
  redirectTo = false,
  redirectIfFound = false,
} = {}) {
  const { data: user, isLoading } = useQuery(["api", "viewer"], async () => {
    const request = await fetch("/api/viewer");
    return await request.json();
  });

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, isLoading };
}
