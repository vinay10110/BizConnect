/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { Modal, Form, Input, Row, Col, Typography } from 'antd';
const { Title } = Typography;
const LoansEdit = ({ visible, onClose, onSubmit, initialData }) => {
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
      title="Edit Loan Details"
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
            <Title level={1} style={{ textAlign: 'center' }}>Edit Loan Details</Title>

            <Form.Item
              label="Loan Type"
              name="loanType"
              rules={[{ required: true, message: 'Please enter the loan type' }]}
            >
              <Input placeholder="Enter loan type" />
            </Form.Item>

            <Form.Item
              label="Minimum Age"
              name="minAge"
              rules={[{ required: true, message: 'Please enter the minimum age' }]}
            >
              <Input type="number" placeholder="Enter minimum age" />
            </Form.Item>

            <Form.Item
              label="Maximum Age"
              name="maxAge"
              rules={[{ required: true, message: 'Please enter the maximum age' }]}
            >
              <Input type="number" placeholder="Enter maximum age" />
            </Form.Item>

            <Form.Item
              label="Net Income"
              name="netIncome"
              rules={[{ required: true, message: 'Please enter the net income' }]}
            >
              <Input type="number" placeholder="Enter net income" />
            </Form.Item>

            <Form.Item
              label="Intrest Rate"
              name="intrestRate"
              rules={[{ required: true, message: 'Please enter the interest rate' }]}
            >
              <Input type="number" placeholder="Enter interest rate" />
            </Form.Item>

            <Form.Item
              label="Duration"
              name="duration"
              rules={[{ required: true, message: 'Please enter the duration' }]}
            >
              <Input type="number" placeholder="Enter duration" />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default LoansEdit;
