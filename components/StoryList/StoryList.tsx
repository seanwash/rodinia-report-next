import useFetchStories from "../../hooks/useFetchStories";
import StoryListItem from "./StoryListItem";

interface Props {
  slug?: string;
}

const StoryList: React.FC<Props> = ({ slug }) => {
  const { data: stories, isLoading, isError } = useFetchStories({ topic: slug });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <ul className="bg-alabaster-300 shadow-sm rounded-sm divide-y divide-alabaster mt-8">
      {stories?.map((story) => (
        <li key={story.id}>
          <StoryListItem story={story} />
        </li>
      ))}
    </ul>
  );
};

export default StoryList;
