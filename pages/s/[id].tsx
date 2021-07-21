import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { db } from "../../lib/db";

interface PageProps {}

interface PageQuery extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<PageProps, PageQuery> = async ({ params, req }) => {
  const id = params?.id as string;
  const story = await db.story.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!story) {
    return {
      notFound: true,
    };
  }

  const destination = new URL(story.sourceUrl);
  destination.searchParams.append("ref", "rodinia_report");

  // TODO: Track whatever metrics we want here + increment a counter cache.

  return {
    redirect: {
      destination: destination.toString(),
      statusCode: 301,
    },
  };
};

const S: NextPage<PageProps> = () => {
  return <div>Redirecting...</div>;
};

export default S;
