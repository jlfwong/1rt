import React from 'react';
import {Route} from 'react-router';
import App from 'views/App';
import VideoPage from 'views/VideoPage';
import TutorialPage from 'views/TutorialPage';
import NotFound from 'views/NotFound';
import Redirect from 'views/Redirect';

export default (
  <Route component={App}>
    <Route path=":domain/:subject/:topic/:tutorial" component={TutorialPage}>
      <Route path="v/:videoReadableId" component={VideoPage}/>
    </Route>
    <Route path="*" component={NotFound}/>
  </Route>
);
