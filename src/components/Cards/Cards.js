import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, notification, Select } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { createCard } from "../redux/actions/buckets";
import VideoCard from "./Card/VideoCard";

const Cards = ({ bucket }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const { isLoading, buckets } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [newCard, setNewCard] = useState({
    id: uuidv4().slice(0, 8),
    name: "",
    link: "",
    clicked: 0,
  });
  const [category, setCateogy] = useState("");

  const handleSubmit = () => {
    const message = (msg) => {
      api.open({
        message: msg,
        duration: 1,
      });
    };

    if (!newCard.name || !newCard.link || !category) {
      return message("Please fill all the fields");
    }

    dispatch(createCard(newCard, category, setOpen, message));
    
  };

  useEffect(() => {
    setNewCard({ ...newCard, id: uuidv4().slice(0, 8) });
  }, [bucket]);

  return (
    <>
      {contextHolder}
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="back" onClick={() => setOpen(false)}>
            Cancel
          </Button>,
          <Button type="primary" loading={isLoading} onClick={handleSubmit}>
            Submit
          </Button>,
        ]}
      >
        <Form id="myForm" layout="vertical" form={form}>
          <Form.Item label="Name of Video" required>
            <Input
              placeholder="Eg: Starlight show etc."
              onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            label="Link of Video"
            required
            tooltip={{
              title: "Go to Share -> Embed -> Copy that Link and paste here. ",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input
              addonBefore="https://"
              onChange={(e) => setNewCard({ ...newCard, link: `https://${e.target.value}` })}
            />
          </Form.Item>
          <Form.Item label="Category" required>
            <Select
              required
              showSearch
              placeholder="Select a category"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
              }
              onChange={(value) => setCateogy(value)}
              options={[
                {
                  value: 1,
                  label: "Action",
                },
                {
                  value: 2,
                  label: "Comedy",
                },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Button type="primary" onClick={() => setOpen(true)} style={{ marginBottom: "20px" }}>
        Add Video
      </Button>

      <div style={{ width: "100%", display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        {bucket == 0
          ? //show all cards inside every bucket
            buckets?.map((b) => {
              return b?.cards?.map((card) => {
                return <VideoCard card={card} bucketId={b?.id} id={card?.id} />;
              });
            })
          : //show cards inside a particular bucket
            buckets?.map((b) => {
              if (b?.id === bucket) {
                return b?.cards?.map((card) => {
                  return <VideoCard card={card} bucketId={b?.id} id={card?.id} />;
                });
              }
            })}
      </div>
    </>
  );
};

export default Cards;
