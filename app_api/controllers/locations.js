'use strict';

var sendJsonResponse = function(res, status, content) {
        res.status(status);
        res.json(content);
    },
    mongoose = require('mongoose'),
    Loc = mongoose.model('Location');

module.exports.locationsListByDistance = function (req, res) { 
    var lng = parseFloat(req.query.lng),
        lat = parseFloat(req.query.lat),
        maxDistance = parseInt(req.query.maxDistance),
        point = {
            type: "Point",
            coordinates: [lng, lat]
        },
        geoOptions = {
            spherical: true,
            maxDistance: maxDistance,
            num: 10
        };

        if((!lng && lng !== 0) || (!lat && lat !== 0)) {
            sendJsonResponse(res, 404, {
                "message": "lng and lat query parameters are required"
            });
            return;
        }
        
        if(!maxDistance && maxDistance !== 0){
            sendJsonResponse(res, 404, {
                "message": "maxDistance query parameter are required"
            });
            return;
        }

        Loc.geoNear(point, geoOptions, function (err, results, stats) {
            var locations = [];

            results.forEach(function (doc) {
                locations.push({
                    distance: doc.dis,
                    name: doc.obj.name,
                    adress: doc.obj.adress,
                    rating: doc.obj.rating,
                    facilities: doc.obj.facilities,
                    _id: doc.obj._id
                });
            });

            sendJsonResponse(res, 200, locations);
        });
};


module.exports.locationsCreate = function (req, res)  { 
    Loc.create({
        name: req.body.name,
        adress: req.body.adress,
        facilities: req.body.facilities.split(","),
        coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
        openingTimes: [{
            days: req.body.days1,
            opening: req.body.opening1,
            closing: req.body.closing1,
            closed: req.body.closed1
        }, {
            days: req.body.days2,
            opening: req.body.opening2,
            closing: req.body.closing2,
            closed: req.body.closed2
        }]
        
    }, function (err, location) {
        if(err){
            sendJsonResponse(res, 400, err);
        
        } else {
            sendJsonResponse(res, 201, location);
        }
    });
};

module.exports.locationsReadOne = function (req, res)  {
    if(req.params && req.params.locationid){
        Loc
            .findById(req.params.locationid)
            .exec(function (err, location) {
                if(!location){
                    sendJsonResponse(res, 404, {
                        'message': 'locationid not found'
                    });

                } else if(err){
                    sendJsonResponse(res, 404, err);

                } else {
                    sendJsonResponse(res, 200, location);
                }
            });
        
    } else {
        sendJsonResponse(res, 404, {
            'message': 'No locationid in request'
        });
    }
};

module.exports.locationsUpdateOne = function (req, res)  { 
    if (!req.params.locationid){
        sendJsonResponse(res, 404, {
            "message": "Not found, locationid is required"
        });

        return;
    }

    Loc
        .findById(req.params.locationid)
        .select('-reviews -rating')
        .exec(
            function (err, location) {
                if(!location){
                    sendJsonResponse(res, 404, {
                        "message": "locationid not found"
                    });
                    return;
                
                } else if(err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }

                location.name = req.body.name;
                location.adress = req.body.adress;
                location.facilities = req.body.facilities.split(',');
                location.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
                location.openingTimes = [{
                    days: req.body.days1,
                    opening: req.body.opening1,
                    closing: req.body.closing1,
                    closed: req.body.closed1
                }, {
                    days: req.body.days2,
                    opening: req.body.opening2,
                    closing: req.body.closing2,
                    closed: req.body.closed2
                }];

                location.save(function (err, location) {
                    if(err){
                        sendJsonResponse(res, 404, err);
                    
                    } else {
                        sendJsonResponse(res, 200, location);
                    }
                });
            }
        );
};

module.exports.locationsDeleteOne = function (req, res)  { 
    var locationid = req.params.locationid;

    if (locationid) {
        Loc
            .findByIdAndRemove(locationid)
            .exec(
                function (err, location) {
                    if(err) {
                        sendJsonResponse(res, 400, err);
                        return;
                    }

                    sendJsonResponse(res, 204, null);
                }
            );
    
    } else {
        sendJsonResponse(res, 404, {
            'message': 'No locationid'
        });
    }
};