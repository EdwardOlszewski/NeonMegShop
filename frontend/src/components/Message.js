// Dependencies
import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
  return <Alert style={{ backgroundColor: 'purple' }}>{children}</Alert>
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
