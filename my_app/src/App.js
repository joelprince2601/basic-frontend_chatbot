import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleClick = async () => {
    if (message.toLowerCase() === 'hi') {
      try {
        await axios.post('http://localhost:8080/send-message', { message: 'hi' });
        const response = await axios.get('http://localhost:8080/stream-messages');
        const textData = response.data.trim();
        animateText(textData);
      } catch (error) {
        console.error('Error fetching the text:', error);
      }
    } else {
      console.log('Message must be "hi" to send.');
    }
  };

  const animateText = (textData) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= textData.length) {
        setText(textData.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
  };

  return (
    <div className="App">
      <input type="text" value={message} onChange={handleMessageChange} placeholder="Enter message" />
      <textarea value={text} readOnly />
      <button onClick={handleClick}>Fetch Text</button>
    </div>
  );
}

export default App;
