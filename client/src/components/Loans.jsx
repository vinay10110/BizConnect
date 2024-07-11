/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Card, Button, message, Row, Col, Typography, Divider, Avatar, Spin, Popconfirm } from 'antd';
import FormatTime from "./FormatTime";
import LoansEdit from "../pages/LoansEdit"; 
const { Text } = Typography;

const Loans = ({ role, email }) => {
  const token = localStorage.getItem('token');
  const [loans, setLoans] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [userTrue, setUserTrue] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingLoan, setEditingLoan] = useState(null);

  const fetchLoans = async () => {
    setLoading(true);
    const loansResponse = await fetch(`${import.meta.env.VITE_API_URL}/loan`);
    const loansResult = await loansResponse.json();
    if (role === 'Banker') {
      setUserTrue(true);
      const filteredLoans = loansResult.filter(loan => loan.user.email === email);
      setFilterData(filteredLoans);
    }
    setLoans(loansResult);
    setLoading(false);
  };

  useEffect(() => {
    fetchLoans();
  }, [role, token]);

  const handleIntrest = async (id) => {
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

  const dataToDisplay = userTrue ? filterData : loans;

  if (loading) {
    return <Spin size="large" fullscreen={true} />;
  }

  return (
    <>
      {userTrue && filterData.length === 0 ? (
        <Text>You did not apply for any loans.</Text>
      ) : (
        <Row gutter={[16, 16]}>
          {dataToDisplay.map((loan) => (
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
                <p>Min Age: {loan.minAge}</p>
                <p>Max Age: {loan.maxAge}</p>
                <p>Net Income: {loan.netIncome}</p>
                <p>Interest Rate: {loan.intrestRate}</p>
                <p>Duration: {loan.duration}</p>
                {
                  !userTrue && <>
                    <Divider orientation="left">Posted by</Divider>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <Avatar size={32} src={loan.user.imageData} style={{ marginRight: '5px' }} />{loan.user.name}
                      </div>
                      {(role === 'BusinessMan' || role === 'Investor') && <Button type="primary" onClick={() => handleIntrest(loan._id)}>Im interested</Button>}
                    </div>
                  </>
                }
                {
                  role === 'Banker' && (
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
                  )
                }
              </Card>
            </Col>
          ))}
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
    </>
  );
};

export default Loans;
