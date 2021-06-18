import Head from "next/head";
import Link from "next/link";
import useFetchTopics from "../../hooks/useFetchTopics";
import useCreateStory from "../../hooks/useCreateStory";
import { useRouter } from "next/router";

export default function Share() {
  const router = useRouter();
  const topicFetch = useFetchTopics();
  const mutation = useCreateStory();

  if (mutation.isSuccess) {
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Share a Story</title>
      </Head>

      <h2 className="text-2xl leading-7 mb-4">Submit Story</h2>

      {mutation.isError && (
        <div className="p-3 bg-red-600 text-white rounded-sm shadow-sm mb-4">
          {mutation.error as string}
        </div>
      )}

      <form onSubmit={mutation.mutate} className="space-y-4">
        <div>
          <input
            name="title"
            placeholder="Title"
            aria-label="Title"
            type="text"
            required
            className="twc-input"
          />
        </div>
        <div>
          <input
            name="sourceUrl"
            placeholder="Source URL"
            aria-label="Source URL"
            type="url"
            required
            className="twc-input"
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
      </form>
    </>
  );
}
