var request = require('request'),
    q = require('q');

var API_ENDPOINT = 'https://slack.com/api/';
var API_TOKEN = process.env.VS_BOT_TOKEN;

var getUrl = function (key) {
    return API_ENDPOINT + key;
};


module.exports = {
    postMessage: function (options) {
        options = options || {};
        options.token = API_TOKEN;

        var defer = q.defer();

        request.post({
            url: getUrl('chat.postMessage'),
            form: options
        }, function (error, response, body) {
            defer.resolve(body);
        });

        return defer.promise;
    }
};