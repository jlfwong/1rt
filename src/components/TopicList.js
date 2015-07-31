import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {getDomainColor} from '../components/colors';

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
    var {domainSlug} = this.props;

    var url = `${relativeUrl}/${child.nodeSlug}`;

    return <Link to={url} style={topicListItemStyle}>
      <h2 style={topicTitleStyle(domainSlug)}>{child.title}</h2>
    </Link>;
  }

  render() {
    const {topics, relativeUrl} = this.props;

    return <div style={topicListStyle}>
      {topics.map(this.renderTopic.bind(this, relativeUrl))}
    </div>;
  }
}
