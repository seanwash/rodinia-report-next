import Head from "next/head";
import Link from "next/link";
import useFetchTopics from "../../hooks/useFetchTopics";
import useCreateStory from "../../hooks/useCreateStory";
import { useRouter } from "next/router";
import useFetchUrlMetadata from "../../hooks/useFetchUrlMetadata";
import { FormEvent, useEffect, useState } from "react";
import withSession, { NextIronRequest } from "../../lib/session";

export default function Share() {
  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const router = useRouter();
  const topicFetch = useFetchTopics();
  const metaDataFetch = useFetchUrlMetadata(url);
  const mutation = useCreateStory();

  useEffect(() => {
    if (metaDataFetch.isSuccess) {
      setTitle(metaDataFetch.data.metadata.ogTitle);
    }
  }, [metaDataFetch.isSuccess]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    mutation.mutate(event, {
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  return (
    <>
      <Head>
        <title>Share a Story</title>
      </Head>

      <h1 className="text-2xl leading-7 mb-4">Submit Story</h1>

      {mutation.isError && (
        <div className="p-3 bg-red-600 text-white rounded-sm shadow-sm mb-4">
          Error: This story could not be shared.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            id="sourceUrl"
            name="sourceUrl"
            placeholder="Paste a URL here to share"
            aria-label="Source URL"
            type="url"
            required
            className="twc-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={metaDataFetch.isLoading}
          />
        </div>
        {metaDataFetch.isSuccess && (
          <>
            <div>
              <input
                id="title"
                name="title"
                placeholder="Title"
                aria-label="Title"
                type="text"
                required
                className="twc-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="relative flex items-center">
              <select
                name="topicId"
                multiple
                aria-label="Related Topics"
                id="topicId"
                className="twc-input"
                required
                defaultValue={[]}
              >
                {!topicFetch.isLoading &&
                  !topicFetch.isError &&
                  topicFetch.data &&
                  topicFetch.data?.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <div className="flex items-center">
                <label htmlFor="sourcePaywalled" className="flex items-center">
                  <input
                    id="sourcePaywalled"
                    name="sourcePaywalled"
                    type="checkbox"
                    className="twc-checkbox"
                  />

                  <span className="ml-2 inline-block text-sm">
                    Is this story behind a paywall?
                  </span>
                </label>
              </div>
            </div>

            <div className="flex items-center">
              <button
                disabled={mutation.isLoading}
                className="twc-button"
                type="submit"
              >
                Submit
              </button>
              <Link href="/">
                <a className="inline-block ml-4 hover:underline">Cancel</a>
              </Link>
            </div>
          </>
        )}
      </form>
    </>
  );
}

export const getServerSideProps = withSession(
  async ({ req }: { req: NextIronRequest }) => {
    const user = req.session.get("user");

    if (user === undefined) {
      return { redirect: { destination: "/login", permanent: false } };
    }

    return {
      props: {},
    };
  }
);
