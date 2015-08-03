import '../object-assign-polyfill';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import SubjectHeader from '../components/SubjectHeader';
import TopicList from '../components/TopicList';
import {getTopicBySlug, getTopicById} from '../reducers/topictree';
import {getDomainColor} from '../components/colors';

const tap = (x) => {
  console.log(x); return x
}

const browseLibraryHeading = {
  fontSize: '18px',
  textAlign: 'center'
}

const domainHeaderStyle = domainSlug => ({
  fontSize: '16px',
  padding: '20px 0px 4px 10px',
  color: getDomainColor(domainSlug)
});

const homepageSectionStyle = {
  background: "#fff",
  padding: "30px 20px 50px 20px",
  boxSizing: "border-box",
  border: 0,
  display: "table",
  tableLayout: "fixed"
};

const domainTableContainerStyle = domainSlug => ({
  borderTop: `2px solid ${getDomainColor(domainSlug)}`,
  // TODO(jlfwong): I think this is the same as basicBorder elsewhere
  borderLeft: `1px solid #ddd`
});

const subjectCellStyle = {
  padding: '5px 10px',
  display: 'block',
  textDecoration: 'none',
  borderRight: '1px solid #ddd',
  borderBottom: '1px solid #ddd'
}

export default
@connect((state, props) => {
  const getChildTopics = (topic) => (
    topic.childData.filter(c => c.kind === "Topic")
      .map(c => getTopicById(state, c.id))
      .filter(x => !!x)
  )

  const nChildTopics = (topic) => topic.childData.filter(c => c.kind === "Topic").length

  const domains = getChildTopics(getTopicBySlug(state, "root"))
                    .filter(d => nChildTopics(d) > 0)
                    .sort((a, b) => (nChildTopics(b) - nChildTopics(a)))

  const subjectsById = Object.assign(...domains.map(d =>
    getChildTopics(d).reduce((ret, s) => ({...ret, [s.id]: s}), {})
  ))

  return {domains, subjectsById}
})
class HomePage {
  static fetchData(store, nextParams) {
    return [`topic:root/*/*`]
  }

  renderDomainTable(domain) {
    const {subjectsById} = this.props;

    return <li key={domain.id}>
      <h2 style={domainHeaderStyle(domain.slug)}>
        <Link to={domain.relativeUrl}>
          {domain.translatedTitle}
        </Link>
      </h2>
      <ul style={domainTableContainerStyle(domain.slug)}>
        {domain.childData
          .filter(c => c.kind === "Topic")
          .map(s => subjectsById[s.id])
          .filter(x => !!x)
          .map(s => {
            return <li key={s.id} style={subjectCellStyle}>
              <Link to={s.relativeUrl}>
                {s.translatedTitle}
              </Link>
            </li>
          })}
      </ul>
    </li>
  }

  render() {
    const {domains} = this.props;

    return <div style={homepageSectionStyle}>
      <h1 style={browseLibraryHeading}>Browse our library</h1>
      <ul>
        {domains.map(this.renderDomainTable.bind(this))}
      </ul>
    </div>;
  }
}

