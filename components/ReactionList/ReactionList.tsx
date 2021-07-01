import useFetchReactionOptions from "../../hooks/useFetchReactionOptions";
import useUser from "../../hooks/useUser";
import { StoryReaction } from "../../lib/db";
import ReactionButton from "./ReactionButton";

export type AugmentedReactionOption = {
  id: number;
  name: string;
  count: number;
  code: string;
  storyReactionId?: number;
};

type AugmentedReactionOptionCollection = {
  [key: number]: AugmentedReactionOption;
};

interface Props {
  storyId: number;
  reactions: StoryReaction[];
}

const ReactionList: React.FC<Props> = ({ storyId, reactions }) => {
  const user = useUser();
  const reactionOptions = useFetchReactionOptions();
  let reactionOptionData: AugmentedReactionOptionCollection = {};

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
    reactions.forEach((reaction) => {
      const reactionOptionDatum = reactionOptionData[reaction.reactionOptionId];
      reactionOptionDatum.count += 1;
      if (reaction.userId === user.user.id) {
        reactionOptionDatum.storyReactionId = reaction.id;
      }
    });
  }

  return Object.keys(reactionOptionData).length > 0 ? (
    <div className="mt-4 lg:mt-0 space-x-2 flex items-center">
      {Object.entries(reactionOptionData).map(([_name, reactionOption]) => (
        <ReactionButton
          key={reactionOption.id}
          storyId={storyId}
          reactionOption={reactionOption}
        />
      ))}
    </div>
  ) : null;
};

export default ReactionList;
