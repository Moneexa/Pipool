var ChannelModel = require('./insightsModel.js');
const Twitter = require('twitter-lite')
const config = require('../config.json')
const fetch = require("node-fetch");
const axios = require('axios');
const { PromiseProvider } = require('mongoose');
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
        console.log(req.params.channelId);
        ChannelModel.findOne({ channelId: req.params.channelId, channelName: req.params.channelName }, function (err, channel) {
            if (err) {
                console.log("this is the error" + err)
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
            const resp_array = []
            const resp = await axios.get(`https://graph.facebook.com/${req.body.channelId}/insights?metric=impressions,reach,profile_views,follower_count&period=day&access_token=${req.body.token}`)
            // console.log(resp.data)
            resp_array.push(resp.data);
            const resp1 = await axios.get(`https://graph.facebook.com/${req.body.channelId}/insights?metric=audience_country,audience_city,audience_gender_age&period=lifetime&access_token=${req.body.token}`)
            //console.log(resp1)
            resp_array.push(resp1.data);
            const city = resp_array[1].data[1].values[0].value
            const country=resp_array[1].data[0].values[0].value
            const gender = resp_array[1].data[2].values[0].value
            const impressions=resp_array[0].data[0].values, imp=[]
            impressions.map((values,index)=>{
                imp.push(values.value)
            })
            const reach=resp_array[0].data[1].values, reaches=[]
            reach.map((values, index)=>{
                reaches.push(values.value)
            })
            const followers_count=resp_array[0].data[2].values , foll=[]
            followers_count.map((values, index)=>{
                foll.push(values.value)
            })
            var ageGroup1 = 0, ageGroup2 = 0, ageGroup3 = 0, ageGroup4 = 0, ageGroup5 = 0, ageGroup6 = 0, ageGroup7 = 0

            for (prop in gender) {
                if (prop.includes("13-17")) {
                    ageGroup1 = ageGroup1 + gender[prop]

                }
                else if (prop.includes("18-24")) {
                    ageGroup2 = ageGroup2 + gender[prop]
                }
                else if (prop.includes("25-34")) {
                    ageGroup3 = ageGroup3 + gender[prop]

                }
                else if (prop.includes("35-44")) {
                    ageGroup4 = ageGroup4 + gender[prop]

                }
                else if (prop.includes("45-54")) {
                    ageGroup5 = ageGroup5 + gender[prop]

                }
                else if (prop.includes("55-64")) {
                    ageGroup6 = ageGroup6 + gender[prop]

                }
                else if (prop.includes("65+")) {
                    ageGroup7 = ageGroup7 + gender[prop]

                }
            }
            var females = 0, males = 0, unidentified = 0;
            for (prop in gender) {
                if (prop.includes("F")) {
                    females = females + gender[prop]
                }
                if (prop.includes("M")) {
                    males = males + gender[prop]
                }
                if (prop.includes("U")) {
                    unidentified = unidentified + gender[prop]
                }

            }
            ChannelModel.findOne({ channelId: req.body.channelId, channelName: req.body.channelName }, function (err, channel) {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        message: 'Error when getting channel',
                        error: err
                    });
                }
                if (channel) {
                    channel.channelName = "instagram";
                    channel.channelId = req.body.channelId ? req.body.channelId : channel.channelId;
                    channel.Gender = [females, males, unidentified];
                    channel.AgeGroup=[ageGroup1,ageGroup2,ageGroup3,ageGroup4,ageGroup5,ageGroup6,ageGroup7]
                    channel.Cites=Object.values(city)
                    channel.CityNames=Object.keys(city)
                    channel.Countries=Object.values(country)
                    channel.CountryNames=Object.keys(country)
                    channel.impressions=imp
                    channel.reach=reaches
                    channel.followers=foll
                    channel.lastFetched = new Date()



                    channel.save(function (err, channel) {
                        if (err) {
                            console.log(err)
                            return res.status(500).json({
                                message: 'Error when updating channel.',
                                error: err
                            });
                        }

                        return res.json(channel);

                    });
                }
                else if (!channel) {
                    var _channel = new ChannelModel({
                        channelName: "instagram",
                        channelId: req.body.channelId,

                        createdBy: res.locals.user.id,
                        Gender: [females, males, unidentified],
                        AgeGroup:[ageGroup1,ageGroup2,ageGroup3,ageGroup4,ageGroup5,ageGroup6,ageGroup7],
                        Cities: Object.values(city),
                        CityNames: Object.keys(city),
                        Countries: Object.values(country),
                        CountryNames: Object.keys(country),  
                        lastFetched: new Date(),
                        impressions:imp,
                        reach:reaches,
                        followers:foll


                    });

                    _channel.save(function (err, __channel) {
                        if (err) {
                            console.log(err)
                            return res.status(500).json({
                                message: 'Error when creating channel',
                                error: err
                            });
                        }
                        return res.status(200).json(__channel);
                    });



                }
            });



        }
        catch (error) {
            console.log(error)
            res.send(error).status(445);
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
            res.send(error).status(445);
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

            const response = await axios.get(`https://youtubeanalytics.googleapis.com/v2/reports?access_token=${access_token}&dimensions=day,ageGroup&metrics=views,estimatedMinutesWatched,subscribersGained&ids=channel==${req.body.Id}&startDate=2020-01-01&endDate=2020-08-04`)
            res.send(response.data);
        }
        catch (error) {
            console.log(error)
            res.send(error).status(445);
        }
    }

};
