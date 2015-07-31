import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {getDomainColor} from '../components/colors';
import {maybeLoadTopic} from '../actions/topicActions';
import {TutorialNavList} from '../components/TutorialNav';
import {getTopic} from '../reducers/topic';

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
@connect((state, props) => ({
  topicDetails: props.topics.map(t => getTopic(state, t.nodeSlug))
}))
class TopicList {
  static propTypes = {
    topics: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      nodeSlug: PropTypes.string.isRequired
    })),

    relativeUrl: PropTypes.string.isRequired,

    domainSlug: PropTypes.string.isRequired,

    topicDetails: PropTypes.arrayOf(PropTypes.shape({
      description: PropTypes.string.isRequired
    }))
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentDidMount() {
    const {topics} = this.props;
    const {store} = this.context;

    topics.forEach(t => maybeLoadTopic(store, t.nodeSlug));
  }

  renderTopic(relativeUrl, child, index) {
    const {domainSlug, topicDetails} = this.props;
    const details = topicDetails[index];

    const url = `${relativeUrl}/${child.nodeSlug}`;

    const isTutorial = (details &&
                          details.children.some(c => c.kind !== "Topic"))

    return <div style={topicListItemStyle} key={child.nodeSlug}>
      <Link to={url} style={topicListItemStyle}>
        <h2 style={topicTitleStyle(domainSlug)}>{child.title}</h2>
      </Link>
      {details &&
        <div>
          <div>{details.description}</div>
          {isTutorial &&
            <TutorialNavList tutorialData={details} domainSlug={domainSlug} />}
        </div>}
    </div>;
  }

  render() {
    const {topics, relativeUrl} = this.props;

    return <div style={topicListStyle}>
      {topics.map(this.renderTopic.bind(this, relativeUrl))}
    </div>;
  }
}
