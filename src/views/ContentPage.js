import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import TutorialNav from '../components/TutorialNav';
import {getTopicBySlug, getTopicById} from '../reducers/topictree';

export default
class ContentPage {
  static propTypes = {
    params: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  static fetchData(store, nextParams) {
    return TutorialNav.DecoratedComponent.fetchData(store,
                nextParams.topicSlug, nextParams.tutorialSlug);
  }

  render() {
    const {location, params} = this.props;

    return <div>
      {this.props.children}
      <TutorialNav
        parentTopicSlug={params.topicSlug}
        tutorialSlug={params.tutorialSlug}
        activePath={location.pathname}
        domainSlug={params.domainSlug} />
    </div>
  }
}
