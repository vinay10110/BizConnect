/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Card, Row, Col, Spin } from 'antd';

const Solutions = ({ role, id }) => {
  const [solutions, setSolutions] = useState([]);
  const [checked, setChecked] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/solution`);
        const result = await response.json();

        if (Array.isArray(result)) {
          setSolutions(result);
        } else {
          setSolutions([result]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (solutions.length > 0) {
      setChecked(true);
      if (role === 'BusinessAdvisor') {
        const filter = solutions.filter(solution => solution.user._id === id);
        setFilterData(filter);
      } else {
        const filter = solutions.filter(solution => solution.query.user === id);
        setFilterData(filter);
      }
    }
  }, [solutions]);

  const BusinessAdvisorCard = ({ solution }) => (
    <Card
      title={`Query: ${solution.query.category}`}
      bordered={false}
      style={{ width: 400, marginBottom: 16 }}
      key={solution._id}
    >
      <p>Your Solution: {solution.description}</p>
      <p>For Query: {solution.query.description}</p>
    </Card>
  );

  const UserCard = ({ solution }) => (
    <Card
      title={`Posted by: ${solution.user.name}`}
      bordered={false}
      style={{ width: 400, marginBottom: 16 }}
      key={solution._id}
    >
      <p>Your Query: {solution.query.description}</p>
      <p>Solution: {solution.description}</p>
    </Card>
  );

  return (
    <Spin spinning={loading}>
      {checked ? (
        filterData.length > 0 ? (
          <Row gutter={[16, 16]}>
            {filterData.map((solution) => (
              <Col span={8} key={solution._id}>
                {role === 'BusinessAdvisor' ? (
                  <BusinessAdvisorCard solution={solution} />
                ) : (
                  <UserCard solution={solution} />
                )}
              </Col>
            ))}
          </Row>
        ) : (
          <p>{role === 'BusinessAdvisor' ? 'You didn\'t post any solutions' : 'No solution yet'}</p>
        )
      ) : (
        <p>No data available</p>
      )}
    </Spin>
  );
};

export default Solutions;
