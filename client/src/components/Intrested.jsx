/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Card, Row, Col, Spin,Divider, Button } from 'antd';
import FormatTime from './FormatTime';

const Intrested = ({ id }) => {
  const [intrested, setIntrested] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/intrest`);
        const data = await response.json();
        setIntrested(data); 
        const filter=intrested.filter((intrest)=>intrest.loan.user===id);
        setFilterData(filter);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); 
      }
    };
    
  useEffect(() => {
    fetchData(); 
  }, [3]);

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: 'auto' }} />;
  }

  return (
    <>
      {filterData.length > 0 ? (
        <Row gutter={[16, 16]}>
          {filterData.map((intrest) => (
            <Col span={8} key={intrest._id}>
              <Card
                title={
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{intrest.user.name}</span>
                    <span style={{ fontSize: '0.8em', color: 'gray' }}>
                      {FormatTime(intrest.createdAt)}
                    </span>
                  </div>
                }
                bordered={false}
                style={{ marginBottom: 16 }}
              >
                <p>Interested in: {intrest.loan.loanType}</p>
                <p>Duration of: {intrest.loan.duration}</p>
                <Divider orientation="left"></Divider>
                <div style={{display:'flex',justifyContent:'flex-end'}}>
                  <Button type='primary' >Contact</Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>You dont have any interested persons for your loans</p>
      )}
    </>
  );
};

export default Intrested;
