import { ClockIcon, GlobeAltIcon } from "../../icons";
import { StoryWithListEntities, Topic } from "../../../lib/db";
import ReactionList from "./ReactionList";
import Link from "next/link";

interface Props {
  story: StoryWithListEntities;
}

const StoryListItem: React.FC<Props> = ({ story }) => {
  const sourceUrl = new URL(story.sourceUrl);
  sourceUrl.searchParams.append("utm_source", "rodinia_report");
  sourceUrl.searchParams.append("ref", "rodinia_report");

  const createdAt = new Intl.DateTimeFormat().format(new Date(story.createdAt));

  const storyData = {
    createdAt,
    sourceUrl: sourceUrl.toString(),
    sourceHostname: new URL(story.sourceUrl).hostname,
  };

  return (
    <div data-cy="storyListItem" className="flex items-center space-x-4">
      <div className="w-full p-4">
        <h3>
          <a href={storyData.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {story.sourceTitle}
          </a>
        </h3>

        <div className="flex flex-col lg:flex-row lg:items-center mt-2 lg:space-x-4 leading-5 text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm">
              <ClockIcon className="h-5 w-5 stroke-current mr-2" />
              <span>{storyData.createdAt}</span>
            </div>

            <div className="flex items-center text-sm">
              <GlobeAltIcon className="h-5 w-5 stroke-current mr-2" />
              <span>{storyData.sourceHostname}</span>
            </div>
          </div>

          {story.topics.length > 0 && (
            <ul className="mt-4 lg:mt-0 space-x-2">
              {story.topics.map((topic: Topic) => (
                <li key={topic.id}>
                  <Link href={`/topics/${topic.slug}`}>
                    <a
                      data-cy="topicLink"
                      className="text-xs text-white bg-el-paso rounded-full py-1 px-4 h-7 inline-flex items-center"
                    >
                      {topic.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <ReactionList storyId={story.id} reactions={story.reactions} />
        </div>
      </div>
    </div>
  );
};

export default StoryListItem;
