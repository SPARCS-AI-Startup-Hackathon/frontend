import LoginPage from '@pages/LoginPage'
import MainPage from '@pages/MainPage'
import OnBoardPage from '@pages/OnBoardPage'
import RegisterPage from '@pages/RegisterPage'
import TestPage from '@pages/TestPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OnBoardPage />}></Route>
          <Route path="/main" element={<MainPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/test" element={<TestPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
