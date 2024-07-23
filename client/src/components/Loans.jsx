/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import { Card, Button, message, Row, Col, Typography, Divider, Avatar, Spin, Popconfirm } from 'antd';
import FormatTime from "./FormatTime";
import LoansEdit from "../pages/LoansEdit";
import { UserContext } from "./UserContext";
import DetailsDrawer from "./DetailsDrawer";
const { Text } = Typography;

const Loans = () => {
  const token = localStorage.getItem('token');
  const [loans, setLoans] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [userTrue, setUserTrue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingLoan, setEditingLoan] = useState(null);
  const [userInterests, setUserInterests] = useState([]);
  const [visible, setVisible] = useState(false);
  const [itemType, setItemType] = useState(null);
  const [item, setItem] = useState(null);
  const { userInfo } = useContext(UserContext);

  async function fetchLoans() {
    setLoading(true);
    const loansResponse = await fetch(`${import.meta.env.VITE_API_URL}/loan`);
    const interestResponse = await fetch(`${import.meta.env.VITE_API_URL}/intrest`);
    const interestResult = await interestResponse.json();
    const loansResult = await loansResponse.json();
    if (userInfo.type === 'Banker') {
      setUserTrue(true);
      const filteredLoans = loansResult.filter(loan => loan.user.email === userInfo.email);
      setFilterData(filteredLoans);
    }
    const userInterestsResult = interestResult.filter(interest => interest.user._id === userInfo._id);
    setUserInterests(userInterestsResult);
    setLoans(loansResult);
    setLoading(false);
    return loansResult;
  }

  useEffect(() => {
    fetchLoans();
  }, [userInfo]);
  const handleInterest = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/intrest`, {
      method: 'POST',
      body: JSON.stringify({ ID: id }),
      headers: {
        'content-type': 'application/json',
        'Authorization': `${token}`
      }
    });
    if (response.ok) {
      message.success('Interest posted successfully');
      fetchLoans();
    } else {
      message.error('Interest post failed');
    }
  }

  const handleDelete = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/loan`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: {
        'content-type': 'application/json',
        'Authorization': `${token}`
      }
    });
    if (response.status === 200) {
      message.success('Loan deleted successfully');
      fetchLoans();
    } else {
      message.error('Failed to delete the loan');
    }
  }

  const handleEdit = (loan) => {
    setEditingLoan(loan);
  };
const handleIntrestDelete=async(id)=>{
  const response=await fetch(`${import.meta.env.VITE_API_URL}/intrest`,{
    method:'DELETE',
    body:JSON.stringify({id}),
    headers:{
      'content-type':'application/json',
      'Authorization':`${token}`
    }
  })
  if(response.ok){
        message.success('intrest canceld')
        fetchLoans();
  }
  else{
    message.error('Failed to cancel the intrest')
  }
}
  const handleUpdate = async (updatedLoan) => {
    const { id, values } = updatedLoan;
    const response = await fetch(`${import.meta.env.VITE_API_URL}/loan`, {
      method: 'PUT',
      body: JSON.stringify({ id, values }),
      headers: {
        'content-type': 'application/json',
        'Authorization': `${token}`
      }
    });
    if (response.ok) {
      message.success('Loan updated successfully');
      fetchLoans();
    } else {
      message.error('Failed to update the loan');
    }
  };

  const cancel = () => {
    message.info('Deletion canceled');
  }
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
  const dataToDisplay = userTrue ? filterData : loans;

  

  return (
    <>
    <Spin spinning={loading}>
      {userTrue && filterData.length === 0 ? (
        <Text>You did not apply for any loans.</Text>
      ) : (
        <Row gutter={[16, 16]}>
          {dataToDisplay.map((loan) => {
            const isIntrest=userInterests.find((intrest)=>loan._id===intrest.loan._id);
            return (
              <Col xs={24} sm={12} md={8} key={loan._id}>
                <Card
                  title={
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{loan.loanType}</span>
                      <span style={{ fontSize: '0.8em', color: 'gray' }}>
                        {FormatTime(loan.createdAt)}
                      </span>
                    </div>
                  }
                  bordered={false}
                  hoverable={true}
                 
                  style={{ width: '100%', margin: '7px', height: 'fit-content' }}
                >
                  <div onClick={()=>showDrawer('loan',loan)}>
                  <p>Min Age: {loan.minAge}</p>
                  <p>Max Age: {loan.maxAge}</p>
                  <p>Net Income: {loan.netIncome}</p>
                  <p>Interest Rate: {loan.intrestRate}</p>
                  <p>Duration: {loan.duration}</p>
                  </div>
                  {!userTrue && <>
                    <Divider orientation="left">Posted by</Divider>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <Avatar size={32} src={loan.user.imageData} style={{ marginRight: '5px' }} />{loan.user.name}
                      </div>
                      {(userInfo.type === 'BusinessMan' || userInfo.type === 'Investor') && 
                        (isIntrest ? (
                          <Popconfirm
                        title="Delete the task"
                        description="Are you sure to cancel intrest?"
                        onConfirm={() => handleIntrestDelete(isIntrest._id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button danger>Cancel Intrest</Button>
                      </Popconfirm>
                        ) : (
                          <Button type="primary" onClick={() => handleInterest(loan._id)}>
                            Im interested
                          </Button>
                        ))
                      }
                    </div>
                  </>}
                  {userInfo.type === 'Banker' && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button type="primary" ghost style={{ marginRight: '2px' }} onClick={() => handleEdit(loan)}>Edit</Button>
                      <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => handleDelete(loan._id)}
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
            );
          })}
        </Row>
      )}
      {editingLoan && (
        <LoansEdit
          visible={!!editingLoan}
          onClose={() => setEditingLoan(null)}
          onSubmit={handleUpdate}
          initialData={editingLoan}
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

export default Loans;
