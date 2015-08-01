import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import SubjectHeader from '../components/SubjectHeader';
import TopicList from '../components/TopicList';
import {getTopicBySlug, getTopicById} from '../reducers/topictree';

export default
@connect((state, props) => {
  const topicData = getTopicBySlug(state, props.params.domainSlug);
  const subTopicData = topicData.childData.map(c => getTopicById(state, c.id))
                            .filter(x => !!x)
  return {topicData, subTopicData}
})
class DomainPage {
  static fetchData(store, nextParams) {
    return [`topic:${nextParams.domainSlug}/*`];
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

