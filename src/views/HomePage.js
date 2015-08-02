import '../object-assign-polyfill';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import SubjectHeader from '../components/SubjectHeader';
import TopicList from '../components/TopicList';
import {getTopicBySlug, getTopicById} from '../reducers/topictree';

const tap = (x) => {
  console.log(x); return x
}

export default
@connect((state, props) => {
  const getChildTopics = (topic) => (
    topic.childData.filter(c => c.kind === "Topic")
      .map(c => getTopicById(state, c.id))
      .filter(x => !!x)
  )

  const domains = getChildTopics(getTopicBySlug(state, "root"))
  const subjectsById = Object.assign(...domains.map(d =>
    getChildTopics(d).reduce((ret, s) => ({...ret, [s.id]: s}), {})
  ))

  return {domains, subjectsById}
})
class HomePage {
  static fetchData(store, nextParams) {
    return [`topic:root/*/*`]
  }

  render() {
    const {domains, subjectsById} = this.props;

    return <ul>
      {domains.map(d => {
        return <li key={d.id}>
          <Link to={d.relativeUrl}>
            {d.translatedTitle}
          </Link>
          <ul>
            {d.childData
              .filter(c => c.kind === "Topic")
              .map(s => subjectsById[s.id])
              .filter(x => !!x)
              .map(s => {
                return <li key={s.id}>
                  <Link to={s.relativeUrl}>
                    {s.translatedTitle}
                  </Link>
                </li>
              })}
          </ul>
        </li>
      })}
    </ul>;
  }
}

