import  { useState } from 'react';
import { Form, Input, Button, Select, Row, Col, Card,Typography,message } from 'antd';
import { Link,Navigate } from 'react-router-dom';
const { Option } = Select;
const {Title} =Typography;
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const [redirect,setredirect]=useState(false);
  const login = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password, type }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 401) {
            message.error('Password is incorrect');
        } else if (response.status === 406) {
            message.error('User type does not match the registered type');
        } else if (response.status === 404) {
            message.error('User not found! Please register');
        } else if (response.status === 200) {
            const data = await response.json();
            localStorage.setItem('token',data.token);
            message.success('Login successful');
            setredirect(true);
        } else {
            message.error('An unexpected error occurred');
        }
    } catch (err) {
        console.error(err);
        message.error('Failed to login, please try again later');
    }
};
if(redirect){
   return <Navigate to={`/Dashboard/${type}`} />;
}
  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col xs={24} sm={16} md={12} lg={8} xl={6}>
        <Card style={{boxShadow:'rgba(0, 0, 0, 0.16)	0px, -1px	2px	-2px'}}>
          <Form
            onFinish={login}
          >
            <Title level={1} style={{textAlign:'center'}}>Sign In</Title>
            <Form.Item
              label="Email"
              name="email"
              rules={[{  message: 'Please input your email!' }]}
            >
              <Input type="email" value={email} onChange={ev => setEmail(ev.target.value)} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{  message: 'Please input your password!' }]}
            >
              <Input.Password value={password} onChange={ev => setPassword(ev.target.value)} />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[{  message: 'Please select a type!' }]}
            >
              <Select onChange={value => setType(value)}>
                <Option value="User">User</Option>
                <Option value="Banker">Banker</Option>
                <Option value="Investor">Investor</Option>
                <Option value="BusinessMan">Business Man</Option>
                <Option value="BusinessAdvisor">Business Advisor</Option>
              </Select>
            </Form.Item>
            <Form.Item style={{textAlign:'center'}}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            <Title level={4} style={{textAlign:'center'}}>Not a member? <Link to='/register'>Register Here</Link></Title>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
