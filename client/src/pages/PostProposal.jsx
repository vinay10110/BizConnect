import { Form, Input, Button, Row, Col, Typography, message, Result,Cascader } from 'antd';
import { useState } from 'react';
import '../App.css';
import Proposals from '../assets/Proposals'
const { Title } = Typography;
const PostProposal = () => {
  const [investmentType, setInvestmentType] = useState([]);
  const [expectedRevenue, setExpectedRevenue] = useState('');
  const [amount, setAmount] = useState('');
  const [skillSet, setSkillSet] = useState('');
  const [experience, setExperience] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [description,setDescription]=useState('');
  const [postSuccess, setPostSuccess] = useState(false);
  const onFinish = async () => {
    const token = localStorage.getItem('token');
    setSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/proposal`, {
        method: 'POST',
        body: JSON.stringify({ investmentType, expectedRevenue, amount, skillSet, experience,description }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
      });
      if (response.ok) {
        message.success('Proposal posted successfully');
        setPostSuccess(true);
        setInvestmentType([]);
        setExpectedRevenue('');
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
            style={{ maxWidth: '500px', margin: 'auto' }}
          >
            <Title level={1} style={{ textAlign: 'center' }} className='fontText'>Post Proposal</Title>
            <Form.Item
              label="Investment Type"
              name="investmentType"
              rules={[{ required: true, message: 'Please enter the investment type' }]}
            >
              <Cascader
                  options={Proposals}
                  onChange={(value)=>setInvestmentType(value)}
                  placeholder="Select category"
                  value={investmentType}
                />
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
              <Input type="number" min={1} max={100} placeholder="Enter experience (in years)" value={experience} onChange={ev => setExperience(ev.target.value)} />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please enter the description' }]}
            >
              <Input  placeholder="Enter description" value={description} onChange={ev => setDescription(ev.target.value)} />
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
