import axios from "axios";

const SERVER_URI = "http://localhost:5002"

export const LoginAPI = async (userId, password) => {
  const data = {
    userId: userId,
    password: password
  }
  return data;
  // }
  // try {
  //   const response = await axios.post(SERVER_URI + '/api/login', data);
  //   console.log(response.data);
  //   return response.data;
  // } catch (error) {
  //   console.error('Error during login:', error);
  //   throw error;
  // }
}
