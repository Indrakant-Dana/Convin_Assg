import React from "react";
import { Link, useHistory } from "react-router-dom";
import { HistoryOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Menu } from "antd";

const Navbar = ({ Sider, collapsed, setTitle }) => {
  const history = useHistory();
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} breakpoint="lg">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          
          {
            key: "2",
            icon: <HistoryOutlined />,
            label: "History",
            onClick: () => {
              setTitle("History");
              history.push("/history");
            },
          },
        ]}
      />
    </Sider>
  );
};

export default Navbar;
