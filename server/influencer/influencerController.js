var InfluencerModel = require('./InfluencerModel.js');
const Twitter = require('twitter-lite')
const config = require('../config.json')
const axios = require('axios')
/**
 * influencerController.js
 *
 * @description :: Server-side logic for managing influencers.
 */
module.exports = {

    /**
     * influencerController.list()
     */
    list: function (req, res) {
        InfluencerModel.find(function (err, influencers) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting influencer.',
                    error: err
                });
            }
            return res.json(influencers);
        });
    },

    /**
     * influencerController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        InfluencerModel.findOne({ _id: id }, function (err, influencer) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting influencer.',
                    error: err
                });
            }
            if (!influencer) {
                return res.status(404).json({
                    message: 'No such influencer'
                });
            }
            return res.json(influencer);
        });
    },

    /**
     * influencerController.create()
     */
    create: function (req, res) {
        var influencer = new InfluencerModel({
            channel_name: req.body.channel_name,
            channel_id: req.body.channel_id,
            screen_name: req.body.screen_name,
            name: req.body.name

        });

        influencer.save(function (err, influencer) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating influencer',
                    error: err
                });
            }
            return res.status(201).json(influencer);
        });
    },

    /**
     * influencerController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        InfluencerModel.findOne({ _id: id }, function (err, influencer) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting influencer',
                    error: err
                });
            }
            if (!influencer) {
                return res.status(404).json({
                    message: 'No such influencer'
                });
            }

            influencer.channel_name = req.body.channel_name ? req.body.channel_name : influencer.channel_name;
            influencer.channel_id = req.body.channel_id ? req.body.channel_id : influencer.channel_id;
            influencer.screen_name = req.body.screen_name ? req.body.screen_name : influencer.screen_name;
            influencer.name = req.body.name ? req.body.name : influencer.name;

            influencer.save(function (err, influencer) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating influencer.',
                        error: err
                    });
                }

                return res.json(influencer);
            });
        });
    },

    /**
     * influencerController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        InfluencerModel.findByIdAndRemove(id, function (err, influencer) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the influencer.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },

    twitterOAuth: async function (req, res) {

        try {

            const client = new Twitter({
                consumer_key: config.twitter.api_key, // from Twitter.
                consumer_secret: config.twitter.api_secret, // from Twitter.
                callback: config.twitter.redirectUri

            });
            const response = await client.getRequestToken(config.twitter.redirectUri)

            res.status(200).send(response)
            /* const client = new Twitter({
               consumer_key: config.twitter.api_key,
               consumer_secret: config.twitter.api_secret,
               access_token_key: response.data.oauth_token,
               access_token_secret: response.data.oauth_token_secret
             });*/
        }
        catch (error) {
            res.json(error)
        }
        // fetching email

    },
    twitterPostOAuth: async function (req, res) {
        try {
            let client = new Twitter({
                consumer_key: config.twitter.api_key,
                consumer_secret: config.twitter.api_secret,
            });

            const fetchedCredentials = await client.getAccessToken({
                oauth_verifier: req.body.verifier,
                oauth_token: req.body.oauth_token
            })

            client = new Twitter({
                consumer_key: config.twitter.api_key,
                consumer_secret: config.twitter.api_secret,
                access_token_key: fetchedCredentials.oauth_token,
                access_token_secret: fetchedCredentials.oauth_token_secret
            });

            const existingChannel = await InfluencerModel.findOne({ channelId: fetchedCredentials.user_id, channelType: 'twitter' });
            if (existingChannel) return res.status(405).send('Channel already exists');
            const userData = await client.get("users/show", {
                user_id: fetchedCredentials.user_id
            });

            var influencerModel = new InfluencerModel({
                channelName: userData.name,
                channelId: userData.id,
                followers: userData.followers_count,
                channelType: 'twitter'
            });

            const influencer = await influencerModel.save();
            res.status(201).send(influencer);
        }
        catch (error) {
            console.error(error);
            res.status(401).send("Unable to add channel. Make sure you have authorized the app.")
        }

    },
    youtubeOAuth: async function (req, res) {
        try {
            const { token, id } = req.body;
            const res = await axios.post(`https://www.googleapis.com/youtube/v3/channels?part=id,statistics,snippet&mine=true&key=AIzaSyDe6galtm6BnVZE-8PfF7v8YtZzSeyO9S0`,
                undefined,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }
};
