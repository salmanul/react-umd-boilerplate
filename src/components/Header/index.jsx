import React, { useMemo, useCallback } from "react";
import { Space, Tooltip, Typography, Row, Col, Divider, Layout, Button } from "antd";
import { SearchOutlined, HomeOutlined } from "@ant-design/icons";
import { Icon } from "../Icon";

const { Header } = Layout;

export const HeaderCustom = ({ breadCrumb, actions = [], onActionClick }) => {
  const onClick = (item) => (e) => {
    onActionClick(e, item);
  };
  const actionItems = useMemo(
    () =>
      actions.map((item) => (
        <>
          {item?.type === "text" && (
            <Typography.Link
              onClick={onClick(item)}
              className="header__action-text"
              key={item?.name}
            >
              {item?.text}
            </Typography.Link>
          )}
          {item?.type === "button" && (
            <Tooltip key={item?.name} title={item?.name}>
              <Button onClick={onClick(item)} icon={<Icon width={25} height={25} url={item?.icon} />} type="link" />
            </Tooltip>
          )}
        </>
      )),
    [actions]
  );
  return (
    <Header
      className="App__header"
    >
      <Row align="center">
        <Col flex="1 1 auto">{breadCrumb}</Col>
        <Col>
          <Space size={0} split={<Divider className="header__divider" type="vertical" />} align="center" className="header__space">
            {actionItems}
          </Space>
        </Col>
      </Row>
    </Header>
  );
};
