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
        ChannelModel.findOne({ channelId: req.params.channelId, channelName: req.params.channelName, createdBy: res.locals.user.id }, function (err, channel) {
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
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 30);
            const since = parseInt(yesterday.getTime() / 1000);
            const until = parseInt(new Date().getTime() / 1000);
            const resp = await axios.get(`https://graph.facebook.com/${req.body.channelId}/insights?metric=impressions,reach,profile_views,follower_count&since=${since}&until=${until}&period=day&access_token=${req.body.token}`)
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
                    imp = val.values.map(_val => {
                        return ({ count: _val.value, date: _val.end_time.slice(0, 10) });
                    })
                }
                else if (val.name.includes("reach")) {
                    reaches = val.values.map(_val => {
                        return ({ count: _val.value, date: _val.end_time.slice(0, 10) });
                    })
                }

            }

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
                    channel.impressions = imp
                    channel.reach = reaches
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
                        impressions: imp,
                        reach: reaches,
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
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 90);
            const since = parseInt(yesterday.getTime() / 1000);
            const until = parseInt(new Date().getTime() / 1000);
            const resp = await axios.get(`https://graph.facebook.com/v7.0/${req.body.channelId}/insights?metric=page_fans_gender_age,page_fans_city,page_fans_country,page_impressions,page_fans,page_impressions_unique&since=${since}&until=${until}&period=day&access_token=${respForAccessToken.data.access_token}`)
            genders = [], ageGroup = [], cities = [], countries = [], impressions = [], fans = [], reach = []
            const gendersMap = {};
            const ageGroupMap = {};

            // generating maps
            for (let matrix of resp.data.data) {
                switch (matrix.name) {
                    case 'page_fans_gender_age':
                        if (!matrix.values || matrix.values.length <= 0) throw new Error("Invalid matrix received from the API");
                        const groups = matrix.values[matrix.values.length - 1].value;
                        for (let key in groups) {
                            let [gender, age] = key.split('.');
                            // Converting keywords to actual values
                            gender = gender === 'M' ? 'male' : gender === 'F' ? 'female' : 'unidentified';

                            if (!gendersMap[gender]) {
                                gendersMap[gender] = 0;
                            }
                            gendersMap[gender] += groups[key];

                            if (!ageGroupMap[age]) {
                                ageGroupMap[age] = 0;
                            }
                            ageGroupMap[age] += groups[key];
                            console.log(gender, age);
                        }
                        for (let value in gendersMap) {
                            genders.push({
                                "gender": value,
                                "genderCount": gendersMap[value] || 0
                            })
                        }
                        for (let group in ageGroupMap) {
                            ageGroup.push({
                                "ageGroup": group,
                                "ageGroupCount": ageGroupMap[group] || 0
                            })
                        }
                        break;
                    case 'page_fans_city':
                        if (!matrix.values || matrix.values.length <= 0) throw new Error("Invalid matrix received from the API");
                        const citiesMap = matrix.values[matrix.values.length - 1].value;
                        for (let key in citiesMap) {
                            cities.push({
                                "cityName": key,
                                "noOfAudience": citiesMap[key] || 0
                            })
                        }
                        break;
                    case 'page_fans_country':
                        if (!matrix.values || matrix.values.length <= 0) throw new Error("Invalid matrix received from the API");
                        const countriesMap = matrix.values[matrix.values.length - 1].value;
                        for (let key in countriesMap) {
                            countries.push({
                                "countryName": key,
                                "noOfAudience": countriesMap[key] || 0
                            })
                        }
                        break;
                    case 'page_impressions':
                        console.log(matrix.values)
                        impressions = matrix.values.map(impression => {
                            return { count: impression.value, date: impression.end_time.slice(0, 10) };
                        })
                        break;
                    case 'page_impressions_unique':
                        console.log(matrix.values)
                        reach = matrix.values.map(reach => {
                            return { count: reach.value, date: reach.end_time.slice(0, 10) };
                        })
                        break;
                }
            }
            ChannelModel.findOne({ channelId: req.body.channelId, channelName: "facebook", createdBy: res.locals.user.id }, function (err, channel) {

                if (channel) {
                    channel.channelName = "facebook";
                    channel.channelId = req.body.channelId ? req.body.channelId : channel.channelId;
                    channel.gender = genders
                    channel.ageGroup = ageGroup
                    channel.cites = cities
                    channel.countries = countries
                    channel.impressions = impressions
                    channel.reach = reach
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
                        gender: genders,
                        ageGroup: ageGroup,
                        cities: cities,
                        countries: countries,
                        impressions: impressions,
                        reach: reach,
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

            const response = await axios.get(`https://youtubeanalytics.googleapis.com/v2/reports?access_token=${access_token}&dimensions=ageGroup,gender&metrics=viewerPercentage&ids=channel==${req.body.channelId}&startDate=2020-01-01&endDate=2020-08-08`)
            console.log(response.data.rows)
            var responseRows = [], gender = [], ageGroup = [], male = 0, female = 0, age1 = 0, age2 = 0
            console.log("come here")
            responseRows = [["25-30", "male", 20], ["35-40", "female", 80], ["25-30", "male", 50], ["35-40", "female", 50]]
            for (value of responseRows) {
                if (value[1] === "male") {
                    male += value[2]
                }
                else if (value[1] === "female") {
                    female += value[2]
                }
            }
            gender = [{ "gender": "male", "genderCount": male }, { "gender": "female", "genderCount": female }]
            for (value of responseRows) {
                if (value[0] === "25-30")
                    age1 += value[2]
                else if (value[0] === "35-40") {
                    age2 += value[2]
                }
            }
            ageGroup = [{ "ageGroup": "25-30", "ageGroupCount": age1 }, { "ageGroup": "35-40", "ageGroupCount": age2 }]
            ChannelModel.findOne({ channelId: req.body.channelId, channelName: "youtube", createdBy: res.locals.user.id }, function (err, channel) {

                if (channel) {
                    channel.channelName = "youtube";
                    channel.channelId = req.body.channelId ? req.body.channelId : channel.channelId;
                    channel.gender = gender
                    channel.ageGroup = ageGroup
                    channel.cities=[{"cityName":"kalrusche","noOfAudience":10}, {"cityName":"Amserfoort","noOfAudience":11}]
                    channel.countries=[{"countryName":"Germany","noOfAudience":10}, {"countryName":"Amsterdam","noOfAudience":11}]
                    channel.impressions=[{"count":30,"date":"2020-01-01"}, {"count":11,"date":"2020-03-29"}]
                    channel.reach=[{"count":10,"date":"2020-01-01"},{"count":21,"date":"2020-03-29"}]
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
                        channelName: "youtube",
                        channelId: req.body.channelId,
                        createdBy: res.locals.user.id,
                        gender: gender,
                        ageGroup: ageGroup,
                        cities:[{"cityName":"kalrusche","noOfAudience":10}, {"cityName":"Amserfoort","noOfAudience":11}],
                        countries:[{"cityName":"Germany","noOfAudience":10}, {"cityName":"Amsterdam","noOfAudience":11}],
                        impressions:[{"value":30,"end_time":"2020-01-01"}, {"value":11,"end_time":"2020-03-29"}],
                        reach:[{"value":10,"end_time":"2020-01-01"},{"value":21,"end_time":"2020-03-29"}],
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
    }


};
