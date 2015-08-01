import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import TutorialNav from '../components/TutorialNav';
import {getTopicBySlug, getTopicById} from '../reducers/topictree';

export default
@connect((state, props) => ({
  tutorialData: getTopicBySlug(state, props.params.tutorialSlug),
  parentTopicData: getTopicBySlug(state, props.params.topicSlug)
}))
class ContentPage {
  static propTypes = {
    params: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,

    tutorialData: PropTypes.object,
    parentTopicData: PropTypes.object,
  }

  static fetchData(store, nextParams) {
    return [
      `topic:${nextParams.topicSlug}`,
      `topic:${nextParams.tutorialSlug}/*`
    ];
  }

  render() {
    const {tutorialData, parentTopicData, location, params} = this.props;

    return <div>
      {this.props.children}
      <TutorialNav
        parentTopicData={parentTopicData}
        tutorialData={tutorialData}
        activePath={location.pathname}
        domainSlug={params.domainSlug} />
    </div>
  }
}
