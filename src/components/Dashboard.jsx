import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [typingData, setTypingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://api.monkeytype.com/leaderboards/rank', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.data && response.data.data) {
        setTypingData(response.data.data);
        setLoading(false);
      } else {
        setError('No data found');
        setLoading(false);
      }
    })
    .catch(error => {
      console.error('Error fetching the typing data:', error);
      setError('Error loading data');
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Top Typing Speed Typers</h1>
        <ul>
          {typingData.map((typer, index) => (
            <li key={index} className="mb-4 p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{typer.username}</h2>
                  <p className="text-gray-600">Rank: {typer.rank}</p>
                  <p className="text-gray-600">Speed: {typer.speed} WPM</p>
                  <p className="text-gray-600">Accuracy: {typer.accuracy}%</p>
                  <p className="text-gray-600">Language: {typer.language}</p>
                  <p className="text-gray-600">Difficulty: {typer.difficulty}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
