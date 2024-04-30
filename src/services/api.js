import axios from "axios";
import qs from "qs";
import { GetTokenFromCookie } from "../Auth/token";
const SERVER_URI = "http://localhost:8080"


const LoginAPI = async (userId, password) => {
  const data = {
    username: userId,
    password: password
  }

  return await axios.post(SERVER_URI + '/login', qs.stringify(data))
    .then(response => {

      return { result: "success", return: response.headers.authorization }
    })
    .catch(error => {
      if (error.response.status === 401) {
        console.log("아이디와 비밀번호를 다시 입력하세요.")
        return { result: "fail", return: "401" }
      }
    })
}

const AllPosting = async (requiredPostings, totalRecivedPostings) => {

  const token = GetTokenFromCookie("token");
  console.log(token)


  return await axios.get(SERVER_URI + '/jobs', {
    headers: {
      'Authorization': `${token}`
    }
  })
    .then(response => {
      console.log(response.data)
      return { result: "success", return: response.data };
    })
    .catch(error => {
      return { result: "fail" }
    })
}


export { LoginAPI, AllPosting }
