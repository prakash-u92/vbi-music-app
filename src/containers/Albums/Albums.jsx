import React, { Component, Fragment } from 'react';
import { ListView } from './ListView';
import { DetailView } from './DetailView';

export class Albums extends Component {
  constructor(props) {
    super(props);
    this.albums = [];
    this.rawList = [];
    this.state = {
      page: 1,
      albums: [],
      listView: true,
      selectedAlbum: {},
      loadOnScroll: true
    };
  }

  componentDidMount() {
    this.subscribe();
    this.refreshData();
  }

  refreshData = () => {
    const albums = localStorage.getItem('albums');
    if (albums && albums.length) {
      this.albums = JSON.parse(albums);
      this.rawList = this.albums;
      this.paginateData(1);
    }
  };

  subscribe = () => {
    window.addEventListener('refreshUI', this.refreshData);
  };

  scrollListener = () => {
    const { loadOnScroll, page } = this.state;
    const wrapper = document.getElementById('albums');
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
    const albums = this.albums;
    const paginatedAlbums = albums.slice(0, pageNo * 50);
    tempState.albums = paginatedAlbums;
    this.setState({ ...tempState }, () => {
      const wrapper = document.getElementById('albums');
      // Binding event listener with DOM to fetch batches on scroll-end
      wrapper.addEventListener('scroll', this.scrollListener);
    });
  };

  searchAlbum = evt => {
    let userInput = evt.target.value;
    userInput = userInput ? userInput.trim() : userInput;
    if (userInput) {
      this.albums = this.rawList.filter(album => album.title.indexOf(userInput) !== -1);
      this.setState({ albums: this.albums.slice(0, 50) });
    } else {
      this.refreshData();
    }
  };

  closeAlbum = () => this.setState({ listView: true, selectedAlbum: {} });

  openAlbum = selectedAlbum => this.setState({ listView: false, selectedAlbum });

  componentWillUnmount() {
    window.removeEventListener('refreshUI', this.refreshData);
  }

  render() {
    const { albums, listView, selectedAlbum } = this.state;
    return(
      <Fragment>
        {listView &&
          <ListView
            albums={albums}
            search={this.searchAlbum}
            openAlbum={this.openAlbum}
          />
        }
        {!listView &&
          <DetailView album={selectedAlbum} closeAlbum={this.closeAlbum} />
        }
      </Fragment>
    );
  }
}