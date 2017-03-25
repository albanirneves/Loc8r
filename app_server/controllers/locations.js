/* GET 'home' page*/
//mongodb://albanirneves:268419@ds011873.mlab.com:11873/loc8ralbanir

'use strict';

var request = require('request'),
    apiOptions = {
        server: "http://localhost:3000"
    },
    renderHomePage = function (req, res) {
        res.render('locations-list', {
            title: 'Loc8r - Encontre um lugar para trabalhar com wifi',
            pageHeader: {
                title: 'Loc8r',
                strapline: 'Encontre lugares com wifi perto de você'
            },
            sidebar: 'Procurando por Wifi? Loc8r ajuda você a encontrar lugares para trabalhar quando você não está em casa. Café, bolo ou bebidas? Deixe que Loc8r ajuda você a encontrar o lugar que você está procurando.',
            url: req.originalurl
        });
    },
    _formatDistance = function(distance) {
        var numDistance, unit;

        distance = distance ? distance : 0;

        if(distance > 1000) {
            numDistance = (parseFloat(distance) / 1000).toFixed(1);
            unit = 'km';
        
        } else {
            numDistance = parseInt(distance, 10);
            unit = 'm';
        }

        return numDistance + ' ' + unit;
    },
    renderDetailPage = function(req, res, locDetail) {
        res.render('locations-info', locDetail);
    },
    _showError = function(req, res, status) {
        var title, paragraphs;

        if (status === 404) {
            title = "404, page not found";
            paragraphs = ["Oh dear. Looks like we can't find this page. Sorry."];
        
        } else {
            title = status + ", something's gone wrong";
            paragraphs = ["Something, somewhere, has gone just a little bit wrong."];
        }

        res.status(status);
        res.render('generic-text', {
            title: title,
            paragraphs: paragraphs
        })
    },
    renderReviewForm = function(req, res, locDetail) {
        res.render('locations-review-form', {
            name: locDetail.name,
            error: req.query.err
        });
    },
    getLocationInfo = function (req, res, callback) {
        var requestOptions, path;
        path = '/api/locations/' + req.params.locationid;

        requestOptions = {
            url: apiOptions.server + path,
            method: 'GET',
            json: {}
        };

        request(
            requestOptions,
            function (err, response, body) {
                var data = body;

                if (response.statusCode === 200) {
                    data.coords = {
                        lat: body.coords[0],
                        lng: body.coords[1]
                    };

                    callback(req, res, data);
                    
                } else {
                    _showError(req, res, response.statusCode);
                }

            }
        );
    };

if (process.env.NODE_ENV === 'production'){
    apiOptions.server = 'https://albanirneves.herokuapp.com';
}

module.exports.homelist = function(req, res) {
    renderHomePage(req, res);
}

/* GET 'Location Info' page*/
module.exports.locationInfo = function(req, res) {
    getLocationInfo(req, res, function (req, res, responseData) {
        renderDetailPage(req, res, responseData);
    });
}

/* GET 'Add review' page*/
module.exports.addReview = function(req, res) {
    getLocationInfo(req, res, function (req, res, responseData) {
        renderReviewForm(req, res, responseData);
    });
}

/* POST 'Add review' action*/
module.exports.doAddReview = function(req, res) {
    var requestOptions, path, locationid, postdata;

    locationid = req.params.locationid;
    path = "/api/locations/" + locationid + "/reviews";
    postdata = {
        author: req.body.name,
        rating: parseInt(req.body.rating, 10),
        reviewText: req.body.review
    };
    requestOptions = {
        url: apiOptions.server + path,
        method: "POST",
        json: postdata
    };

    if (!postdata.author || !postdata.rating || !postdata.reviewText) {
        res.redirect('/location/' + locationid + '/reviews/new?err=val');

    } else {
        request(
            requestOptions,
            function (err, response, body) {
                if (response.statusCode === 201) {
                    res.redirect('/location/' + locationid);

                } else if (response.statusCode === 400 && body.name && body.name === "ValidationError") {
                    res.redirect('/location/' + locationid + '/reviews/new?err=val');

                } else {
                    _showError(req, res, response.statusCode);
                }
            }
        );
    }
}