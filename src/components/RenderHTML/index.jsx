import React from "react";
export const renderHTML = (rawHTML) =>
  React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML }, className:"sider__render-html"});
