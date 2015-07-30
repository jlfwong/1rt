import path from 'path';
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {isLoaded as isInfoLoaded} from '../reducers/info';
import {isLoaded as isAuthLoaded} from '../reducers/auth';
import {load as loadInfo} from '../actions/infoActions';
import * as authActions from '../actions/authActions';
import {load as loadAuth} from '../actions/authActions';
import InfoBar from '../components/InfoBar';
import {createTransitionHook} from '../universalRouter';
import {relativeToSrc} from '../util';

class App extends Component {
  static propTypes = {
    logout: PropTypes.func
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  componentWillMount() {
    const {router, store} = this.context;
    router.addTransitionHook(createTransitionHook(store));
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default
class AppContainer {
  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  }

  static fetchData(store) {
    const promises = [];
    if (!isInfoLoaded(store.getState())) {
      promises.push(store.dispatch(loadInfo()));
    }
    if (!isAuthLoaded(store.getState())) {
      promises.push(store.dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }

  render() {
    const { user, dispatch } = this.props;
    return <App {...bindActionCreators(authActions, dispatch)}>
      {this.props.children}
    </App>;
  }
}
