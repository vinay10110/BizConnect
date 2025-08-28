/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from "react";
import { Card, Row, Col, Typography, Spin, Divider, Avatar, Button, Popconfirm, message, Flex } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import FormatTime from "./FormatTime";
import IdeasEdit from "../pages/IdeasEdit";
import DetailsDrawer from './DetailsDrawer';
import { UserContext } from "./UserContext";
import Filter from './Filter';
import ContactDialog from './ContactDialog';
import { handleTokenExpiration } from '../utils/tokenUtils';
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
  const [filterIdeas, setFilterIdeas] = useState([]);
  const [userTrue, setUserTrue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingIdea, setEditingIdea] = useState(null);
  const [visible, setVisible] = useState(false);
  const [itemType, setItemType] = useState(null);
  const [item, setItem] = useState(null);
  const [filterTrue, setFilterTrue] = useState(false);
  const [filterValue, setFilterValue] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const { userInfo } = useContext(UserContext);

  const handleContactClick = (user) => {
    setSelectedContact(user);
    setContactVisible(true);
  };

  const handleContactClose = () => {
    setContactVisible(false);
    setSelectedContact(null);
  };

  const fetchIdeas = async () => {
    setLoading(true);
    try {
      const ideasResponse = await fetch(`${import.meta.env.VITE_API_URL}/idea`);
      
      if (!ideasResponse.ok) {
        const errorData = await ideasResponse.json();
        if (handleTokenExpiration(ideasResponse, errorData)) {
          return;
        }
        throw new Error(errorData.message || 'Failed to fetch ideas');
      }
      
      const ideasResult = await ideasResponse.json();
      if (userInfo.type === 'BusinessMan') {
        setUserTrue(true);
        const filteredIdeas = ideasResult.filter(idea => idea.user.email === userInfo.email);
        setIdeas(filteredIdeas);
      } else {
        setIdeas(ideasResult);
      }
    } catch (error) {
      if (error.message !== 'TOKEN_EXPIRED') {
        message.error('Failed to load ideas');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, token]);

  const handleDelete = async (id) => {
    try {
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
        const errorData = await response.json();
        if (handleTokenExpiration(response, errorData)) {
          return;
        }
        message.error('Failed to delete the idea');
      }
    } catch (error) {
      if (error.message !== 'TOKEN_EXPIRED') {
        message.error('Failed to delete the idea');
      }
    }
  };

  const handleEdit = (idea) => {
    setEditingIdea(idea);
  };

  const handleUpdate = async (updatedIdea) => {
    const { id, values } = updatedIdea;
    try {
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
        const errorData = await response.json();
        if (handleTokenExpiration(response, errorData)) {
          return;
        }
        message.error('Failed to update idea');
      }
    } catch (error) {
      if (error.message !== 'TOKEN_EXPIRED') {
        message.error('Failed to update idea');
      }
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

  const showFilterDrawer = (criteria) => {
    setFilterValue(criteria);
    setFilterVisible(true);
  };

  const closeFilterDrawer = () => {
    setFilterVisible(false);
  };

  const handleFilter = (criteria) => {
    if (criteria && criteria.category.length > 0) {
      let filterData = [];
      if (criteria.category[2]) {
        filterData = ideas.filter((idea) => idea.category[2] === criteria.category[2]);
      } else if (criteria.category[1]) {
        filterData = ideas.filter((idea) => idea.category[1] === criteria.category[1]);
      } else {
        filterData = ideas.filter((idea) => idea.category[0] === criteria.category[0]);
      }

      let filterDataByExperience = filterData;
      if (criteria.experience) {
        const experienceFiltered = filterData.filter((idea) => idea.experience >= criteria.experience);
        filterDataByExperience = experienceFiltered.length > 0 ? experienceFiltered : filterData;
      }

      let filterDataByProjectLife = filterDataByExperience;
      if (criteria.projectLife) {
        const projectLifeFiltered = filterDataByExperience.filter((idea) => idea.projectLife >= criteria.projectLife);
        filterDataByProjectLife = projectLifeFiltered.length > 0 ? projectLifeFiltered : filterDataByExperience;
      }

      setFilterIdeas(filterDataByProjectLife);
      setFilterTrue(true);
    }
    closeFilterDrawer();
  };

  return (
    <>
      <Spin spinning={loading}>
        <Flex justify="end">
          {filterTrue ? (
            <Button danger ghost onClick={() => setFilterTrue(false)}>
              <CloseCircleOutlined />
            </Button>
          ) : (
            <Button type="primary" ghost onClick={() => showFilterDrawer('idea')}>Filter</Button>
          )}
        </Flex>
        <Filter
          visible={filterVisible}
          onClose={closeFilterDrawer}
          itemType={filterValue}
          onFilter={handleFilter}
        />
        {userTrue && ideas.length === 0 ? (
          <Text>You did not post any ideas.</Text>
        ) : (
          <Row gutter={[16, 16]}>
            {(filterTrue ? filterIdeas : ideas).map((idea) => (
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
                  <div onClick={() => showDrawer('idea', idea)}>
                    <p>Category: {idea.category[idea.category.length - 1]}</p>
                    <p>Company Registration: {idea.companyReg}</p>
                    <p>Project Life: {idea.projectLife} years</p>
                    <p>Experience: {idea.experience} years</p>
                    <p>Skill Set: {idea.skillSet}</p>
                    <p>Description: {truncateDescription(idea.description, 25)}</p>
                  </div>
                  {!userTrue && (
                    <>
                      <Divider orientation="left">Posted by</Divider>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <Avatar size={32} src={idea.user.imageData} style={{ marginRight: '5px' }} />
                          {idea.user.name}
                        </div>
                        <div>
                          <Button type="primary" onClick={()=>handleContactClick(idea.user)}>Contact</Button>
                        </div>
                      </div>
                    </>
                  )}
                  {userInfo.type === 'BusinessMan' && (
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
                  )}
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
        
        {selectedContact && (
          <ContactDialog
            visible={contactVisible}
            onClose={handleContactClose}
            recipientEmail={selectedContact.email}
            recipientName={selectedContact.name}
          />
        )}
        
      </Spin>
    </>
  );
};

export default Ideas;
