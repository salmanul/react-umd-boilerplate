import React, { useCallback, useState, useMemo, useEffect } from "react";
import "./App.css";
import {
  Breadcrumb,
  Layout,
  Space,
  Tooltip,
  Button,
  Typography,
  Row,
  Col,
  Divider,
  Select,
  Tabs,
  Modal,
  List,
} from "antd";
import { Icon } from "./components/Icon";
import { RightOutlined } from "@ant-design/icons";

import { Menu, createTreeFromString } from "./components/Menu";
import { IFrame } from "./components/IFrame";
import { Carousal } from "./components/Carousal";
import { HeaderCustom } from "./components/Header";
import Logo from "./images/logo.png";
import { Banner } from "./components/Banner";
import { NavHeader } from "./components/Header/NavHeader";
import { Sider } from "./components/Sider";

const { Content, Footer } = Layout;

function App({ config }) {
  const { sider, footerText, header, homeUrl } = config; //config from App.init
  const [theme, setTheme] = useState("light");
  const [iframeUrl, setIframeUrl] = useState(homeUrl);
  const [isVisible, setIsVisible] = useState(false);

  const [building, setBuilding] = useState(null);
  const [equipment, setEquipment] = useState([]);

  // const [subEquipments, setSubEquipments] = useState([]);

  const [collapsed, setCollapsed] = useState(false);
  // const [selectedKeys, setSelectedKeys] = useState([""]);
  const [carousalSelected, setCarousalSelected] = useState([""]);

  const [selectedKeysEquipment, setSelectedKeysEquipment] = useState([]);
  const [selectedKeysSubEquipment, setSelectedKeysSubEquipment] = useState([]);
  // const defaultSelectedKeys = ["Home"];

  // const onOpenChange = (keys) => {
  //   const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
  //   setOpenKeys(latestOpenKey ? createTreeFromString(latestOpenKey) : keys);
  // };

  const equipments = useMemo(() => {
    if (building) return building?.items ?? [];
  }, [building]);

  useEffect(() => {
    //clear all child tree
    setEquipment([]);
    setSelectedKeysEquipment([]);
    setSelectedKeysSubEquipment([]);

  }, [building]);

  const subEquipments = useMemo(() => {
    if (equipment) return equipment?.items ?? [];
  }, [equipment]);

  // const onSubMenuClick = useCallback((e, item) => {
  //   const { key } = e;
  //   console.log(key);
  //   //Update Breadcrumbs
  //   setSelectedKeys(key.split(","));
  //   setCarousalSelected([]);
  //   //Trigger action if exist for the item
  //   triggerAction(item?.action);
  //   // Set all sub-equipements list if type equals equipments
  //   if (item?.["type"] === "equipments") {
  //     setSubEquipments(item?.["items"]);
  //   } else setSubEquipments([]);
  // }, []);

  const executeCallback = (fn, args) => {
    if (fn) {
      fn.apply(this, args);
    }
  };
  const onCloseModel = useCallback(() => {
    setIsVisible(false);
  }, []);

  const onViewAll = () => {
    setIsVisible(true);
  };

  const triggerAction = (action, ...rest) => {
    // Trigger Action
    if (action) {
      const { type } = action;
      switch (type) {
        case "openUrl":
          setIframeUrl(action?.url);
          break;
        case "callbackFunction":
          executeCallback(action?.callback, rest);
          break;
        //TODO: add further actions here
        default:
          console.warn("no action found");
      }
    }
  };

  const onMenuItemClick = useCallback((key, item) => {
    console.log("onMenuItemClick", key, item);
    //Update Breadcrumbs
    // setSelectedKeys(key.split(","));
    // setCarousalSelected([]);
    //Trigger action if exist for the item
    triggerAction(item?.action);
    //Clear equipments list
    // setSubEquipments([]);
    if (item?.type === "equipments") setEquipment(item);
  }, []);

  const changeTheme = useCallback((value) => {
    setTheme(value ? "dark" : "light");
  }, []);

  const onCollapse = useCallback((value) => {
    setCollapsed(value);
  }, []);

  // const onCarousalItemClick = useCallback((item, e) => {
  //   e.preventDefault();
  //   triggerAction(item?.action);
  //   //Update breadcrumb
  //   setCarousalSelected([item?.title || item?.name]);
  // }, []);

  // const onHomeAction = useCallback((item) => {
  //   triggerAction(item?.action);
  //   // setSelectedKeys([item?.name]);
  // }, []);

  const onActionClick = useCallback((e, item) => {
    triggerAction(item?.action, e, item);
    if (item?.action?.type === "openUrl") {
      //setSelectedKeys([item?.name]); //update breadcrumb
      // setCarousalSelected([]); //clear selected carousal
      // setOpenKeys([item?.name]); // update menu openKeys for sub menu
      //Clear equipments list
      // setSubEquipments([]);

    //clear all child tree
    setBuilding(null);
    }
  }, []);

  const onSelectBuilding = useCallback((value, option) => {
    const { extraProps } = option;
    setBuilding(extraProps);
    if (extraProps?.action) {
      triggerAction(extraProps.action);
    }
  }, []);

  const onOverflowClick = (e) => {
    // console.log(e);
    onViewAll();
  };

  const onListItemClick = (item) => (e) => {
    onCloseModel();
    setSelectedKeysSubEquipment([item?.name]);
    triggerAction(item?.action)
  };

  const onSelectEquipment = useCallback(({selectedKeys}) => {
    setSelectedKeysEquipment(selectedKeys);
  }, []);

  const onSelectSubEquipment = useCallback(({selectedKeys}) => {
    setSelectedKeysSubEquipment(selectedKeys);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }} className="App__layout">
      <HeaderCustom
        // breadCrumb={
        //   <Breadcrumb
        //     separator={<RightOutlined className="breadcrumb__seperator" />}
        //     className="header__breadcrumb"
        //   >
        //     {[...selectedKeys, ...carousalSelected].map((path) => (
        //       <Breadcrumb.Item className="header__breadcrumb-item">
        //         {path}
        //       </Breadcrumb.Item>
        //     ))}
        //   </Breadcrumb>
        // }
        actions={header}
        onActionClick={onActionClick}
      />
      <Banner />
      <Content className="layout__content">
        <Layout className="layout__content-wrapper">
          <NavHeader
            list={sider}
            selectedBuilding={building?.name}
            menu={
              <Menu
                theme={theme}
                data={equipments}
                // openOnlyCurrentSubMenu={config?.openOnlyCurrentSubMenu ?? true}
                // defaultSelectedKeys={defaultSelectedKeys}
                // openKeys={openKeys}
                // onOpenChange={onOpenChange}
                // onSubMenuClick={onSubMenuClick}
                onMenuItemClick={onMenuItemClick}
                // onHomeAction={onHomeAction}
                onSelect={onSelectEquipment}
                selectedKeys={selectedKeysEquipment}
              />
            }
            onSelectBuilding={onSelectBuilding}
          />
          <Content>
            <Layout style={{ height: "100%" }}>
              {building && (
                <Sider
                  selectedBuilding={building}
                  logo={building?.image}
                  triggerTitle={building?.name}
                  collapsed={collapsed}
                  onCollapse={onCollapse}
                  theme={theme}
                  contentHtml={building?.contentHtml}
                />
              )}
              <Content>
                <Row style={{ height: "100%" }} className="App__flex-dir-col nav-header__sub-equipment">
                  <Col>
                    {subEquipments && subEquipments.length>0 && ( 
                      <Menu
                        theme={theme}
                        data={subEquipments}
                        // openOnlyCurrentSubMenu={config?.openOnlyCurrentSubMenu ?? true}
                        // defaultSelectedKeys={defaultSelectedKeys}
                        // openKeys={openKeys}
                        // onOpenChange={onOpenChange}
                        // onSubMenuClick={onSubMenuClick}
                        onMenuItemClick={onMenuItemClick}
                        // onHomeAction={onHomeAction}
                        onOverflowClick={onOverflowClick}
                        selectedKeys={selectedKeysSubEquipment}
                        onSelect={onSelectSubEquipment}
                      />
                    )}
                  </Col>
                  <Col flex={1}>
                    <IFrame url={iframeUrl} />
                  </Col>
                </Row>
              </Content>
              <Modal
                title="List"
                footer={null}
                visible={isVisible}
                className="App__modal-list"
                width={"80%"}
                bodyStyle={{
                  height: "50vh",
                  maxHeight: 450,
                  minHeight: 250,
                  overflowY: "auto",
                }}
                onCancel={onCloseModel}
              >
                <List
                  size="small"
                  itemLayout="horizontal"
                  dataSource={subEquipments}
                  grid={{
                    gutter: 16,
                    xs: 2,
                    sm: 2,
                    md: 3,
                    lg: 3,
                    xl: 4,
                    xxl: 4,
                  }}
                  renderItem={(item) => (
                    <List.Item>
                      <Button
                        size="large"
                        icon={<Icon defaultIcon={false} url={item?.icon} />}
                        onClick={onListItemClick(item)}
                      >
                        {item?.name}
                      </Button>
                    </List.Item>
                  )}
                />
              </Modal>
            </Layout>
          </Content>
        </Layout>
      </Content>
      <Footer>{footerText || ""}</Footer>
    </Layout>
  );
}

export default App;
