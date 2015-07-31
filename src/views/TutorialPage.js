import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {load as loadTopic} from '../actions/topicActions';
import {topicWasRequested} from '../reducers/topic';
import SubjectHeader from '../components/SubjectHeader';
import {TutorialNavList} from '../components/TutorialNav';

@connect((state, props) => {
  return {
    topicData: state.topic[props.params.tutorialSlug]
  }
})
export default
class TutorialPage {
  static propTypes = {
    topicData: PropTypes.object,
    params: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentDidMount() {
    const {topicData, location, params} = this.props;
    const {router} = this.context;

    // Redirect to the first content node in the tutorial.
    router.replaceWith(
            `${topicData.relativeUrl}/${topicData.children[0].nodeSlug}`);
  }

  static fetchData(store, nextState) {
    const promises = [];

    if (!topicWasRequested(store.getState(), nextState.tutorialSlug)) {
      promises.push(store.dispatch(loadTopic(nextState.tutorialSlug)));
    }

    return Promise.all(promises);
  }

  render() {
    const {topicData, params} = this.props;

    return <div />;
  }
}
