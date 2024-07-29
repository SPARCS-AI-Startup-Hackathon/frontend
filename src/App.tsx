import MainPage from '@pages/MainPage'
import OnBoardPage from '@pages/OnBoardPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OnBoardPage />}></Route>
          <Route path="/main" element={<MainPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
