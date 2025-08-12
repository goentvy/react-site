import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './components/Login'
import Home from './components/Home'
import Fetch from './components/Fetch'
import Width from './components/Width'
import './App.css'

function App() {

  return (
    <>
      <h1>과제방</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/react-site/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="fetch" element={<Fetch />} />
            <Route path="width" element={<Width />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
