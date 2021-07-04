import React from "react";

const WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
const TRACKER_URL = process.env.NEXT_PUBLIC_UMAMI_TRACKER_URL;

const UmamiTracker = () => {
  return WEBSITE_ID ? (
    <script
      async
      defer
      data-website-id={WEBSITE_ID}
      data-do-not-track="true"
      src={TRACKER_URL}
    />
  ) : null;
};

export default UmamiTracker;
