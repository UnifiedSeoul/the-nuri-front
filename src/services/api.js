import axios from "axios";
import qs from "qs";
const SERVER_URI = "http://localhost:8080"

export const LoginAPI = async (userId, password) => {
  const data = {
    username: userId,
    password: password
  }

  try {
    const response = await axios.post(SERVER_URI + '/login', qs.stringify(data));
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}
