import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createTransitionHook} from '../universalRouter';
import {getVideoBySlug} from '../reducers/topictree';
import {Link} from 'react-router';

const videoTitleStyle = {
  fontSize: '18px',
  marginBottom: '10px'
};

const descriptionBoxStyle = {
  background: '#f7f7f7',
  border: '1px solid #ddd',
  margin: '0 10px 10px 10px',
  padding: '10px'
};
const frameStyle = {
  width: '100%',
  height: '192px',
  marginBottom: '8px',
  backgroundColor: '#000'
};

export default
class YouTubePlayer extends Component {
  static propTypes = {
    style: PropTypes.object.isRequired,
    youtubeId: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { showOverlay: true };
  }

  hideOverlay() {
    this.setState({ showOverlay: false });
  }

  render() {
    const overlayStyle = {
      ...this.props.style,
      position: 'absolute',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundImage: `url(https://i.ytimg.com/vi/${this.props.youtubeId}/hqdefault.jpg)`
    };
    const overlay = this.state.showOverlay ? <div style={overlayStyle} /> : "";
    return <div style={this.props.style}>
      {overlay}
      <iframe type="text/html" src={`https://www.youtube.com/embed/${this.props.youtubeId}`} width={this.props.style.width} height={this.props.style.height} onLoad={this.hideOverlay.bind(this)} />;
    </div>;
  }
};

@connect((state, props) => ({
  videoData: getVideoBySlug(state, props.params.videoSlug)
}))
export default
class VideoContent {
  static propTypes = {
    videoData: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  static fetchData(store, nextParams) {
    return [`video:${nextParams.videoSlug}`]
  }

  render() {
    const {videoData} = this.props;
    const youtubeId = videoData.translatedYoutubeId;
    const useYouTubePlayer = false;

    let player;
    if (useYouTubePlayer) {
      player = <YouTubePlayer style={frameStyle} youtubeId={youtubeId} />;
    } else {
      player = <video key={youtubeId} style={frameStyle} controls poster={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}>
          <source src={`http://fastly.kastatic.org/KA-youtube-converted/${youtubeId}.mp4/${youtubeId}.mp4`} type="video/mp4" />
        </video>;
    }

    return <div>
      {player}
      <div style={descriptionBoxStyle}>
        <p style={videoTitleStyle}>{videoData.translatedTitle}</p>
        <p>{videoData.translatedDescription}</p>
      </div>
    </div>
  }
}
