import { Form, Input, Button, Row, Col, Typography, message, Result,Cascader } from 'antd';
import { useState } from 'react';
import '../App.css'
import Loans from '../assets/Loans';
const { Title } = Typography;

const PostLoan = () => {
  const [loanType, setLoanType] = useState([]);
  const [amount, setAmount] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [intrestRate, setIntrestRate] = useState('');
  const [duration, setDuration] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  const onFinish = async () => {
    const token = localStorage.getItem('token');
    setSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/loan`, {
        method: 'POST',
        body: JSON.stringify({ loanType, amount, minAge, maxAge, intrestRate, duration }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
      });

      if (response.ok) {
        message.success('Loan posted successfully');
        setPostSuccess(true);
        setLoanType([]);
        setAmount('');
        setMinAge('');
        setMaxAge('');
        setIntrestRate('');
        setDuration('');
      } else {
        message.error('Failed to post loan. Please try again.');
      }
    } catch (error) {
      console.error('Error posting loan:', error);
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
            <Title level={1} style={{ textAlign: 'center' }} className='fontText'>Enter Loan Details</Title>
            <Form.Item
              label="Loan Type"
              name="loanType"
              rules={[{ required: true, message: 'Please enter the loan type' }]}
            >
             <Cascader
                  options={Loans}
                  onChange={(value)=>setLoanType(value)}
                  placeholder="Select category"
                  value={loanType}
                />
            </Form.Item>

            <Form.Item
              label="Minimum Age"
              name="minAge"
              rules={[{ required: true, message: 'Please enter the minimum age' }]}
            >
              <Input type="number"  min={18} max={100} placeholder="Enter minimum age" value={minAge} onChange={ev => setMinAge(ev.target.value)} />
            </Form.Item>

            <Form.Item
              label="Maximum Age"
              name="maxAge"
              rules={[{ required: true, message: 'Please enter the maximum age' }]}
            >
              <Input type="number" min={18} max={100} placeholder="Enter maximum age" value={maxAge} onChange={ev => setMaxAge(ev.target.value)} />
            </Form.Item>

            <Form.Item
              label="Amount"
              name="amount"
              rules={[{ required: true, message: 'Please enter the amount' }]}
            >
              <Input type="number" placeholder="Enter amount" value={amount} onChange={ev => setAmount(ev.target.value)} />
            </Form.Item>

            <Form.Item
              label="Interest Rate"
              name="interestRate"
              rules={[{ required: true, message: 'Please enter the interest rate' }]}
            >
              <Input type="number" placeholder="Enter interest rate" value={intrestRate} onChange={ev => setIntrestRate(ev.target.value)} />
            </Form.Item>

            <Form.Item
              label="Duration"
              name="duration"
              rules={[{ required: true, message: 'Please enter the duration' }]}
            >
              <Input type="number" placeholder="Enter duration (in years)"  value={duration} onChange={ev => setDuration(ev.target.value)} />
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
            title="Successfully Posted Loan!"
            subTitle="Your loan details have been successfully submitted."
            extra={[
              <Button type="primary" key="back" onClick={() => setPostSuccess(false)}>
                Post Another Loan
              </Button>,
            ]}
          />
        )}
      </Col>
    </Row>
  );
};

export default PostLoan;
