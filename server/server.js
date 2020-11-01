const express = require('express');
const bodyParser = require('body-parser');
var mongoose = require('./database/mongoose');
const fileUpload = require('express-fileupload');
const config = require('./config.json');

const app = express()
const stripe = require('stripe')(config.STRIPE_SECRET_KEY)
// const uuid = require("uuid/dist/v4")
const server = require('http').createServer(app);
var cors = require('cors');


const loginRoute = require('./auth/login.router'); // Imports routes for the products
const signupRoute = require('./auth/signup.router'); // Imports routes for the products
const brandRoute = require('./api/brands/brandRoutes')
const channelRoutes = require('./api/channels/channelsRoutes')
// const videos =  require('./videos/videosRoutes');
const chats =  require('./api/common/chat/chat.route');
const bankAccounts = require('./api/common/bank-accounts/bank-accounts.route');
const customers = require('./api/common/customers/customers.route');
const chatsSocket =  require('./api/common/chat/chat.socket');
const adminCampaignInsights  =  require('./api/admin/campaigns/campaignAdminRoutes');
const reportsAdminRoutes = require('./api/admin/reports/reportsAdminRoutes');
const adsRequests = require('./api/admin/ads/routes');
const adminChat = require('./api/admin/chat/chat.route');


var port = process.env.PORT || 4242;
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());
app.use(fileUpload({
    createParentPath: true
}));

app.get('/', (req, res) => res.send('Hello World with Express'));
app.use(cors());

app.use('/api/auth/login', loginRoute);
app.use('/api/auth/signup', signupRoute);
app.use('/api/brands', brandRoute);
app.use('/api/channels/', channelRoutes);
app.use('/api/chats', chats);
app.use('/api/bank-accounts', bankAccounts)
app.use('/api/customers', customers)
app.use('/api/admin/campaigns', adminCampaignInsights);
app.use('/api/admin/reports', reportsAdminRoutes);
app.use('/api/admin/ads-requests', adsRequests);
app.use('/api/admin/chat', adminChat);



// Socket.io configs
const options = { /* ... */ };
const io = require('socket.io')(server, options);
io.on('connection', socket => {
    chatsSocket.init(socket);
})

server.listen(port, () => console.log('Server running on port 4242!'))
