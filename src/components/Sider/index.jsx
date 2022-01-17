import React, { useCallback } from "react";
import { Layout, Row, Col, Select } from "antd";
import { renderHTML } from "../RenderHTML";
import { IFrame } from "../IFrame";

const { Sider: SiderAntD } = Layout;

export const Sider = ({
  collapsed,
  theme,
  logo,
  triggerTitle,
  contentHtml,
  iframeUrl,
  onCollapse,
}) => {
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
          {logo && (
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
          )}
        </Row>
        {contentHtml && renderHTML(contentHtml)}
        {iframeUrl && <IFrame url={iframeUrl} />}
      </SiderAntD>
      <div onClick={onTrigger} className="sider__custom-trigger">
        <p>{triggerTitle || "HIDE/SHOW"}</p>
      </div>
    </span>
  );
};
