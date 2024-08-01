import { useState,useContext } from 'react';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Upload, Row, Col, Form, Input, Avatar, message, Flex } from 'antd';
import { UserContext } from './UserContext';
import '../App.css'
const Profile = () => {
  const {setUserInfo,userInfo}=useContext(UserContext);
  const [imageBase64, setImageBase64] = useState(null);
  const [name, setName] = useState(userInfo.name);
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/profile/image`, {
        method: 'PUT',
        body:JSON.stringify({imageData:imageBase64}) ,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });
      const data=await response.json();
      if (response.ok) {
        message.success('Image updated successfully');
        setEditImage(false);
        setUserInfo(data);
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
        const data=await response.json();
      
        if (response.ok) {
          message.success('Updated successfully');
          setEditNamePassword(false);
          setUserInfo(data.userDoc);
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
          style={{ maxWidth: '400px', margin: 'auto',alignItems:'center'}}
        >
          <Form.Item style={{alignItems:'center',display:'flex',justifyContent:'center'}}>
          
              <Avatar
                size={110}
                icon={<UserOutlined />}
                src={imageBase64?imageBase64:userInfo.imageData}
               
              />
           
          </Form.Item>
          {!editImage && (
            <Form.Item style={{alignItems:'center',display:'flex',justifyContent:'center'}}>
             
                
                <Button
                  type="primary"
                  onClick={() => setEditImage(true)}
                  
                >
                  Edit Image
                </Button>
              
            </Form.Item>
          )}
          {editImage && (
            <>
            <Form.Item style={{alignItems:'center',display:'flex',justifyContent:'center'}}>
               
                <Upload onChange={handleChange} showUploadList={true} >
                  <Button icon={<UploadOutlined />}>Click to Re-upload</Button>
                </Upload>
                
            </Form.Item>
            <Flex justify='center' gap="middle" style={{marginBottom:'25px'}}>
                <Button
                  type="primary"
                  htmlType="button"
                  onClick={handleImage}
                  loading={uploading}
                  
                >
                  Save
                </Button>
                <Button onClick={() => {
                  setImageBase64(null)
                  setEditImage(false)
                }
                } >
                  Cancel
                </Button>
                </Flex>
            </>
          )}
          <Flex justify='center'vertical gap="middle" >
           
           
                <Input
                 placeholder={userInfo.name}
                  value={name}
                  className='inputProfile'
                  disabled={!editNamePassword}
                  onChange={(ev)=>setName(ev.target.value)}
                  style={{ cursor: 'default' }}
                />
           
          
                <Input.Password
                
                  placeholder="Password"
                  className='inputProfile'
                  value={password}
                  size='large'
                  disabled={!editNamePassword}
                  onChange={(ev)=>setPassword(ev.target.value)}
                  style={{ cursor: 'default' }}
                />
                
           
            </Flex>
              {
                !editNamePassword?(
                  <Form.Item style={{alignItems:'center',display:'flex',justifyContent:'center',marginTop:'25px'}}>
             
                <Button
                  type="primary"
                  onClick={() => setEditNamePassword(true)}
                >
                  Edit Name & Password
                </Button>
            </Form.Item>
                ):(
                 <Flex justify='center' style={{marginTop:'25px'}}>
                
                  <Button
                    type="primary"
                   onClick={handleSubmit}
                    style={{ marginRight: '16px' }}
                  >
                    Save
                  </Button>
                  <Button
                      onClick={()=>{
                        setEditNamePassword(false);
                      }}
                  
                  >
                    Cancel
                  </Button>
               </Flex>
                )
              }
        </Form>
      </Col>
    </Row>
  );
};

export default Profile;
