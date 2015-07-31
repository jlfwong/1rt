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
    params: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  static fetchData(store, nextState) {
    const promises = [];

    if (!topicWasRequested(store.getState(), nextState.tutorialSlug)) {
      promises.push(store.dispatch(loadTopic(nextState.tutorialSlug)));
    }

    return Promise.all(promises);
  }

  render() {
    const {topicData, location, params} = this.props;

    return <div>
      <div style={{marginBottom: 20}}>
        <SubjectHeader
          title={topicData.title}
          description={topicData.description}
          domainSlug={params.domainSlug} />
      </div>
      <TutorialNavList
        tutorialData={topicData}
        activePath={location.pathname}
        domainSlug={params.domainSlug} />
    </div>
  }
}
