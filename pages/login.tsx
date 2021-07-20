import { FormEvent } from "react";
import useSignIn from "../hooks/useLogin";
import { useRouter } from "next/router";
import withSession from "../lib/session";
import Head from "next/head";

export default function Login() {
  const mutation = useSignIn();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(event);
  };

  if (mutation.isSuccess) {
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Log In</title>
      </Head>

      <h1 className="text-2xl leading-7 mb-4">Log In</h1>

      {mutation.isError && (
        <div className="p-3 bg-red-600 text-white rounded-sm shadow-sm mb-4">
          Error: {mutation.error.message}
        </div>
      )}

      <form
        data-cy="loginForm"
        onSubmit={handleSubmit}
        method="post"
        className="space-y-4"
      >
        <div>
          <input
            type="email"
            name="email"
            aria-label="Email Address"
            placeholder="Email Address"
            autoComplete="email"
            required
            className="twc-input"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            aria-label="Password"
            placeholder="Password"
            required
            className="twc-input"
          />
        </div>
        <div>
          <button
            disabled={mutation.isLoading}
            className="twc-button"
            type="submit"
          >
            Log In
          </button>
        </div>
      </form>
    </>
  );
}

export const getServerSideProps = withSession(async ({ req }) => {
  const user = req.session.get("user");

  if (user) {
    return { redirect: { destination: "/", permanent: false } };
  }

  return { props: {} };
});
