import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {load as loadTopic} from '../actions/topicActions';
import {topicWasRequested} from '../reducers/topic';
import TutorialNav from '../components/TutorialNav';

@connect((state, props) => {
  return {
    tutorialData: state.topic[props.params.tutorialSlug]
  }
})
export default
class ContentPage {
  static propTypes = {
    tutorialData: PropTypes.object,
    params: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  componentDidMount() {
    const {tutorialData, dispatch, params} = this.props;

    if (!tutorialData || !tutorialData.title) {
      dispatch(loadTopic(params.tutorialSlug));
    }
  }

  render() {
    const {tutorialData, location, params} = this.props;

    return <div>
      {this.props.children}
      {tutorialData && tutorialData.title &&
        <TutorialNav
          tutorialData={tutorialData}
          activePath={location.pathname}
          domainSlug={params.domainSlug} />}
    </div>
  }
}
