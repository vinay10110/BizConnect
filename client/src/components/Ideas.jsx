/* eslint-disable react/prop-types */
import { useEffect, useState,useContext } from "react";
import { Card, Row, Col, Typography, Spin, Divider, Avatar, Button, Popconfirm, message } from 'antd';
import FormatTime from "./FormatTime";
import IdeasEdit from "../pages/IdeasEdit";
import DetailsDrawer from './DetailsDrawer'; 
import { UserContext } from "./UserContext";
const { Text } = Typography;
const truncateDescription = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};
const Ideas = () => {
  const token = localStorage.getItem('token');
  const [ideas, setIdeas] = useState([]);
  const [userTrue, setUserTrue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingIdea, setEditingIdea] = useState(null);
  const [visible, setVisible] = useState(false);
  const [itemType, setItemType] = useState(null);
  const [item, setItem] = useState(null);
  const {userInfo}=useContext(UserContext);
  const handleClick = () => {
    const mailto = `mailto:${userInfo.email}`;
    window.open(mailto, '_blank');
  };
  const fetchIdeas = async () => {
    setLoading(true);
    const ideasResponse = await fetch(`${import.meta.env.VITE_API_URL}/idea`);
    const ideasResult = await ideasResponse.json();
    if (userInfo.type === 'BusinessMan') {
      setUserTrue(true);
      const filteredIdeas = ideasResult.filter(idea => idea.user.email === userInfo.email);
      setIdeas(filteredIdeas);
    }
    else{
           setIdeas(ideasResult);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchIdeas();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, token]);

  const handleDelete = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/idea`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: {
        'content-type': 'application/json',
        'Authorization': `${token}`
      }
    });
    if (response.status === 200) {
      message.success('Idea deleted successfully');
      fetchIdeas();  
    } else {
      message.error('Failed to delete the idea');
    }
  };

  const handleEdit = (idea) => {
    setEditingIdea(idea);
  };

  const handleUpdate = async (updatedIdea) => {
    const { id, values } = updatedIdea;
    const response = await fetch(`${import.meta.env.VITE_API_URL}/idea`, {
      method: 'PUT',
      body: JSON.stringify({ id, values }),
      headers: {
        'content-type': 'application/json',
        'Authorization': `${token}`
      }
    });
    if (response.ok) {
      message.success('Updated successfully');
      fetchIdeas();
    } else {
      message.error('Failed to update idea');
    }
    
    
  };

  const cancel = () => {
    message.info('Deletion canceled');
  };


  const showDrawer = (type, data) => {
    setItemType(type);
    setItem(data);
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    setItemType(null);
    setItem(null);
  };

  if (loading) {
    return <Spin size="large" fullscreen={true} />;
  }

  return (
    <>
      {userTrue && ideas.length === 0 ? (
        <Text>You did not post any ideas.</Text>
      ) : (
        <Row gutter={[16, 16]}>
          {ideas.map((idea) => (
            <Col xs={24} sm={12} md={8} key={idea._id}>
              <Card
                title={
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{idea.title}</span>
                    <span style={{ fontSize: '0.8em', color: 'gray' }}>
                      {FormatTime(idea.createdAt)}
                    </span>
                  </div>
                }
                bordered={false}
                hoverable={true}
                style={{ width: '100%', margin: '7px', height: 'fit-content' }}
              >
                <div onClick={()=>showDrawer('idea',idea)}>

                
                <p>Category: {idea.category}</p>
                <p>Company Registration: {idea.companyReg}</p>
                <p>Project Life: {idea.projectLife}</p>
                <p>Experience: {idea.experience}</p>
                <p>Skill Set: {idea.skillSet}</p>
                <p>Description: {truncateDescription(idea.description, 25)}</p>
                </div>
                {
                  !userTrue && <>
                    <Divider orientation="left">Posted by</Divider>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <Avatar size={32} src={idea.user.imageData} style={{ marginRight: '5px' }} />{idea.user.name}
                      </div>
                      <div>
                        <Button type="primary" onClick={handleClick}>Contact</Button>
                      </div>
                    </div>
                  </>
                }
                {
                  userInfo.type === 'BusinessMan' && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button type="primary" ghost style={{ marginRight: '2px' }} onClick={() => handleEdit(idea)}>Edit</Button>
                      <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => handleDelete(idea._id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button danger>Delete</Button>
                      </Popconfirm>
                    </div>
                  )
                }
              </Card>
            </Col>
          ))}
        </Row>
      )}
      {editingIdea && (
        <IdeasEdit
          visible={!!editingIdea}
          onClose={() => setEditingIdea(null)}
          onSubmit={handleUpdate}
          initialData={editingIdea}
        />
      )}
      <DetailsDrawer
        visible={visible}
        onClose={onClose}
        itemType={itemType}
        item={item}
      />
    </>
  );
};

export default Ideas;
