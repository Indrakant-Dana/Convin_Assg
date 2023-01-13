import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  AppstoreOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import { Menu, theme } from "antd";

const items = [
  {
    label: "Navigation One",
    key: "geo",
    icon: <MailOutlined />,
  },
  {
    label: "Navigation Two",
    key: "edu",
    icon: <AppstoreOutlined />,
  },
];

const Headers = ({ Header, title, collapsed, setCollapsed }) => {
  const history = useHistory();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [current, setCurrent] = useState("geo");
  const handleOnClick = (e) => {
    if (e.key === "geo") history.push("/");
    else if (e.key === "edu") history.push("/videos");
    setCurrent(e.key);
  };
  return (
    <Header
      style={{
        paddingLeft: 20,
        display: "flex",
        alignItems: "center",
        background: colorBgContainer,
      }}
    >
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: () => setCollapsed(!collapsed),
      })}
      {title === "Videos" ? (
        <Menu
          onClick={handleOnClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          style={{
            paddingLeft: 20,
            width: "max-content",
          }}
        />
      ) : (
        <div>History</div>
      )}
    </Header>
  );
};
export default Headers;
