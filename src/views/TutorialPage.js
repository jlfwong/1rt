import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {load as loadTopic} from '../actions/topicActions';
import {topicWasRequested} from '../reducers/topic';

@connect((state, props) => {
  return {
    tutorialData: state.topic[props.params.tutorialSlug]
  }
})
export default
class TutorialPage {
  static propTypes = {
    tutorialData: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  static fetchData(store, nextState) {
    const promises = [];

    if (!topicWasRequested(store.getState(), nextState.tutorialSlug)) {
      promises.push(store.dispatch(loadTopic(nextState.tutorialSlug)));
    }

    return Promise.all(promises);
  }

  render() {
    const {tutorialData} = this.props;

    return <div>
      {this.props.children}
      <div>
        <h2>{tutorialData.title}</h2>
        <ul>
          {tutorialData.children.map(child =>
            <li>
              <Link to={`${tutorialData.relativeUrl}/${child.nodeSlug}`} >
                {child.title}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  }
}
