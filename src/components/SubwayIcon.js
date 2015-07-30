import React, {Component, PropTypes} from 'react';

const subwayIconStyle = {
  display: 'block',
  width: '40px',
  height: '100%',
  top: 0
};

const pipeStyle = {
  background: '#cdcdcd',
  height: '100%',
  paddingTop: '2px',
  position: 'absolute',
  top: '-1px',
  right: 'auto',
  bottom: 'auto',
  left: '18px',
  width: '4px',
  zIndex: 10
};

const pipeStyleFirst = {
  ...pipeStyle,
  bottom: '-1px',
  height: '50%',
  top: 'auto'
};

const pipeStyleLast = {
  ...pipeStyle,
  height: '50%'
};

const iconStyle = kind => ({
  // TODO(jlfwong): Consider using a data URI here
  backgroundImage: `url(https://www.kastatic.org/images/progress-icons/subway-sprites-${kind.toLowerCase()}-science.svg)`,
  backgroundSize: '25px 75px',
  height: '25px',
  width: '25px',
  overflow: 'hidden',
  position: 'absolute',
  top: '50%',
  right: 'auto',
  bottom: 'auto',
  left: '8px',
  marginTop: '-12px',
  zIndex: 20
})

export default
class SubwayIcon {
  static propTypes = {
    isFirst: PropTypes.bool.isRequired,
    isLast: PropTypes.bool.isRequired,
    kind: PropTypes.string.isRequired
  }

  render() {
    var {isLast, isFirst, kind} = this.props;

    var thisPipeStyle = pipeStyle;
    if (isFirst) {
      thisPipeStyle = pipeStyleFirst;
    } else if (isLast) {
      thisPipeStyle = pipeStyleLast;
    }

    return <div>
      <div style={subwayIconStyle}>
        {!(isFirst && isLast) && <div style={thisPipeStyle}></div>}
        <div style={iconStyle(kind)}></div>
      </div>
    </div>;
  }
}
