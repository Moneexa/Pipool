var brandModel = require('../models/brandModel.js');

/**
 * brandController.js
 *
 * @description :: Server-side logic for managing brands.
 */
module.exports = {

    /**
     * brandController.list()
     */
    list: function (req, res) {
        brandModel.find(function (err, brands) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting brand.',
                    error: err
                });
            }
            return res.json(brands);
        });
    },

    /**
     * brandController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        brandModel.findOne({ _id: id }, function (err, brand) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting brand.',
                    error: err
                });
            }
            if (!brand) {
                return res.status(404).json({
                    message: 'No such brand'
                });
            }
            return res.json(brand);
        });
    },

    /**
     * brandController.create()
     */
    create: function (req, res) {
        var brand = new brandModel({
            name: req.body.name,
            logo: req.body.logo,
            contactName: req.body.contactName,
            skype: req.body.skype,
            description: req.body.description,
            website: req.body.website,
            hashTags: req.body.hashTags,
            PhoneNo: req.body.PhoneNo,
            Address: req.body.Address,
            PostalCode: req.body.PostalCode,
            City: req.body.City,
            Country: req.body.Country

        });

        brand.save(function (err, brand) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating brand',
                    error: err
                });
            }
            return res.status(201).json(brand);
        });
    },

    /**
     * brandController.update()
     */
    _count: function (req, res) {
        brandModel.estimatedDocumentCount({}, function (err, count) {
            if (err) {
                res.json(err.message)
            }
            else {

                
            return res.json(count);
            }
        })
    }
    ,

    update: function (req, res) {
        var id = req.params.id;
        brandModel.findOne({ _id: id }, function (err, brand) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting brand',
                    error: err
                });
            }
            if (!brand) {
                return res.status(404).json({
                    message: 'No such brand'
                });
            }

            brand.name = req.body.name ? req.body.name : brand.name;
            brand.logo = req.body.logo ? req.body.logo : brand.logo;
            brand.contactName = req.body.contactName ? req.body.contactName : brand.contactName;
            brand.skype = req.body.skype ? req.body.skype : brand.skype;

            brand.description = req.body.description ? req.body.description : brand.description;
            brand.website = req.body.website ? req.body.website : req.body.website;
            brand.hashTags = req.body.hashTags ? req.body.hashTags : req.body.hashTags;
            brand.PhoneNo = req.body.PhoneNo ? req.body.PhoneNo : req.body.PhoneNo;
            brand.Address = req.body.Address ? req.body.Address : req.body.Address;
            brand.PostalCode = req.body.PostalCode ? req.body.PostalCode : req.body.PostalCode;
            brand.City = req.body.City ? req.body.City : req.body.City;
            brand.Country = req.body.Country ? req.body.Country : req.body.Country;


            brand.save(function (err, brand) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating brand.',
                        error: err
                    });
                }

                return res.json(brand);
            });
        });
    },

    /**
     * brandController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        brandModel.findByIdAndRemove(id, function (err, brand) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the brand.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
