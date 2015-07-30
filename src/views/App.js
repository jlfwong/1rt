import path from 'path';
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {createTransitionHook} from '../universalRouter';

export default
class App extends Component {
  render() {
    return (
      <div>
        Welcome to Khan Academy! <br/>
        {this.props.children}
      </div>
    );
  }
}
