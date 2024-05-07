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

// 페이지 단위로 포스팅 가져옴
const GetPosting = async (page) => {
  const token = GetTokenFromCookie("token");

  return await axios.get(`${SERVER_URI}/api/jobs?page=${page}`, {
    headers: {
      'Authorization': `${token}`
    }
  })
    .then(response => {
      console.log("posting", response.data);
      return { result: "success", return: response.data };
    })
    .catch(error => {
      return { result: "fail" }
    })
}

// 한 포스팅 내용만 가져옴
const GetOnePosting = async (jobId) => {
  const token = GetTokenFromCookie("token");
  return await axios.get(`${SERVER_URI}/api/job/${jobId}`, {
    headers: {
      'Authorization': `${token}`
    }
  })
    .then(response => {
      console.log("posting", response.data);
      return { result: "success", return: response.data };
    })
    .catch(error => {
      return { result: "fail" }
    })
}

// 홈페이지 조회 1 높임
const OpenHomepageAPI = async (jobId) => {
  const token = GetTokenFromCookie("token");
  return await axios.get(`${SERVER_URI}/api/job/${jobId}/homepage`, {
    headers: {
      'Authorization': `${token}`
    }
  })
    .then(response => {
      console.log("homepage", response.data);
      return { result: "success", return: response.data };
    })
    .catch(error => {
      return { result: "fail" }
    })
}

const GetPostingByDistance = async (x, y) => {
  console.log(x, y);
  const token = GetTokenFromCookie("token");
  return await axios.get(`${SERVER_URI}/api/job?x=${x}&y=${y}&distance=50`, {
    headers: {
      'Authorization': `${token}`
    }
  })
    .then(response => {
      console.log("homepage", response.data);
      return { result: "success", return: response.data };
    })
    .catch(error => {
      return { result: "fail" }
    })
}


const GetRoute = async (start, end) => {
  //   trafast	실시간 빠른길
  // tracomfort	실시간 편한길
  // traoptimal	실시간 최적
  // traavoidtoll	무료 우선
  // traavoidcaronly	자동차 전용도로 회피 우선
  // console.log(process.env.REACT_APP_MAP_CLIENT_ID, process.env.REACT_APP_MAP_CLIENT_SECRET);
  const token = GetTokenFromCookie("token");
  try {
    const response = await axios.get(`${SERVER_URI}/api/path?start=${start}&goal=${end}&option=trafast`, {
      headers: {
        'Authorization': `${token}`
      }
    })

    console.log(response.data);
    return { result: "success", return: response.data }
  } catch (error) {
    console.error('Error fetching directions:', error);
    return { result: "fail" }
  }
};




export { GetPostingByDistance, LoginAPI, GetPosting, GetOnePosting, GetRoute, OpenHomepageAPI }
