import React from "react";
import { Layout, Select } from "antd";
const { Header } = Layout;
const { Option } = Select;

export const NavHeader = ({ menu, list = [],selectedBuilding, onSelectBuilding }) => (
  <Header className="App__nav-header">
      <span className="dropdown-buildings">
        <Select
          showSearch
          bordered={false}
          className="nav-header__select"
          placeholder="Select building"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
          onSelect={onSelectBuilding}
          value={selectedBuilding}
          dropdownClassName="select__dropdown-building"
        >
          {list &&
            list.map((item) => (
              <Option key={item?.name} extraProps={item} value={item?.name}>
                {item?.name}
              </Option>
            ))}
        </Select>
      </span>
    {menu}
  </Header>
);
