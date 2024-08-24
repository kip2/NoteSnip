import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import MainPage from './MainPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/:hash" element={<MainPage />} />
      </Routes>
    </Router>
  )
}

export default App
