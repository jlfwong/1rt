import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {maybeLoadTopic} from '../actions/topicActions';
import SubjectHeader from '../components/SubjectHeader';
import TopicList from '../components/TopicList';
import {topicWasRequested, getTopic} from '../reducers/topic';

export default
@connect((state, props) => ({
  topicData: getTopic(state, props.params.subjectSlug)
}))
class SubjectPage {
  static propTypes = {
    params: PropTypes.object.isRequired,
    topicData: PropTypes.object.isRequired
  }

  static fetchData(store, nextParams) {
    return maybeLoadTopic(store, [nextParams.subjectSlug]);
  }

  render() {
    const {topicData, params} = this.props;
    return <div>
      <SubjectHeader
        title={topicData.title}
        description={topicData.description}
        domainSlug={params.domainSlug} />
      <TopicList
        topics={topicData.children}
        relativeUrl={topicData.relativeUrl}
        domainSlug={params.domainSlug} />
    </div>;
  }
}

