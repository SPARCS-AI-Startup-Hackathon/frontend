import LoginPage from '@pages/LoginPage'
import MainPage from '@pages/MainPage'
import OnBoardPage from '@pages/OnBoardPage'
import RegisterPage from '@pages/RegisterPage'
import TalkPage from '@pages/TalkPage'
import TalkStartPage from '@pages/TalkStartPage'
import TestPage from '@pages/TestPage'
import WelcomePage from '@pages/WelcomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OnBoardPage />}></Route>
          <Route path="/welcome" element={<WelcomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/main" element={<MainPage />}></Route>
          <Route path="/talk" element={<TalkPage />}></Route>
          <Route path="/talk_start" element={<TalkStartPage />}></Route>
          <Route path="/test" element={<TestPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
