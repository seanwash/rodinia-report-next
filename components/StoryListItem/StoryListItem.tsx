import { ClockIcon, GlobeAltIcon } from "../icons";
import { StoryWithListEntities, Topic } from "../../lib/db";
import useCreateReaction from "../../hooks/useCreateReaction";
import useFetchReactionOptions from "../../hooks/useFetchReactionOptions";
import useDeleteReaction from "../../hooks/useDeleteReaction";
import useUser from "../../hooks/useUser";

interface StoryListItemProps {
  story: StoryWithListEntities;
}

const StoryListItem: React.FC<StoryListItemProps> = ({ story }) => {
  const reactionOptions = useFetchReactionOptions();

  const sourceUrl = new URL(story.sourceUrl);
  sourceUrl.searchParams.append("utm_source", "rodinia_report");
  sourceUrl.searchParams.append("ref", "rodinia_report");

  const createdAt = new Intl.DateTimeFormat().format(new Date(story.createdAt));
  const user = useUser();
  const createReactionMutation = useCreateReaction();
  const deleteReactionMutation = useDeleteReaction();
  const isLoading =
    createReactionMutation.isLoading || deleteReactionMutation.isLoading;

  const storyData = {
    createdAt,
    sourceUrl: sourceUrl.toString(),
    sourceHostname: new URL(story.sourceUrl).hostname,
  };

  type ReactionOptionData = {
    [key: number]: {
      id: number;
      name: string;
      count: number;
      storyReactionId?: number;
    };
  };

  let reactionOptionData: ReactionOptionData = {};

  if (!reactionOptions.isLoading && !user.isLoading) {
    // TODO: Refactor this - it's pretty inefficient.
    //
    // Pre-populate all of the available ReactionOptions with some default
    // state.
    reactionOptions.data?.forEach((reactionOption) => {
      reactionOptionData[reactionOption.id] = {
        ...reactionOption,
        count: 0,
      };
    });

    // TODO: Refactor this - it's pretty inefficient.
    //
    // Aggregate counts into our augmented ReactionOptions above with updated
    // counts and if the viewer has used that ReactionOption.
    story.reactions.forEach((reaction) => {
      const reactionOptionDatum = reactionOptionData[reaction.reactionOptionId];
      reactionOptionDatum.count += 1;
      if (reaction.userId === user.user.id) {
        reactionOptionDatum.storyReactionId = reaction.id;
      }
    });
  }

  const handleCreateReaction = (reactionOptionId: number) => {
    createReactionMutation.mutate({ storyId: story.id, reactionOptionId });
  };

  const handleDeleteReaction = (reactionId: number) => {
    deleteReactionMutation.mutate({ reactionId });
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="w-full p-4">
        <h3>
          <a
            href={story.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {story.sourceTitle}
          </a>
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center mt-2 sm:space-x-4 leading-5 text-gray-500">
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
            <ul className="mt-4 sm:mt-0 space-x-2">
              {story.topics.map((topic: Topic) => (
                <li
                  className="text-xs text-white bg-el-paso inline-block rounded-full py-1 px-4 h-7 inline-flex items-center"
                  key={topic.id}
                >
                  {topic.name}
                </li>
              ))}
            </ul>
          )}

          {Object.keys(reactionOptionData).length > 0 && (
            <div className="space-x-2 flex items-center">
              {Object.entries(reactionOptionData).map(
                ([_name, reactionOption]) => (
                  <button
                    className={`twc-with-emoji space-x-2 inline-flex items-center  rounded-full py-1 px-4 h-7 justify-center
                      ${isLoading ? "opacity-50" : ""} ${
                      reactionOption.storyReactionId
                        ? "bg-pale-slate hover:bg-vista-white focus:bg-vista-white text-white hover:text-black focus:text-black"
                        : "bg-vista-white hover:bg-pale-slate focus:bg-pale-slate"
                    }`}
                    key={reactionOption.id}
                    type="button"
                    onClick={() => {
                      if (reactionOption.storyReactionId) {
                        handleDeleteReaction(reactionOption.storyReactionId);
                      } else {
                        handleCreateReaction(reactionOption.id);
                      }
                    }}
                    disabled={isLoading}
                  >
                    {reactionOption.count > 0 && (
                      <span className="text-xs font-bold">
                        {reactionOption.count}
                      </span>
                    )}
                    <span className="">{reactionOption.code}</span>
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryListItem;
