import React, {Component, PropTypes} from 'react';
import {topicWasRequested} from '../reducers/topic';
import {connect} from 'react-redux';
import {load as loadTopic} from '../actions/topicActions';
import {Link} from 'react-router';

export default
@connect((state, props) => {
  return {
    topicData: state.topic[props.params.topicSlug]
  }
})
class TopicPage {
  static propTypes = {
    params: PropTypes.object.isRequired,
    topicData: PropTypes.object.isRequired
  }

  static fetchData(store, nextState) {
    const promises = [];

    if (!topicWasRequested(store.getState(), nextState.topicSlug)) {
      promises.push(store.dispatch(loadTopic(nextState.topicSlug)));
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
    const {topicData} = this.props;
    return <ul>
      {topicData.children.map(this.renderSubject.bind(this, topicData.relativeUrl))}
    </ul>;
  }
}

