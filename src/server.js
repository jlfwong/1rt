import fs from 'fs';
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
import Header from './components/Header';
import http from 'http';
import http2 from 'http2';
import TopicTree from './TopicTree';

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

const prologue = (title, style) => `<!doctype html><html lang="en-us">
<head>
<meta charset="utf-8">
<title>${title}</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
<link rel="shortcut icon" href="https://www.khanacademy.org/favicon.ico?leaf">
<style type="text/css">${style}</style>
</head>
<body>
<div id="header">${React.renderToString(<Header />)}</div>
`;

const body = (webpackStats, component, store) => `
<div id="content">${React.renderToString(component)}</div>
<script>window.__data=${serialize(store.getState())}</script>
<script src=${webpackStats.script[0]}></script>
`;

const epilogue = `</body></html>`;

TopicTree.refreshData();

app.use('/api', (req, res) => {
  res.send(TopicTree.getDataForPaths(req.path.split(",")));
});

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    webpackStats = require('../webpack-stats.json');
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    delete require.cache[require.resolve('../webpack-stats.json')];
  }
  const client = new ApiClient(req);
  const store = createStore(client);
  const location = new Location(req.path, req.query);

  res.write(prologue("Khan Academy", fs.readFileSync("./static/site.css")));
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
  http.createServer(app).listen(config.port, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Express server listening on port ${config.port}`);
    }
  });

  // These self-signed certs were created following the process at
  // http://blog.matoski.com/articles/node-express-generate-ssl/
  const options = {
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('./ssl/server.crt'),
    ca: fs.readFileSync('./ssl/ca.crt'),
    requestCert: true,
    rejectUnauthorized: false
  };

  http2.createServer(options, app).listen(config.httpsPort, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Secure Express server listening on port ${config.httpsPort}`);
    }
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
