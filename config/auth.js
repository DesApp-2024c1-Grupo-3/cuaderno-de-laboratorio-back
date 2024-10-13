const getToken = async (username, password) => {
  const clientId = 'cuaderno-de-lab-swagger'; 
  const clientSecret = 'ukzOgRWtQkyy53pa58thHFHOyojADCR6'; 

  try {
    const response = await fetch('http://localhost:8080/auth/realms/cuaderno-de-lab/protocol/openid-connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'client_id': clientId,
        'client_secret': clientSecret,
        'username': username,
        'password': password,
        'grant_type': 'password',
        'scope': 'openid',
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const token = data.access_token;
    localStorage.setItem('jwt', token); // Guardo el token en localStorage
    return token; 
  } catch (error) {
    console.error('Error:', error);
    throw error; 
  }
};

export default getToken;