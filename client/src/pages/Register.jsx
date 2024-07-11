import { useState } from 'react';
import { Form, Input, Button, Select, Row, Col, Card,Typography,message} from 'antd';
import {Navigate,Link} from 'react-router-dom'
const { Option } = Select;
const {Title}=Typography;
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [redirect, setRedirect] = useState(false);  
  const register = async (values) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/register`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 409) {
        message.error('Email already registered');
    } else if (response.status === 201) {
        message.success('User registered successfully');
        setRedirect(true);
    } else {
        message.error('An unexpected error occurred');
    }
    } catch (err) {
      console.log(err);
      message.error('Failed to register, Please try again later');
    }
  };

  if (redirect) {
    return <Navigate to='/login' />;
  }

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col xs={24} sm={16} md={12} lg={8} xl={6}>
        <Card>
          <Form
            name="registerForm"
            onFinish={register}
          >
            <Title level={1} style={{textAlign:'center'}}>Sign Up</Title>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input value={name} onChange={ev => setName(ev.target.value)} />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input type="email" value={email} onChange={ev => setEmail(ev.target.value)} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password value={password} onChange={ev => setPassword(ev.target.value)} />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: 'Please select a type!' }]}
            >
              <Select value={type} onChange={value => setType(value)}>
                <Option value="User">User</Option>
                <Option value="Banker">Banker</Option>
                <Option value="Investor">Investor</Option>
                <Option value="BusinessMan">Business Man</Option>
                <Option value="BusinessAdvisor">Business Advisor</Option>
              </Select>
            </Form.Item>

            <Form.Item style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            <Title level={4} style={{textAlign:'center'}}>Already a member? <Link to='/login'>Login Here</Link></Title>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Register;
