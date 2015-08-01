import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import SubjectHeader from '../components/SubjectHeader';
import TopicList from '../components/TopicList';
import {getTopicBySlug, getTopicById} from '../reducers/topictree';

export default
@connect((state, props) => ({
  topicData: getTopicBySlug(state, props.params.subjectSlug),
  subTopicData: getTopicBySlug(state, props.params.subjectSlug).childData.map(
    c => getTopicById(state, c.id)
  ).filter(x => !!x)
}))
class SubjectPage {
  static fetchData(store, nextParams) {
    return [`topic:${nextParams.subjectSlug}/*/*`];
  }

  render() {
    const {topicData, params, subTopicData} = this.props;
    return <div>
      <SubjectHeader
        title={topicData.translatedTitle}
        description={topicData.translatedDescription}
        domainSlug={params.domainSlug} />
      <TopicList
        topics={subTopicData}
        relativeUrl={topicData.relativeUrl}
        domainSlug={params.domainSlug} />
    </div>;
  }
}

