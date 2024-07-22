/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState,useContext } from 'react';
import { Layout, theme, Space, Avatar,Button } from 'antd';
import { UserOutlined,MenuFoldOutlined,MenuUnfoldOutlined, } from '@ant-design/icons';
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
import { UserContext } from './UserContext';
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
  const { role } = useParams();
  const [collapsed, setCollapsed] = useState(false);
  const [collapsible,setCollapsible]=useState(true);
  const token = localStorage.getItem('token');
  const {setUserInfo,userInfo}=useContext(UserContext);
  const [isMobile,setIsMobile]=useState(false);
  const [hidden,setHidden]=useState(false);
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
    fetch(`${import.meta.env.VITE_API_URL}/user/profile`,{
      headers:{
        'content-type':'application/json',
        'Authorization':`${token}`
      }
    })
    .then(res=>res.json())
    .then(data=>setUserInfo(data[0]));
   
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      if (isMobileView) {
        setCollapsible(false);
        setCollapsed(true);
      } else {
        setCollapsible(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
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
    return () => window.removeEventListener('resize', handleResize);
  }, [token,role,setUserInfo]);
  return (
    <Layout style={{ minHeight: '100vh' }} hasSider>
      <Sidebar
        role={role}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        handleMenuItemClick={handleMenuItemClick}
        hidden={hidden}
        collapsible={collapsible}
      />
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div style={{ display: 'flex', justifyContent: 'space-between',height:'60px' }}>
            <div style={{ marginLeft: '5px'}}>
              {
                isMobile && <Button
                type="text"
                icon={hidden ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setHidden(!hidden)}
              
              />
              }
            <Space direction="vertical" size={16}>
    <Space wrap size={16}>
      <Avatar size="large" icon={<UserOutlined />} src={userInfo.imageData}/>
     <span>{userInfo.name}/{userInfo.type}</span> 
      </Space>
    </Space>
            </div>
            <div style={{ marginRight: '10px' }}>
              <Logout />
            </div>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          {showIdeas && <Ideas  />}
          {showPostLoanOffer && <PostLoan />}
          {showPostIdea && <PostIdea  />}
          {showLoans && <Loans   />}
          {showAskQuery && <AskQuery />}
          {showProfile && <Profile   />}
          {showViewQueries && <Query />}
          {showIntrested && <Intrested />}
          {showYourSolutions && <Solutions  />}
          {showPostProposals && <PostProposal />}
          {showYourProposals && <Proposals   />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
