import { useState, useEffect } from 'react';
import { Typography, Progress, Card } from 'antd';
import { LoadingOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const LoadingScreen = ({ onConnectionReady, connectionStatus }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('Initializing application...');

  const messages = [
    'Initializing application...',
    'Connecting to backend services...',
    'Waking up server (this may take a moment)...',
    'Establishing secure connection...',
    'Almost ready...'
  ];

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => {
        const currentIndex = messages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % messages.length;
        return messages[nextIndex];
      });
    }, 2000);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10;
      });
    }, 1000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    if (connectionStatus?.connected) {
      setProgress(100);
      setCurrentMessage('Connection established!');
      setTimeout(() => {
        onConnectionReady();
      }, 1000);
    } else if (connectionStatus?.error) {
      setCurrentMessage('Connection failed. Retrying...');
    }
  }, [connectionStatus, onConnectionReady]);

  const getStatusIcon = () => {
    if (connectionStatus?.connected) {
      return <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '24px' }} />;
    } else if (connectionStatus?.error) {
      return <ExclamationCircleOutlined style={{ color: '#ff4d4f', fontSize: '24px' }} />;
    }
    return <LoadingOutlined style={{ fontSize: '24px' }} spin />;
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <Card 
        style={{
          width: '100%',
          maxWidth: '500px',
          textAlign: 'center',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div style={{ padding: '40px 20px' }}>
          <Title level={2} style={{ color: '#1890ff', marginBottom: '30px' }}>
            BizConnect
          </Title>
          
          <div style={{ marginBottom: '30px' }}>
            {getStatusIcon()}
          </div>
          
          <Text style={{ 
            fontSize: '16px', 
            color: '#666',
            display: 'block',
            marginBottom: '30px'
          }}>
            {currentMessage}
          </Text>
          
          <Progress 
            percent={Math.round(progress)} 
            showInfo={false}
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
            style={{ marginBottom: '20px' }}
          />
          
          <div style={{ marginTop: '20px' }}>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {connectionStatus?.attempts && (
                <>Attempt {connectionStatus.attempts} • </>
              )}
              Please wait while we prepare your experience
            </Text>
          </div>
          
          {connectionStatus?.error && (
            <div style={{ marginTop: '15px' }}>
              <Text type="secondary" style={{ fontSize: '11px', fontStyle: 'italic' }}>
                Backend services are starting up (cold start)...
              </Text>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default LoadingScreen;
