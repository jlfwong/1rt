import React, {Component, PropTypes} from 'react';
import {getSubjectColor} from './colors'
import {Link} from 'react-router';

const headerStyle = (domainSlug) => ({
  background: getSubjectColor(domainSlug),
  padding: "60px 40px 60px 40px"
});

const subjectTitleStyle = {
  borderBottom: "1px solid rgba(255,255,255,0.5)",
  color: "#fff",
  fontSize: "36px",
  fontWeight: "normal",
  lineHeight: 1,
  textRendering: "optimizeLegibility",
  WebkitFontSmoothing: "antialiased",
  marginBottom: "30px",
  paddingBottom: "20px"
};

const subjectDescriptionStyle = {
  color: "#fff",
  fontSize: "15px",
  fontWeight: 100,
  lineHeight: "22px",
  WebkitFontSmoothing: "antialiased"
};

const breadcrumbStyle = {
  color: '#fff',
  opacity: 0.8,
  textTransform: 'uppercase'
};

export default
class SubjectHeader {
  static propTypes = {
    ancestorTopicData: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      relativeUrl: PropTypes.string.isRequired
    })),
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    domainSlug: PropTypes.string.isRequired
  };

  render() {
    const {ancestorTopicData, domainSlug, title, description} = this.props;

    return <div style={headerStyle(domainSlug)}>
      {ancestorTopicData &&
        ancestorTopicData.map((ancestor) => (
          <Link to={ancestor.relativeUrl}
              style={breadcrumbStyle}
              key={ancestor.id}>
            {ancestor.translatedTitle}
          </Link>
        ))}
      <h1 style={subjectTitleStyle}>{title}</h1>
      <p style={subjectDescriptionStyle}>{description}</p>
    </div>
  }
}
