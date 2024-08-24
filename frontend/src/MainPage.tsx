import { useState } from 'react'
import { useParams } from 'react-router-dom';

const MainPage = () => {
    const params = useParams<{ hash?: string}>()

    const [response, setResponse] = useState('');

    const hash = params.hash

    const handleClick = () => {
        const requestData = {
            snippet: "Example Snippet",
            expiration_stat: "eternal"
        }

    fetch('http://127.0.0.1:8000/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
        .then(response => response.json())
        .then(data => {
            setResponse(data)
        })
        .catch(error => console.error('Error fetching data:', error))
    }

    return (
        <>
            <h1>Main Page</h1>
            <div>
                {hash ? (
                    <p>Hash detected: {hash}</p>
                ) : (
                    <p>No hash detected in the URL.</p>
                )}
            </div>
            <div className="card">
            <p>
                {response ? `Response: ${response.url}` : "No response yet"}
            </p>
            <button onClick={handleClick}>
                Fetch Message
            </button>
            </div>
        </>
    )
}

export default MainPage