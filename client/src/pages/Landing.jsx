import { Row, Col, Typography, Button } from 'antd';
import Lottie from 'lottie-react';
import {Link} from 'react-router-dom'
import animation2 from '../assets/Animation - 1720596931644.json'; 

const { Title, Paragraph } = Typography;

const LandingPage = () => {
  return (
    <div style={{ backgroundColor: '#f5f5f5', margin: '0', padding: '0', minHeight: '100vh' }}>
      <Row justify="center" align="middle" style={{ minHeight: '100vh', padding: '0 20px' }}>
        <Col xs={24} md={11} style={{ marginLeft: 'auto' }}>
          <Title level={1} style={{ fontFamily: 'Bona Nova SC' }}>Welcome to BizConnect</Title>
          <Paragraph>
            Empowering connections, fueling growth - one opportunity at a time.
          </Paragraph>
            <Button type="primary" size="large" style={{ marginRight: '10px' }}>
            <Link to='/login'>Sign In</Link> 
            </Button>
            <Button type="primary" size="large">
            <Link to='/register'>Sign Up</Link> 
            </Button>
        </Col>
        <Col xs={24} md={11} style={{ textAlign: 'center', marginRight: 'auto' }}>
          <div style={{ width: '600px', maxWidth: '100%' }}>
            <Lottie
              animationData={animation2}
              autoplay
              loop
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LandingPage;
