import { Input, Row, Col, Form, Typography, Button, message, Result } from 'antd';
import { useState } from 'react';

const { Title } = Typography;
const { TextArea } = Input;

const AskQuery = () => {
  const token = localStorage.getItem('token');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  async function onFinish() {
    setSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/query`, {
        method: 'POST',
        body: JSON.stringify({ category, description }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      });

      if (response.ok) {
        message.success('Query posted successfully');
        setPostSuccess(true);
        setCategory('');
        setDescription('');
      } else {
        message.error('Failed to post the query');
      }
    } catch (error) {
      console.error('Error posting query:', error);
      message.error('An error occurred. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Row justify="center" align="top" style={{ minHeight: '50vh' }}>
      <Col xs={24} sm={16} md={12} lg={8} xl={6}>
        {!postSuccess ? (
          <Form
            onFinish={onFinish}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: '400px', margin: 'auto' }}
          >
            <Title level={1} style={{ textAlign: 'center' }}>Ask Query</Title>

            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: 'Please enter category of Business' }]}
            >
              <Input placeholder="Enter Category" value={category} onChange={ev => setCategory(ev.target.value)} />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please enter description of the trouble' }]}
            >
              <TextArea placeholder="Enter description" rows={5} value={description} onChange={ev => setDescription(ev.target.value)} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Result
            status="success"
            title="Query Posted Successfully!"
            subTitle="Your query has been successfully submitted."
            extra={[
              <Button type="primary" key="back" onClick={() => setPostSuccess(false)}>
                Ask Another Query
              </Button>,
            ]}
          />
        )}
      </Col>
    </Row>
  );
};

export default AskQuery;
