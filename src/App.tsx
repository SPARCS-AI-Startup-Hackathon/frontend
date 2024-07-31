import LoginPage from '@pages/LoginPage'
import MainPage from '@pages/MainPage'
import OnBoardPage from '@pages/OnBoardPage'
import RegisterPage from '@pages/RegisterPage'
import TalkPage from '@pages/TalkPage'
import TalkStartPage from '@pages/TalkStartPage'
import TestPage from '@pages/TestPage'
import WelcomePage from '@pages/WelcomePage'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CheckVisited />
        <Routes>
          <Route path="/" element={<OnBoardPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/talk" element={<TalkPage />} />
          <Route path="/talk_start" element={<TalkStartPage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

function CheckVisited() {
  const navigate = useNavigate()

  useEffect(() => {
    const isVisited = localStorage.getItem('isVisited') === 'true'
    if (isVisited) {
      navigate('/welcome')
    }
  }, [navigate])

  return null
}

export default App
