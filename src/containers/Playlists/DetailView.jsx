import React, { Fragment, useState } from 'react';
import { Item, Image, Icon } from 'semantic-ui-react';
import {
  Prev,
  Title,
  Detail,
  Thumbnail,
  PlaylistTitle,
  PlaylistSongs,
  PlaylistDetail
} from './styled';
import { ConfirmModal } from './components/ConfirmModal/ConfirmModal';
import { AddToPlaylist } from './components/AddToPlaylist/AddToPlaylist';

const DetailView = ({ playlist, closePlaylist }) => {
  let filteredSongs = [];
  const playlistSongs = playlist.songs.map(song => song.id);
  let allSongs = localStorage.getItem('songs');
  if (allSongs) {
    allSongs = JSON.parse(allSongs);
    filteredSongs = allSongs.filter(song => playlistSongs.indexOf(song.id) === -1);
  }
  const [refresh, refreshUI] = useState('');
  const [showConfirm, toggleConfirm] = useState(false);
  const [showAddToPlaylist, handlePlaylistModal] = useState(false);

  const updatePlaylistSongs = () => {
    let allPlaylists = localStorage.getItem('playlists');
    if (allPlaylists) {
      allPlaylists = JSON.parse(allPlaylists);
      const matchingIndex = allPlaylists.findIndex(_playlist => _playlist.id === playlist.id);
      if (matchingIndex !== -1) {
        allPlaylists[matchingIndex] = playlist;
        localStorage.setItem('playlists', JSON.stringify(allPlaylists));
        refreshUI(Math.random());
      }
    }
  };

  const closeConfirm = () => toggleConfirm(false);

  const deletePlaylist = () => {
    let allPlaylists = localStorage.getItem('playlists');
    if (allPlaylists) {
      allPlaylists = JSON.parse(allPlaylists);
      const matchingIndex = allPlaylists.findIndex(_playlist => _playlist.id === playlist.id);
      if (matchingIndex !== -1) {
        allPlaylists.splice(matchingIndex, 1);
        localStorage.setItem('playlists', JSON.stringify(allPlaylists));
        closePlaylist();
      }
    }
  };

  const shuffle = () => {
    playlist.songs = playlist.songs.sort(() => Math.random() - 0.5);
    updatePlaylistSongs();
  };

  const addToPlaylist = songRefs => {
    const selectedSongs = Object.keys(songRefs).map(id => parseInt(id, 10));
    handlePlaylistModal(false);
    if (selectedSongs && selectedSongs.length) {
      const filtered = allSongs.filter(song => selectedSongs.indexOf(song.id) !== -1);
      filtered.forEach(song => {
        song.addedAt = new Date().getTime();
      });
      playlist.songs = playlist.songs.concat(filtered);
      playlist.songs = playlist.songs.sort((song1, song2) => (song2.addedAt - song1.addedAt));
      updatePlaylistSongs();
    }
  };

  const formatDate = createdDate => {
    let formatedDate = '';
    if (createdDate) {
      const date = new Date(createdDate);
      formatedDate = `${date.toDateString()} ${date.getHours()}:${date.getMinutes()}`;
    }
    return formatedDate;
  };

  return (
    <Fragment>
      <PlaylistDetail key={refresh}>
        <Prev>
          <Icon name="angle left" link size="big" onClick={closePlaylist} />
        </Prev>
        <Detail>
          <Thumbnail>
            <Image
              rounded
              size='small'
              style={{ height: '100%' }}
              src={playlist.thumbnailUrl || './playlist.png'}
            />
          </Thumbnail>
          <PlaylistTitle>
            <Title>
              <strong>Playlist name: </strong>{playlist.name}
            </Title>
            {playlist.songs &&
              <Title>
                <strong>Total songs: </strong>{playlist.songs.length}
              </Title>
            }
            <Title>
              <strong>Created At: </strong>{formatDate(playlist.id)}
            </Title>
            <Title>
              <Icon
                size="large"
                name="random"
                title="Shuffle"
                onClick={shuffle}
              />
              <Icon
                size="large"
                name="plus square outline"
                title="Add to playlist"
                onClick={() => handlePlaylistModal(true)}
              />
              <Icon
                size="large"
                title="Delete"
                name="trash alternate outline"
                onClick={() => toggleConfirm(true)}
              />
            </Title>
          </PlaylistTitle>
        </Detail>
      </PlaylistDetail>
      <PlaylistSongs id="albums">
        {playlist.songs.length === 0 &&
          <p className="text-center font-18">No songs</p>
        }
        {playlist.songs.length > 0 &&
          <Item.Group link style={{  padding: '0px 15%'}}>
           {playlist.songs && playlist.songs.map(song => (
              <Item
                key={song.id}
                style={{
                  borderRadius: '4px',
                  transition: 'all .3s ease-in',
                  borderBottom: '1px solid #D6D6D6',
                  boxShadow: '-4px 0px 0px 0px #ffffff, 0 5px 7px 0 rgb(0 0 0 / 9%)'
                }}
              >
                <Item.Image size='tiny' src={song.thumbnailUrl} />
                <Item.Content style={{ padding: '6px 6px 0' }}>
                  <Item.Header>{song.title}</Item.Header>
                  <Item.Description style={{ marginTop: '3px' }}>
                    <strong>Singers:</strong> Ed Sheeran, Lady Gaga
                  </Item.Description>
                  <Item.Description style={{ marginTop: '3px' }}>
                    <strong>Added at:</strong> {formatDate(song.addedAt)}
                  </Item.Description>
                </Item.Content>
              </Item>
            ))}
          </Item.Group>
        }
      </PlaylistSongs>
      {showAddToPlaylist &&
        <AddToPlaylist
          params={{
            addToPlaylist,
            songs: filteredSongs,
            show: showAddToPlaylist,
            handleHide: handlePlaylistModal
          }}
        />
      }
      <ConfirmModal
        open={showConfirm}
        close={closeConfirm}
        deletePlaylist={deletePlaylist}
      />
    </Fragment>
  );
};

export { DetailView };