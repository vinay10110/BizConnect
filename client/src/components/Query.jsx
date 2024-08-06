/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Card, Button, Popover, Form, Input, message,Row,Col,Spin, Divider, Avatar } from 'antd';
import FormatTime from './FormatTime';
import {UserContext} from './UserContext'
import DetailsDrawer from "./DetailsDrawer";
const { TextArea } = Input;

const Query = () => {
  const [queries, setQueries] = useState([]);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [currentQueryId, setCurrentQueryId] = useState(null);
  const [loading ,setLoding]=useState(false);
  const [userTrue,setUserTrue]=useState(false)
  const token = localStorage.getItem('token');
  const [visible, setVisible] = useState(false);
  const [itemType, setItemType] = useState(null);
  const [item, setItem] = useState(null);
  const {userInfo}=useContext(UserContext);
  const fetchData = async () => {
    setLoding(true);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/query`);
    const result = await response.json();
   
    if(userInfo.type!=='BusinessAdvisor'){
      setUserTrue(true)
      const filter=result.filter(query=>query.user._id===userInfo.id);
      setQueries(filter)
    }
    else{
      setQueries(result);
    }
    setLoding(false);
    
  };
  useEffect(() => {
    
    fetchData();
  }, [userInfo]);
  const hide = () => {
    setOpen(false);
  };

  async function handleSubmit() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/solution`, {
      method: 'POST',
      body: JSON.stringify({ description, queryId: currentQueryId }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    });

    if (response.ok) {
      hide();
      setQueries(prevQueries => prevQueries.filter(query => query._id !== currentQueryId));
      message.success('Posted successfully');
    } else {
      message.error('Post failed due to error');
    }
  }

  const handleOpenChange = (newOpen, queryId) => {
    setOpen(newOpen);
    setCurrentQueryId(queryId);
  };

 

  const formContent = () => (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: '400px', margin: 'auto' }}
    >
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please enter the description' }]}
      >
        <TextArea placeholder="Enter description" rows={5} value={description} onChange={ev => setDescription(ev.target.value)} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" onClick={hide}>
          Close
        </Button>
      </Form.Item>
    </Form>
  );
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
  return (
    <>
   <Spin spinning={loading}>
  <Row gutter={[16, 16]}>
    {queries.map((query) => (
      <Col xs={24} sm={12} md={8} key={query._id}>
        <Card
          title={
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{query.category}</span>
              <span style={{ fontSize: '0.8em', color: 'gray' }}>
                {FormatTime(query.createdAt)}
              </span>
            </div>
          }
          bordered={false}
          style={{ marginBottom: 16 }}
        >
          {console.log(query)}
          <div onClick={() => showDrawer('query', query)} style={{ cursor: 'pointer' }}>
            {userTrue ? (
              <>
              <p>Posted by: {query.user.name}</p>
              <p>{query.description}</p>
              </>
            ) : (
              <>
                <p>Name: {query.user.name}</p>
                <p>Description: {query.description}</p>
              </>
            )}
          </div>
          {userTrue && (<>
          <Divider></Divider>
          <div>
           
          </div>
            <Popover
              content={formContent}
              trigger="click"
              open={open && currentQueryId === query._id}
              onOpenChange={(newOpen) => handleOpenChange(newOpen, query._id)}
            >
              <Button type="primary">Post solution</Button>
            </Popover>
         </> )}
        </Card>
      </Col>
    ))}
  </Row>

  <DetailsDrawer
        visible={visible}
        onClose={onClose}
        itemType={itemType}
        item={item}
      />
  </Spin>
  </>
  );
};

export default Query;
