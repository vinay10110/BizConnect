/* eslint-disable react/prop-types */
import { Form, Input, Button, Row, Col, Typography, message, Result } from 'antd';
import { useState } from 'react';
const { TextArea } = Input;
const { Title } = Typography;
const PostIdea = () => {
  const [title, setTitle] = useState('');
  const [category, setcate] = useState('');
  const [companyReg, setReg] = useState('');
  const [projectLife, setLife] = useState('');
  const [experience, setExp] = useState('');
  const [skillSet, setSkill] = useState('');
  const [description, setdesc] = useState('');
  const [result, setResult] = useState(false);
  const token = localStorage.getItem('token');
  const onFinish = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/idea`, {
        method: 'POST',
        body: JSON.stringify({ title, category, companyReg, projectLife, experience, skillSet, description }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
      });
      if (response.ok) {
        message.success('Idea posted successfully');
        setResult(true); 
        setTitle(''); 
        setcate('');
        setReg('');
        setLife('');
        setExp('');
        setSkill('');
        setdesc('');
      } else {
        message.error('Failed to post idea. Please try again.');
      }
    } catch (error) {
      console.error('Error posting idea:', error);
      message.error('An error occurred. Please try again later.');
    }
  };

  const handleBack = () => {
    setResult(false); 
  };
  return (
    <>
      {!result ? (
        <Row justify="center" align="top" style={{ minHeight: '50vh' }}>
          <Col xs={24} sm={16} md={12} lg={8} xl={10} > 
            <Form
              onFinish={onFinish}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: '400px', margin: 'auto' }}
            >
              <Title level={1} style={{ textAlign: 'center' }}>Post Idea</Title>

              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please enter Title of Business' }]}
              >
                <Input placeholder="Enter Title" value={title} onChange={ev => setTitle(ev.target.value)} />
              </Form.Item>

              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: 'Please enter the category' }]}
              >
                <Input placeholder="Enter category" value={category} onChange={ev => setcate(ev.target.value)} />
              </Form.Item>

              <Form.Item
                label="Company Register No."
                name="reg"
                rules={[{ required: true, message: 'Please enter the company register number' }]}
              >
                <Input type="number" placeholder="Enter company register no." value={companyReg} onChange={ev => setReg(ev.target.value)} />
              </Form.Item>

              <Form.Item
                label="Project Lifetime"
                name="life"
                rules={[{ required: true, message: 'Please enter the project lifetime' }]}
              >
                <Input type="number" placeholder="Enter project lifetime(years)" value={projectLife} onChange={ev => setLife(ev.target.value)} />
              </Form.Item>

              <Form.Item
                label="Experience"
                name="exp"
                rules={[{ required: true, message: 'Please enter the experience' }]}
              >
                <Input type="number" placeholder="Enter experience(years)" value={experience} onChange={ev => setExp(ev.target.value)} />
              </Form.Item>

              <Form.Item
                label="Skill Set"
                name="skills"
                rules={[{ required: true, message: 'Please enter the skill set' }]}
              >
                <Input placeholder="Enter skill set" value={skillSet} onChange={ev => setSkill(ev.target.value)} />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please enter the description' }]}
              >
                <TextArea placeholder="Enter description" rows={5} value={description} onChange={ev => setdesc(ev.target.value)} />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      ) : (
        <Result
          status="success"
          title="Successfully Posted Idea"
          extra={[
            <Button type="primary" key="back" onClick={handleBack}>
              Post Another Idea
            </Button>
          ]}
        />
      )}
    </>
  );
};

export default PostIdea;
