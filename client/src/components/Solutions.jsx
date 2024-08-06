/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from "react";
import { Card, Row, Col, Spin, Divider, Flex, Button,Popconfirm, message, Modal,Input } from 'antd';
import { UserContext } from "./UserContext";
import DetailsDrawer from './DetailsDrawer';
const {TextArea}=Input;
const Solutions = () => {
  const token=localStorage.getItem('token');
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useContext(UserContext);
  const [query, setQuery] = useState([]);
  const [description,setDescription]=useState('');
  const [visible, setVisible] = useState(false);
  const [itemType, setItemType] = useState(null);
  const [item, setItem] = useState(null);
  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };
  const fetchDataAndFilter = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/solution`);
      const result = await response.json();
      const queries = await fetch(`${import.meta.env.VITE_API_URL}/query`);
      const queriesResult = await queries.json();
      const queryFilter = queriesResult.filter((query) => query.user._id === userInfo._id);
      setQuery(queryFilter);

      if (userInfo.type === 'BusinessAdvisor') {
        const filteredSolutions = result.filter(solution => solution.user._id === userInfo._id);
        setFilterData(filteredSolutions);
      } else {
        const filteredSolutions = result.filter(solution => solution.query.user === userInfo._id);
        setFilterData(filteredSolutions);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDataAndFilter();
  }, [userInfo]);
  const showDrawer = (type, data) => {
    setItemType(type);
    setItem(data);
    setVisible(true);
  };
const handleDelete=async(id)=>{
  const response=await fetch(`${import.meta.env.VITE_API_URL}/solution`,{
    method:'DELETE',
    body:JSON.stringify({id}),
    headers:{
      'content-type':'application/json',
      'Authorization':`${token}`
    }
  })
  if(response.ok){
    message.success('solution deleted succesfullt');
    fetchDataAndFilter();
  }
}
const cancel = () => {
  message.info('Deletion canceled');
};
  const onClose = () => {
    setVisible(false);
    setItemType(null);
    setItem(null);
  };
  const handleOk=async()=>{
    const response=await fetch(`${import.meta.env.VITE_API_URL}/solution`,{
      method:'PUT',
      body:JSON.stringify({description}),
      headers:{
        'content-type':'application/json',
        'Authorization':`${token}`
      }
    })
    if(response.ok){
      console.log(response)
    }
  }
  const handleCancel=()=>{
    onClose();
  }
  const handleDeleteQuery=async(id)=>{
    const response=await fetch(`${import.meta.env.VITE_API_URL}/query`,{
      method:'DELETE',
      body:JSON.stringify({id}),
      headers:{
        'content-type':'application/json',
        'Authorization':`${token}`
      }
    })
    if(response.ok){
      message.success('Query deleted succesfully')
      fetchDataAndFilter();
    }
    else{
      message.error('Unable to delete query')
    }
  }
  const handleModel=()=>{
    return <Modal
    title="Edit solution"
      onOk={handleOk}
      onCancel={handleCancel}>
 <TextArea placeholder="Enter description"  value={description} onChange={ev => setDescription(ev.target.value)} rows={5} />
    </Modal>
  }
  return (
    <Spin spinning={loading}>
      {
        userInfo.type === 'BusinessAdvisor' ? (
          <>
            {
              filterData.length > 0 ? (
                <Row gutter={[16, 16]}>
                  {
                    filterData.map((solution) => (
                      <Col key={solution._id} xs={24} sm={12} md={8}>
                        <Card
                          title={`Query: ${solution.query.category}`}
                          bordered={false}
                          style={{ width: '100%', height: 'fit-content' }}
                        >
                          <div onClick={() => showDrawer('solution', solution)} style={{ cursor: 'pointer' }}>

                            <p>Your Solution: {truncateDescription(solution.description, 25)}</p>
                            <p>For Query: {solution.query.description}</p>
                          </div>
                          <Divider></Divider>
                          <Flex justify="flex-end" gap="middle">
                            <Button type="primary" onClick={handleModel}>Edit</Button>
                            <Popconfirm
                              title="Delete the solution"
                              description="Are you sure to delete this solution?"
                              onConfirm={() => handleDelete(solution._id)}
                              onCancel={cancel}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button danger>Delete</Button>
                            </Popconfirm>
                          </Flex>
                        </Card>
                      </Col>
                    ))
                  }
                </Row>
              ) : (
                <>
                  You didnt post any solutions
                </>
              )
            }
          </>
        ) : (
          <>
            {
              filterData.length > 0 ? (
                <>
                  <Divider>Solutions</Divider>
                  <Row gutter={[16, 16]}>
                    {
                      filterData.map((solution) => (
                        <Col key={solution._id} xs={24} sm={12} md={8}>
                          <Card
                            title={`Posted by: ${solution.user.name}`}
                            bordered={false}
                            style={{ width: '100%', marginBottom: 16 }}
                            key={solution._id}
                          >
                            <div onClick={() => { showDrawer('solution', solution) }} style={{ cursor: 'pointer' }}>
                              <p>Your Query: {solution.query.description}</p>
                              <p>Solution: {truncateDescription(solution.description, 25)}</p>
                            </div>
                          </Card>
                        </Col>
                      ))
                    }
                  </Row>
                  
                </>
              ) : (
                <>
                  No solutions yet
                </>
              )
            }
          </>
        )
      }
      { userInfo.type!=='BusinessAdvisor' && <Divider> Pending Queries</Divider>}
                  <Row gutter={[16, 16]}>
                    {
                      query.map((query) => (
                        <Col key={query._id} xs={24} sm={12} md={8}>
                          <Card
                            title={`${query.category}`}
                            bordered={false}
                            style={{ width: '100%', marginBottom: 16 }}
                          >
                            <div onClick={showDrawer}>
                              <p>Description: {query.description}</p>
                            </div>
                            <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this query?"
                        onConfirm={() => handleDeleteQuery(query._id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button danger>Delete</Button>
                      </Popconfirm>
                          </Card>
                        </Col>
                      ))
                    }
                  </Row>
      <DetailsDrawer
        visible={visible}
        onClose={onClose}
        itemType={itemType}
        item={item}
      />
    </Spin>
  );
};

export default Solutions;
