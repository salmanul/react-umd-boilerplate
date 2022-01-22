import React, { useCallback, useState, useMemo, useEffect } from "react";
import "./App.css";
import {
  Layout,
  Button,
  Row,
  Col,
  Modal,
  List,
} from "antd";
import { Icon } from "./components/Icon";

import { Menu, createTreeFromString } from "./components/Menu";
import { IFrame } from "./components/IFrame";
import { HeaderCustom } from "./components/Header";
import { Banner } from "./components/Banner";
import { NavHeader } from "./components/Header/NavHeader";
import { Sider } from "./components/Sider";

const { Content, Footer } = Layout;

function App({ config }) {
  const { sider, footerText, header, homeUrl, ibmsLogo, bannerContentUrl } = config; //config from App.init
  const [theme, setTheme] = useState("light");
  const [iframeUrl, setIframeUrl] = useState(homeUrl);
  const [isVisible, setIsVisible] = useState(false);
  const [building, setBuilding] = useState(null);
  const [equipment, setEquipment] = useState([]);
  const [subEquipment, setSubEquipment] = useState(null);
  const [collapsed, setCollapsed] = useState({left:false, right:false});

  const [selectedKeysEquipment, setSelectedKeysEquipment] = useState([]);
  const [selectedKeysSubEquipment, setSelectedKeysSubEquipment] = useState([]);
 
  const equipments = useMemo(() => {
    if (building) return building?.items ?? [];
  }, [building]);

  useEffect(() => {
    //clear all child tree
    setEquipment([]);
    setSubEquipment(null);
    setSelectedKeysEquipment([]);
    setSelectedKeysSubEquipment([]);

  }, [building]);

  useEffect(() => {
    //clear sub equipments
    setSelectedKeysSubEquipment([]);
    setSubEquipment(null);
  }, [selectedKeysEquipment]);

  const subEquipments = useMemo(() => {
    if (equipment) return equipment?.items ?? [];
  }, [equipment]);

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
    //Trigger action if exist for the item
    triggerAction(item?.action);
    if (item?.type === "equipments") setEquipment(item);
    if (item?.type === "sub-equipment") setSubEquipment(item);
  }, []);

  const onCollapse = useCallback((position)=>(value) => {
    setCollapsed({...collapsed, [position]:value});
  }, []);

  const onActionClick = useCallback((e, item) => {
    triggerAction(item?.action, e, item);
    if (item?.action?.type === "openUrl") {
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
    onViewAll();
  };

  const onListItemClick = (item) => (e) => {
    onCloseModel();
    setSelectedKeysSubEquipment([item?.name]);
    setSubEquipment(item);
    triggerAction(item?.action);
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
        actions={header}
        onActionClick={onActionClick}
      />
      <Banner ibmsLogo={ibmsLogo} bannerContent={<IFrame url={bannerContentUrl} />} />
      <Content className="layout__content">
        <Layout className="layout__content-wrapper">
          <NavHeader
            list={sider}
            selectedBuilding={building?.name}
            menu={
              <Menu
                theme={theme}
                data={equipments}
                onMenuItemClick={onMenuItemClick}
                onOverflowClick={null}
                onSelect={onSelectEquipment}
                selectedKeys={selectedKeysEquipment}
              />
            }
            onSelectBuilding={onSelectBuilding}
          />
          <Content>
            <Layout style={{ height: "100%" }}>
              {/** LEFT SIDER */}
              {building && (
                <Sider
                  selectedBuilding={building}
                  logo={building?.image}
                  triggerTitle={building?.name}
                  collapsed={collapsed?.left}
                  onCollapse={onCollapse('left')}
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
                        onMenuItemClick={onMenuItemClick}
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
               {/** RIGHT SIDER */}
              {subEquipment && (
                <Sider  
                  selectedBuilding={building}
                  triggerTitle={subEquipment?.label ?? 'label'}
                  collapsed={collapsed.right}
                  onCollapse={onCollapse('right')}
                  iframeUrl={subEquipment?.rightPanelIframeUrl ?? ""}
                  triggerPosition="left"
                  />
                  )}
                  
              <Modal
                title="All"
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
                      type="text"
                        size="large"
                        icon={<Icon defaultIcon={false} url={item?.icon} />}
                        onClick={onListItemClick(item)}
                        className="modal__list-item-btn"
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
