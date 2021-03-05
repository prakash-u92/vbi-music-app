import React from 'react'
import {
  Header,
  Button,
  Segment,
  TransitionablePortal
} from 'semantic-ui-react';

const messageTypes = {
  error: 'red',
  info: 'blue',
  warn: 'yellow',
  success: 'blue'
};

const Alert = ({ params }) => {
  let { message } = params;
  const { show, close, label, type } = params;
  if (typeof message !== 'string') {
    message = "Error message couldn't be handled";
  }

  return (
    <TransitionablePortal
      open={show}
      onClose={close}
      transition={{
        duration: 300,
        animation: 'zoom'
      }}
    >
      <Segment
        style={{
          top: '30%',
          left: '30%',
          zIndex: 11000,
          width: '400px',
          position: 'fixed'
        }}
      >
        <Header>Message:</Header>
        <p>{message}</p>
        <Button
          basic
          onClick={close}
          content={label || 'Close'}
          color={messageTypes[type] || messageTypes.error}
        />
      </Segment>
    </TransitionablePortal>
  );
};

export { Alert };