import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {maybeLoadTopic} from '../actions/topicActions';
import {maybeLoadVideo} from '../actions/videoActions';
import TutorialNav from '../components/TutorialNav';

export default
@connect((state, props) => ({
  tutorialData: state.topic[props.params.tutorialSlug],
  parentTopicData: state.topic[props.params.topicSlug]
}))
class ContentPage {
  static propTypes = {
    tutorialData: PropTypes.object,
    params: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentDidMount() {
    const {params} = this.props;
    const {store} = this.context;

    maybeLoadTopic(store, params.tutorialSlug);
    maybeLoadTopic(store, params.topicSlug);
  }

  render() {
    const {tutorialData, parentTopicData, location, params} = this.props;
    const {store} = this.context;

    if (tutorialData && tutorialData.children) {
      tutorialData.children
        .filter(child => child.kind === "Video")
        // .slice(3) removes the leading "v/
        .forEach(child => maybeLoadVideo(store, child.nodeSlug.slice(2)));
    }

    return <div>
      {this.props.children}
      {tutorialData && tutorialData.title &&
       parentTopicData && parentTopicData.title &&
        <TutorialNav
          parentTopicData={parentTopicData}
          tutorialData={tutorialData}
          activePath={location.pathname}
          domainSlug={params.domainSlug} />}
    </div>
  }
}
