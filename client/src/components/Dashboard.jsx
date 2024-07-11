/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Layout, theme, Space, Avatar, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import Ideas from './Ideas';
import Logout from './Logout';
import Loans from './Loans';
import PostIdea from '../pages/PostIdea';
import PostLoan from '../pages/PostLoan';
import AskQuery from '../pages/AskQuery';
import PostProposal from '../pages/PostProposal';
import Query from './Query';
import Profile from './Profile';
import Intrested from './Intrested';
import Solutions from './Solutions';
import Proposals from './Proposals';
import Sidebar from './Sidebar';

const { Header, Content } = Layout;

const Dashboard = () => {
  const [showLoans, setShowLoans] = useState(false);
  const [showAskQuery, setShowAskQuery] = useState(false);
  const [showPostLoanOffer, setShowPostLoanOffer] = useState(false);
  const [showIntrested, setShowIntrested] = useState(false);
  const [showIdeas, setShowIdeas] = useState(false);
  const [showPostIdea, setShowPostIdea] = useState(false);
  const [showViewQueries, setShowViewQueries] = useState(false);
  const [showYourSolutions, setShowYourSolutions] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showPostProposals, setShowPostProposals] = useState(false);
  const [showYourProposals, setShowYourProposals] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const { role } = useParams();
  const [collapsed, setCollapsed] = useState(false);
  const token = localStorage.getItem('token');
  const [id, setId] = useState('');

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuItemClick = ({ key }) => {
    setShowIdeas(false);
    setShowLoans(false);
    setShowAskQuery(false);
    setShowProfile(false);
    setShowPostLoanOffer(false);
    setShowIntrested(false);
    setShowPostIdea(false);
    setShowViewQueries(false);
    setShowYourSolutions(false);
    setShowPostProposals(false);
    setShowYourProposals(false);
    switch (key) {
      case '1':
        if (role === 'User' || role === 'Investor' || role === 'BusinessMan') {
          setShowIdeas(true);
        } else if (role === 'Banker') {
          setShowLoans(true);
        } else if (role === 'BusinessAdvisor') {
          setShowViewQueries(true);
        }
        break;
      case '2':
        if (role === 'User') {
          setShowLoans(true);
        } else if (role === 'Banker') {
          setShowPostLoanOffer(true);
        } else if (role === 'BusinessMan') {
          setShowLoans(true);
        } else if (role === 'BusinessAdvisor') {
          setShowYourSolutions(true);
        } else if (role === 'Investor') {
          setShowLoans(true);
        }
        break;
      case '3':
        if (role === 'User') {
          setShowAskQuery(true);
        } else if (role === 'Banker') {
          setShowYourProposals(true);
        } else if (role === 'BusinessMan') {
          setShowYourProposals(true);
        } else if (role === 'BusinessAdvisor') {
          setShowProfile(true);
        } else if (role === 'Investor') {
          setShowPostProposals(true);
        }
        break;
      case '4':
        if (role === 'User') {
          setShowYourSolutions(true);
        } else if (role === 'Banker') {
          setShowIntrested(true);
        } else if (role === 'BusinessMan') {
          setShowPostIdea(true);
        } else if (role === 'Investor') {
          setShowYourProposals(true);
        }
        break;
      case '5':
        if (role === 'User') {
          setShowProfile(true);
        } else if (role === 'Banker') {
          setShowProfile(true);
        } else if (role === 'BusinessMan') {
          setShowAskQuery(true);
        } else if (role === 'Investor') {
          setShowAskQuery(true);
        }
        break;
      case '6':
        if (role === 'BusinessMan') {
          setShowYourSolutions(true);
        } else if (role === 'Investor') {
          setShowYourSolutions(true);
        }
        break;
      case '7':
        if (role === 'BusinessMan') {
          setShowProfile(true);
        } else if (role === 'Investor') {
          setShowProfile(true);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
        const data = await response.json();
        if (data.length > 0) {
          const { email, imageData, name, _id } = data[0];

          setName(name);
          setEmail(email);
          setImageBase64(imageData);
          setId(_id);
        }
      } catch (error) {
        message.error('Failed to fetch profile data');
      }
    };
    fetchProfile();

    // Set the initial content based on the role
    switch (role) {
      case 'User':
        setShowIdeas(true);
        break;
      case 'Banker':
        setShowLoans(true);
        break;
      case 'BusinessMan':
        setShowIdeas(true);
        break;
      case 'BusinessAdvisor':
        setShowViewQueries(true);
        break;
      case 'Investor':
        setShowIdeas(true);
        break;
      default:
        break;
    }
  }, [role]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar
        role={role}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        handleMenuItemClick={handleMenuItemClick}
      />
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, margin: '5px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ marginLeft: '10px' }}>
              <Space direction="vertical" size={16}>
                <Space wrap size={16}>
                  <Avatar size="large" icon={<UserOutlined />} src={imageBase64} />
                  <p className="mailandtype">{email}/{role}</p>
                </Space>
              </Space>
            </div>
            <div style={{ marginRight: '10px' }}>
              <Logout />
            </div>
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          {showIdeas && <Ideas role={role} email={email} />}
          {showPostLoanOffer && <PostLoan />}
          {showPostIdea && <PostIdea role={role} />}
          {showLoans && <Loans role={role} email={email} />}
          {showAskQuery && <AskQuery />}
          {showProfile && <Profile userName={name} image={imageBase64} />}
          {showViewQueries && <Query />}
          {showIntrested && <Intrested id={id} />}
          {showYourSolutions && <Solutions role={role} id={id} />}
          {showPostProposals && <PostProposal />}
          {showYourProposals && <Proposals role={role} email={email} />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
