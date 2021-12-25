import React, { useState, useEffect } from "react";
import { Menu as AntdMenu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Icon } from "../Icon";
const { SubMenu } = AntdMenu;

const isLastItem = (item = {}) => (item["items"] ? false : true);
const getCombinedKeys = (names = []) => names.filter(name => name).join(",");
const getHomeItem = (items=[]) => items.find(x=>x["type"] === "home");

export const createTreeFromString = (key = "") => {
  if (key) {
    const keys = key.split(",");
    return keys.reduce((acc = [], cur) => {
      acc.push([...acc, cur].join(","));
      return acc;
    }, []);
  }
};

export const Menu = ({
  data = [],
  theme,
  openOnlyCurrentSubMenu,
  defaultSelectedKeys,
  openKeys,
  onOpenChange,
  onSubMenuClick,
  onMenuItemClick,
  onHomeAction
}) => {
  
  const onClick = (e) => {
    const { key, item } = e;
    const { extraProps } = item.props;
    onMenuItemClick(key, extraProps);
  };

  useEffect(() => {
    const homeItem = getHomeItem(data);
    if(homeItem)onHomeAction(homeItem)
  }, [])

  return (
    <AntdMenu
      onClick={onClick}
      mode="inline"
      {...(openOnlyCurrentSubMenu && { openKeys, onOpenChange })}
      className="sider__menu"
      defaultSelectedKeys={defaultSelectedKeys}
    >
      {getMenuItems({ items: data, onSubMenuClick })}
    </AntdMenu>
  );
};
const getMenuItems = ({ items, onSubMenuClick, name='' }) => {
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
            <AntdMenu.Item
              icon={<Icon url={item?.icon} />}
              extraProps={item}
              key={getCombinedKeys([name, item?.name])}
            >
              {item?.["name"]}
            </AntdMenu.Item>
          ) : (
            <SubMenu
              onTitleClick={onTitleClick(item)}
              key={getCombinedKeys([name, item?.name])}
              icon={<Icon url={item?.icon} />}
              title={item?.name}
            >
              {getMenuItems({
                items: [...item?.["items"]],
                onSubMenuClick,
                name: getCombinedKeys([name, item?.name]),
              })}
            </SubMenu>
          )
        )}
    </>
  );
};
