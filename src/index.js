// Simple component to start off project
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import VideoList from './components/videolist';
import SearchBar from './components/searchbar';
import VideoDetail from './components/videodetail';
import { KEY } from './config';

const API_KEY = KEY;

class App extends Component {
    constructor(props) {
      super(props);

      this.state = {
        videos: [],
        selectedVideo: null
       };

      this.videoSearch('');
    }

    videoSearch(term) {
      YTSearch({key: API_KEY, term: term}, (videos) => {
        this.setState({
          videos: videos,
          selectedVideo: videos[0]
        });
      });
    }

    render() {
      const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 500);
      return (
        <div>
          <SearchBar onSearchTermChange={videoSearch} />
          <VideoDetail video={this.state.selectedVideo}/>
          <VideoList
            onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
            videos={this.state.videos} />
        </div>
      )
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));
