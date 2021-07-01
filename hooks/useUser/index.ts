import { useEffect } from "react";
import Router from "next/router";
import { QueryClient, useQuery } from "react-query";
import { BASE_URL } from "../../lib/constants";

interface UseUserProps {
  redirectTo?: string;
  redirectIfFound?: string;
}

const QUERY_KEY = ["api", "viewer"];

async function fetchViewer() {
  const request = await fetch(`${BASE_URL}/api/viewer`);
  return await request.json();
}

export async function prefetchViewer(queryClient: QueryClient) {
  const client = queryClient || new QueryClient();
  await client.prefetchQuery(QUERY_KEY, fetchViewer);
  return client;
}

export default function useUser({
  redirectTo,
  redirectIfFound,
}: UseUserProps = {}) {
  const { data: user, isLoading } = useQuery(QUERY_KEY, fetchViewer);

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard) if user
    // data not yet there (fetch in progress, logged in or not) then don't do
    // anything yet.
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
