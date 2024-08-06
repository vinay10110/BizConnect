/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import { Card, Button, message, Row, Col, Typography, Divider, Avatar, Spin, Popconfirm, Flex } from 'antd';
import FormatTime from "./FormatTime";
import LoansEdit from "../pages/LoansEdit";
import { UserContext } from "./UserContext";
import DetailsDrawer from "./DetailsDrawer";
import Filter from './Filter';
import { CloseCircleOutlined } from '@ant-design/icons';
const { Text } = Typography;

const Loans = () => {
  const token = localStorage.getItem('token');
  const [loans, setLoans] = useState([]);
  const [filterTrue, setFilterTrue] = useState(false);
  const [userTrue, setUserTrue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterLoans, setFilterLoans] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterValue, setFilterValue] = useState({})
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
      setLoans(filteredLoans);
    }
    else {
      setLoans(loansResult);
    }
    const userInterestsResult = interestResult.filter(interest => interest.user._id === userInfo._id);
    setUserInterests(userInterestsResult);

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
  const handleIntrestDelete = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/intrest`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: {
        'content-type': 'application/json',
        'Authorization': `${token}`
      }
    })
    if (response.ok) {
      message.success('intrest canceld')
      fetchLoans();
    }
    else {
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
      if (criteria.category[1]) {
        filterData = loans.filter((loan) => loan.loanType[1] === criteria.category[1]);
      } else  {
        filterData = loans.filter((loan) => loan.loanType[0] === criteria.category[0]);
      } 

      let filterDataByAmount = filterData;
      if (criteria.experience) {
        const amountFiltered = filterData.filter((loan) => loan.amount == criteria.amount);
        filterDataByAmount = amountFiltered.length > 0 ? amountFiltered : filterData;
      }

      let filterDataByIntrest = filterDataByAmount;
      if (criteria.projectLife) {
        const intrestFiltered = filterDataByAmount.filter((loan) => loan.intrestRate <= criteria.intrest);
        filterDataByIntrest = intrestFiltered.length > 0 ? intrestFiltered : filterDataByAmount;
      }
      let filterDataByDuration = filterDataByIntrest;
      if (criteria.projectLife) {
        const durationFiltered = filterDataByIntrest.filter((loan) => loan.projectLife >= criteria.projectLife);
        filterDataByDuration = durationFiltered.length > 0 ? durationFiltered : filterDataByIntrest;
      }
      setFilterLoans(filterDataByDuration);
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
            <Button type="primary" ghost onClick={() => showFilterDrawer('loan')}>Filter</Button>
          )}
        </Flex>
        <Filter
          visible={filterVisible}
          onClose={closeFilterDrawer}
          itemType={filterValue}
          onFilter={handleFilter}
        />
        {userTrue && loans.length === 0 ? (
          <Text>You did not apply for any loans.</Text>
        ) : (
          <Row gutter={[16, 16]}>
            {(filterTrue ? filterLoans : loans).map((loan) => {
              const isIntrest = userInterests.find((intrest) => loan._id === intrest.loan._id);
              return (
                <Col xs={24} sm={12} md={8} key={loan._id}>
                  <Card
                    title={
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{loan.loanType[loan.loanType.length - 1]}</span>
                        <span style={{ fontSize: '0.8em', color: 'gray' }}>
                          {FormatTime(loan.createdAt)}
                        </span>
                      </div>
                    }
                    bordered={false}
                    hoverable={true}

                    style={{ width: '100%', margin: '7px', height: 'fit-content' }}
                  >
                    <div onClick={() => showDrawer('loan', loan)}>
                      <p>Min Age: {loan.minAge} years</p>
                      <p>Max Age: {loan.maxAge} years</p>
                      <p>Amount: {loan.amount}.Rs</p>
                      <p>Interest Rate: {loan.intrestRate}%</p>
                      <p>Duration: {loan.duration} years</p>
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
