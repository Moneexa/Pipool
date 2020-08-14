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
            const resp = await axios.get(`https://graph.facebook.com/${req.body.channelId}/insights?metric=impressions,reach,profile_views,follower_count&period=day&access_token=${req.body.token}`)
            // console.log(resp.data)
            const resp1 = await axios.get(`https://graph.facebook.com/${req.body.channelId}/insights?metric=audience_country,audience_city,audience_gender_age&period=lifetime&access_token=${req.body.token}`)
            var gender = {};
            var _ageGroup = [], country = [], city = [], _gender = []
            //    console.log(resp1.data.data)
            for (let val of resp1.data.data) {
                if (val.name.includes("country")) {
                    val.values.map(_value =>
                        country = Object.entries(_value.value)
                    )
                }
                else if (val.name.includes("city")) {
                    val.values.map(_value =>
                        city = Object.entries(_value.value)
                    )
                }
                else if (val.name.includes("gender")) {
                    val.values.map(_val => {
                        gender = _val.value
                    })
                }


            }
            country = country.map(([key, val]) => ({ "countryName": key, "noOfAudience": val }))
            city = city.map(([key, value]) => ({ "cityName": key, "noOfAudience": value }))
            console.log(city)
            imp = [], reaches = [], foll = []

            for (let val of resp.data.data) {
                if (val.name.includes("impressions")) {
                    val.values.map(_val => {
                        imp.push({ count: _val.value, date: _val.end_time.replace("T07:00:00+0000", "") });
                    })
                }
                else if (val.name.includes("reach")) {
                    val.values.map(_val => {
                        reaches.push({ count: _val.value, date: _val.end_time.replace("T07:00:00+0000", "") });
                    })
                }
                else if (val.name.includes("follower_count")) {
                    val.values.map(_val => {
                        console.log(_val)
                        foll.push({ count: _val.value, date: _val.end_time.replace("T07:00:00+0000", "") });
                    })
                }
            }
            imp = imp.map(value => {
                return ({ "responseType": "impression", "count": value.count, "date": value.date })
            })
            reaches = reaches.map(value => {
                return ({ "responseType": "reach", "count": value.count, "date": value.date })
            })
            foll = foll.map(value => {
                return ({ "responseType": "followers", "count": value.count, "date": value.date })
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
            _ageGroup = [
                {
                    "ageGroup": "13-17",

                    "ageGroupCount": ageGroup1
                },
                {
                    "ageGroup": "18-24",
                    "ageGroupCount": ageGroup2
                },
                {
                    "ageGroup": "25-34",
                    "ageGroupCount": ageGroup3
                },
                {
                    "ageGroup": "35-44",
                    "ageGroupCount": ageGroup4
                },
                {
                    "ageGroup": "45-54",
                    "ageGroupCount": ageGroup5
                },
                {
                    "ageGroup": "55-64",
                    "ageGroupCount": ageGroup6
                },
                {
                    "ageGroup": "65+",
                    "ageGroupCount": ageGroup7
                }
            ]
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
            _gender = [{ "gender": "female", "genderCount": females }, { "gender": "male", "genderCount": males }, { "gender": "unidentified", "genderCount": unidentified }]
            ChannelModel.findOne({ channelId: req.body.channelId, channelName: "instagram", createdBy: res.locals.user.id }, function (err, channel) {

                if (channel) {
                    channel.channelName = "instagram";
                    channel.channelId = req.body.channelId ? req.body.channelId : channel.channelId;
                    channel.gender = _gender
                    channel.ageGroup = _ageGroup
                    channel.cites = city
                    channel.countries = country
                    channel.response = imp.concat(foll).concat(reaches)
                    channel.lastFetched = (new Date())



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
                        gender: _gender,
                        ageGroup: _ageGroup,
                        cities: city,
                        countries: country,
                        response: imp.concat(foll).concat(reaches),
                        lastFetched: (new Date()),



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
            res.status(445).send(error);
        }
    },
    FaecbookInsights: async function (req, res) {
        try {
            console.log(req.body.token)
            //We need to fetch a separate access token for the page first
            const respForAccessToken = await axios.get(`https://graph.facebook.com/v7.0/${req.body.channelId}?fields=access_token&access_token=${req.body.token}`)
            console.log(respForAccessToken.data.access_token)
            const resp = await axios.get(`https://graph.facebook.com/v7.0/${req.body.channelId}/insights?metric=page_fans_gender_age,page_fans_city,page_fans_country,page_impressions,page_fans,page_impressions_frequency_distribution&period=day&access_token=${respForAccessToken.data.access_token}`)
            var gender = {}, _gender = [], _ageGroup = [], cities = [], countries = [], impressions = [], fans = [], reach = []
            resp.data.data.map(value => {
                if (value.name.includes("gender")) {
                    value.values.map(_value => {
                        gender = _value.value
                    })
                }
                else if (value.name.includes("city")) {
                    value.values.map(_value => {
                        cities = Object.entries(_value.value)

                    })
                }
                else if (value.name.includes("country")) {
                    value.values.map(_value => {
                        countries = Object.entries(_value.value)

                    })
                }
                else if (value.name.includes("impressions")) {
                    value.values.map(_value => {
                        impressions.push({ count: _value.value, date: _value.end_time.replace("T07:00:00+0000", "") });

                    })
                }
                else if (value.name.includes("fans")) {
                    value.values.map(_value => {
                        fans.push({ count: _value.value, date: _value.end_time.replace("T07:00:00+0000", "") });

                    })
                }
                // console.log(value)
                else if (value.name.includes("page_impressions_frequency_distribution")) {
                    // console.log(value.values)
                      value.values.map(_value => {
                     reach.push({ count: _value.value, date: _value.end_time.replace("T07:00:00+0000", "") });

                     })
                 }

            })
            impressions = impressions.map(value => {
                return ({ "responseType": "impression", "count": value.count, "date": value.date })
            })
            fans = fans.map(value => {
                return ({ "responseType": "fans", "count": value.count, "date": value.date })
            })
            reach = reach.map(value => {
                return ({ "responseType": "reach", "count": value.count, "date": value.date })
            })
            // console.log(reach)
            countries = countries.map(([key, val]) => ({ "countryName": key, "noOfAudience": val }))
            cities = cities.map(([key, value]) => ({ "cityName": key, "noOfAudience": value }))
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
            _gender = [{ "gender": "female", "genderCount": females }, { "gender": "male", "genderCount": males }, { "gender": "unidentified", "genderCount": unidentified }]
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
            _ageGroup = [
                {
                    "ageGroup": "13-17",

                    "ageGroupCount": ageGroup1
                },
                {
                    "ageGroup": "18-24",
                    "ageGroupCount": ageGroup2
                },
                {
                    "ageGroup": "25-34",
                    "ageGroupCount": ageGroup3
                },
                {
                    "ageGroup": "35-44",
                    "ageGroupCount": ageGroup4
                },
                {
                    "ageGroup": "45-54",
                    "ageGroupCount": ageGroup5
                },
                {
                    "ageGroup": "55-64",
                    "ageGroupCount": ageGroup6
                },
                {
                    "ageGroup": "65+",
                    "ageGroupCount": ageGroup7
                }
            ]
            ChannelModel.findOne({ channelId: req.body.channelId, channelName: "facebook", createdBy: res.locals.user.id }, function (err, channel) {

                if (channel) {
                    channel.channelName = "facebook";
                    channel.channelId = req.body.channelId ? req.body.channelId : channel.channelId;
                    channel.gender = _gender
                    channel.ageGroup = _ageGroup
                    channel.cites = cities
                    channel.countries = countries
                    channel.response = impressions.concat(fans).concat(reach)
                    channel.lastFetched = (new Date())



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
                        channelName: "facebook",
                        channelId: req.body.channelId,

                        createdBy: res.locals.user.id,
                        gender: _gender,
                        ageGroup: _ageGroup,
                        cities: cities,
                        countries: countries,
                        response: impressions.concat(fans).concat(reach),
                        lastFetched: (new Date()),



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

            const response = await axios.get(`https://youtubeanalytics.googleapis.com/v2/reports?access_token=${access_token}&dimensions=ageGroup,gender,country&metrics=viewerPercentage&ids=channel==${req.body.Id}`)
            console.log(response.data)
            //res.send(response.data);
        }
        catch (error) {
            console.log(error)
            res.send(error).status(445);
        }
    }

};
