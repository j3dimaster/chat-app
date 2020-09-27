import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import shortid from 'shortid'
import PropTypes from 'prop-types'
import Message from '../Message'

import './index.css'

const Messages = ({ messages, name }) => {
  if (!messages) return null
  return (
    <ScrollToBottom>
      {messages.map((message) => (
        <div key={shortid.generate()}>
          <Message
            message={message}
            name={name}
          />
        </div>
      ))}
    </ScrollToBottom>
  )
}

Messages.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ),
}

export default Messages
