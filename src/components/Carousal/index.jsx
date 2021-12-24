import React from "react";
import { List, Avatar, Space, Card } from "antd";

export const Carousal = ({ list }) => {
  return (
    <List
        itemLayout="horizontal"
        size="small"
        bordered
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 6,
        lg: 6,
        xl: 8,
        xxl: 8,
      }}
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 8,
      }}
      dataSource={list}
      //   footer={
      //     <div>
      //       <b>ant design</b> footer part
      //     </div>
      //   }
      renderItem={(item) => (
        <List.Item key={item.title}>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
            //   description={item.description}
            />
            {/* {item.content} */}
        </List.Item>
      )}
    />
  );
};
