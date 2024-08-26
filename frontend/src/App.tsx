import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import MainPage from './MainPage'


const App = () => {
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
