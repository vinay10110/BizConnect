import { message } from 'antd';

// Check if token is expired and handle redirect
export const handleTokenExpiration = (response, errorData) => {
  if (response.status === 401 && (errorData.code === 'TOKEN_EXPIRED' || errorData.message?.includes('expired'))) {
    message.error('Token session expired. Please login again.');
    localStorage.removeItem('token');
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
    return true;
  }
  return false;
};

// Generic API call wrapper with token expiration handling
export const apiCallWithTokenCheck = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorData = await response.json();
      
      // Handle token expiration
      if (handleTokenExpiration(response, errorData)) {
        throw new Error('TOKEN_EXPIRED');
      }
      
      throw new Error(errorData.message || 'API call failed');
    }
    
    return response;
  } catch (error) {
    if (error.message === 'TOKEN_EXPIRED') {
      throw error;
    }
    throw new Error('Network error or server unavailable');
  }
};
