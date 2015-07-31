import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {maybeLoadTopic} from '../actions/topicActions';
import {maybeLoadVideo} from '../actions/videoActions';
import TutorialNav from '../components/TutorialNav';
import {getTopic} from '../reducers/topic';

export default
@connect((state, props) => ({
  tutorialData: getTopic(state, props.params.tutorialSlug),
  parentTopicData: getTopic(state, props.params.topicSlug)
}))
class ContentPage {
  static propTypes = {
    params: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,

    tutorialData: PropTypes.object,
    parentTopicData: PropTypes.object,
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

    if (tutorialData) {
      tutorialData.children
        .filter(child => child.kind === "Video")
        // .slice(3) removes the leading "v/
        .forEach(child => maybeLoadVideo(store, child.nodeSlug.slice(2)));
    }

    return <div>
      {this.props.children}
      {tutorialData && parentTopicData &&
        <TutorialNav
          parentTopicData={parentTopicData}
          tutorialData={tutorialData}
          activePath={location.pathname}
          domainSlug={params.domainSlug} />}
    </div>
  }
}
