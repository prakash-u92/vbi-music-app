import React, { Component } from 'react';
// Custom components
import { Header, Tabs } from './components';
import { AllSongs, Albums, Playlists } from './containers';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'all'
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  /**
   * Fetches the data and cache in the localStorage
   */
  fetchData = () => {
    this.fetchAllSongs().then(songs => {
      this.fetchAllAlbums(songs).then(() => {
        window.dispatchEvent(new Event('refreshUI'));
      });
    });
  };

  toggleTab = evt => this.setState({ selectedTab: evt.target.id });

  /**
   * Fetches the albums details
   */
  fetchAllAlbums = songs => (
    new Promise((resolve, reject) => {
      let albums = localStorage.getItem('albums');
      if (!albums || !albums.length) {
        return fetch(
          'https://jsonplaceholder.typicode.com/albums',
          {
            method: 'GET'
          }
        )
        .then(data => data.json())
        .then(response => {
          // Push the corresponding songs into albums
          const idsObj = {};
          response.forEach(album => {
            album.songs = [];
            idsObj[album.id] = [];
          });
          songs.forEach(song => {
            idsObj[song.albumId].push(song);
          });
          response.forEach(album => {
            // Setting first song thumbnail as album thumbnail
            album.thumbnailUrl = idsObj[album.id][0].thumbnailUrl;
            album.songs = idsObj[album.id];
          });
          localStorage.setItem('albums', JSON.stringify(response));
          resolve(response);
        });
      } else {
        resolve(JSON.parse(albums));
      }
    })
  );

  /**
   * Fetches the songs details
   */
  fetchAllSongs = () => (
    new Promise((resolve, reject) => {
      let songs = localStorage.getItem('songs');
      if (!songs || !songs.length) {
        return fetch(
          'https://jsonplaceholder.typicode.com/photos',
          {
            method: 'GET'
          }
        )
        .then(data => data.json())
        .then(response => {
          localStorage.setItem('songs', JSON.stringify(response));
          resolve(response);
        });
      } else {
        resolve(JSON.parse(songs));
      }
    })
  );

  render() {
    const { selectedTab } = this.state;
    return (
      <div className="app">
        <div className="container">
          <Header />
          <div className="wrapper">
            <div className="content">
              <div className="inner">
                <section className="main-content">
                  {/* Tabs */}
                  <Tabs
                    selected={selectedTab}
                    toggleTab={this.toggleTab}
                  />
                  {selectedTab === 'all' &&
                    <AllSongs />
                  }
                  {selectedTab === 'album' &&
                    <Albums />
                  }
                  {selectedTab === 'playlists' &&
                    <Playlists />
                  }
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
