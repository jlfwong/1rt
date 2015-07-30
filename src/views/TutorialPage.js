import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {load as loadTopic} from '../actions/topicActions';
import {topicWasRequested} from '../reducers/topic';
import SubwayIcon from '../components/SubwayIcon';

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

const tabLinkStyle = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 'normal',
  lineHeight: '18px',
  paddingLeft: '10px',
  color: '#555',
  position: 'relative',
};

const progressTitleStyle = {
  display: 'inline-block',
  minHeight: '40px',
  boxSizing: 'border-box',
  padding: '15px 15px 15px 50px',
  verticalAlign: 'middle'
};

class TutorialNav {
  static propTypes = {
    tutorialData: PropTypes.object.isRequired
  }

  renderNavItem(child, index, children) {
    var {tutorialData} = this.props;

    return <li key={child.nodeSlug}>
      <Link to={`${tutorialData.relativeUrl}/${child.nodeSlug}`}
          style={tabLinkStyle}>
        <SubwayIcon
            isLast={index === children.length - 1}
            isFirst={index === 0}
            kind={child.kind} />
        <span style={progressTitleStyle}>{child.title}</span>
      </Link>
    </li>;
  }

  render() {
    var {tutorialData} = this.props;

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

@connect((state, props) => {
  return {
    tutorialData: state.topic[props.params.tutorialSlug]
  }
})
export default
class TutorialPage {
  static propTypes = {
    tutorialData: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  componentDidMount() {
    const {tutorialData, dispatch, params} = this.props;

    if (!tutorialData || !tutorialData.title) {
      dispatch(loadTopic(params.tutorialSlug));
    }
  }

  render() {
    const {tutorialData} = this.props;

    return <div>
      {this.props.children}
      {tutorialData && tutorialData.title && <TutorialNav tutorialData={tutorialData} />}
    </div>
  }
}
