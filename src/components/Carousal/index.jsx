import React, { useState, useCallback } from "react";
import { List, Avatar, Space, Button, Col, Row, Modal } from "antd";

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
          itemLayout="vertical"
          dataSource={list}
          renderItem={(item) => (
            <List.Item>
              <Button onClick={onListItemClick(item)} type="link">
                {item?.name}
              </Button>
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
};
