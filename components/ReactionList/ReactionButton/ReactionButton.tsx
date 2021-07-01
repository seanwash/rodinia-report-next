import useCreateReaction from "../../../hooks/useCreateReaction";
import useDeleteReaction from "../../../hooks/useDeleteReaction";
import { AugmentedReactionOption } from "../ReactionList";

interface Props {
  storyId: number;
  reactionOption: AugmentedReactionOption;
}

const ReactionButton: React.FC<Props> = ({ storyId, reactionOption }) => {
  const createReactionMutation = useCreateReaction();
  const deleteReactionMutation = useDeleteReaction();
  const userHasReactedWithOption = !!reactionOption.storyReactionId;

  const isLoading =
    createReactionMutation.isLoading || deleteReactionMutation.isLoading;

  const handleCreateReaction = (reactionOptionId: number) => {
    createReactionMutation.mutate({ storyId, reactionOptionId });
  };

  const handleDeleteReaction = (reactionId: number) => {
    deleteReactionMutation.mutate({ reactionId });
  };

  return (
    <button
      className={`twc-with-emoji space-x-2 inline-flex items-center rounded-full py-1 px-4 h-7 justify-center
                      ${isLoading ? "opacity-50" : ""} ${
        userHasReactedWithOption
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
        <span className="text-xs font-bold">{reactionOption.count}</span>
      )}
      <span className="">{reactionOption.code}</span>
    </button>
  );
};

export default ReactionButton;
