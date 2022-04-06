#!/usr/bin/env node

const Node = require('./Node.js');
const path = require('path');

let gateway = new Node();
let config = {
  "cluster": {
    "enabled": true,
    "name": "jsbattle-dev"
  },
  "loglevel": "trace",
  "logger": {
      "type": "Console",
      "options": {
          colors: true,
          moduleColors: true,
          formatter: "short",
          autoPadding: true
      }
  },
  "web": {
    "webroot": path.join(__dirname, 'public'),
    "host": "127.0.0.1",
    "baseUrl": "http://localhost:9000",
    "port": "9000",
    "gaCode": "AB-123456789-Z"
  },
  "league": {
    "scheduleInterval": 5000,
    "timeLimit": 10000,
    "cutOffFightCount": 100,
    "cutOffWinRatio": 0.05,
  },
  "ubdPlayer": {
    "enabled": true,
    "queueLimit": 3,
    "queueQueryTime": 5000,
    "speed": 5,
    "timeout": 20000
  },
  "auth": {
    "enabled": true,
    "admins": [
      {
        provider: 'github',
        username: 'jamro'
      },
      {
        provider: 'mock',
        username: 'mock'
      }
    ],
    "providers": [{ "name": "mock" }]
  }
};
gateway.init(config).then(() => gateway.start())
.catch(console.error);
