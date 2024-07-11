import {useNavigate} from 'react-router-dom';
import { Button } from 'antd';
const Logout=()=>{
  const history=useNavigate();
  function handleLogout(){
    localStorage.clear();
    history('/');
  }

  return(
    <Button onClick={handleLogout}danger ghost>Logout</Button>
  )
}
export default Logout;