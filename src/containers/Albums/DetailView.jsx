import React, { Fragment } from 'react';
import { Item, Image, Icon } from 'semantic-ui-react';
import {
  Prev,
  Title,
  Detail,
  Thumbnail,
  AlbumTitle,
  AlbumSongs,
  AlbumDetail
} from './styled';

const DetailView = ({ album, closeAlbum }) => {
  return (
    <Fragment>
      <AlbumDetail>
        <Prev>
          <Icon name="angle left" link size="big" onClick={closeAlbum} />
        </Prev>
        <Detail>
          <Thumbnail>
            <Image
              rounded
              size='small'
              style={{ height: '100%' }}
              src={album.thumbnailUrl || './playlist.png'}
            />
          </Thumbnail>
          <AlbumTitle>
            <Title>
              <strong>Album name: </strong>{album.title}
            </Title>
            {album.songs &&
              <Title>
                <strong>Total songs: </strong>{album.songs.length}
              </Title>
            }
          </AlbumTitle>
        </Detail>
      </AlbumDetail>
      <AlbumSongs id="albums">
        <Item.Group link style={{  padding: '0px 15%'}}>
         {album.songs && album.songs.map(song => (
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
                <Item.Description style={{ marginTop: '3px' }}>{`Song: ${song.id}`}</Item.Description>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </AlbumSongs>
    </Fragment>
  );
};

export { DetailView };