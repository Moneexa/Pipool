var ChannelModel = require('./insightsModel.js');
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


    InstaInsights: async function (req, res) {
        try {
            //console.log(req.body.token)
            const resp = await axios.get(`https://graph.facebook.com/${req.body.channelId}/insights?metric=impressions,reach,profile_views,follower_count&period=day&access_token=${req.body.token}`)
            console.log(resp.data)
            res.send(resp.data);

        }
        catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    },
    FaecbookInsights: async function (req, res) {
        try {
            console.log(req.body.token)
            //We need to fetch a separate access token for the page first
            const respForAccessToken = await axios.get(`https://graph.facebook.com/v7.0/${req.body.channelId}?fields=access_token&access_token=${req.body.token}`)
            const resp = await axios.get(`https://graph.facebook.com/v7.0/${req.body.channelId}/insights?metric=page_impressions_unique&access_token=${respForAccessToken.data.access_token}`)
            console.log(resp.data)
            res.send(resp.data);

        }
        catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    },
    TiktokInsights: async function (req, res) {
        try {
            const response = await axios({
                "method": "GET",
                "url": "https://tiktok.p.rapidapi.com/live/user/follower/list",
                "headers": {
                    "content-type": "application/octet-stream",
                    "x-rapidapi-host": "tiktok.p.rapidapi.com",
                    "x-rapidapi-key": config.tiktok.key,
                    "useQueryString": true
                }, "params": {
                    "username": req.body.Id,
                    "max_cursor": "0",
                    "limit": "40"
                }
            })
            console.log(response)
            res.send(response.data)

        }
        catch (error) {
            res.send(error)
        }
    },
    YoutubeInsights: async function (req, res) {
        var access_token = req.body.token
        try {

            const response = await axios.get(`https://youtubeanalytics.googleapis.com/v2/reports?access_token=${access_token}&dimensions=insightTrafficSourceType&metrics=views,estimatedMinutesWatched,subscribersGained`)
            res.send(response.data);
        }
        catch (error) {
            console.log(error)
            res.send(error)
        }
    }

};
