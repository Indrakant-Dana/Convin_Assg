import React, { useState, useEffect } from "react";
import { EditOutlined, InfoCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card, Modal, Button, Form, Input, Select, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { deleteCard, updateCard, createCard } from "../../redux/actions/buckets";

const { Meta } = Card;

const VideoCard = ({ card, bucketId }) => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState("View");
  const [updatedCard, setUpdatedCard] = useState(card);
  const [category, setCategory] = useState({ prevCategory: bucketId, newCategory: bucketId });

  const [form] = Form.useForm();
  const { buckets } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  const message = (msg) => {
    api.open({
      message: msg,
      duration: 1,
    });
  };
  const handleEdit = () => {
    if (category?.prevCategory !== category?.newCategory) {
      dispatch(deleteCard(updatedCard, category?.prevCategory, message));
      const id = uuidv4().slice(0, 8);
      dispatch(createCard({ ...updatedCard, id: id }, category?.newCategory, setOpen, message));
    } else {
      dispatch(updateCard(updatedCard, category?.newCategory, setOpen, message));
    }
    form.resetFields();
  };

  const handleDelete = () => {
    dispatch(deleteCard(updatedCard, category?.newCategory, message));
  };

  useEffect(() => {}, [handleEdit]);

  return (
    <>
      {contextHolder}
      <Modal
        title={card?.name}
        open={open}
        width="600px"
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="back" onClick={() => setOpen(false)}>
            Back
          </Button>,
          state === "Edit" && (
            <Button key="edit" type="primary" onClick={handleEdit}>
              Edit
            </Button>
          ),
        ]}
      >
        {state === "View" && (
          <iframe
            width="560"
            height="315"
            src={card?.link}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}
        {state === "Edit" && (
          <Form
            id="myForm"
            layout="vertical"
            form={form}
            initialValues={{
              name: updatedCard?.name,
              link: updatedCard?.link,
            }}
            onFinish={handleEdit}
          >
            <Form.Item label="Name of Video" name="name">
              <Input
                placeholder={card?.name}
                onChange={(e) => setUpdatedCard({ ...updatedCard, name: e.target.value })}
              />
            </Form.Item>
            <Form.Item
              label="Link of Video"
              name="link"
              tooltip={{
                title: "Go to Share -> Embed -> Copy that Link and paste here. ",
                icon: <InfoCircleOutlined />,
              }}
            >
              <Input
                addonBefore="https://"
                placeholder={card?.link}
                onChange={(e) =>
                  setUpdatedCard({ ...updatedCard, link: `https://${e.target.value}` })
                }
              />
            </Form.Item>
            <Form.Item label="Category" required>
              <Select
                required
                showSearch
                placeholder="Select a category"
                defaultValue={category?.newCategory}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                }
                onChange={(value) => setCategory({ ...category, newCategory: value })}
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
        )}
      </Modal>
      <Card
        style={{
          width: "25%",
          marginRight: "50px",
          marginBottom: "50px",
        }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <EditOutlined
            key="edit"
            onClick={() => {
              setState("Edit");
              setOpen(true);
            }}
          />,
          <DeleteOutlined key="ellipsis" onClick={handleDelete} />,
        ]}
      >
        <Meta title={card?.name} />
        <Button
          style={{ marginTop: "10px", width: "100%" }}
          onClick={() => {
            setState("View");
            setOpen(true);
          }}
        >
          View
        </Button>
      </Card>
    </>
  );
};

export default VideoCard;
