var videosModel = require('./videosModel');


/**
 * proposalController.js
 *
 * @description :: Server-side logic for managing campaigns.
 */
module.exports = {

    /**
     * campaignController.list()
     */
    list: function (req, res) {
        proposalModel.find({ createdBy: res.locals.user.id }, function (err, videos) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting videos.',
                    error: err
                });
            }
            return res.json(videos);
        });
    },

    /**
     * campaignController.show()
     */
    show: async function (req, res) {
        var id = req.params.id;
        console.log(id)
        const video = await videosModel.findOne({ _id: id })

        if (!video) {
            res.status(404).json({
                message: 'No such video'
            });
        }
        return res.json(proposal);

    },

    /**
     * campaignController.create()
     */
    create: function (req, res) {

        var video = new videosModel({
            name: req.body.name,
            fileName: req.body.fileName,


            createdBy: res.locals.user.id


        });

        video.save(function (err, video) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating campaign',
                    error: err
                });
            }
            return res.status(201).json(video);
        });


    },

    /**
     * campaignController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        videosModel.findOne({ _id: id }, function (err, videos) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting campaign',
                    error: err
                });
            }
            if (!videos) {
                return res.status(404).json({
                    message: 'No such campaign'
                });
            }
            videos.name = req.body.name,
            videos.fileName = req.body.fileName,


            videos.save(function (err, video) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when updating campaign.',
                            error: err
                        });
                    }

                    return res.json(videos);
                });
        });
    },

    /**
     * proposalController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        videosModel.findByIdAndRemove(id, function (err, video) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the campaign.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },
};
