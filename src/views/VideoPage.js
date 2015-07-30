import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createTransitionHook} from '../universalRouter';
import {load as loadVideo} from '../actions/videoActions';
import {videoWasRequested} from '../reducers/video';
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

@connect((state, props) => {
  return {
    videoData: state.video[props.params.videoReadableId]
  }
})
export default
class VideoPage {
  static propTypes = {
    videoData: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  static fetchData(store, nextState) {
    const promises = [];

    if (!videoWasRequested(store.getState(), nextState.videoReadableId)) {
      promises.push(store.dispatch(loadVideo(nextState.videoReadableId)));
    }

    return Promise.all(promises);
  }

  render() {
    const {videoData} = this.props;

    const youtubeId = videoData['translatedYoutubeId'];
    const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeId}`;

    return <div>
      <iframe type="text/html" width="100%" height={192} src={youtubeEmbedUrl} style={{marginBottom: '8px'}} />
      <div style={descriptionBoxStyle}>
        <p style={videoTitleStyle}>{videoData.translatedTitle}</p>
        <p>{videoData.translatedDescription}</p>
      </div>
    </div>
  }
}
