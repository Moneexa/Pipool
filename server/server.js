const express = require('express');
const bodyParser=require('body-parser');
var mongoose = require('./database/mongoose');
const app = express()

var cors = require('cors');


const loginRoute = require('./auth/login.router'); // Imports routes for the products
const signupRoute = require('./auth/signup.router'); // Imports routes for the products
const insightsRoute = require('./insights/insightsRouter')
const brandRoute = require('./brand/brandRoutes')
const proposalRoute = require('./proposals/proposalRoutes')
const campaignRoute = require('./campaign/campaignRoutes')
const twitter= require('./channel/channelRoutes');

var port = process.env.PORT || 4242;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World with Express'));
app.use(cors());

app.use('/api/auth/login', loginRoute);
app.use('/api/auth/signup', signupRoute);
app.use('/api/brands', brandRoute);
app.use('/api/campaigns', campaignRoute);
app.use('/api/influencers/channels', twitter);
app.use('/api/channels/insights', insightsRoute );
app.use('/api/proposals' , proposalRoute);

app.listen(port, () => console.log('Server running on port 4242!'))