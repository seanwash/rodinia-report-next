import React from "react";
import { ShareIcon } from "../../../icons";

interface Props {
  storyId: number;
}

const COPY_LINK_TEXT = "Copy link";
const COPIED_LINK_TEXT = "Copied link!";
const LINK_CONFIRMATION_LENGTH_IN_MS = 5000;

const CopyLinkButton: React.FC<Props> = ({ storyId }) => {
  const [buttonText, setButtonText] = React.useState(COPY_LINK_TEXT);

  const handleClick = () => {
    navigator.clipboard.writeText(`https://rodinia.report/s/${storyId}`);

    setButtonText(COPIED_LINK_TEXT);

    setTimeout(() => {
      setButtonText(COPY_LINK_TEXT);
    }, LINK_CONFIRMATION_LENGTH_IN_MS);
  };

  return (
    <button type="button" onClick={handleClick} className="flex items-center text-sm">
      <ShareIcon className="h-5 w-5 stroke-current mr-2" />
      <span>{buttonText}</span>{" "}
    </button>
  );
};

export default CopyLinkButton;
