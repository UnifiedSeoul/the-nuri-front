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

const JoinAPI = async (username, password, experiences) => {
  console.log(experiences);
  const data = {
    username: username,
    password: password,
    userJobInfoList: experiences
  }
  console.log(JSON.stringify(data))
  return await axios.post(SERVER_URI + '/join', JSON.stringify(data))
  .then(response => {
    return { result: "success" }
  })
  .catch(error => {
    console.log("회원가입 실패 ", error.response.status, error.response.data)
    return { result: "fail" }
  })
}

const GetPosting = async (page) => {

  const token = GetTokenFromCookie("token");

  return await axios.get(`${SERVER_URI}/api/jobs?page=${page}`, {
    headers: {
      'Authorization': `${token}`
    }
  })
    .then(response => {

      return { result: "success", return: response.data };
    })
    .catch(error => {
      return { result: "fail" }
    })
}


const GetRoute = async (start, end) => {
  // console.log(start, end);
  // try {
  //   const response = await axios.get('http://localhost:8000/maps-data', {
  //     params: {
  //       start: start,
  //       end: end
  //     },
  //     // headers: {
  //     //   // 추가  
  //     //   "Access-Control-Allow-Origin": `http://localhost:3000`,
  //     //   'Access-Control-Allow-Credentials': "true",
  //     // }
  //   });
  //   // console.log(response.data); // 백엔드에서 받은 데이터를 처리
  //   return { result: "success", return: response.data }
  // } catch (error) {
  //   console.error('Error fetching data from backend:', error);
  //   return { result: "fail" }
  // }
  //   trafast	실시간 빠른길
  // tracomfort	실시간 편한길
  // traoptimal	실시간 최적
  // traavoidtoll	무료 우선
  // traavoidcaronly	자동차 전용도로 회피 우선
  // console.log(process.env.REACT_APP_MAP_CLIENT_ID, process.env.REACT_APP_MAP_CLIENT_SECRET);
  console.log(start, end);
  const token = GetTokenFromCookie("token");
  try {
    const response = await axios.get(`${SERVER_URI}/api/path?start=${start}&goal=${end}&option=trafast`, {
      headers: {
        'Authorization': `${token}`
      }
    })

    console.log(response.data); // 여기서 응답 데이터를 처리합니다.
    return { result: "success", return: response.data }
  } catch (error) {
    console.error('Error fetching directions:', error);
    return { result: "fail" }
  }
};




export { LoginAPI, JoinAPI, GetPosting, GetRoute }
