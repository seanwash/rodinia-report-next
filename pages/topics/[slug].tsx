import { QueryClient } from "react-query";
import { prefetchStories } from "../../hooks/useFetchStories";
import { prefetchReactionOptions } from "../../hooks/useFetchReactionOptions";
import { prefetchViewer } from "../../hooks/useUser";
import { dehydrate } from "react-query/hydration";
import { GetServerSideProps, NextPage } from "next";
import StoryList from "../../components/StoryList";
import Link from "next/link";
import useFetchTopicBySlug, { prefetchTopicBySlug } from "../../hooks/useFetchTopicBySlug";

interface PageProps {
  slug: string;
}

interface ServerQuery {
  [key: string]: string | string[];
  slug: string;
}

export const getServerSideProps: GetServerSideProps<PageProps, ServerQuery> = async ({ params }) => {
  const slug = params?.slug as string;

  const queryClient = new QueryClient();
  await prefetchStories(queryClient, { topic: slug });
  await prefetchTopicBySlug(queryClient, slug);
  await prefetchReactionOptions(queryClient);
  await prefetchViewer(queryClient);

  return {
    props: {
      slug,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Slug: NextPage<PageProps> = ({ slug }) => {
  const { data: topic } = useFetchTopicBySlug(slug);

  return (
    <div data-cy="topicSlugPage">
      <div data-cy="homePage" className="container mx-auto sm:flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl leading-7 text-el-paso sm:text-3xl sm:leading-9 max-w-4xl">Topic: {topic?.name}</h2>
        </div>
        <div className="flex mt-4 sm:mt-0 sm:ml-8">
          <span className="shadow-sm rounded-sm">
            <Link href="/stories/share">
              <a className="twc-button">Submit Story</a>
            </Link>
          </span>
        </div>
      </div>

      <StoryList slug={slug} />
    </div>
  );
};

export default Slug;
