import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Layout, Menu, theme, Modal, Form, Button, Input } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { updateBucket } from "../redux/actions/buckets";

const { Header, Content, Footer, Sider } = Layout;

const HomeLayout = ({ Component, title }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { buckets } = useSelector((state) => state);
  const [currBucket, setCurrBucket] = useState(0);
  const [currBucketValue, setCurrBucketValue] = useState({
    id: 0,
    value: "",
  });
  const [currTab, setCurrTab] = useState("1");
  const tabs = [
    {
      key: "1",
      label: <Link to="/">Videos</Link>,
      onClick: () => {
        setCurrTab("1");
      },
    },
    {
      key: "2",
      label: <Link to="/history">History</Link>,
      onClick: () => {
        setCurrTab("2");
      },
    },
  ];

  const [bucketTab, setBucketTab] = useState([
    {
      key: "0",
      label: (
        <p style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          All
        </p>
      ),
      onClick: () => {
        setCurrBucket(0);
      },
    },
    {
      key: "1",
      label: (
        <p style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {buckets[0].value}
          <EditOutlined
            onClick={() => {
              setOpen(true);
              const val = buckets?.find((bucket) => bucket?.id === 1)?.value;
              setCurrBucketValue({ ...currBucketValue, value: val, id: 1 });
            }}
          />
        </p>
      ),
      onClick: () => {
        setCurrBucket(1);
      },
    },
    {
      key: "2",
      label: (
        <p style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {buckets[1].value}
          <EditOutlined
            onClick={() => {
              setOpen(true);
              const val = buckets?.find((bucket) => bucket?.id === 2)?.value;
              setCurrBucketValue({ ...currBucketValue, value: val, id: 2 });
            }}
          />
        </p>
      ),
      onClick: () => {
        setCurrBucket(2);
      },
    },
  ]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleEditBucketValue = () => {
    dispatch(updateBucket(currBucketValue?.value, currBucketValue?.id));

    //edit only the label of the bucket in the bucketTab state with id equal to curr edited bucket's id
    const newBucketTab = bucketTab.map((bucket) => {
      if (bucket.key === currBucketValue?.id.toString()) {
        bucket.label = (
          <p style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {buckets[currBucketValue?.id - 1].value}
            <EditOutlined
              onClick={() => {
                setCurrBucketValue({
                  ...currBucketValue,
                  value: currBucketValue?.value,
                  id: currBucketValue?.id,
                });
                setOpen(true);
              }}
            />
          </p>
        );
      }
      return bucket;
    });
    setBucketTab(newBucketTab);
    setOpen(false);
  };

  return (
    <>
      {open && (
        <Modal
          open={open}
          title="Edit Bucket"
          onCancel={() => setOpen(false)}
          style={{ left: 0 }}
          footer={[
            <Button type="primary" onClick={handleEditBucketValue}>
              Edit
            </Button>,
          ]}
        >
          <Form
            id="myForm"
            layout="vertical"
            initialValues={{
              name: currBucketValue?.value,
            }}
          >
            <Form.Item name="name">
              <Input
                placeholder="Bucket Name"
                onChange={(e) => {
                  setCurrBucketValue({ ...currBucketValue, value: e.target.value });
                }}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}

      <Layout>
        <Header style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}>
          <div
            style={{
              float: "left",
              width: 130,
              height: 35,
              margin: "12px 30px 5px -10px",
              background: "rgba(255, 255, 255, 0.2)",
              color: "white",
            }}
          >
            <h2 style={{ marginTop: "-15px", marginLeft: "5px" }}>BucketStore</h2>
          </div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[currTab]} items={tabs} />
        </Header>
        <Layout>
          {currTab === "1" && (
            <Sider
              width={200}
              style={{
                background: colorBgContainer,
              }}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={["0"]}
                defaultOpenKeys={["0"]}
                style={{
                  height: "75vh",
                  borderRight: 0,
                }}
                items={bucketTab}
              />
            </Sider>
          )}
          <Layout
            style={{
              padding: "0 24px 24px",
            }}
          >
            <h2>{title}</h2>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: "80vh",
                overflow: "auto",
                background: colorBgContainer,
              }}
            >
              {currTab === "1" ? <Component bucket={currBucket} /> : <Component />}
            </Content>
          </Layout>
        </Layout>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Indrakant Dana
        </Footer>
      </Layout>
    </>
  );
};

export default HomeLayout;
