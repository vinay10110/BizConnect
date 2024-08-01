/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { Modal, Form, Input, Row, Col, Typography,Cascader } from 'antd';
import '../App.css'
import Proposals from '../assets/Proposals';
const { Title } = Typography;
const ProposalsEdit = ({ visible, onClose, onSubmit, initialData }) => {
  const [form] = Form.useForm();
  const id = initialData._id;
  useEffect(() => {
    form.setFieldsValue(initialData);
  }, [initialData, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit({ values, id });
        onClose();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title="Edit Proposal Details"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Row justify="center" align="top" style={{ minHeight: '50vh' }}>
        <Col span={12}>
          <Form
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: '400px', margin: 'auto' }}
          >
            <Title level={1} style={{ textAlign: 'center' }} className='fontText'>Edit Proposal Details</Title>

            <Form.Item
              label="Investment Type"
              name="investmentType"
              rules={[{ required: true, message: 'Please enter the investment type' }]}
            >
              <Cascader
                  options={Proposals}
            
                  placeholder="Select category"
                 
                />
            </Form.Item>
            <Form.Item
              label="Expected Revenue"
              name="expectedRevenue"
              rules={[{ required: true, message: 'Please enter the expected revenue' }]}
            >
              <Input type="number" placeholder="Enter expected revenue" />
            </Form.Item>

            <Form.Item
              label="Amount"
              name="amount"
              rules={[{ required: true, message: 'Please enter the amount' }]}
            >
              <Input type="number" placeholder="Enter amount" />
            </Form.Item>

            <Form.Item
              label="Skill Set"
              name="skillSet"
              rules={[{ required: true, message: 'Please enter the skill set' }]}
            >
              <Input placeholder="Enter skill set" />
            </Form.Item>

            <Form.Item
              label="Experience"
              name="experience"
              rules={[{ required: true, message: 'Please enter the experience' }]}
            >
              <Input type="number" placeholder="Enter experience" />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default ProposalsEdit;
