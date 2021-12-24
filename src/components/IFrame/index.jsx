import React from "react";

export const IFrame = React.memo(({ url }) => (
  <div className="site-layout-background">
    TEST :{url}
    <iframe width={"100%"} height={"100%"} src={url} title="dashboard" />
  </div>
));
