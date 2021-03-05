import React, { useState } from 'react';
import { Modal, Input, Button, Checkbox, List } from 'semantic-ui-react';
import {
  SearchContainer,
  ResultContainer
} from './styled';

const AddToPlaylist = ({ params }) => {
  const { handleHide, show, songs, addToPlaylist } = params;

  const [inputText, onChangeInput] = useState('');
  const [selectedCheckboxes, updateCheckBoxes] = useState({});
  const [allSongs, updateFilteredSongs] = useState(songs ? songs.slice(0, 25) : []);

  const close = () => handleHide(false);

  const searchSong = text => {
    if (text) {
      const filtered = songs.filter(song => song.title.indexOf(text) !== -1);
      updateFilteredSongs(filtered.slice(0, 50));
    } else {
      updateFilteredSongs(songs.slice(0, 25));
    }
  };

  const onInputChange = evt => {
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
          {allSongs.length > 0 &&
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
          }
          {allSongs.length === 0 &&
            <p className="text-center font-18" style={{ marginLeft: '-20%' }}>No songs found</p>
          }
        </ResultContainer>
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