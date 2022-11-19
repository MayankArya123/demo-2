import { useEffect, useState } from "react";
import { Checkbox, Form, Input } from "antd";
import { Card } from "antd";
import "./App.css";
import axios from "axios";
import "antd/dist/antd.css";
import { Button, Modal } from "antd";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Icon, {
  HeartOutlined,
  HeartFilled,
  DeleteFilled,
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

function App() {
  const [Loading, setLoading] = useState(true);
  const [Users, setUsers] = useState([]);

  const [fields, setFields] = useState([
    {
      name: ["name"],
      value: "",
    },
    {
      name: ["email"],
      value: "",
    },
    {
      name: ["phone"],
      value: "",
    },
    {
      name: ["website"],
      value: "",
    },
  ]);

  const updateItem = (value) => {
    const up = Users.map((item) => {
      if (item.id === Active.id) {
        item.name = value.name;
        item.email = value.email;
        item.phone = value.phone;
        item.website = value.website;

        return item;
      } else {
        return item;
      }
    });

    console.log("up", up);
  };

  const onFinish = (values) => {
    console.log("Success:", values);

    updateItem(values);
    handleCancel();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (values) => {
    console.log(fields);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    console.log("jj");
    setActive({});
    setIsModalOpen(false);
  };

  const [Active, setActive] = useState({});

  const deleteCard = (id) => {
    console.log("id", id);

    const FilteredCards = Users.filter((item) => item.id !== id);

    console.log("jj", FilteredCards);

    setUsers(FilteredCards);
  };

  const getUsers = () => {
    axios("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        console.log("res", res);

        setLoading(false);
        setUsers(res.data);

        const addedFieldHeart = res.data.map((item) => {
          item.heart = false;

          return item;
        });

        setUsers(addedFieldHeart);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const updateHeart = (id) => {
    console.log("mayank", id);

    const result = Users.map((item) => {
      if (item.id === id) {
        item.heart = !item.heart;

        return item;
      } else {
        return item;
      }
    });

    setUsers(result);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="App list">
      <>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            fields={fields}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Please input your phone!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Website"
              name="website"
              rules={[
                { required: true, message: "Please input your website!" },
              ]}
            >
              <Input />
            </Form.Item>

            <div className="form-footer">
              <Button
                type="button"
                className=" ant-btn"
                onClick={() => handleCancel()}
              >
                <span>Cancel</span>
              </Button>

              <Button type="primary" className="footer-btn" htmlType="submit">
                Ok
              </Button>
            </div>
          </Form>
        </Modal>
      </>

      {Loading ? (
        <div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      ) : (
        <div className="row">
          {Users.map((item) => {
            return (
              <div className="card-content  col-lg-3 col-11 col-md-4 ">
                <Card className="my_card">
                  <div className="ant-card-cover">
                    <div className="my-card-header">
                      <img
                        src={`https://avatars.dicebear.com/v2/avataaars/{${item.username}>}.svg?options[mood][]=happy`}
                        alt="Avatar"
                      ></img>
                    </div>
                  </div>

                  <div className="my-card-body">
                    <h3 className="h3"> {item.name} </h3>
                    <p className="d-flex align-items-center">
                      {" "}
                      <MailOutlined style={{ fontSize: "20px" }} />{" "}
                      <span className="span"> {item.email} </span>{" "}
                    </p>
                    <p className="d-flex align-items-center">
                      {" "}
                      <PhoneOutlined style={{ fontSize: "20px" }} />{" "}
                      <span className="span"> {item.phone} </span>{" "}
                    </p>
                    <p className="d-flex align-items-center">
                      {" "}
                      <GlobalOutlined style={{ fontSize: "20px" }} />{" "}
                      <span className="span"> {item.website} </span>{" "}
                    </p>
                  </div>

                  <div className="card-actions">
                    <div className="icon">
                      <div className="heart-icon">
                        {item.heart ? (
                          <HeartFilled onClick={() => updateHeart(item.id)} />
                        ) : (
                          <HeartOutlined onClick={() => updateHeart(item.id)} />
                        )}
                      </div>
                    </div>

                    <div className="icon">
                      <div className="heart-icon">
                        <EditOutlined
                          className="cursor hover"
                          onClick={() => {
                            setFields([
                              {
                                name: ["name"],
                                value: item.name,
                              },
                              {
                                name: ["email"],
                                value: item.email,
                              },
                              {
                                name: ["phone"],
                                value: item.phone,
                              },
                              {
                                name: ["website"],
                                value: item.website,
                              },
                            ]);
                            showModal();
                            setActive(item);
                          }}
                        />
                      </div>
                    </div>

                    <div className="icon">
                      <DeleteFilled
                        className="cursor hover"
                        onClick={() => deleteCard(item.id)}
                      />
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
