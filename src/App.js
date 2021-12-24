import "./App.css";
import { Breadcrumb, Layout, Switch } from "antd";
import { RightOutlined } from "@ant-design/icons";

import { Menu } from "./components/Menu";
import { useCallback, useState } from "react";
import { IFrame } from "./components/IFrame";
import { Carousal } from "./components/Carousal";

const { Header, Content, Footer, Sider } = Layout;

function App({ config }) {
  const [theme, setTheme] = useState("dark");
  const [iframeUrl, setIframeUrl] = useState("");
  const [subEquipments, setSubEquipments] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([""]);
  const [carousalSelected, setCarousalSelected] = useState([""]);

  const { buildings, footerText } = config; //config from App.init

  const onSubMenuClick = useCallback((e, item) => {
    const { key } = e;
    console.log(key);
    //Update Breadcrumbs
    setSelectedKeys(key.split(","));
    setCarousalSelected([])
    //Trigger action if exist for the item
    triggerAction(item?.action);
    // Set all sub-equipements list if type equals equipments
    if (item?.["type"] === "equipments") {
      setSubEquipments(item?.["items"]);
    } else setSubEquipments([]);
  }, []);

  const triggerAction = (action) => {
    // Trigger Action
    if (action) {
      const { type } = action;
      switch (type) {
        case "openUrl":
          setIframeUrl(action?.url);
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
    setCarousalSelected([])
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
    setCarousalSelected([(item?.title || item?.name)])
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }} className="App__layout">
      <Sider
        width={256}
        collapsible
        collapsed={collapsed}
        theme={theme}
        onCollapse={onCollapse}
      >
        <div className="logo">LOGO</div>
        <Menu
          theme={theme}
          data={buildings}
          onSubMenuClick={onSubMenuClick}
          onMenuItemClick={onMenuItemClick}
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
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        >
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
        </Header>

        <Content>
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
