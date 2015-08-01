import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import SubjectHeader from '../components/SubjectHeader';
import {TutorialNavList} from '../components/TutorialNav';
import {getTopicBySlug, getTopicById, getVideoById} from '../reducers/topictree';

const tap = (v) => { console.log(v); return v; }

const debug = (fn) => (...args) => {
  console.log("Arg:", args);
  const ret = fn(...args);
  console.log("Ret:", ret);
  return ret;
}

@connect(debug((state, props) => ({
  topicData: getTopicBySlug(state, props.params.tutorialSlug),
  firstVideo: getVideoById(state, getTopicBySlug(state, props.params.tutorialSlug).childData[0].id)
})))
export default
class TutorialPage {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentDidMount() {
    const {topicData, params, firstVideo} = this.props;
    const {router} = this.context;

    // Redirect to the first content node in the tutorial.
    router.replaceWith(
            `${topicData.relativeUrl}/v/${firstVideo.slug}`);
  }

  static fetchData(store, nextParams) {
    return [`topic:${nextParams.tutorialSlug}/*`]
  }

  render() {
    const {topicData, params} = this.props;

    return <div />;
  }
}
