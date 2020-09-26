const config = require('../config.json');
var CustomerModel = require('./customers.model');
const stripe = require('stripe')(config.stripe.privateKey);

module.exports = {
    create,
    verifySession,
    verifySetup
}


async function create(req, res) {
    try {
        const userId = res.locals.user.id;
        let customer = await CustomerModel.findOne({ createdBy: userId });
        if (!customer) {
            const newStripeCustomer = await stripe.customers.create();
            customer = new CustomerModel({
                customerId: newStripeCustomer.id,
                createdBy: userId
            })
            await customer.save()
        }
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'setup',
            customer: customer.customerId,
            success_url: 'http://localhost:3000/influencer/payment?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:3000/influencer/payment',
        });
        return res.status(201).send({ sessionId: session.id })
    } catch (error) {
        return res.status(500).send('Unable to add an account');
    }


}


async function verifySession(req, res) {
    const sessionId = req.query.session_id;
    if (!sessionId) {
        return res.redirect('http://localhost:3000/')
    }
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (!session.setup_intent || !session.customer) {
            return res.redirect('http://localhost:3000/')
        }
        console.log(session)
        await CustomerModel.updateOne({
            customerId: session.customer
        }, { setupIntent: session.setup_intent })
        return res.redirect('http://localhost:3000/')
    } catch (error) {
        return res.redirect('http://localhost:3000/')
    }
}

async function verifySetup(req, res) {
    const userId = res.locals.user.id;
    const customer = await CustomerModel.findOne({ createdBy: userId });
    if (customer.setupIntent) {
        return res.status(200).send();
    }
    else res.status(404).send();
}