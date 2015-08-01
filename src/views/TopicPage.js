import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import SubjectHeader from '../components/SubjectHeader';
import TopicList from '../components/TopicList';
import {getTopicBySlug, getTopicById} from '../reducers/topictree';

export default
@connect((state, props) => ({
  parentTopicData: getTopicBySlug(state, props.params.subjectSlug),
  topicData: getTopicBySlug(state, props.params.topicSlug),
  subTopicData: getTopicBySlug(state, props.params.topicSlug).childData.map(
    c => getTopicById(state, c.id)
  ).filter(x => !!x)
}))
class TopicPage {
  static propTypes = {
    params: PropTypes.object.isRequired,
    topicData: PropTypes.object.isRequired
  }

  static fetchData(store, nextParams) {
    return [
      `topic:${nextParams.subjectSlug}`,
      `topic:${nextParams.topicSlug}/*`
    ];
  }

  render() {
    const {parentTopicData, topicData, subTopicData, params} = this.props;
    return <ul>
      <SubjectHeader
        ancestorTopicData={[parentTopicData].filter(x => !!x)}
        title={topicData.translatedTitle}
        description={topicData.translatedDescription}
        domainSlug={params.domainSlug} />
      <TopicList
        topics={subTopicData}
        relativeUrl={topicData.relativeUrl}
        domainSlug={params.domainSlug} />
    </ul>;
  }
}

