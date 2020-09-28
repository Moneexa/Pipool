const express = require('express');
const bodyParser = require('body-parser');
var mongoose = require('./database/mongoose');
const fileUpload = require('express-fileupload');
const config = require('./config.json');

const app = express()
const stripe = require('stripe')(config.STRIPE_SECRET_KEY)
const uuid = require("uuid/dist/v4")
const server = require('http').createServer(app);
var cors = require('cors');


const loginRoute = require('./auth/login.router'); // Imports routes for the products
const signupRoute = require('./auth/signup.router'); // Imports routes for the products
const insightsRoute = require('./insights/insightsRouter')
const brandRoute = require('./brand/brandRoutes')
const brandProposalRoutes = require('./proposals/brandProposalRoutes')
const influencerProposalRoute = require('./proposals/influencerProposalRoutes')
const campaignRoute = require('./campaign/campaignRoutes')
const twitter = require('./channel/channelRoutes');
const videos = require('./videos/videosRoutes');
const chats = require('./chat/chat.route');
const chatsSocket = require('./chat/chat.socket');


var port = process.env.PORT || 4242;
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());
app.use(fileUpload({
    createParentPath: true
}));

app.get('/', (req, res) => res.send('Hello World with Express'));
app.post('/api/payment', async (req, res) => {
    const { project, token } = req.body;
    const idempotencyKey = uuid();
    try {
        const cust = await stripe.customer.create({
            email: token.email,
            source: token.id,
        })
        if (cust) {
            const result = await stripe.charges.create({
                amount: project.price * 100,
                currency: usd,
                customer: cust.id,
                recipient_email: token.email
            }, { idempotencyKey })
            res.status(200).send(result)
        }
    }
    catch (error) {
        console.log(error)
    }



})
app.use(cors());

app.use('/api/auth/login', loginRoute);
app.use('/api/auth/signup', signupRoute);
app.use('/api/brands', brandRoute);
app.use('/api/campaigns', campaignRoute);
app.use('/api/influencers/channels', twitter);
app.use('/api/channels/insights', insightsRoute);
app.use('/api/brands/proposals', brandProposalRoutes);
app.use('/api/influencers/proposals', influencerProposalRoute);
app.use('/api/chats', chats)



// Socket.io configs
const options = { /* ... */ };
const io = require('socket.io')(server, options);
io.on('connection', socket => {
    chatsSocket.init(socket);
})

server.listen(port, () => console.log('Server running on port 4242!'))