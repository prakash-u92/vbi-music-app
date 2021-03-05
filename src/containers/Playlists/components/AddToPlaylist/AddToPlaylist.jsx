import React, { useState } from 'react';
import { Modal, Input, Button, Checkbox, List, Dimmer, Loader } from 'semantic-ui-react';
import {
  SearchContainer,
  ResultContainer
} from './styled';

const AddToPlaylist = ({ params }) => {
  const { handleHide, show, songs, addToPlaylist } = params;

  const [inputText, onChangeInput] = useState('');
  const [showLoader, toggleLoader] = useState(false);
  const [selectedCheckboxes, updateCheckBoxes] = useState({});
  const [allSongs, updateFilteredSongs] = useState(songs ? songs.slice(0, 20) : []);

  const close = () => {
    handleHide(false);
    onChangeInput('');
  };

  const searchSong = text => {
    if (text) {
      const filtered = songs.filter(song => song.title.indexOf(text) !== -1);
      updateFilteredSongs(filtered.slice(0, 50));
      toggleLoader(false);
    } else {
      updateFilteredSongs(songs.slice(0, 20));
      toggleLoader(false);
    }
  };

  const onInputChange = evt => {
    toggleLoader(true);
    let text = evt.target.value;
    text = text ? text.trim() : text;
    onChangeInput(text);
    searchSong(text);
  };

  const toggleCheckbox = evt => {
    const songId = evt.target.id;
    const checked = evt.target.checked;
    if (checked) {
      updateCheckBoxes({ ...selectedCheckboxes, [songId]: songId });
    } else {
      delete selectedCheckboxes[songId];
      updateCheckBoxes({ ...selectedCheckboxes });
    }
  };

  return (
    <Modal
      closeIcon
      open={show}
      size={'large'}
      onClose={close}
      centered={false}
    >
      <Modal.Header>
        <SearchContainer>
          <Input
            style={{
              height: '100%'
            }}
            fluid
            icon='search'
            value={inputText}
            placeholder='Search...'
            onChange={onInputChange}
          />
        </SearchContainer>
      </Modal.Header>
      <Modal.Content scrolling>
        <ResultContainer>
          <List>
            {allSongs.map(song => (
              <List.Item key={song.id} style={{ padding: '6px 0' }}>
                <Checkbox
                  style={{
                    fontSize: '16px'
                  }}
                  id={song.id}
                  label={song.title}
                  onChange={toggleCheckbox}
                  checked={selectedCheckboxes[song.id] !== undefined}
                />
              </List.Item>
            ))}
          </List>
        </ResultContainer>
        <Dimmer active={showLoader}>
          <Loader content='Searching...' />
        </Dimmer>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={close}>
          Close
        </Button>
        <Button onClick={() => addToPlaylist(selectedCheckboxes)} positive>
          Add
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export { AddToPlaylist }