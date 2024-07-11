import { Form, Input, Button, Row, Col, Typography, message, Result } from 'antd';
import { useState } from 'react';
const { Title } = Typography;
const PostProposal = () => {
  const [investmentType, setInvestmentType] = useState('');
  const [expectedRevenue, setExpectedRevenue] = useState('');
  const [investmentCategory, setInvestmentCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [skillSet, setSkillSet] = useState('');
  const [experience, setExperience] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const onFinish = async () => {
    const token = localStorage.getItem('token');
    setSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/proposal`, {
        method: 'POST',
        body: JSON.stringify({ investmentType, investmentCategory, expectedRevenue, amount, skillSet, experience }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
      });
      if (response.ok) {
        message.success('Proposal posted successfully');
        setPostSuccess(true);
        setInvestmentType('');
        setExpectedRevenue('');
        setInvestmentCategory('');
        setAmount('');
        setSkillSet('');
        setExperience('');
      } else {
        message.error('Failed to post proposal. Please try again.');
      }
    } catch (error) {
      console.error('Error posting proposal:', error);
      message.error('An error occurred. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Row justify="center" align="top" style={{ minHeight: '50vh' }}>
      <Col span={12}>
        {!postSuccess ? (
          <Form
            onFinish={onFinish}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: '400px', margin: 'auto' }}
          >
            <Title level={1} style={{ textAlign: 'center' }}>Post Proposal</Title>
            <Form.Item
              label="Investment Type"
              name="investmentType"
              rules={[{ required: true, message: 'Please enter the investment type' }]}
            >
              <Input placeholder="Enter investment type" value={investmentType} onChange={ev => setInvestmentType(ev.target.value)} />
            </Form.Item>

            <Form.Item
              label="Investment Category"
              name="investmentCategory"
              rules={[{ required: true, message: 'Please enter the investment category' }]}
            >
              <Input placeholder="Enter investment category" value={investmentCategory} onChange={ev => setInvestmentCategory(ev.target.value)} />
            </Form.Item>

            <Form.Item
              label="Amount"
              name="amount"
              rules={[{ required: true, message: 'Please enter the amount' }]}
            >
              <Input type="number" placeholder="Enter amount" value={amount} onChange={ev => setAmount(ev.target.value)} />
            </Form.Item>

            <Form.Item
              label="Expected Revenue"
              name="expectedRevenue"
              rules={[{ required: true, message: 'Please enter the expected revenue' }]}
            >
              <Input type="number" placeholder="Enter expected revenue" value={expectedRevenue} onChange={ev => setExpectedRevenue(ev.target.value)} />
            </Form.Item>

            <Form.Item
              label="Skill Set"
              name="skillSet"
              rules={[{ required: true, message: 'Please enter the skill set' }]}
            >
              <Input placeholder="Enter skill set" value={skillSet} onChange={ev => setSkillSet(ev.target.value)} />
            </Form.Item>

            <Form.Item
              label="Experience"
              name="experience"
              rules={[{ required: true, message: 'Please enter the experience' }]}
            >
              <Input type="number" placeholder="Enter experience" value={experience} onChange={ev => setExperience(ev.target.value)} />
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
            title="Successfully Posted Proposal!"
            subTitle="Your proposal details have been successfully submitted."
            extra={[
              <Button type="primary" key="back" onClick={() => setPostSuccess(false)}>
                Post Another Proposal
              </Button>,
            ]}
          />
        )}
      </Col>
    </Row>
  );
};

export default PostProposal;
