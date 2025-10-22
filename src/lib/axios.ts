import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8090/api', // Spring Boot API 주소
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // 쿠키 인증이 필요하면 true
})

export default instance;