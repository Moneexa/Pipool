var videosModel = require('./videosModel');
const mongoose = require('mongoose');


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
        videosModel.find({ createdBy: res.locals.user.id }, function (err, videos) {
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
        

    },

    /**
     * campaignController.create()
     */
    create: function (req, res) {
        try {
            if (!req.files) {
                return res.status(400).send('No file uploaded');
            } else {
                //Use the name of the input field (i.e. "file") to retrieve the uploaded file
                let file = req.files.file;

                const id = mongoose.Types.ObjectId();

                const re = /(?:\.([^.]+))?$/;
                const fileExtension = re.exec(file.name)[1] || "";
                const saveId = id.toHexString() + "." + fileExtension;

                //Use the mv() method to place the file in upload directory (i.e. "uploads")
                file.mv(__dirname + '/data/' + saveId);
                var video = new videosModel({
                    name: file.name,
                    fileName: saveId,
                    _id: id,
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
            }
        } catch (err) {
            res.status(500).send(err);
        }

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
