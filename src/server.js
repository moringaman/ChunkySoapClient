import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { payment_intents } from '../src/api'
const path = require('path')

const stripeCallHandler = (req, res) => {
  console.log("STRIPE HANDLER ", req.query.data)
  res.status(200).json(JSON.parse(req.query.data))
}

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const publicFolder = process.env.NODE_ENV === 'production' ? path.join(__dirname, '../build/public') : process.env.RAZZLE_PUBLIC_DIR;


const server = express();
server
  .disable('x-powered-by')
  .use(express.static(publicFolder))
  .get('/api/stripe-payment', stripeCallHandler)
  .get('/api/payment_intents', payment_intents)
  .get('/*', (req, res) => {
    const context = {};
    const markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Chunky Soap Company</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
      );
    }
  });

export default server;
