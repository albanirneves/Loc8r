'use strict';

angular.module('loc8rApp', []);

var _isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

var formatDistance = function () {
    return function (distance) {
        var numDistance, unit;

        if (distance && _isNumeric(distance)) {
            if (distance > 1000) {
                numDistance = (parseFloat(distance) / 1000).toFixed(1);
                unit = 'km';
        
            } else {
                numDistance = parseInt(distance, 10);
                unit = 'm';
            }

            return numDistance + ' ' + unit;
        
        } else {
            return "?";
        }
    }
};

var ratingStars = function () {
    return {
        scope: {
            thisRating: '=rating'
        },
        templateUrl: '/angular/rating-stars.html'
    };
};

var locationListCtrl = function ($scope, loc8rData, geolocation) {
    /*$scope.message = "Checando sua localização..";

    $scope.getData = function (position) {*/
        var lat = -51.174166,//position.coords.latitude,
            lng = -22.157091;//position.coords.longitude;

        $scope.message = "Procurando por locais próximos a você...";

        loc8rData.locationByCoords(lat, lng)
            .then(function (response) {
                $scope.message = response.data.length > 0 ? "" : "Nenhum local encontrado.";
                $scope.data = { locations: response.data };  
            },function (response) {
                $scope.message = "Desculpe, alguma coisa deu errado.";
            });
    /*};

    $scope.showError = function (error) {
        $scope.$apply(function () {
            $scope.message = error.message;
       });
    };

    $scope.onGeoNotSupported = function () {
        $scope.$apply(function () {
            $scope.message = "Geolocalização não suportada por esse navegador";
        });
    };

    geolocation.getPosition($scope.getData, $scope.showError, $scope.onGeoNotSupported);*/
    
};

var loc8rData = function ($http) {
    var locationByCoords = function (lat, lng) {
        return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=20000')
    };

    return {
        locationByCoords: locationByCoords
    };
};

var geolocation = function () {
    var getPosition = function (onSuccess, onError, onGeoNotSupported) {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);

        } else {
            onGeoNotSupported();
        }
    };

    return {
        getPosition: getPosition
    };
};

angular
    .module('loc8rApp')
    .controller('locationListCtrl', locationListCtrl)
    .filter('formatDistance', formatDistance)
    .directive('ratingStars', ratingStars)
    .service('loc8rData', loc8rData)
    .service('geolocation', geolocation);

