import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './components/Dashboard';
import PostLoan from './pages/PostLoan';
import PostIdea from './pages/PostIdea';
import Landing from './pages/Landing';
function App() {
  

  return (
    <>
  
     <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Dashboard/:role' element={<Dashboard />} />
        <Route path='/PostLoan' element={<PostLoan />} />
        <Route path='/PostIdea' element={<PostIdea />} />
       
       
      </Routes>
    </Router>
    </>
   
  )
}

export default App
