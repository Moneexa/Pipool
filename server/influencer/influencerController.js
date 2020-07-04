var influencerModel = require('./influencerModel.js');
const Twitter= require('twitter-lite')
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
        influencerModel.find(function (err, influencers) {
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
        influencerModel.findOne({ _id: id }, function (err, influencer) {
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
        var influencer = new influencerModel({
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
        influencerModel.findOne({ _id: id }, function (err, influencer) {
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
        influencerModel.findByIdAndRemove(id, function (err, influencer) {
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
            const resp = await axios.post(`https://api.twitter.com/oauth/access_token?oauth_token=${req.body.oauth_token}&oauth_verifier=${req.body.verifier}`)
            var arr = resp.data.split("&")
            var token = (arr[0].split("=")[1]).split("-")[1]
            const obj = {
                oauth_token: (arr[0].split("=")[1]).split("-")[1],
                oauth_secret: arr[1].split("=")[1],
                user_id: arr[2].split("=")[1],
                screen_name: arr[3].split("=")[1]

            }
            console.log(obj)
            var influencer = new influencerModel({
                channel_name: "twitter",
                channel_id: obj.user_id,
                screen_name: obj.screen_name,
                name: ""

            });
            var influencer_obj = {
               
            }
            influencer.save(function (err, influencer) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when creating influencer',
                        error: err
                    });
                }
                else{
            influencer_obj= influencer;
                }
            });

            influencerModel.findOne({channel_id: obj.user_id, screen_name:obj.screen_name }, function (err, influencer) {
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
                axios.get(`https://api.twitter.com/1.1/users/show.json?screen_name=${influencer.screen_name}`,
                    
                       { headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    }
                    )
                  .then(result=> res.status(200).send(result))
                  .catch(error=>res.json(error))
                
            });
        }
        catch (error) {
            res.json(error)
        }

    }
};
