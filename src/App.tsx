import LoginPage from '@pages/LoginPage'
import MainPage from '@pages/MainPage'
import OnBoardPage from '@pages/OnBoardPage'
import RegisterPage from '@pages/RegisterPage'
import TalkPage from '@pages/TalkPage'
import TalkRecommendPage from '@pages/TalkRecommendPage'
import TalkResumePage from '@pages/TalkResumePage'
import TalkStartPage from '@pages/TalkStartPage'
import TestPage from '@pages/TestPage'
import WelcomePage from '@pages/WelcomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OnBoardPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/talk" element={<TalkPage />} />
          <Route path="/talk_start" element={<TalkStartPage />} />
          <Route path="/talk_recommend" element={<TalkRecommendPage />} />
          <Route path="/talk_resume" element={<TalkResumePage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
