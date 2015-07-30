import React from 'react';
import {Route} from 'react-router';
import App from 'views/App';
import Home from 'views/Home';
import VideoPage from 'views/VideoPage';
import Widgets from 'views/Widgets';
import About from 'views/About';
import Login from 'views/Login';
import NotFound from 'views/NotFound';
import Redirect from 'views/Redirect';

export default (
  <Route component={App}>
    <Route path="/:videoReadableId" component={VideoPage}/>
    <Route path="*" component={NotFound}/>
  </Route>
);
