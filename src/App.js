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
} from "antd";
import { RightOutlined } from "@ant-design/icons";

import { Menu , createTreeFromString} from "./components/Menu";
import { useCallback, useState } from "react";
import { IFrame } from "./components/IFrame";
import { Carousal } from "./components/Carousal";
import { HeaderCustom } from "./components/Header";
import Logo from "./images/logo.png";

const { Content, Footer, Sider } = Layout;

function App({ config }) {
  const [theme, setTheme] = useState("light");
  const [iframeUrl, setIframeUrl] = useState("");
  const [subEquipments, setSubEquipments] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([""]);
  const [carousalSelected, setCarousalSelected] = useState([""]);
  const [openKeys, setOpenKeys] = useState([]);
  const defaultSelectedKeys = ["Home"]

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? createTreeFromString(latestOpenKey) : keys);
  };

  const { sider, footerText, header } = config; //config from App.init

  const onSubMenuClick = useCallback((e, item) => {
    const { key } = e;
    console.log(key);
    //Update Breadcrumbs
    setSelectedKeys(key.split(","));
    setCarousalSelected([]);
    //Trigger action if exist for the item
    triggerAction(item?.action);
    // Set all sub-equipements list if type equals equipments
    if (item?.["type"] === "equipments") {
      setSubEquipments(item?.["items"]);
    } else setSubEquipments([]);
  }, []);

  const executeCallback = (fn, args)=>{
    if(fn){
      fn.apply(this, args)
    }
  }

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
    setSelectedKeys(key.split(","));
    setCarousalSelected([]);
    //Trigger action if exist for the item
    triggerAction(item?.action);
    //Clear equipments list
    setSubEquipments([]);
  }, []);

  const changeTheme = useCallback((value) => {
    setTheme(value ? "dark" : "light");
  }, []);

  const onCollapse = useCallback((value) => {
    setCollapsed(value);
  }, []);

  const onCarousalItemClick = useCallback((item, e) => {
    e.preventDefault();
    triggerAction(item?.action);
    //Update breadcrumb
    setCarousalSelected([item?.title || item?.name]);
  }, []);

  const onHomeAction = useCallback((item) => {
    triggerAction(item?.action);
    setSelectedKeys([item?.name]);
  }, []);

  const onActionClick = useCallback((e, item)=>{
    triggerAction(item?.action, e, item);
    if(item?.action?.type === 'openUrl'){
      setSelectedKeys([item?.name]);  //update breadcrumb
      setCarousalSelected([]);  //clear selected carousal
      setOpenKeys([item?.name]); // update menu openKeys for sub menu
      //Clear equipments list
      setSubEquipments([]);
    }
  },[])

  return (
    <Layout style={{ minHeight: "100vh" }} className="App__layout">
      <Sider
        width={256}
        collapsible
        collapsed={collapsed}
        theme={theme}
        onCollapse={onCollapse}
        className="layout__sider"
      >
        <Row className="logocontainer">
          <Col>
            <div className="logo">
              <img
                src={Logo}
                width={"100%"}
                style={{ textAlign: "center" }}
              ></img>
            </div>
          </Col>
        </Row>
        <Menu
          theme={theme}
          data={sider}
          openOnlyCurrentSubMenu={config?.openOnlyCurrentSubMenu ?? true}
          defaultSelectedKeys={defaultSelectedKeys}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onSubMenuClick={onSubMenuClick}
          onMenuItemClick={onMenuItemClick}
          onHomeAction={onHomeAction}
        />
        {/* <br />
        <br />
        <Switch
          checked={theme === "dark"}
          onChange={changeTheme}
          checkedChildren="Light"
          unCheckedChildren="Dark"
        /> */}
      </Sider>
      <Layout className="RHS_panel">
        <HeaderCustom
          breadCrumb={
            <Breadcrumb
              separator={<RightOutlined className="breadcrumb__seperator" />}
              className="header__breadcrumb"
            >
              {[...selectedKeys, ...carousalSelected].map((path) => (
                <Breadcrumb.Item className="header__breadcrumb-item">
                  {path}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          }
          actions={header}
          onActionClick={onActionClick}
        />

        <Content className="layout__content">
          {subEquipments && subEquipments.length > 0 && (
            <Carousal list={subEquipments} onClick={onCarousalItemClick} />
          )}
          <IFrame url={iframeUrl} />
        </Content>
        <Footer style={{ textAlign: "center" }}>{footerText || ""}</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
