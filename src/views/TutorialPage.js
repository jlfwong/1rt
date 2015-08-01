import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import SubjectHeader from '../components/SubjectHeader';
import {TutorialNavList} from '../components/TutorialNav';
import {getTopicBySlug, getTopicById, getVideoById} from '../reducers/topictree';

@connect((state, props) => {
  const topicData = getTopicBySlug(state, props.params.tutorialSlug)
  return {topicData}
})
export default
class TutorialPage {
  static fetchData(store, nextParams) {
    const {tutorialSlug} = nextParams;
    return [`topic:${tutorialSlug}`]
              .concat(TutorialNavList.DecoratedComponent.fetchData(store, tutorialSlug))
  }

  render() {
    const {topicData, params} = this.props;
    return <div>
      <SubjectHeader
        title={topicData.translatedTitle}
        description={topicData.translatedDescription}
        domainSlug={params.domainSlug} />
      <TutorialNavList
        tutorialData={topicData}
        domainSlug={params.domainSlug} />
    </div>;
  }
}
