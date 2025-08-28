import { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';

const { TextArea } = Input;

const ContactDialog = ({ visible, onClose, recipientEmail, recipientName }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    const subject = encodeURIComponent(values.subject);
    const body = encodeURIComponent(values.message);
    const mailtoUrl = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoUrl;
    
    message.success('Opening your email client...');
    form.resetFields();
    onClose();
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={`Contact ${recipientName}`}
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          subject: '',
          message: ''
        }}
      >
        <Form.Item
          label="Subject"
          name="subject"
          rules={[
            { required: true, message: 'Please enter a subject' },
            { min: 5, message: 'Subject must be at least 5 characters' }
          ]}
        >
          <Input placeholder="Enter message subject" />
        </Form.Item>

        <Form.Item
          label="Message"
          name="message"
          rules={[
            { required: true, message: 'Please enter your message' },
            { min: 10, message: 'Message must be at least 10 characters' }
          ]}
        >
          <TextArea
            rows={6}
            placeholder="Enter your message here..."
            showCount
            maxLength={1000}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
          <Button onClick={handleCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Send Message
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ContactDialog;
