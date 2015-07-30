import React, {Component, PropTypes} from 'react';
import serialize from 'serialize-javascript';
const cdn = '//cdnjs.cloudflare.com/ajax/libs/';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    webpackStats: PropTypes.object,
    component: PropTypes.object,
    store: PropTypes.object
  }

  render() {
    const {webpackStats, component, store} = this.props;
    const title = 'Video Page 1RT';
    const description = 'All the modern best practices in one example.';
    const image = 'https://react-redux.herokuapp.com/logo.jpg';
    return (
      <html lang="en-us">
        <head>
          <meta charSet="utf-8"/>
          <title>{title}</title>
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{__html: React.renderToString(component)}}/>
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} />
          <script src={webpackStats.script[0]}/>
        </body>
      </html>
    );
  }
}
