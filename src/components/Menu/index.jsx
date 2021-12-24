import React from "react";
import { Menu as AntdMenu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
const { SubMenu } = AntdMenu;

const isLastItem = (item = {}) => (item["items"] ? false : true);

export const Menu = ({ data = [], theme, onSubMenuClick, onMenuItemClick }) => {
  const onClick = (e) => {
    const { key, item } = e;
    const { extraProps } = item.props;
    onMenuItemClick(key, extraProps);
  };

  return (
    <AntdMenu theme={theme} onClick={onClick} mode="inline">
      {getMenuItems({ items: data, onSubMenuClick })}
    </AntdMenu>
  );
};
const getMenuItems = ({ items, onSubMenuClick, name }) => {
  const onTitleClick =
    (item = {}) =>
    (e) => {
      onSubMenuClick(e, item);
    };
  return (
    <>
      {items &&
        items.map((item) =>
          isLastItem(item) ? (
            <AntdMenu.Item extraProps={item} key={name ? `${name},${item?.name}` : item?.name}>
              {item?.["name"]}
            </AntdMenu.Item>
          ) : (
            <SubMenu
              onTitleClick={onTitleClick(item)}
              key={name ? `${name},${item?.name}` : item?.name}
              icon={item?.icon ?? <UploadOutlined />}
              title={item?.name}
            >
              {getMenuItems({
                items: [...item?.["items"]],
                onSubMenuClick,
                name: name ? `${name},${item?.name}` : item?.name,
              })}
            </SubMenu>
          )
        )}
    </>
  );
};
