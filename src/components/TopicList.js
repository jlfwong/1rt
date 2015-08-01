import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {getDomainColor} from '../components/colors';
import {TutorialNavList} from '../components/TutorialNav';

// TODO(jlfwong): De-dep this with TutorialNav.js
const basicBorder = `1px solid #ddd`;

const topicListStyle = {
  padding: "40px 15px"
}

const topicListItemStyle = {
  color: "#444",
  display: "table",
  marginTop: "-1px",
  minHeight: "40px",
  padding: "25px 20px",
  position: "relative",
  textDecoration: "none",
  zIndex: "2",
  borderBottom: basicBorder
};

const topicTitleStyle = (domainSlug) => ({
  fontSize: "18px",
  fontWeight: "normal",
  lineHeight: "1.3",
  textRendering: "optimizeLegibility",
  marginBottom: "6px",
  color: getDomainColor(domainSlug)
})

export default
class TopicList {
  renderTopic(relativeUrl, child) {
    const {domainSlug} = this.props;

    const url = `${relativeUrl}/${child.slug}`;

    const isTutorial = (child.childData.some(c => c.kind !== "Topic"))

    // TODO(jlfwong): Aggressively fetch data for tutorial content? This could
    // get to be a lot of requests if we fetch data for all tutorial nodes in
    // a topic.
    return <div style={topicListItemStyle} key={child.slug}>
      <Link to={url}>
        <h2 style={topicTitleStyle(domainSlug)}>{child.translatedTitle}</h2>
      </Link>
      <div>
        <div>{child.translatedDescription}</div>
        {/* TODO(jlfwong): Figure out why this crashes 
          {isTutorial &&
            <TutorialNavList tutorialData={child} domainSlug={domainSlug} />*/}
      </div>
    </div>;
  }

  render() {
    const {topics, relativeUrl} = this.props;

    return <div style={topicListStyle}>
      {topics.map(this.renderTopic.bind(this, relativeUrl))}
    </div>;
  }
}
