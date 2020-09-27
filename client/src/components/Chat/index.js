
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import InfoBar from '../InfoBar'
import Input from '../Input'
import Messages from '../Messages'

import './index.css'

let socket

const Chat = ({ location }) => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const ENDPOINT = 'localhost:5000'

  useEffect(() => {
    const data = queryString.parse(location.search)
    socket = io(ENDPOINT)

    setName(data.name)
    setRoom(data.room)
    // when component will mount, we want to emit a custom event
    socket.emit('join', { name: data.name, room: data.room }, () => {

    })
    // clean effect on component unmount
    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  }, [location.search, ENDPOINT])

  // listen for server socket io message
  useEffect(() => {
    socket.on('message', (message) => { // 2nd parameter is the object sent by the server
      // replace the messages initial state with the message sent by server
      setMessages([...messages, message])
    })
  }, [messages]) // when messages state change, re-run this effect

  /**
   * Send message using socket emit method
   *
   * @param {Object} e event object
   */
  const sendMessage = (e) => {
    e.preventDefault()

    if (message) {
      // emit an event, with object data and use call back method to clear message input state
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }
  console.log(message, messages)
  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  )
}

Chat.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
}

export default Chat
