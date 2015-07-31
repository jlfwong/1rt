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

@connect((state, props) => ({
  videoData: state.video[props.params.videoReadableId]
}))
export default
class VideoContent {
  static propTypes = {
    videoData: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  static fetchData(store, nextParams) {
    return maybeLoadVideo(store, nextParams.videoReadableId);
  }

  render() {
    const {videoData} = this.props;

    const youtubeId = videoData.youtubeId;
    const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeId}`;

    return <div>
      <iframe type="text/html" width="100%" height={192} src={youtubeEmbedUrl} style={{marginBottom: '8px'}} />
      <div style={descriptionBoxStyle}>
        <p style={videoTitleStyle}>{videoData.title}</p>
        <p>{videoData.description}</p>
      </div>
    </div>
  }
}
