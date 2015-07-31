import React, {Component, PropTypes} from 'react';
import SubwayIcon from '../components/SubwayIcon';
import {Link, State as RouterState} from 'react-router';
import {getDomainColor} from './colors';

const basicBorder = `1px solid #ddd`;

const tabLinkStyle = (isActive, domainSlug) => ({
  display: 'block',
  fontSize: '13px',
  fontWeight: 'normal',
  lineHeight: '18px',
  paddingLeft: '10px',
  color: (isActive ? '#fff' : '#555'),
  position: 'relative',
  background: (isActive ? getDomainColor(domainSlug) : 'inherit')
});

const progressTitleStyle = {
  display: 'inline-block',
  minHeight: '40px',
  boxSizing: 'border-box',
  padding: '15px 15px 15px 50px',
  verticalAlign: 'middle'
};


export class TutorialNavList {
  static propTypes = {
    tutorialData: PropTypes.object.isRequired,
    domainSlug: PropTypes.string.isRequired,
    activePath: PropTypes.string
  }

  renderNavItem(child, index, children) {
    const {tutorialData, activePath, domainSlug} = this.props;

    // NOTE: relativeUrl contains a leading slash
    const url = `${tutorialData.relativeUrl}/${child.nodeSlug}`;

    const isActive = (activePath === url);

    return <li key={`${child.kind}:${child.nodeSlug}`}>
      <Link to={url} style={tabLinkStyle(isActive, domainSlug)}>
        <SubwayIcon
            isLast={index === children.length - 1}
            isFirst={index === 0}
            kind={child.kind} />
        <span style={progressTitleStyle}>{child.title}</span>
      </Link>
    </li>;
  }

  render() {
    const {tutorialData} = this.props;

    return <ul>
      {tutorialData.children.map(this.renderNavItem.bind(this))}
    </ul>;
  }
};

const containerStyle = {
  background: '#f7f7f7',
  border: basicBorder,
  margin: '0 10px 40px 10px'
};

const tutorialNavSectionStyle = {
  borderBottom: basicBorder,
}

const newTopicBreadcrumbStyle = {
  borderBottom: basicBorder,
  padding: "14px 14px 14px 24px"
};

const tutorialNavNextStyle = {
  padding: "14px 14px 14px 24px"
};

const tutorialNavNextLabelStyle = {
  color: '#aaa',
  textTransform: 'uppercase'
}

const tutorialTitleStyle = {
  color: '#444',
  fontSize: '18',
  marginBottom: 1
};

const topicTitleStyle = (domainSlug) => ({
    display: "block",
    lineHeight: "1.3",
    margin: "10px 0",
    textTransform: "uppercase",
    color: getDomainColor(domainSlug)
})

export default
class TutorialNav {
  static propTypes = {
    parentTopicData: PropTypes.object.isRequired,
    tutorialData: PropTypes.object.isRequired,
    activePath: PropTypes.string.isRequired,
    domainSlug: PropTypes.string.isRequired
  }

  render() {
    const {parentTopicData, domainSlug, tutorialData} = this.props;

    let tutorialIndexInTopic = null;
    parentTopicData.children.forEach((child, index) => {
      if (child.nodeSlug === tutorialData.nodeSlug) {
        tutorialIndexInTopic = index;
      }
    });

    const nextTutorialData = (tutorialIndexInTopic !== null &&
                              parentTopicData.children[tutorialIndexInTopic + 1]);

    return <div style={containerStyle}>
      <div style={newTopicBreadcrumbStyle}>
        <Link
            to={parentTopicData.relativeUrl}
            style={topicTitleStyle(domainSlug)}>
          {parentTopicData.title}
        </Link>
        <h1 style={tutorialTitleStyle}>
          {tutorialData.title}
        </h1>
      </div>
      <div style={tutorialNavSectionStyle}>
        <TutorialNavList {...this.props} />
      </div>
      {nextTutorialData &&
        <div style={tutorialNavNextStyle}>
          <div style={tutorialNavNextLabelStyle}>Next Section:</div>
          <Link to={`${parentTopicData.relativeUrl}/${nextTutorialData.nodeSlug}`}>
            {nextTutorialData.title}
          </Link>
        </div>}
    </div>;
  }
}

