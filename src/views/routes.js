import React from 'react';
import {Route} from 'react-router';
import App from 'views/App';
import VideoPage from 'views/VideoPage';
import NotFound from 'views/NotFound';
import Redirect from 'views/Redirect';

export default (
  <Route component={App}>
    <Route path="/:videoReadableId" component={VideoPage}/>
    <Route path="*" component={NotFound}/>
  </Route>
);
