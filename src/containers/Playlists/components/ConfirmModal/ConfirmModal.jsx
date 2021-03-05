import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

const ConfirmModal = ({ close, open, deletePlaylist }) => {
  return(
    <Modal
      open={open}
      size={'mini'}
      onClose={close}
    >
      <Modal.Header>Confirm Delete Playlist</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to delete the playlist?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={close}>
          No
        </Button>
        <Button positive onClick={deletePlaylist}>
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export { ConfirmModal };
