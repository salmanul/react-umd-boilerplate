import React from "react";
import { QuestionOutlined } from "@ant-design/icons";
export const Icon = ({ url, width = 14, height = 14 }) =>
  url ? (
    <span role="img" aria-label="question" className="anticon">
      <img width={width} height={height} src={url} alt="?" />
    </span>
  ) : (
    <QuestionOutlined />
  );
