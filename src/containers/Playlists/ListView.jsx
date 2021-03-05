import React, { Fragment } from 'react';
import { Icon, Item } from 'semantic-ui-react';
import {
  View,
  ViewWrapper,
  ViewContainer,
  InputContainer,
  ResultContainer,
  SearchBarContainer
} from './styled';
import { SearchBar } from './../../components';

const ListView = ({ playlists, search, openPlaylist, openModal }) => {
  return (
    <Fragment>
      <InputContainer>
        <SearchBarContainer>
          <SearchBar
            search={search}
            placeHolder={'playlist'}
          />
        </SearchBarContainer>
        <ViewContainer>
          <ViewWrapper style={{ width: '15%' }}>
            <View>
              <Icon
                name="plus"
                size="large"
                onClick={openModal}
                title="Create playlist"
              />
            </View>
          </ViewWrapper>
        </ViewContainer>
      </InputContainer>
      <ResultContainer id="playlists">
        <Fragment>
          {playlists.length === 0 &&
            <p className="text-center font-20">No playlists</p>
          }
          {playlists.length > 0 &&
            <Item.Group link style={{  padding: '0px 15%'}}>
             {playlists.map(playlist => (
                <Item
                  key={playlist.id}
                  style={{
                    borderRadius: '4px',
                    transition: 'all .3s ease-in',
                    borderBottom: '1px solid #D6D6D6',
                    borderTop: '1px solid rgba(214, 214, 214, .4)',
                    boxShadow: '-4px 0px 0px 0px #ffffff, 0 5px 7px 0 rgb(0 0 0 / 9%)'
                  }}
                  onClick={() => { openPlaylist(playlist); }}
                >
                  <Item.Image size='tiny' src={playlist.thumbnailUrl || './playlist.png'} />
                  <Item.Content style={{ padding: '6px 6px 0' }}>
                    <Item.Header>
                      {playlist.name}
                    </Item.Header>
                    <Item.Description style={{ marginTop: '3px' }}>
                      <strong>Total songs:&nbsp;</strong>{playlist.songs.length}
                    </Item.Description>
                    <Item.Description style={{ marginTop: '3px' }}>
                      <strong>Created At:&nbsp;</strong>{new Date(playlist.createdAt).toDateString()}
                    </Item.Description>
                  </Item.Content>
                </Item>
              ))}
            </Item.Group>
          }
        </Fragment>
      </ResultContainer>
    </Fragment>
  );
};

export { ListView };