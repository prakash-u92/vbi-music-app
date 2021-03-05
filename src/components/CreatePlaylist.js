import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'semantic-ui-react';

const CreatePlaylist = ({ params }) => {
  const { handleHide, show, create } = params;

  const [error, onChangeValue] = useState('');
  const [playlistName, updateName] = useState('');
  const handleChange = (e, { value }) => {
    updateName(value);
    if (!value) {
      onChangeValue('Playlist name cannot be empty');
    } else {
      onChangeValue('');
    }
  };
  const handleSubmit = () => {
    if (playlistName) {
      create(playlistName.trim());
      updateName('');
      onChangeValue('');
    } else {
      onChangeValue('Playlist name cannot be empty');
    }
  };

  const close = () => {
    updateName('');
    handleHide();
    onChangeValue('');
  };

  return (
    <Modal
      open={show}
      size={'tiny'}
      onClose={close}
    >
      <Modal.Header>Create Playlist</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <Form.Input
              name='name'
              value={playlistName}
              placeholder='Playlist'
              onChange={handleChange}
            />
            <span className="error">{error}</span>
          </Form.Field>
          <Button type='submit' onClick={handleSubmit}>Create</Button>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={close}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export { CreatePlaylist }

CreatePlaylist.propTypes = {
  params: PropTypes.oneOfType([
    PropTypes.object
  ])
};