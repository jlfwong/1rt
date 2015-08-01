import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import SubjectHeader from '../components/SubjectHeader';
import TopicList from '../components/TopicList';
import {getTopicBySlug, getTopicById} from '../reducers/topictree';

export default
@connect((state, props) => {
  const topicData = getTopicBySlug(state, props.params.domainSlug);
  return {topicData}
})
class DomainPage {
  static fetchData(store, nextParams) {
    return [`topic:${nextParams.domainSlug}/*`]
              .concat(TopicList.DecoratedComponent.fetchData(store, nextParams.domainSlug))
  }

  render() {
    const {topicData, params, subTopicData} = this.props;
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

