import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect, Connector} from 'react-redux';
import {getDomainColor} from '../components/colors';
import {TutorialNavList} from '../components/TutorialNav';
import {getTopicBySlug, getTopicById} from '../reducers/topictree';

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
@connect((state, props) => {
  const {topicData} = props;
  const subTopicData = topicData.childData.map(c => getTopicById(state, c.id))
                            .filter(x => !!x)
  return {subTopicData}
})
class TopicList {
  static fetchData(store, topicSlug, isTopic) {
    if (isTopic) {
      // If we're in a Topic, then we'll fetch two levels of hierarchy down so
      // we can render the tutorial nav inline.
      return [`topic:${topicSlug}/*/*`]
    } else {
      return [`topic:${topicSlug}/*`]
    }
  }

  renderTopic(relativeUrl, child) {
    const {domainSlug} = this.props;

    const url = `${relativeUrl}/${child.slug}`;

    const isTutorial = (child.childData.some(c => c.kind === "Video"))

    return <div style={topicListItemStyle} key={child.slug}>
      <Link to={url}>
        <h2 style={topicTitleStyle(domainSlug)}>{child.translatedTitle}</h2>
      </Link>
      <div>
        <div>{child.translatedDescription}</div>
        {isTutorial && <TutorialNavList
                          tutorialData={child}
                          domainSlug={domainSlug} />}
      </div>
    </div>;
  }

  render() {
    const {topicData, subTopicData} = this.props;

    return <div style={topicListStyle}>
      {subTopicData.map(this.renderTopic.bind(this, topicData.relativeUrl))}
    </div>;
  }
}
