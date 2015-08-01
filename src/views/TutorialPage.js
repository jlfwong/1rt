import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import SubjectHeader from '../components/SubjectHeader';
import {TutorialNavList} from '../components/TutorialNav';
import {getTopicBySlug, getTopicById, getVideoById} from '../reducers/topictree';

@connect((state, props) => {
  const topicData = getTopicBySlug(state, props.params.tutorialSlug);
  const firstVideo = getVideoById(state, topicData.childData[0].id);

  return {topicData, firstVideo};
})
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

    return <div>wtf</div>;
  }
}
