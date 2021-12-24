import "./App.css";
import { Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;

function App({config}) {
  const {sider, content} = config;
  const siderMenuItems = sider?.map(item=>
    <Menu.Item key={item?.name} icon={item?.icon??<UserOutlined />}>
             {item?.name}
    </Menu.Item>
    );
  const {iframeUrl} = content;
  return (
      <Layout style={{ minHeight: '100vh' }} className="App__layout">
        <Sider
          collapsible={false}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline">
           {siderMenuItems}
          </Menu>
        </Sider>
        <Layout>
          <Header
            className="site-layout-sub-header-background"
            style={{ padding: 0 }}
          />
          <Content>
            <div
              className="site-layout-background"
            >
              <iframe width={"100%"} height={"100%"} src={iframeUrl} title="dashboard" />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
  );
}

export default App;
