const express = require('express');
const next = require('next');
const sitemapAndRobots = require('./sitemapAndRobots');

const dev = process.env.NODE_ENV !== 'production';

const port = process.env.PORT || 4160;

const ROOT_URL = dev
  ? `http://localhost:${port}`
  : 'https://awesome-nextjs-starter.now.sh';

const app = next({ dev });
const handle = app.getRequestHandler();

// Nextjs's server prepared
app.prepare().then(() => {
  const server = express();

  sitemapAndRobots({ server });

  server.get('*', (req, res) => handle(req, res));

  // starting express server
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on ${ROOT_URL}`); // eslint-disable-line no-console
  });
});
