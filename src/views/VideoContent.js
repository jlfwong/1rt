import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createTransitionHook} from '../universalRouter';
import {maybeLoadVideo} from '../actions/videoActions';
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
const frameOverlayStyle = {
  ...frameStyle,
  position: 'absolute',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
};

@connect((state, props) => ({
  videoData: state.video[props.params.videoReadableId]
}))
export default
class VideoContent extends Component {
  static propTypes = {
    videoData: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  static fetchData(store, nextParams) {
    return maybeLoadVideo(store, nextParams.videoReadableId);
  }

  constructor(props) {
    super(props);
    this.state = { showOverlay: true };
  }

  componentDidMount() {
    const videoNode = React.findDOMNode(this.refs.video);
    if (videoNode) {
      videoNode.addEventListener('play', this.hideOverlay.bind(this), false);
    }
  }

  hideOverlay() {
    this.setState({ showOverlay: false });
  }

  render() {
    const {videoData} = this.props;
    const useYouTubePlayer = false;
    const useOverlay = useYouTubePlayer;  // useful in hiding YT's loading time

    const youtubeId = videoData.youtubeId;
    const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeId}`;
    const directMp4Url = `http://fastly.kastatic.org/KA-youtube-converted/${youtubeId}.mp4/${youtubeId}.mp4 `;

    const overlayStyle = {
      ...frameOverlayStyle,
      backgroundImage: `url(https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg)`
    };
    const overlay = this.state.showOverlay ? <div style={overlayStyle} /> : "";

    let player;
    if (useYouTubePlayer) {
      player = <iframe type="text/html" src={youtubeEmbedUrl} style={frameStyle} onLoad={this.hideOverlay.bind(this)} />;
    } else {
      player = <video ref="video" style={frameStyle} controls>
          <source src={directMp4Url} type="video/mp4" />
        </video>;
    }

    return <div>
      {useOverlay && overlay}
      {player}
      <div style={descriptionBoxStyle}>
        <p style={videoTitleStyle}>{videoData.title}</p>
        <p>{videoData.description}</p>
      </div>
    </div>
  }
}
