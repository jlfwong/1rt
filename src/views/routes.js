import React, {Component, PropTypes} from 'react';
import {Route} from 'react-router';
import App from 'views/App';
import VideoContent from 'views/VideoContent';
import ContentPage from 'views/ContentPage';
import TutorialPage from 'views/TutorialPage';
import DomainPage from 'views/DomainPage';
import SubjectPage from 'views/SubjectPage';
import TopicPage from 'views/TopicPage';
import NotFound from 'views/NotFound';
import Redirect from 'views/Redirect';
import HomePage from 'views/HomePage';

class Dummy {
  render() {
    return <div>
      {this.props.children}
    </div>;
  }
}

const index = component => ({indexRoute: {component}, component: Dummy})

export default (
  <Route component={App}>
    <Route path="/" {...index(HomePage)}>
      <Route path=":domainSlug" {...index(DomainPage)}>
        <Route path=":subjectSlug" {...index(SubjectPage)}>
          <Route path=":topicSlug" {...index(TopicPage)}>
            <Route path=":tutorialSlug" {...index(TutorialPage)}>
              <Route component={ContentPage}>
                <Route path="v/:videoSlug" component={VideoContent} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
    <Route path="*" component={NotFound}/>
  </Route>
);
