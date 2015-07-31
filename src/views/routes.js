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

export default (
  <Route component={App}>
    <Route path=":domainSlug" component={Dummy}>
      <Route path=":subjectSlug" component={Dummy}>
        <Route path=":topicSlug" component={Dummy}>
          <Route path=":tutorialSlug" component={TutorialPage}>
            <Route path="v/:videoReadableId" component={VideoPage}/>
          </Route>
        </Route>
      </Route>
    </Route>
    <Route path="*" component={NotFound}/>
  </Route>
);
