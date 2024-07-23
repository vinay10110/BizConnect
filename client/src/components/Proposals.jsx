/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState,useContext } from "react";
import { Card, Row, Col, Avatar, Button, Divider, Typography, Spin, Popconfirm, message } from 'antd';
import FormatTime from "./FormatTime";
import ProposalsEdit from "../pages/ProposalsEdit"; 
import { UserContext } from "./UserContext";
import DetailsDrawer from "./DetailsDrawer";
const { Text } = Typography;

const Proposals = () => {
  const [proposals, setProposals] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [userTrue, setUserTrue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingProposal, setEditingProposal] = useState(null);
  const {userInfo}=useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [itemType, setItemType] = useState(null);
  const [item, setItem] = useState(null);
  const fetchDataAndFilter = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/proposal`);
      const result = await response.json();
      setLoading(false);

      if (userInfo.type === 'Investor') {
        const filter = result.filter((proposal) => proposal.user.email === userInfo.email);
        setUserTrue(true);
        setFilterData(filter);
      }
      else{
        setProposals(result)
      }
    } catch (error) {
      console.error('Error fetching proposals:', error);
     
    }
    setLoading(false);
  };
  useEffect(() => {
  
    fetchDataAndFilter();
  }, [userInfo]);

  const dataToDisplay = userTrue ? filterData : proposals;
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
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${import.meta.env.VITE_API_URL}/proposal`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: {
        'content-type': 'application/json',
        'Authorization': `${token}`
      }
    });
    if (response.status === 200) {
      message.success('Proposal deleted successfully');
      fetchDataAndFilter();  
    } else {
      message.error('Failed to delete the proposal');
    }
  };

  const handleEdit = (proposal) => {
    setEditingProposal(proposal);
  };

  const handleUpdate = async (updatedProposal) => {
    const token = localStorage.getItem('token');
    const { id, values } = updatedProposal;
    const response = await fetch(`${import.meta.env.VITE_API_URL}/proposal`, {
      method: 'PUT',
      body: JSON.stringify({ id, values }),
      headers: {
        'content-type': 'application/json',
        'Authorization': `${token}`
      }
    });
    if (response.ok) {
      message.success('Proposal updated successfully');
      fetchDataAndFilter(); 
    } else {
      message.error('Failed to update the proposal');
    }
  };

  const cancel = () => {
    message.info('Deletion canceled');
  };
  

  return (
    <>
    <Spin spinning={loading}>
      {userTrue && filterData.length === 0 ? (
        <Text>You did not post any proposals.</Text>
      ) : (
        <Row gutter={[16, 16]}>
          {dataToDisplay.map((proposal) => (
            <Col xs={24} sm={12} md={8} key={proposal._id}>
              <Card
                title={
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{proposal.investmentType}</span>
                    <span style={{ fontSize: '0.8em', color: 'gray' }}>
                      {FormatTime(proposal.createdAt)}
                    </span>
                  </div>
                }
                bordered={false}
                hoverable={true}
                style={{ width: '100%', margin: '7px', height: 'fit-content' }}
              >
                <div onClick={()=>showDrawer('proposal',proposal)}>
                <p>Investment Category: {proposal.investmentCategory}</p>
                <p>Expected Revenue: {proposal.expectedRevenue}</p>
                <p>Amount: {proposal.amount}</p>
                <p>Skills Set: {proposal.skillSet}</p>
                <p>Experience: {proposal.experience}</p>
                </div>
                {!userTrue && (
                  <>
                    <Divider orientation="left">Posted by</Divider>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <Avatar size={32} src={proposal.user.imageData} style={{ marginRight: '5px' }} />{proposal.user.name}
                      </div>
                      <Button type="primary" >Contact</Button>
                    </div>
                  </>
                )}
                {userInfo.type === 'Investor' && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <Button type="primary" ghost style={{ marginRight: '8px' }} onClick={() => handleEdit(proposal)}>Edit</Button>
                    <Popconfirm
                      title="Are you sure to delete this proposal?"
                      onConfirm={() => handleDelete(proposal._id)}
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
      {editingProposal && (
        <ProposalsEdit
          visible={!!editingProposal}
          onClose={() => setEditingProposal(null)}
          onSubmit={handleUpdate}
          initialData={editingProposal}
        />
      )}
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

export default Proposals;
