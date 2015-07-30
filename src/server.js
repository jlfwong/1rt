import Express from 'express';
import React from 'react';
import Location from 'react-router/lib/Location';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'http-proxy';
import path from 'path';
import createStore from './redux/create';
import ApiClient from './ApiClient';
import universalRouter from './universalRouter';
import PrettyError from 'pretty-error';
import serialize from 'serialize-javascript';

const pretty = new PrettyError();
const app = new Express();
const proxy = httpProxy.createProxyServer({
  target: 'http://localhost:' + config.apiPort
});

app.use(compression());
// app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

let webpackStats;

if (!__DEVELOPMENT__) {
  webpackStats = require('../webpack-stats.json');
}

app.use(require('serve-static')(path.join(__dirname, '..', 'static')));

const prologue = title => `<!doctype html><html lang="en-us">
<head><meta charset="utf-8"><title>${title}</title></head>
<body>
Hello World`;

const body = (webpackStats, component, store) => `
<div id="content">${React.renderToString(component)}</div>
<script>window.__data=${serialize(store.getState())}</script>
<script src=${webpackStats.script[0]}></script>
`;

const epilogue = `</body></html>`;

app.use((req, res) => {
  /*
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  res.setHeader('Transfer-Encoding', 'chunked');
  */

  if (__DEVELOPMENT__) {
    webpackStats = require('../webpack-stats.json');
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    delete require.cache[require.resolve('../webpack-stats.json')];
  }
  const client = new ApiClient(req);
  const store = createStore(client);
  const location = new Location(req.path, req.query);

  res.write(prologue("Khan Academy"));
  res.flush();

  if (__DISABLE_SSR__) {
    res.end(body(webpackStats, <div/>, store) + epilogue);
  } else {
    universalRouter(location, undefined, store)
      .then(({component, transition, isRedirect}) => {
          if (isRedirect) {
            res.redirect(transition.redirectInfo.pathname);
            return;
          }
          res.end(body(webpackStats, component, store) + epilogue);
      })
      .catch((error) => {
        console.error('ROUTER ERROR:', pretty.render(error));
        res.status(500).end(error.stack + epilogue);
      });
  }
});

if (config.port) {
  app.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
