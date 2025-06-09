import React from "react";

const SiteLoader = ({content}:{content:string}) => {
  return (
    <div>
      <div className="flex justify-center animate-pulse text-3xl">
        {content}
      </div>
    </div>
  );
};

export default SiteLoader;
