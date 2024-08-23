import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('');

  const handleClick = () => {
    fetch('http://127.0.0.1:8000/')
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('Error fetching data:', error))
  }

  return (
    <>
      <h1>API Fetch Test</h1>
      <div className="card">
        <p>
          {message}
        </p>
        <button onClick={handleClick}>
          Fetch Message
        </button>
      </div>
    </>
  )
}

export default App
