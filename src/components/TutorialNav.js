import React, {Component, PropTypes} from 'react';
import SubwayIcon from '../components/SubwayIcon';
import {Link, State as RouterState} from 'react-router';
import {connect} from 'react-redux';
import {getDomainColor} from './colors';
import {getTopicBySlug, getTopicById, getVideoById} from '../reducers/topictree';

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

const tap = (x) => { console.log(x); return x; }

@connect((state, props) => {
  // Could be articles as well, later
  const tutorialContent = props.tutorialData.childData
                            .filter(c => c.kind === "Video")
                            .map(c => getVideoById(state, c.id))
                            .filter(x => !!x)
                            .map(c => ({...c, kindCode: "v", kind: "Video"}))

  return {tutorialContent};
})
export class TutorialNavList {
  static propTypes = {
    tutorialData: PropTypes.object.isRequired,
    tutorialContent: PropTypes.array.isRequired,
    domainSlug: PropTypes.string.isRequired,
    activePath: PropTypes.string
  }

  static fetchData(store, tutorialSlug) {
    return [`topic:${tutorialSlug}/*`]
  }

  renderNavItem(child, index, children) {
    const {tutorialData, activePath, domainSlug} = this.props;

    // NOTE: relativeUrl contains a leading slash
    const url = `${tutorialData.relativeUrl}/${child.kindCode}/${child.slug}`;

    const isActive = (activePath === url);

    return <li key={`${child.kind}:${child.slug}`}>
      <Link to={url} style={tabLinkStyle(isActive, domainSlug)}>
        <SubwayIcon
            isLast={index === children.length - 1}
            isFirst={index === 0}
            kind={child.kind} />
        <span style={progressTitleStyle}>{child.translatedTitle}</span>
      </Link>
    </li>;
  }

  render() {
    const {tutorialContent} = this.props;

    return <ul>
      {tutorialContent.map(this.renderNavItem.bind(this))}
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
  display: "block",
  padding: "14px 14px 14px 24px",
  color: '#555'
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
@connect((state, props) => {
  const tutorialData = getTopicBySlug(state, props.tutorialSlug);
  const parentTopicData = getTopicBySlug(state, props.parentTopicSlug);
  const tutorialDatasInParentTopic = parentTopicData.childData
                                        .map(c => getTopicById(state, c.id))
                                        .filter(x => !!x);

  return {tutorialData, parentTopicData, tutorialDatasInParentTopic};
})
class TutorialNav {
  static propTypes = {
    tutorialData: PropTypes.object.isRequired,
    activePath: PropTypes.string.isRequired,
    parentTopicSlug: PropTypes.string.isRequired,

    tutorialSlug: PropTypes.object.isRequired,
    domainSlug: PropTypes.string.isRequired
  }

  static fetchData(store, parentTopicSlug, tutorialSlug) {
    return [
      `topic:${parentTopicSlug}/*`,
      `topic:${tutorialSlug}/*`
    ]
  }

  render() {
    const {
      parentTopicData,
      domainSlug,
      tutorialData,
      tutorialDatasInParentTopic
    } = this.props;

    let tutorialIndexInTopic = null;
    tutorialDatasInParentTopic.forEach((child, index) => {
      if (child.id === tutorialData.id) {
        tutorialIndexInTopic = index;
      }
    });

    const nextTutorialData = (tutorialIndexInTopic !== null &&
                              tutorialDatasInParentTopic[tutorialIndexInTopic + 1]);

    return <div style={containerStyle}>
      <div style={newTopicBreadcrumbStyle}>
        <Link
            to={parentTopicData.relativeUrl}
            style={topicTitleStyle(domainSlug)}>
          {parentTopicData.translatedTitle}
        </Link>
        <h1 style={tutorialTitleStyle}>
          {tutorialData.translatedTitle}
        </h1>
      </div>
      <div style={tutorialNavSectionStyle}>
        <TutorialNavList {...this.props} />
      </div>
      {nextTutorialData &&
        <Link to={`${parentTopicData.relativeUrl}/${nextTutorialData.slug}`}
              style={tutorialNavNextStyle}>
          <div style={tutorialNavNextLabelStyle}>Next Section:</div>
          {nextTutorialData.translatedTitle}
        </Link>}
    </div>;
  }
}

