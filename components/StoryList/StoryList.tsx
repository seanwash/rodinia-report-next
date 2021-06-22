import useFetchStories from "../../hooks/useFetchStories";
import StoryListItem from "../StoryListItem";
import queryString from "query-string";
import { useEffect, useState } from "react";

const StoryList: React.FC = () => {
  const [page, setPage] = useState(0);

  // Not sure if we want to use query params to save page — could get copied by
  // the user and would bring them to that page instead of the beginning.
  // Another option could be to use storage.
  useEffect(() => {
    const queryObj = queryString.parse(window.location.search);
      if (queryObj.page && typeof queryObj.page === "string") {
        setPage(parseInt(queryObj.page));
      } 
    }
  ), [];

  const { data, isLoading, isError } = useFetchStories(page);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const handlePreviousButtonClick = () => {
    setPage(page-1);
  }

  const handleNextButtonClick = () => {
    setPage(page+1);
  }

  return (
    <>
      <ul className="bg-alabaster-300 shadow-sm rounded-sm divide-y divide-alabaster mt-8">
        {data?.stories.map((story) => (
          <li key={story.id}>
            <StoryListItem story={story} />
          </li>
        ))}
      </ul>
      <div className="mt-4">
        {page > 0 && <button onClick={handlePreviousButtonClick} className="hover:underline p-2">Previous Page</button>}
        {data?.pages && page+1 < data.pages && <button onClick={handleNextButtonClick} className="hover:underline p-2">Next Page</button>}
      </div>
    </>
  );
};

export default StoryList;
