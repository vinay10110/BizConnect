/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Upload, Row, Col, Form, Input, Avatar, Space, message } from 'antd';

const Profile = ({ userName, image }) => {
  console.log(userName);
  const [imageBase64, setImageBase64] = useState(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [editImage, setEditImage] = useState(false);
  const [editNamePassword, setEditNamePassword] = useState(false);
  const [uploading, setUploading] = useState(false); 
  const token = localStorage.getItem('token');

  const handleChange = ({ file }) => {
    if (file.originFileObj) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageBase64(e.target.result);
      };
      reader.readAsDataURL(file.originFileObj);
    } else {
      message.error('Failed to read file');
    }
  }

  const handleImage = async () => {
    try {
      setUploading(true); 
      console.log(imageBase64);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/profile/image`, {
        method: 'PUT',
        body:JSON.stringify({imageData:imageBase64}) ,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });
      if (response.ok) {
        message.success('Image updated successfully');
        setEditImage(false);
      } else {
        message.error('Failed to update the image');
      }
    } catch (error) {
      message.error('Failed to update the image');
    } finally {
      setUploading(false); 
    }
  };

  const handleSubmit = async () => {
    if(!name || !password){
      message.error('Fields should not be Empty. please Enter values to Update')
    }
    else{
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/profile`, {
          method: 'PUT',
          body: JSON.stringify({ name, password }),
          headers: {
            'Content-Type': 'application/json',
            authorization: `${token}`,
          },
        });
        if (response.ok) {
          message.success('Updated successfully');
          setEditNamePassword(false);
        } else {
          message.error('Failed to update');
        }
      } catch (error) {
        message.error('Failed to update');
      }
    }
    
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '50vh' }}>
      <Col span={12}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: '400px', margin: 'auto' }}
        >
          <Form.Item>
            <Space wrap size={16}>
              <Avatar
                size={100}
                icon={<UserOutlined />}
                src={imageBase64?imageBase64:image}
                style={{ marginLeft: '100px' }}
              />
            </Space>
          </Form.Item>
          {!editImage && (
            <Form.Item>
              <Row justify="center">
                
                <Button
                  type="primary"
                  onClick={() => setEditImage(true)}
                  style={{ marginLeft: '16px' }}
                >
                  Edit Image
                </Button>
              </Row>
            </Form.Item>
          )}
          {editImage && (
            <Form.Item>
              <Row justify="center">
                <Upload onChange={handleChange} showUploadList={true}>
                  <Button icon={<UploadOutlined />}>Click to Re-upload</Button>
                </Upload>
                <Button
                  type="primary"
                  htmlType="button"
                  onClick={handleImage}
                  loading={uploading}
                  style={{ marginLeft: '16px' }}
                >
                  Save
                </Button>
                <Button onClick={() => {
                  setImageBase64(null)
                  setEditImage(false)

                }
                } style={{ marginLeft: '16px' }}>
                  Cancel
                </Button>
              </Row>
            </Form.Item>
          )}
         
            <Form.Item>
              <Row justify="center">
                <Input
                defaultValue={userName}
                 placeholder={userName}
                  value={name}
                  disabled={!editNamePassword}
                  onChange={(ev)=>setName(ev.target.value)}
                  style={{ cursor: 'default', width: '300px', marginBottom: '16px' }}
                />
              </Row>
              <Row justify="center">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  disabled={!editNamePassword}
                  onChange={(ev)=>setPassword(ev.target.value)}
                  style={{ cursor: 'default', width: '300px' }}
                />
              </Row>
              {
                !editNamePassword?(
               <Row justify="center">
                <Button
                  type="primary"
                  onClick={() => setEditNamePassword(true)}
                  style={{ marginTop: '16px' }}
                >
                  Edit Name & Password
                </Button>
              </Row>
                ):(<Row justify="center">
                  <Button
                    type="primary"
                   onClick={handleSubmit}
                    style={{ marginTop: '16px',marginRight:'6px' }}
                  >
                    Save
                  </Button>
                  <Button
                    type="primary"
                      onClick={()=>{
                        setEditNamePassword(false);
                      }}
                    style={{ marginTop: '16px' }}
                  >
                    Cancel
                  </Button>
                </Row>)
              }
              
            </Form.Item>
                               
         
        </Form>
      </Col>
    </Row>
  );
};

export default Profile;
