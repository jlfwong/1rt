import React from 'react';
import {Route} from 'react-router';
import App from 'views/App';
import VideoPage from 'views/VideoPage';
import TutorialPage from 'views/TutorialPage';
import NotFound from 'views/NotFound';
import Redirect from 'views/Redirect';

class Dummy {
  render() {
    return <div>
      {this.props.children}
    </div>;
  }
}

class DomainPage {
  render() {
    return <h1>Domain</h1>;
  }
}

class SubjectPage {
  render() {
    return <h1>Subject</h1>;
  }
}

class TopicPage {
  render() {
    return <h1>Topic</h1>;
  }
}

class HomePage {
  render() {
    return <h1>Home</h1>
  }
}

const index = component => ({indexRoute: {component}, component: Dummy})

export default (
  <Route path="/" component={App} {...index(HomePage)}>
    <Route path=":domainSlug" {...index(DomainPage)}>
      <Route path=":subjectSlug" {...index(SubjectPage)}>
        <Route path=":topicSlug" {...index(TopicPage)}>
          <Route path=":tutorialSlug" {...index(TutorialPage)}>
            {/* TODO(jlfwong): Rename this to ContentPage */}
            <Route component={TutorialPage}>
              <Route path="v/:videoReadableId" component={VideoPage} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
    <Route path="*" component={NotFound}/>
  </Route>
);
