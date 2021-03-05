import React, { Fragment, useState } from 'react';
import { Card, Image, Icon, Item } from 'semantic-ui-react';
import {
  View,
  Slider,
  ViewWrapper,
  ViewContainer,
  InputContainer,
  ResultContainer,
  SearchBarContainer
} from './styled';
import { SearchBar } from './../../components';

const views = [{
  name: 'list',
  title: 'List view'
}, {
  name: 'grid',
  title: 'Grid view'
}];

const ListView = ({ albums, search, openAlbum }) => {
  const [tilesInRow, updateCardCount] = useState(8);
  const [selectedView, toggleView] = useState('grid');
  return (
    <Fragment>
      <InputContainer>
        <SearchBarContainer>
          <SearchBar
            search={search}
            placeHolder={'album'}
          />
        </SearchBarContainer>
        <ViewContainer>
          <ViewWrapper>
            {views.map(view => (
              <View key={view.name} selected={selectedView === view.name}>
                <Icon
                  size="large"
                  title={view.title}
                  name={`${view.name} layout`}
                  onClick={() => toggleView(view.name)}
                />
              </View>
            ))}
          </ViewWrapper>
          {selectedView === 'grid' &&
            <Slider>
              <input
                min="4"
                max="8"
                type="range"
                id="points"
                name="points"
                value={tilesInRow}
                onChange={evt => updateCardCount(evt.target.value)}
              />
            </Slider>
          }
        </ViewContainer>
      </InputContainer>
      <ResultContainer id="albums">
        <Fragment>
          {selectedView === 'grid' &&
            <Card.Group itemsPerRow={tilesInRow}>
              {albums.map(album => (
                <Card key={album.id} onClick={() => { openAlbum(album); }}>
                  <Image src={album.thumbnailUrl || './playlist.png'} wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>{album.title}</Card.Header>
                    <Card.Description>
                      {`Album: ${album.id}`}
                    </Card.Description>
                    <Card.Description>
                      {`No.of songs: ${album.songs.length}`}
                    </Card.Description>
                  </Card.Content>
                </Card>
              )
              )}
            </Card.Group>
          }
          {selectedView === 'list' &&
            <Item.Group link style={{  padding: '0px 15%'}}>
             {albums.map(album => (
                <Item
                  key={album.id}
                  style={{
                    borderRadius: '4px',
                    transition: 'all .3s ease-in',
                    borderBottom: '1px solid #D6D6D6',
                    boxShadow: '-4px 0px 0px 0px #ffffff, 0 5px 7px 0 rgb(0 0 0 / 9%)'
                  }}
                  onClick={() => { openAlbum(album); }}
                >
                  <Item.Image size='tiny' src={album.thumbnailUrl || './playlist.png'} />
                  <Item.Content style={{ padding: '6px 6px 0' }}>
                    <Item.Header>
                      {album.title}
                    </Item.Header>
                    <Item.Description style={{ marginTop: '3px' }}>
                      {`Album: ${album.id}`}
                    </Item.Description>
                    <Item.Description style={{ marginTop: '3px' }}>
                      {`No.of songs: ${album.songs.length}`}
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