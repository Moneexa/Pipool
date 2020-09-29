const config = require('../config.json');
var BankAccountModel = require('./bank-accounts.model');
const stripe = require('stripe')(config.stripe.privateKey);

module.exports = {
    create,
    show
}

// this section is for later use when we will be integrating the stripe
// async function create(req, res) {
//     try {
//         const userId = res.locals.user.id;
//         let bankAccount = await BankAccountModel.findOne({ createdBy: userId });
//         let accountId;
//         if (!bankAccount) {
//             const account = await stripe.accounts.create({
//                 type: 'custom',
//                 capabilities: {
//                     transfers: { requested: true },
//                 }
//             });
//             const newBankAccount = new BankAccountModel({
//                 stripeAccountId: account.id,
//                 createdBy: userId
//             })
//             await newBankAccount.save();
//             accountId = account.id;
//         } else {
//             accountId = bankAccount.stripeAccountId;
//         }

//         const stripeAccount = await stripe.accounts.retrieve(
//             accountId
//         );

//         console.log(stripeAccount);
//         if (stripeAccount.requirements && (stripeAccount.requirements.errors.length > 0 || stripeAccount.requirements.disabled_reason)) {
//             const accountLinks = await stripe.accountLinks.create({
//                 account: accountId,
//                 refresh_url: 'http://localhost:3000/brand/payment',
//                 return_url: 'http://localhost:3000/brand/payment',
//                 type: 'account_onboarding',
//             });
//             return res.status(201).send({
//                 status: false,
//                 url: accountLinks.url
//             });
//         } else {
//             const loginLink = await stripe.accounts.createLoginLink(
//                 accountId
//             );
//             return res.status(200).send({
//                 status: true,
//                 url: loginLink
//             });
//         }

//     } catch (error) {
//         return res.status(500).send('Unable to add an account');
//     }


// } 

async function create(req, res) {
    try {
        const userId = res.locals.user.id;
        const paypalId = req.body.paypalId;
        await BankAccountModel.updateOne({ createdBy: userId }, { paypalId }, { upsert: true });
        return res.status(201).send("Successfully updated");
    }
    catch (error) {
        return res.status(500).send("Something went wrong while adding your account")
    }
}

async function show(req, res) {
    const userId = res.locals.user.id;
    try {
        let bankAccount = await BankAccountModel.findOne({ createdBy: userId });
        if (!bankAccount) return res.status(404).send("No account found");
        return res.status(200).send(bankAccount);

    } catch (error) {
        return res.status(500).send("Something went wrong while getting your account")
    }
}