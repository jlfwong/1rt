import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createTransitionHook} from '../universalRouter';
import {load as loadVideo} from '../actions/videoActions';
import {videoWasRequested} from '../reducers/video';
import {Link} from 'react-router';

class VideoPage extends Component {
  static propTypes = {
    youtubeId: PropTypes.string.isRequired
  }

  render() {
    var {youtubeId} = this.props;

    var url = `https://www.youtube.com/embed/${youtubeId}`;
    return <iframe
                type="text/html"
                width={640}
                height={480}
                src={url} />;
  }
}

@connect((state, props) => {
  return {
    videoData: state.video[props.params.videoReadableId]
  }
})
export default
class VideoPageContainer {
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
    return <div>
      <VideoPage youtubeId={youtubeId} />
      <br />
      <Link to="/math/algebra/introduction-to-algebra/overview_hist_alg/v/origins-of-algebra">
        Origins of Algebra
      </Link>
      <Link to="/science/biology/chemistry--of-life/elements-and-atoms/v/elements-and-atoms">
        Elements and Atoms
      </Link>
    </div>
  }
}
