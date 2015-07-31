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
  marginBottom: '8px'
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

  onFrameLoad() {
    this.setState({ showOverlay: false });
  }

  render() {
    const {videoData} = this.props;

    const youtubeId = videoData.youtubeId;
    const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeId}`;

    const overlayStyle = {
      ...frameOverlayStyle,
      backgroundImage: `url(https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg)`
    };
    const overlay = this.state.showOverlay ? <div style={overlayStyle} /> : "";

    return <div>
      {overlay}
      <iframe type="text/html" src={youtubeEmbedUrl} style={frameStyle} onLoad={this.onFrameLoad.bind(this)} />
      <div style={descriptionBoxStyle}>
        <p style={videoTitleStyle}>{videoData.title}</p>
        <p>{videoData.description}</p>
      </div>
    </div>
  }
}
