import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {load as loadTopic} from '../actions/topicActions';
import {topicWasRequested} from '../reducers/topic';

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

const subwayIconStyle = {
  display: 'block',
  width: '40px',
  height: '100%',
  top: 0
};

const pipeStyle = {
  background: '#cdcdcd',
  height: '100%',
  paddingTop: '2px',
  position: 'absolute',
  top: '-1px',
  right: 'auto',
  bottom: 'auto',
  left: '18px',
  width: '4px',
  zIndex: 10
};

const pipeStyleFirst = {
  ...pipeStyle,
  bottom: '-1px',
  height: '50%',
  top: 'auto'
};

const pipeStyleLast = {
  ...pipeStyle,
  height: '50%'
};

const iconStyle = kind => ({
  // TODO(jlfwong): Consider using a data URI here
  backgroundImage: `url(https://www.kastatic.org/images/progress-icons/subway-sprites-${kind.toLowerCase()}-science.svg)`,
  backgroundSize: '25px 75px',
  height: '25px',
  width: '25px',
  overflow: 'hidden',
  position: 'absolute',
  top: '50%',
  right: 'auto',
  bottom: 'auto',
  left: '8px',
  marginTop: '-12px',
  zIndex: 20
})

class TutorialNav {
  static propTypes = {
    tutorialData: PropTypes.object.isRequired
  }

  renderNavItem(child, index, children) {
    var {tutorialData} = this.props;

    var thisPipeStyle = pipeStyle;

    if (index === 0) {
      thisPipeStyle = pipeStyleFirst;
    } else if (index === children.length - 1) {
      thisPipeStyle = pipeStyleLast;
    }

    return <li key={child.nodeSlug}>
      <Link to={`${tutorialData.relativeUrl}/${child.nodeSlug}`}
          style={tabLinkStyle}>
        <div style={subwayIconStyle}>
          {(children.length > 1) && <div style={thisPipeStyle}></div>}
          <div style={iconStyle(child.kind)}></div>
        </div>
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
