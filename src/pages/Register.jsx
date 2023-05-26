import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link ,useNavigate} from "react-router-dom";
import { registerfunc } from "../services/Apis";
import { useDispatch } from "react-redux";
import { showLoading ,hideLoading } from "../redux/features/alertSlice";
// import axios from 'axios';
const Register = () => {
  const navigate = useNavigate("")
  const dispatch = useDispatch(); 
  //form handler
  const onFinishHandler =async (values) => {
    const config = {
      "Content-Type":"application/json"
    } 
    try {
      dispatch(showLoading());
      const res = await registerfunc(values , config);
      // const res = await axios.post("http://localhost:8000/api/v1/user/register",values)
      // console.log(res)
      dispatch(hideLoading());
      if(res.data.success){
        message.success("Register successfully");
        navigate("/login")
      }else{
        message.error(res.data.message);
      }
     } catch (error) {
      dispatch(hideLoading());
       console.log(error)
       message.error("Something went wrong")
     }
  };
  // const onFinishFailed = (errorInfo) => {
  //   console.log('Failed:', errorInfo);
  // };
  return (
    <section className="sign_up_form">
      <Form name="basic" layout="vertical" onFinish={onFinishHandler}>
        <h3>Register Form</h3>
        <Form.Item label="Name" name="name">
          <Input type="text" required />
        </Form.Item>  
        <Form.Item label="Email" name="email">
          <Input type="Email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
        <Link to="/login" className=" ms-2 d-block py-3">Already user login here</Link>
      </Form>
    </section>
  );
};

export default Register;
