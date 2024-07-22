import {useNavigate} from 'react-router-dom';
import { Button,Modal } from 'antd';
import{useState} from 'react';
const Logout=()=>{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history=useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    localStorage.clear();
    history('/');
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return(
    <>
    <Button onClick={showModal}danger ghost>Logout</Button>
    <Modal title="Are you sure you want to logout?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Logout" okType='danger'>

    </Modal>
    </>
    
  )
}
export default Logout;