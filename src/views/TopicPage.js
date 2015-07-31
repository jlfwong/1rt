import React, {Component, PropTypes} from 'react';
import {topicWasRequested} from '../reducers/topic';
import {connect} from 'react-redux';
import {maybeLoadTopic} from '../actions/topicActions';
import SubjectHeader from '../components/SubjectHeader';
import TopicList from '../components/TopicList';

export default
@connect((state, props) => ({
  topicData: state.topic[props.params.topicSlug],
  parentTopicData: state.topic[props.params.subjectSlug]
}))
class TopicPage {
  static propTypes = {
    params: PropTypes.object.isRequired,
    topicData: PropTypes.object.isRequired
  }

  static fetchData(store, nextParams) {
    return Promise.all([
      maybeLoadTopic(store, nextParams.topicSlug),
      maybeLoadTopic(store, nextParams.subjectSlug)
    ])
  }

  render() {
    const {parentTopicData, topicData, params} = this.props;
    return <ul>
      <SubjectHeader
        ancestorTopicData={[parentTopicData]}
        title={topicData.title}
        description={topicData.description}
        domainSlug={params.domainSlug} />
      <TopicList
        topics={topicData.children}
        relativeUrl={topicData.relativeUrl}
        domainSlug={params.domainSlug} />
    </ul>;
  }
}

