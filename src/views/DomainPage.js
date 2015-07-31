import React, {Component, PropTypes} from 'react';
import {topicWasRequested} from '../reducers/topic';
import {connect} from 'react-redux';
import {load as loadTopic} from '../actions/topicActions';
import {Link} from 'react-router';

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

  renderSubject(child) {
    var {params} = this.props;

    return <li>
      {child.title}
    </li>;
  }

  render() {
    const {topicData} = this.props;
    return <ul>
      {topicData.children.map(this.renderSubject.bind(this))}
    </ul>;
  }
}

