const config = require('../config.json');
var BankAccountModel = require('./bank-accounts.model');
const stripe = require('stripe')(config.stripe.privateKey);

module.exports = {
    create
}


async function create(req, res) {
    try {
        const userId = res.locals.user.id;
        let bankAccount = await BankAccountModel.findOne({ createdBy: userId });
        let accountId;
        if (!bankAccount) {
            const account = await stripe.accounts.create({
                type: 'custom',
                capabilities: {
                    card_payments: { requested: true },
                    transfers: { requested: true },
                }
            });
            const newBankAccount = new BankAccountModel({
                stripeAccountId: account.id,
                createdBy: userId
            })
            await newBankAccount.save();
            accountId = account.id;
        } else {
            accountId = bankAccount.stripeAccountId;
        }

        const accountLinks = await stripe.accountLinks.create({
            account: accountId,
            refresh_url: 'http://localhost:3000/brand/payment',
            return_url: 'http://localhost:3000/brand/payment',
            type: 'account_onboarding',
        });
        res.status(201).send(accountLinks);
    } catch (error) {
        return res.status(500).send('Unable to add an account');
    }


} 