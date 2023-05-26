import React from "react";
import {Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading ,hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
const Login = () => {
  // form handler

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("http://localhost:8000/api/v1/user/login", values);
      window.location.reload()
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    }
  };

  return (
    <section className="sign_in_form px-2 ">
      <Form name="basic" layout="vertical" onFinish={onfinishHandler}>
        <h3>Login Form</h3>
        <Form.Item label="Email" name="email">
          <Input type="Email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
        <Link to="/register" className="m-2 d-block pt-2">
          Not a user Register here
        </Link>
      </Form>
    </section>
  );
};

export default Login;
