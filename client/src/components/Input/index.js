import React from 'react'
import './index.css'

const Input = ({ message, setMessage, sendMessage }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message"
      value={message}
      onChange={(e) => setMessage(e.currentTarget.value)}
      onKeyPress={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
    />

    <button type="submit" className="sendButton" onClick={(e) => sendMessage(e)}>
      Send
    </button>
  </form>
)

export default Input
