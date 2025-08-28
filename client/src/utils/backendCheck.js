// Backend connectivity check utility
export const checkBackendConnection = async (maxRetries = 10, retryDelay = 3000) => {
  const backendUrl = import.meta.env.VITE_API_URL;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`${backendUrl}/user/health`, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok || response.status === 404) {
        // Backend is responding (even if endpoint doesn't exist)
        return { connected: true, attempts: attempt };
      }
      
      throw new Error(`HTTP ${response.status}`);
      
    } catch (error) {
      console.log(`Backend connection attempt ${attempt}/${maxRetries} failed:`, error.message);
      
      if (attempt === maxRetries) {
        return { 
          connected: false, 
          attempts: attempt, 
          error: error.message 
        };
      }
      
      // Wait before next attempt
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
  
  return { connected: false, attempts: maxRetries };
};
