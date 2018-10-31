const express = require('express');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackJsConfig = require('../webpack.config');
const config = require('../my.config');

const ViewsRoot = 'server/views';
const Port = 3000;
const DefaultFileSendingOptions = {};

function getFileSendingOptions(options) {
  return Object.assign({}, DefaultFileSendingOptions, options);
}

function compileClientJs() {
  return new Promise((resolve, reject) => {
    console.log('Compiling the client app...');
    let resolved = false;

    const compiler = webpack(webpackJsConfig);
    if (config.watch) {
      compiler.watch({}, (err, stats) => {
        console.log(stats.toString({
          chunks: false,
          modules: false,
          colors: true
        }));

        if (err || stats.hasErrors()) {
          if (err) {
            console.error(err);
          }
          if (!resolved) {
            resolved = true;
            reject();
          }
        }
        else {
          if (!resolved) {
            resolved = true;
            resolve();
          }
        }
      });
    }
    else {
      compiler.run((err, stats) => {
        console.log(stats.toString({
          chunks: false,
          modules: false,
          colors: true
        }));

        if (err || stats.hasErrors()) {
          if (err) {
            console.error(err);
          }
          reject();
        }
        else {
          resolve();
        }
      });
    }
  });
}

function runApp() {
  console.log('Running the server.');

  const app = express();

  app.get('/', (req, res) => {
    res.sendFile(
      'index.html',
      getFileSendingOptions({
        root: ViewsRoot,
      })
    );
  });

  app.get('*', (req, res) => {
    const filePath = path.join('public', req.path);
    const filePathIsPublic = filePath.indexOf('public') >= 0;
    if (filePathIsPublic && fs.existsSync(filePath)) {
      res.sendFile(
        filePath,
        getFileSendingOptions({
          root: '.',
        })
      );
    }
    else {
      res.sendFile(
        '404.html',
        getFileSendingOptions({
          root: ViewsRoot,
        })
      );
    }
  });

  app.listen(Port);
  console.log(`Listening on port '${Port}'.`);
}

compileClientJs().then(
  () => {
    runApp();
  },
  () => process.exit(1)
);
