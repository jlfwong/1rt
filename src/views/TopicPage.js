import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import SubjectHeader from '../components/SubjectHeader';
import TopicList from '../components/TopicList';
import {getTopicBySlug, getTopicById} from '../reducers/topictree';

export default
@connect((state, props) => {
  const parentTopicData = getTopicBySlug(state, props.params.subjectSlug);
  const topicData = getTopicBySlug(state, props.params.topicSlug);
  const subTopicData = topicData.childData.map(c => getTopicById(state, c.id))
                          .filter(x => !!x);

  return {parentTopicData, topicData, subTopicData};
})
class TopicPage {
  static propTypes = {
    params: PropTypes.object.isRequired,
    topicData: PropTypes.object.isRequired
  }

  static fetchData(store, nextParams) {
    return [
      `topic:${nextParams.subjectSlug}`,
      `topic:${nextParams.topicSlug}`
    ].concat(
      TopicList.DecoratedComponent.fetchData(store, nextParams.topicSlug, true));
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
        topicData={topicData}
        domainSlug={params.domainSlug} />
    </ul>;
  }
}

