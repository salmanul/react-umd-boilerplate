import React from "react";

export const IFrame = React.memo(({ url }) => (
  <div className="content__iframe-container">
    <iframe width={"100%"} height={"100%"} src={url} title="dashboard" />
  </div>
));
