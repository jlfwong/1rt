import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import SubjectHeader from '../components/SubjectHeader';
import TopicList from '../components/TopicList';
import {getTopicBySlug, getTopicById} from '../reducers/topictree';

export default
@connect((state, props) => {
  const topicData = getTopicBySlug(state, props.params.subjectSlug)
  return {topicData}
})
class SubjectPage {
  static fetchData(store, nextParams) {
    return [`topic:${nextParams.subjectSlug}`]
              .concat(TopicList.DecoratedComponent.fetchData(store, nextParams.subjectSlug))
  }

  render() {
    const {topicData, params} = this.props;
    return <div>
      <SubjectHeader
        title={topicData.translatedTitle}
        description={topicData.translatedDescription}
        domainSlug={params.domainSlug} />
      <TopicList
        topicData={topicData}
        relativeUrl={topicData.relativeUrl}
        domainSlug={params.domainSlug} />
    </div>;
  }
}

