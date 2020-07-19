var ChannelModel = require('./channelModel.js');
const Twitter = require('twitter-lite')
const config = require('../config.json')
const fetch = require("node-fetch");
const axios = require('axios')
/**
 * channelController.js
 *
 * @description :: Server-side logic for managing channels.
 */
module.exports = {

    /**
     * channelController.list()
     */
    list: function (req, res) {
        ChannelModel.find(function (err, channels) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting channel.',
                    error: err
                });
            }
            return res.json(channels);
        });
    },

    /**
     * channelController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        ChannelModel.findOne({ createdBy: res.locals.user.id }, function (err, channel) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting channel.',
                    error: err
                });
            }
            if (!channel) {
                return res.status(404).json({
                    message: 'No such channel'
                });
            }
            return res.json(channel);
        });
    },

    /**
     * channelController.create()
     */
    create: function (req, res) {
        var channel = new ChannelModel({
            channel_name: req.body.channel_name,
            channel_id: req.body.channel_id,
            screen_name: req.body.screen_name,
            name: req.body.name,
            createdBy: res.locals.user.id


        });

        channel.save(function (err, channel) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating channel',
                    error: err
                });
            }
            return res.status(201).json(channel);
        });
    },

    /**
     * channelController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        ChannelModel.findOne({ _id: id }, function (err, channel) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting channel',
                    error: err
                });
            }
            if (!channel) {
                return res.status(404).json({
                    message: 'No such channel'
                });
            }

            channel.channel_name = req.body.channel_name ? req.body.channel_name : channel.channel_name;
            channel.channel_id = req.body.channel_id ? req.body.channel_id : channel.channel_id;
            channel.screen_name = req.body.screen_name ? req.body.screen_name : channel.screen_name;
            channel.name = req.body.name ? req.body.name : channel.name;

            channel.save(function (err, channel) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating channel.',
                        error: err
                    });
                }

                return res.json(channel);
            });
        });
    },

    /**
     * channelController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        ChannelModel.findByIdAndRemove(id, function (err, channel) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the channel.',
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

            const existingChannel = await ChannelModel.findOne({ channelId: fetchedCredentials.user_id, channelType: 'twitter' });
            if (existingChannel) return res.status(405).send('Channel already exists');
            const userData = await client.get("users/show", {
                user_id: fetchedCredentials.user_id
            });

            var channels = new ChannelModel({
                channelName: userData.name,
                channelId: userData.id,
                followers: userData.followers_count,
                channelType: 'twitter'
            });

            const channel = await channels.save();
            res.status(201).send(channel);
        }
        catch (error) {
            console.error(error);
            res.status(401).send("Unable to add channel. Make sure you have authorized the app.")
        }

    },
    youtubeOAuth: async function (req, res) {
        try {
            const { token, id } = req.body;
            const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=id,statistics,snippet&mine=true&key=AIzaSyDe6galtm6BnVZE-8PfF7v8YtZzSeyO9S0`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
            for (let channel of data.items) {
                if (channel.id === id) {
                    const channels = new ChannelModel({
                        channelName: channel.snippet.title,
                        channelId: id,
                        followers: channel.statistics.subscriberCount,
                        channelType: 'youtube'
                    })
                    const newChannel = await channels.save();
                    return res.status(201).send(newChannel)
                }
            }
            throw ("Channel not found")

        } catch (error) {
            console.log(error)
            res.status(400).send('Unable to add channel. Make sure you authorized it');
        }
    },
    InstaPostOAuth: async function (req, res) {
        const body = {
            client_id: config.instagram.appId,
            client_secret: config.instagram.secret
        }
        try {
            const response = await axios.post(`https://api.instagram.com/oauth/access_token?client_id=${config.instagram.appId}&client_secret=${config.instagram.secret}&grant_type=authorization_code&redirect_uri=${config.instagram.redirectUri}&code=${req.body.token}`, body)
            console.log(response)
            res.status(200).send(response)
        }

        catch (error) {
            console.log(error)
            res.status(400).send('Unable to add channel. Make sure you authorized it');
        }
    },
    TiktokPostOauth: function (req, res) {
        fetch(`https://tiktok.p.rapidapi.com/live/post/comments?video_id=${config.tiktok.video_id}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "tiktok.p.rapidapi.com",
                "x-rapidapi-key": config.tiktok.key
            }
        })
            .then(response => {
                console.log(response);
                res.status(200).send(response)
            })
            .catch(err => {
                console.log(err);
            });
    }

};
