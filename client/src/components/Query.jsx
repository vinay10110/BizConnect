/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Card, Button, Popover, Form, Input, message,Row,Col } from 'antd';
import FormatTime from './FormatTime';
import {UserContext} from './UserContext'
const { TextArea } = Input;

const Query = () => {
  const [queries, setQueries] = useState([]);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [currentQueryId, setCurrentQueryId] = useState(null);
  const [userTrue,setUserTrue]=useState(false)
  const token = localStorage.getItem('token');
  const {userInfo}=useContext(UserContext);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/query`);
      const result = await response.json();
     
      if(userInfo.type!='BusinessAdvisor'){
        setUserTrue(true)
        const filter=result.filter(query=>query.user._id===userInfo.id);
        setQueries(filter)
      }
      else{
        setQueries(result);
      }
      
    };
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

  return (
    <Row gutter={[16, 16]}>
    {queries.map((query) => (
      <Col span={8} key={query._id}>
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
          <p>Name: {query.user.name}</p>
          <p>Description: {query.description}</p>
          <Popover
            content={formContent}
            trigger="click"
            open={open && currentQueryId === query._id}
            onOpenChange={(newOpen) => handleOpenChange(newOpen, query._id)}
          >
            <Button type="primary">Post solution</Button>
          </Popover>
        </Card>
      </Col>
    ))}
    {userTrue && (
  queries.map((query) => (
    <Col span={8} key={query._id}>
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
        <p>Description: {query.description}</p>
      </Card>
    </Col>
  ))
)}

  </Row>
  );
};

export default Query;
