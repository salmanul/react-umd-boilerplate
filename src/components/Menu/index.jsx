import React, { useState, useCallback, useEffect } from "react";
import { Button, Menu as AntdMenu, Typography } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Icon } from "../Icon";
const { SubMenu } = AntdMenu;

const isLastItem = (item = {}) => (item["items"] ? false : true);
const getCombinedKeys = (names = []) => names.filter((name) => name).join(",");
const getHomeItem = (items = []) => items.find((x) => x["type"] === "home");

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
  onHomeAction,
  selectedKeys,
  onOverflowClick,
  onSelect,
}) => {
  const onClick = (e) => {
    const { key, item } = e;
    const { extraProps } = item.props;
    onMenuItemClick(key, extraProps);
  };

  const onOverflow = useCallback((e) => {
    e.stopPropagation();
    onOverflowClick && onOverflowClick(e);
  }, []);

  return (
    <AntdMenu
      onClick={onClick}
      onSelect={onSelect}
      mode="horizontal"
      // {...(openOnlyCurrentSubMenu && { openKeys, onOpenChange })}
      className="header__nav-menu"
      // defaultSelectedKeys={defaultSelectedKeys}
      overflowedIndicator={
        <Button type="text" className="menu__overflow-btn" onClick={onOverflow}>
          View All
        </Button>
      }
      triggerSubMenuAction="click"
      selectedKeys={selectedKeys}
    >
      {/* {getMenuItems({ items: data, onSubMenuClick })} */}
      {data.map((item) => (
        <AntdMenu.Item
          icon={<Icon defaultIcon={false} width={""} height={'100%'} url={item?.icon} />}
          extraProps={item}
          key={item?.name}
          
        >
          {item?.["name"]}
        </AntdMenu.Item>
      ))}
    </AntdMenu>
  );
};
const getMenuItems = ({ items, onSubMenuClick, name = "" }) => {
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
