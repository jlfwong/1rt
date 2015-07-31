import React, {Component, PropTypes} from 'react';
import SubwayIcon from '../components/SubwayIcon';
import {Link, State as RouterState} from 'react-router';
import {getDomainColors} from './colors';

const basicBorder = `1px solid #ddd`;

const containerStyle = {
  background: '#f7f7f7',
  border: basicBorder,
  margin: '0 10px 40px 10px'
};

const tutorialTitleStyle = {
  color: '#444',
  fontSize: '18',
  marginBottom: 0
};

const newTopicBreadcrumbStyle = {
  borderBottom: basicBorder,
  padding: "14px 14px 14px 24px"
};

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

export default
class TutorialNav {
  static propTypes = {
    tutorialData: PropTypes.object.isRequired,
    activePath: PropTypes.string.isRequired,
    domainSlug: PropTypes.string.isRequired
  }

  renderNavItem(child, index, children) {
    const {tutorialData, activePath, domainSlug} = this.props;

    // NOTE: relativeUrl contains a leading slash
    const url = `${tutorialData.relativeUrl}/${child.nodeSlug}`;

    const isActive = (activePath === url);

    return <li key={child.nodeSlug}>
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

    // TODO(jlfwong): Back to topic link, next tutorial link.
    return <div style={containerStyle}>
      <div style={newTopicBreadcrumbStyle}>
        <h1 style={tutorialTitleStyle}>
          {tutorialData.title}
        </h1>
      </div>
      <ul>
        {tutorialData.children.map(this.renderNavItem.bind(this))}
      </ul>
    </div>;
  }
}

