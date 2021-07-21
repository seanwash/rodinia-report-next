import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { db } from "../../lib/db";

interface PageProps {}

interface PageQuery extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<PageProps, PageQuery> = async ({ params }) => {
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

  await db.story.update({
    where: {
      id: Number(id),
    },
    data: {
      permalinkHitCount: {
        increment: 1,
      },
    },
  });

  const destination = new URL(story.sourceUrl);
  destination.searchParams.append("ref", "rodinia_report");

  return {
    redirect: {
      destination: destination.toString(),
      statusCode: 302,
    },
  };
};

const S: NextPage<PageProps> = () => {
  return <div>Redirecting...</div>;
};

export default S;
