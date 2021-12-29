import React, {useCallback} from "react";
import { Layout, Row, Col, Select } from "antd";
import { renderHTML } from "../RenderHTML";

const { Sider: SiderAntD } = Layout;

export const Sider = ({ collapsed, theme, logo,triggerTitle,contentHtml, onCollapse }) => {
  const onTrigger = useCallback(() => {
    onCollapse(!collapsed);
  }, [collapsed]);
  return (
    <span style={{ position: "relative" }}>
      
      <SiderAntD
        width={256}
        collapsible
        collapsed={collapsed}
        theme={theme}
        onCollapse={onCollapse}
        className="layout__sider"
        trigger={null}
        collapsedWidth={0}
      >
        <Row className="logocontainer">
          <Col>
            <div className="logo">
              <img
                alt="logo"
                src={logo}
                width={"100%"}
                style={{ textAlign: "center" }}
              ></img>
            </div>
          </Col>
        </Row>
        {renderHTML(contentHtml)}
      </SiderAntD>
      <div onClick={onTrigger} className="sider__custom-trigger">
        <p>{triggerTitle || "HIDE/SHOW"}</p>
      </div>
    </span>
  );
};
