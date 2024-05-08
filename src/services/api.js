import axios from "axios";
import qs from "qs";
import { GetTokenFromCookie } from "../Auth/token";
const SERVER_URI = `${process.env.REACT_APP_SERVER}`;

const CheckUser = async () => {
  const token = GetTokenFromCookie("token");
  console.log(SERVER_URI);
  return await axios.get(`${SERVER_URI}/api/check`, {
    headers: {
      'Authorization': `${token}`
    }
  })
    .then(response => {
      return { result: "success" };
    })
    .catch(error => {
      return { result: "fail" }
    })
}


const LoginAPI = async (userId, password) => {
  const data = {
    username: userId,
    password: password
  }
  console.log(SERVER_URI);
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

  return await axios.post(SERVER_URI + '/join', data)
    .then(response => {
      return { result: "success" }
    })
    .catch(error => {
      console.log("회원가입 실패 ", error.response.status, error.response.data)
      return { result: "fail" }
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
  const token = GetTokenFromCookie("token");
  try {
    const response = await axios.get(`${SERVER_URI}/api/path?start=${start}&goal=${end}&option=trafast`, {
      headers: {
        'Authorization': `${token}`
      }
    })

    // console.log(response.data);
    return { result: "success", return: response.data }
  } catch (error) {
    console.error('Error fetching directions:', error);
    return { result: "fail" }
  }
};

const GetEduInfo = async () => {
  const token = GetTokenFromCookie("token");
  try {
    const response = await axios.get(`${SERVER_URI}/api/edu`, {
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
}

const GetCustomJobs = async () => {
  const token = GetTokenFromCookie("token");
  try {
    const response = await axios.get(`${SERVER_URI}/api/jobs/custom`, {
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
}




export { CheckUser, GetCustomJobs, GetEduInfo, GetPostingByDistance, LoginAPI, GetPosting, GetOnePosting, GetRoute, OpenHomepageAPI, JoinAPI }
