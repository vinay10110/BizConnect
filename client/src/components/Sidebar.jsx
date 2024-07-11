/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import {
  FileOutlined,
  FileTextOutlined,
  UserOutlined,
  FileAddOutlined,
  SolutionOutlined,
  QuestionOutlined,
  FileMarkdownOutlined,
  MoneyCollectOutlined,
  DollarOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const menuItemsByRole = {
  User: [
    getItem('view business Ideas', '1', <FileOutlined />),
    getItem('view loans', '2', <MoneyCollectOutlined />),
    getItem('Ask query', '3', <QuestionOutlined />),
    getItem('Show Solutions', '4', <SolutionOutlined />),
    getItem('Profile', '5', <UserOutlined />),
  ],
  Banker: [
    getItem('view loans', '1', <MoneyCollectOutlined />),
    getItem('Post loan offer', '2', <FileOutlined />),
    getItem('view proposals', '3', <DollarOutlined />),
    getItem('Interested users', '4', <FileMarkdownOutlined />),
    getItem('Profile', '5', <UserOutlined />),
  ],
  BusinessMan: [
    getItem('Your Ideas', '1', <FileOutlined />),
    getItem('view loans', '2', <MoneyCollectOutlined />),
    getItem('view proposals', '3', <DollarOutlined />),
    getItem('Post Idea', '4', <FileAddOutlined />),
    getItem('Ask query', '5', <QuestionOutlined />),
    getItem('View Solutions', '6', <SolutionOutlined />),
    getItem('Profile', '7', <UserOutlined />),
  ],
  BusinessAdvisor: [
    getItem('View Queries', '1', <FileTextOutlined />),
    getItem('View solutions', '2', <SolutionOutlined />),
    getItem('Profile', '3', <UserOutlined />),
  ],
  Investor: [
    getItem('view business Ideas', '1', <FileOutlined />),
    getItem('view loans', '2', <MoneyCollectOutlined />),
    getItem('Post proposals', '3', <FileAddOutlined />),
    getItem('view proposals', '4', <DollarOutlined />),
    getItem('Ask query', '5', <QuestionOutlined />),
    getItem('View Solutions', '6', <SolutionOutlined />),
    getItem('Profile', '7', <UserOutlined />),
  ],
};

const Sidebar = ({ role, collapsed, setCollapsed, handleMenuItemClick }) => {
  const items = menuItemsByRole[role] || [];
  const [isMobile, setIsMobile] = useState(false);
   const [collapsible,setsetCollapsible]=useState(true);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setsetCollapsible(false);
      setCollapsed(true);
    }
    if(!isMobile){
setsetCollapsible(true);
    }
  }, [isMobile, setCollapsed]);

  return (
    <Sider collapsible={collapsible} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div className="demo-logo-vertical" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={handleMenuItemClick}>
        {items.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
