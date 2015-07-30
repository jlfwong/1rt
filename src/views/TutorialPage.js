import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {load as loadTopic} from '../actions/topicActions';
import {topicWasRequested} from '../reducers/topic';


class TutorialNav {
  static propTypes = {
    tutorialData: PropTypes.object.isRequired
  }

  render() {
    var {tutorialData} = this.props;

    return <div>
      <h2>{tutorialData.title}</h2>
      <ul>
        {tutorialData.children.map(child =>
          <li key={child.nodeSlug}>
            <Link to={`${tutorialData.relativeUrl}/${child.nodeSlug}`} >
              {child.title}
            </Link>
          </li>
        )}
      </ul>
    </div>;
  }
}

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

  componentDidMount() {
    const {tutorialData, dispatch, params} = this.props;

    if (!tutorialData || !tutorialData.title) {
      dispatch(loadTopic(params.tutorialSlug));
    }
  }

  render() {
    const {tutorialData} = this.props;

    return <div>
      {this.props.children}
      {tutorialData && tutorialData.title && <TutorialNav tutorialData={tutorialData} />}
    </div>
  }
}
