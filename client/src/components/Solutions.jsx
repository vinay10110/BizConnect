/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState,useContext } from "react";
import { Card, Row, Col, Spin,Divider } from 'antd';
import { UserContext } from "./UserContext";
const Solutions = () => {
  const [checked, setChecked] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {userInfo}=useContext(UserContext);
  const [query,setQuery]=useState([]);
  useEffect(() => {
    const fetchDataAndFilter = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/solution`);
        const result = await response.json();
        const queries=await fetch(`${import.meta.env.VITE_API_URL}/query`);
        const queriesResult=await queries.json();
        const queryFilter=queriesResult.filter((query)=>query.user._id===userInfo._id);
        setQuery(queryFilter);
        if (Array.isArray(result)) {
          setLoading(false);
          setChecked(true);
          const filteredSolutions = userInfo.type === 'BusinessAdvisor'
            ? result.filter(solution => solution.user._id === userInfo.id)
            : result.filter(solution => solution.query.user === userInfo.id);
  
          setFilterData(filteredSolutions);
        } else {
          setLoading(false);
          setChecked(true);
          const filteredSolution = userInfo.type === 'BusinessAdvisor'
            ? [result].filter(solution => solution.user._id === userInfo.id)
            : [result].filter(solution => solution.query.user === userInfo.id);
  
          setFilterData(filteredSolution);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
  
    fetchDataAndFilter(); 
  }, [userInfo]);

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
const queryCard=()=>{
 return query.map((query)=>(
  <Col span={8} key={query._id}>
    <Card
      title={`${query.category}`}
      bordered={false}
      style={{ width: 400, marginBottom: 16 }}
      key={query._id}
    >
      <p>Description: {query.description}</p>
    </Card>
    </Col>
  ))
}
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
                {userInfo.type === 'BusinessAdvisor' ? (
                  <BusinessAdvisorCard solution={solution} />
                ) : (<>
                <Divider>Solutions</Divider>
                <UserCard solution={solution} />
                <Row gutter={[16,16]}>
          {queryCard()}
          </Row>
                </>
                  
                )}
              </Col>
            ))}
          </Row>
        ) : (
          <p>{userInfo.type === 'BusinessAdvisor' ? 'You didn\'t post any solutions' : (<>
          <Divider>Solutions</Divider>
          <p>No solution </p>
          <Divider>Your queries</Divider>
          <Row gutter={[16,16]}>
          {queryCard()}
          </Row>
          </>)}</p>
        )
      ) : (
        <p>No data available</p>
      )}
    </Spin>
  );
};

export default Solutions;
