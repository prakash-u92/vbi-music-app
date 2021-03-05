import React, { Component, Fragment } from 'react';
import { ListView } from './ListView';
import { DetailView } from './DetailView';
import { CreatePlaylist } from './../../components';

export class Playlists extends Component {
  constructor(props) {
    super(props);
    this.playlists = [];
    this.state = {
      page: 1,
      limit: 100,
      playlists: [],
      listView: true,
      showModal: false,
      loadOnScroll: true,
      selectedPlaylist: {}
    };
  }

  componentDidMount() {
    this.handlePlaylists();
  }

  scrollListener = () => {
    const { loadOnScroll, page } = this.state;
    const wrapper = document.getElementById('playlists');
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
    const playLists = this.playlists;
    const paginatedPlayLists = playLists.slice(0, pageNo * 50);
    tempState.playlists = paginatedPlayLists;
    this.setState({ ...tempState }, () => {
      const wrapper = document.getElementById('playlists');
      // Binding event listener with DOM to fetch batches on scroll-end
      wrapper.addEventListener('scroll', this.scrollListener);
    });
  };

  searchPlaylists = evt => {
    let userInput = evt.target.value;
    userInput = userInput ? userInput.trim() : userInput;
    if (userInput) {
      const filtered = this.playlists.filter(list => list.name.toLowerCase().indexOf(userInput) !== -1);
      this.setState({ playlists: filtered });
    } else {
      this.paginateData(1);
    }
  };

  handlePlaylists = () => {
    const playlists = localStorage.getItem('playlists');
    if (playlists && playlists.length) {
      this.playlists = JSON.parse(playlists);
      this.paginateData(1);
    } else {
      this.playlists = [];
      localStorage.setItem('playlists', JSON.stringify([]));
    }
  };

  createPlaylist = newPlayListName => {
    const playlists = JSON.parse(localStorage.getItem('playlists'));
    const timeStamp = new Date().getTime();
    const newPlayList = {
      songs: [],
      id: timeStamp,
      createdAt: timeStamp,
      name: newPlayListName,
      thumbnailUrl: './playlist.png'
    };
    playlists.push(newPlayList);
    this.playlists = playlists;
    localStorage.setItem('playlists', JSON.stringify(playlists));
    this.paginateData(1);
    this.closeModal();
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  closePlaylist = playlist => {
    this.setState({ selectedPlaylist: {}, listView: true });
    this.handlePlaylists();
  };

  openPlaylist = playlist => {
    if (playlist.songs && playlist.songs.length) {
      playlist.songs = playlist.songs.sort((song1, song2) => (song2.addedAt - song1.addedAt));
    }
    this.setState({ selectedPlaylist: playlist, listView: false });
  };

  render() {
    const { playlists, showModal, listView, selectedPlaylist } = this.state;
    return(
      <Fragment>
        {listView &&
          <ListView
            playlists={playlists}
            openModal={this.openModal}
            search={this.searchPlaylists}
            openPlaylist={this.openPlaylist}
          />
        }
        {!listView &&
          <DetailView
            playlist={selectedPlaylist}
            closePlaylist={this.closePlaylist}
          />
        }
        <CreatePlaylist
          params={{
            show: showModal,
            create: this.createPlaylist,
            handleHide: this.closeModal
          }}
        />
      </Fragment>
    );
  }
}