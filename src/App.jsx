import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './components/Login'
import Home from './components/Home'
import './App.css'

function App() {

  return (
    <>
      <h1>과제방</h1>
      <BrowserRouter>
        <Layout />
        <Routes>
          <Route path="/react-site/" element={<Home />} />
          <Route path="/react-site/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
