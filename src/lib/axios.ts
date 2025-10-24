import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://entvy-blog.onrender.com/api', // Spring Boot API 주소
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // 쿠키 인증이 필요하면 true
})

export default instance;