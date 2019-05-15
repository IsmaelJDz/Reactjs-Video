import React, { Component } from 'react';
import VideoPlayerLayout from '../components/video-player-layout';
import Video from '../components/video';
import Title from '../components/title';
import PlayPause from '../components/play-pause';
import Timer from '../components/timer';
import Controls from '../components/video-player-controls';
import ProgressBar from '../components/progress-bar';
import Spinner from '../components/spinner';
import Volume from '../components/volume';
import FullScreen from '../components/full-screen';
import { connect } from 'react-redux';


class VideoPlayer extends Component {

  state = {
    pause: true,
    duration: 0,
    currentTime: 0,
    loading: false,
  }

  togglePlay = (event) => {
    this.setState({
      pause: !this.state.pause
    })
  }

  componentDidMount() {
    this.setState({
      pause: (!this.props.autoplay)
    })
  }

  handleLoadedMetaData = event => {
    this.video = event.target;
    this.setState({
      duration: this.video.duration
    });
  }

  handleTimeUpdate = event => {
    //onsole.log(this.video.currentTime)
    this.setState({
      currentTime: this.video.currentTime
    })
  }

  handleProgressChange = event => {
    //event.target.value 
    this.video.currentTime = event.target.value
  }

  handleVolumeChange = event => {
    this.video.volume = event.target.value;
  }

  handleFullScreenClick = event => {
    if(!document.webkitIsFullScreen) {
      this.player.webkitRequestFullscreen()
    }else {
      document.webkitExitFullscreen();
    }
  }

  handleSeeking = event => {
    this.setState({
      loading: true
    })
  }

  handleSeeked = event => {
    this.setState({
      loading: false
    })
  }

  setRef = element => {
    this.player = element
  }

  render() {
    return(
      <VideoPlayerLayout
        setRef={this.setRef}
      >
        <Title 
          title={this.props.media.get('title')}
        />
        <Controls>
          <PlayPause 
            pause={this.state.pause}
            handleClick={this.togglePlay}
          />
          <Timer 
            duration={this.state.duration}
            currentTime={this.state.currentTime}
          />
          <ProgressBar 
            duration={this.state.duration}
            value={this.state.currentTime}
            handleProgressChange={this.handleProgressChange}
          />
          <Volume 
            handleVolumeChange={this.handleVolumeChange}
          />
          <FullScreen 
            handleFullScreenClick={this.handleFullScreenClick}
          />
        </Controls>
        <Spinner active={this.state.loading}/>
        <Video
          autoplay={this.props.autoplay}
          pause={this.state.pause}
          handleLoadedMetaData={this.handleLoadedMetaData}
          handleTimeUpdate={this.handleTimeUpdate}
          handleSeeking={this.handleSeeking}
          handleSeeked={this.handleSeeked}
          //src="http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4"
          src={this.props.media.get('src') }
        />
      </VideoPlayerLayout>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    media: state.get('data').get('entities').get('media').get(props.id)
  }
}

export default connect(mapStateToProps)(VideoPlayer);