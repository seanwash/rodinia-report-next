import Link from "next/link";
import Head from "next/head";
import StoryList from "../components/StoryList/StoryList";

export default function Home() {
  return (
    <>
      <Head>
        <title>The Rodinia Report</title>
      </Head>

      <div className="container mx-auto sm:flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl leading-7 text-el-paso sm:text-3xl sm:leading-9 max-w-4xl">
            The <span className="font-bold">Rodinia Report</span> is a public
            curation of environmentally focused articles that helps individuals
            easily stay up to date on the most recent and most inspiring
            undertakings around the world.
          </h2>
        </div>
        <div className="flex mt-4 sm:mt-0 sm:ml-8">
          <span className="shadow-sm rounded-sm">
            <Link href="/stories/share">
              <a className="twc-button">Submit Story</a>
            </Link>
          </span>
        </div>
      </div>

      <StoryList />
    </>
  );
}
