/* eslint-disable react/prop-types */
import  {  useEffect } from 'react';
import '../App.css'
import {  Modal, Form, Input, Row, Col, Typography } from 'antd';
const { TextArea } = Input;
const { Title } = Typography;

const IdeasEdit = ({ visible, onClose, onSubmit, initialData }) => {
  const [form] = Form.useForm();
 const id=initialData._id;
  useEffect(() => {
    form.setFieldsValue(initialData);
  }, [initialData, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit({values,id});
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
      title="Edit Idea"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Row justify="center" align="top" style={{ minHeight: '50vh' }}>
        <Col >
          <Form
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: '400px', margin: 'auto' }}
          >
            <Title level={1} style={{ textAlign: 'center' }} className='fontText'>Edit Idea</Title>

            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please enter Title of Business' }]}
            >
              <Input placeholder="Enter Title" />
            </Form.Item>

            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: 'Please enter the category' }]}
            >
              <Input placeholder="Enter category" />
            </Form.Item>

            <Form.Item
              label="Company Register No."
              name="companyReg"
              rules={[{ required: true, message: 'Please enter the company register number' }]}
            >
              <Input type="number" placeholder="Enter company register no." />
            </Form.Item>

            <Form.Item
              label="Project Lifetime"
              name="projectLife"
              rules={[{ required: true, message: 'Please enter the project lifetime' }]}
            >
              <Input type="number" placeholder="Enter project lifetime" />
            </Form.Item>

            <Form.Item
              label="Experience"
              name="experience"
              rules={[{ required: true, message: 'Please enter the experience' }]}
            >
              <Input type="number" placeholder="Enter experience" />
            </Form.Item>

            <Form.Item
              label="Skill Set"
              name="skillSet"
              rules={[{ required: true, message: 'Please enter the skill set' }]}
            >
              <Input placeholder="Enter skill set" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please enter the description' }]}
            >
              <TextArea placeholder="Enter description" rows={5} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default IdeasEdit;
