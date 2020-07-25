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
                channelType: 'twitter',
                category: req.body.category
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
            const existingChannel = await ChannelModel.findOne({ channelId: id, channelType: 'youtube' });
            if (existingChannel) return res.status(405).send('Channel already exists');
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
                        channelType: 'youtube',
                        category: req.body.category
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
    FacebookOAuth: async function (req, res) {
        const existingChannel = await ChannelModel.findOne({ channelId: req.body.id, channelType: 'facebook' });
        if (existingChannel) return res.status(405).send('Channel already exists');
        try {
            const resp = await axios.get(`https://graph.facebook.com/v7.0/${req.body.id}?fields=username,name,picture,fan_count&access_token=${req.body.token}`)
            //res.status(200).send(resp.data.fan_count)
            console.log(resp.data.fan_count)
            var channel = new ChannelModel({
                channelName: resp.data.name,
                channelId: resp.data.id,
                followers: resp.data.fan_count,
                channelType: 'facebook',
                category: req.body.category
            });
            await channel.save();
            return res.status(201).send(channel)

        }
        catch (error) {
            console.log(error)
            res.status(500).send(error)

        }
    },
    InstaOAuth: async function (req, res) {
        const existingChannel = await ChannelModel.findOne({ channelId: req.body.id, channelType: 'instagram' });
        if (existingChannel) return res.status(405).send('Channel already exists');
        try {
            const resp = await axios.get(`https://graph.facebook.com/v7.0/${req.body.id}?fields=followers_count,name,username,profile_picture_url&access_token=${req.body.token}`)
            res.status(200).send(resp.data)
            var channel = new ChannelModel({
                channelName: resp.data.name,
                channelId: resp.data.id,
                followers: resp.data.followers_count,
                channelType: 'instagram',
                category: req.body.category
            });
            await channel.save();
            return res.status(201).send(channel)

        }
        catch (error) {
            res.send(error)

        }
    },
    TiktokPostOauth: async function (req, res) {
         const existingChannel = await ChannelModel.findOne({ channelId: req.body.user_id, channelType: 'tiktok' });
         if (existingChannel) return res.status(405).send('Channel already exists');
        try {

            var uid = req.body.user_id;
            var authors = [], user_id = '', sec_uid = '', name = '', followers = '';
            const response = await axios({
                "method": "GET",
                "url": "https://tiktok.p.rapidapi.com/live/post/comments",
                "headers": {
                    "content-type": "application/octet-stream",
                    "x-rapidapi-host": "tiktok.p.rapidapi.com",
                    "x-rapidapi-key": config.tiktok.key,
                    "useQueryString": true
                }, "params": {
                    "video_id": config.tiktok.video_id
                }
            })

            authors = response.data.comments
            authors.map(async (value, index) => {
                if (value.author.unique_id === uid) {
                    console.log(value.author.unique_id)

                    // console.log("here")
                    const response = await axios({
                        "method": "GET",
                        "url": "https://tiktok.p.rapidapi.com/live/user/follower/list",
                        "headers": {
                            "content-type": "application/octet-stream",
                            "x-rapidapi-host": "tiktok.p.rapidapi.com",
                            "x-rapidapi-key": config.tiktok.key,
                            "useQueryString": true
                        }, "params": {
                            "sec_uid": value.author.sec_uid,
                            "max_cursor": "0",
                            "limit": "40"
                        }
                    })
                    console.log(response.data)
                    followers = response.data.total_followers
                    //console.log(followers)
                    console.log(followers)
                    var channel = new ChannelModel({
                        channelName: value.author.unique_id,
                        channelId: value.author.uid,
                        followers: followers,
                        channelType: 'tiktok',
                        category: req.body.category
                    });
                    await channel.save();
                    return res.status(201).send(channel)


                }
            })
        }
        catch (error) {
            res.send(error)

        }
    }
};
