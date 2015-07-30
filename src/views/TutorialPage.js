import React, {Component, PropTypes} from 'react';

export default
class VideoPage extends Component {
  render() {
    return <div>
      {this.props.children}
    </div>
  }
}
