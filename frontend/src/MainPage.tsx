import { useState } from 'react'
import { useParams } from 'react-router-dom';

const MainPage = () => {
    const [response, setResponse] = useState('');
    // URLパラメータからハッシュ値を取得
    const params = useParams<{ hash?: string}>()
    const hash = params.hash

    const handleClick = () => {
        // todo: 画面ができたら、画面からデータを受け渡すこと
        const requestData = {
            snippet: "Example Snippet",
            expiration_stat: "eternal"
        }

    fetch('http://127.0.0.1:8000/register', {
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