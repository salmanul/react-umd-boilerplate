import React, { useState, useCallback } from "react";
import { List, Avatar, Space, Button, Col, Row, Modal } from "antd";
 
import { DownloadOutlined } from "@ant-design/icons";
import { Icon } from "../Icon";

const mapToCarousalModel = (equipments = []) =>
  equipments.map((item) => ({
    title: item?.["name"],
    description: item?.["description"],
    href: item?.["href"],
    avatar: item?.["thumbnail"],
    action: { ...item?.["action"] },
  }));

const PAGE_SIZE = 8;

export const Carousal = ({ list, onClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const onItemClick = (item) => (e) => onClick(item, e);
  const currentPage = mapToCarousalModel(list).slice(0, PAGE_SIZE);

  const onViewAll = () => {
    setIsVisible(true);
  };

  const onCloseModel = useCallback(() => {
    setIsVisible(false);
  }, []);

  const onListItemClick = (item)=>(e)=>{
    onClick(item, e);
    onCloseModel();
  }
  return (
    <>
      <List
        itemLayout="horizontal"
        className="header__carousal"
        size="small"
        bordered
        grid={{
          gutter: 8,
          xs: 2,
          sm: 2,
          md: 5,
          lg: 6,
          xl: 6,
          xxl: 8,
        }}
        footer={
          list && list.length > PAGE_SIZE && <Row justify="end">
              <Col>
                <Button onClick={onViewAll} type="link">
                  View All
                </Button>
              </Col>
          </Row>
        }
        // pagination = {{
        //   pageSize:PAGE_SIZE,
        //   size: 'small',
        //   hideOnSinglePage:true,
        //   // itemRender:(page, type, element)=> {
        //   //   console.log(element);
        //   //   return (
        //   //     <>View All</>
        //   //   )
        //   // }
        // }}
        dataSource={currentPage}
        renderItem={(item) => (
          <List.Item key={item.title} className="carousal__list-item">
            {/* <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<a href={item.href}>{item.title}</a>}
            //   description={item.description}
          /> */}
            <Button onClick={onItemClick(item)}>
                {item?.title}
              </Button>
          </List.Item>
          // </Space>
        )}
      />
      <Modal
        title="List"
        footer={null}
        visible={isVisible}
        className="App__modal-list"
        width={"80%"}
        bodyStyle={{
          height:"50vh",
          maxHeight:450,
          minHeight:250,
          overflowY:'auto'
        }
        }
        onCancel={onCloseModel}
      >
        <List
          size="small"
          itemLayout="horizontal"
          dataSource={list}
          grid={{
            gutter: 16,
            xs: 2,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3,
            xxl: 3,
          }}
          renderItem={(item) => (
            <List.Item>
              <Button size="large" icon={<Icon url={item?.icon} />} onClick={onListItemClick(item)}>
                {item?.name}
              </Button>
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
};
