import React, { Component, Fragment } from 'react';
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
import { Card, Image, Icon, Item } from 'semantic-ui-react';

const views = [{
  name: 'list',
  title: 'List view'
}, {
  name: 'grid',
  title: 'Grid view'
}];

export class AllSongs extends Component {
  constructor(props) {
    super(props);
    this.rawList = [];
    this.allSongs = [];
    this.state = {
      page: 1,
      songs: [],
      limit: 100,
      tilesInRow: 8,
      loadOnScroll: true,
      selectedView: 'list'
    };
  }

  componentDidMount() {
    this.subscribe();
    this.refreshData();
  }

  refreshData = () => {
    const songs = localStorage.getItem('songs');
    if (songs && songs.length) {
      this.allSongs = JSON.parse(songs);
      this.rawList = this.allSongs;
      this.paginateData(1);
    }
  };

  subscribe = () => {
    window.addEventListener('refreshUI', this.refreshData);
  };

  scrollListener = () => {
    const { loadOnScroll, page } = this.state;
    const wrapper = document.getElementById('songs');
    const scrollviewOffsetY = wrapper.scrollTop;
    const scrollviewFrameHeight = wrapper.clientHeight;
    const scrollviewContentHeight = wrapper.scrollHeight;
    const sum = scrollviewOffsetY + scrollviewFrameHeight;
    if (loadOnScroll && sum >= scrollviewContentHeight) {
      this.setState({
        loadOnScroll: false
      }, () => {
        this.paginateData(page + 1);
      });
    }
  };

  paginateData = pageNo => {
    const tempState = { page: pageNo, loadOnScroll: true };
    const songs = this.allSongs;
    const paginatedSongs = songs.slice(0, pageNo * 50);
    tempState.songs = paginatedSongs;
    this.setState({ ...tempState }, () => {
      const wrapper = document.getElementById('songs');
      // Binding event listener with DOM to fetch batches on scroll-end
      wrapper.addEventListener('scroll', this.scrollListener);
    });
  };

  searchSong = evt => {
    let userInput = evt.target.value;
    userInput = userInput ? userInput.trim() : userInput;
    if (userInput) {
      this.allSongs = this.rawList.filter(song => song.title.indexOf(userInput) !== -1);
      this.setState({ songs: this.allSongs.slice(0, 50) });
    } else {
      this.refreshData();
    }
  };

  toggleView = () => {
    this.setState({ selectedView: this.state.selectedView === 'grid' ? 'list' : 'grid' });
  };

  updateCardCount = evt => {
    this.setState({ tilesInRow: evt.target.value });
  };

  componentWillUnmount() {
    window.removeEventListener('refreshUI', this.refreshData);
  }

  render() {
    const { songs, selectedView, tilesInRow } = this.state;
    return(
      <Fragment>
        <InputContainer>
          <SearchBarContainer>
            <SearchBar
              placeHolder={'song'}
              search={this.searchSong}
            />
          </SearchBarContainer>
          <ViewContainer>
            <ViewWrapper>
              {views.map(view => (
                <View key={view.name} selected={selectedView === view.name}>
                  <Icon
                    size="large"
                    title={view.title}
                    onClick={this.toggleView}
                    name={`${view.name} layout`}
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
                  onChange={this.updateCardCount}
                />
              </Slider>
            }
          </ViewContainer>
        </InputContainer>
        <ResultContainer id="songs">
          <Fragment>
            {selectedView === 'grid' &&
              <Card.Group itemsPerRow={tilesInRow}>
                {songs.map(song => (
                  <Card key={song.id}>
                    <Image src={song.thumbnailUrl} wrapped ui={false} />
                    <Card.Content>
                      <Card.Header>{song.title}</Card.Header>
                      <Card.Description>
                        {`Song: ${song.id}`}
                      </Card.Description>
                      <Card.Description>
                        {`Play time: 0${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 50)}`}
                      </Card.Description>
                    </Card.Content>
                  </Card>
                )
                )}
              </Card.Group>
            }
            {selectedView === 'list' &&
              <Item.Group style={{  padding: '0px 15%'}}>
               {songs.map(song => (
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
                        {`Song: ${song.id}`}
                      </Item.Description>
                      <Item.Description style={{ marginTop: '3px' }}>
                        {`Play time: 0${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 50)}`}
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
  }
}