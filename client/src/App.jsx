import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './components/Dashboard';
import PostLoan from './pages/PostLoan';
import PostIdea from './pages/PostIdea';
import Landing from './pages/Landing';
import { UserContextProvider } from './components/UserContext';
import LoadingScreen from './components/LoadingScreen';
import { checkBackendConnection } from './utils/backendCheck';
function App() {
  const [isBackendReady, setIsBackendReady] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);

  useEffect(() => {
    const initializeApp = async () => {
      const result = await checkBackendConnection();
      setConnectionStatus(result);
      
      if (result.connected) {
        setIsBackendReady(true);
      } else {
        // If connection fails, still allow app to load after showing the loading screen
        setTimeout(() => {
          setIsBackendReady(true);
        }, 5000);
      }
    };

    initializeApp();
  }, []);

  if (!isBackendReady) {
    return (
      <LoadingScreen 
        onConnectionReady={() => setIsBackendReady(true)}
        connectionStatus={connectionStatus}
      />
    );
  }

  return (
    <>
      <UserContextProvider>
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
      </UserContextProvider>
    </>
  )
}

export default App
