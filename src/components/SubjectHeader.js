import React, {Component, PropTypes} from 'react';
import {getSubjectColor} from './colors'

const headerStyle = (domainSlug) => ({
  background: getSubjectColor(domainSlug),
  padding: "60px 40px 60px 40px"
})

const subjectTitleStyle = {
  borderBottom: "1px solid rgba(255,255,255,0.5)",
  color: "#fff",
  fontSize: "52px",
  fontWeight: "normal",
  lineHeight: 1,
  textRendering: "optimizeLegibility",
  webkitFontSmoothing: "antialiased",
  marginBottom: "30px",
  paddingBottom: "20px"
};

const subjectDescriptionStyle = {
  color: "#fff",
  fontSize: "15px",
  fontWeight: 100,
  lineHeight: "22px",
  webkitFontSmoothing: "antialiased"
};

export default
class SubjectHeader {
  render() {
    const {domainSlug, title, description} = this.props;

    return <div style={headerStyle(domainSlug)}>
      <h1 style={subjectTitleStyle}>{title}</h1>
      <p style={subjectDescriptionStyle}>{description}</p>
    </div>
  }
}
