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
  const onTitleClick =
    (item = {}) =>
    (e) => {
      onSubMenuClick(e, item);
    };

  const onClick = (e) => {
    const { key, item } = e;
    const { extraProps } = item.props;
    onMenuItemClick(key, extraProps);
  };

  return (
    <AntdMenu theme={theme} onClick={onClick} mode="inline">
      {data &&
        data.map((item) =>
          isLastItem(item) ? (
            <AntdMenu.Item extraProps={item} key={item?.["name"]}>
              {item?.["name"]}
            </AntdMenu.Item>
          ) : (
            <SubMenu
              onTitleClick={onTitleClick(item)}
              key={item?.type+item?.name}
              icon={item?.icon ?? <UploadOutlined/>}
              title={item?.name}
            >
              <Menu
                theme={theme}
                data={[...item?.["items"]]}
                onSubMenuClick={onSubMenuClick}
                onMenuItemClick={onMenuItemClick}
              />
            </SubMenu>
          )
        )}
    </AntdMenu>
  );
};
