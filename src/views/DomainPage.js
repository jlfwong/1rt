import React, {Component, PropTypes} from 'react';
import {topicWasRequested} from '../reducers/topic';
import {connect} from 'react-redux';
import {load as loadTopic} from '../actions/topicActions';
import {Link} from 'react-router';
import SubjectHeader from '../components/SubjectHeader';
import TopicList from '../components/TopicList';

export default
@connect((state, props) => {
  return {
    topicData: state.topic[props.params.domainSlug]
  }
})
class DomainPage {
  static propTypes = {
    params: PropTypes.object.isRequired,
    topicData: PropTypes.object.isRequired
  }

  static fetchData(store, nextState) {
    const promises = [];

    if (!topicWasRequested(store.getState(), nextState.domainSlug)) {
      promises.push(store.dispatch(loadTopic(nextState.domainSlug)));
    }

    return Promise.all(promises);
  }

  renderSubject(relativeUrl, child) {
    var {params} = this.props;

    var url = `${relativeUrl}/${child.nodeSlug}`;

    return <li>
      <Link to={url}>
        {child.title}
      </Link>
    </li>;
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

