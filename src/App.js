import "./App.css";
import { Divider, Layout, Switch } from "antd";

import { Menu } from "./components/Menu";
import { useCallback, useState } from "react";
import { IFrame } from "./components/IFrame";
import { Carousal } from "./components/Carousal";

const { Header, Content, Footer, Sider } = Layout;

function App({ config }) {
  const [theme, setTheme] = useState("light");
  const [iframeUrl, setIframeUrl] = useState("");
  const [subEquipments, setSubEquipments] = useState([]);

  const { buildings, content } = config;
  // const { iframeUrl } = content;

  // console.log("buildings", buildings);


  const onSubMenuClick = useCallback((e, item) => {
    // console.log("onSubMenuClick", e, item);
    if(item?.action){
      triggerAction(item.action);
    }
    // Get all sub-equipements list
    if(item?.["type"] === "equipments"){
      setSubEquipments(item?.["items"]);
    }
    else setSubEquipments([]);
  }, []);

  const triggerAction = (action = {})=>{
    // Trigger Action
    const {type} = action;
    switch(type){
      case 'openUrl':
        setIframeUrl(action?.url);
        break;
      default:
        console.warn('no action found');
    }
  }

  const onMenuItemClick = useCallback((e, item) => {
    console.log("onMenuItemClick", e, item);
      if(item?.action){
        triggerAction(item.action);
      }
      setSubEquipments([]);
  }, []);

  const changeTheme = useCallback((value)=>{
    setTheme(value ? 'dark' : 'light');
  },[])

  const mapToCarousalModel = (equipments=[])=> equipments.map(item => ({
    title : item?.["name"],
    description : item?.["description"],
    href: item?.["href"],
    avatar : item?.["thumbnail"],
  }))

  return (
    <Layout style={{ minHeight: "100vh" }} className="App__layout">
      <Sider theme={theme} collapsible={false}>
        <div className="logo" >LOGO</div>
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
        >HEADER</Header>
        
        <Content>
          {subEquipments && subEquipments.length>0 && <Carousal list={mapToCarousalModel(subEquipments)}/>}
         <IFrame url={iframeUrl}/>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
