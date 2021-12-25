import React from "react";
import {
    QuestionOutlined,
  } from "@ant-design/icons";
export const Icon = ({url})=>url ?<span role="img" aria-label="question" class="anticon anticon-question"><img width={14} height={14} src={url} alt="?"/></span>:<QuestionOutlined />