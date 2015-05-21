var q = require('q');
var mongoose = require('mongoose');
var VidyoMapSchema = require('../schemas/vidyo-map');
mongoose.connect(process.env.VS_MONGODB_URL);

var VidyoMap = mongoose.model('VidyoMap', VidyoMapSchema);

module.exports = {
    setUrl: function (options) {
        var defer = q.defer();

        VidyoMap.findOne({
            slack_user_id: options.userId
        })
        .exec(function (err, map) {
            if(map !== null) {
                map.vidyo_room_url = options.url;
                map.save();
                return defer.resolve(options.url);
            }

            var map = new VidyoMap({
                slack_user_id: options.userId,
                vidyo_room_url: options.url
            });

            map.save();
            return defer.resolve(map.vidyo_room_url);
        });

        return defer.promise;
    },
    getUrl: function (userId) {
        var defer = q.defer();

        VidyoMap.findOne({
            slack_user_id: userId
        })
        .exec(function (err, map) {
            if(map === null) {
                return defer.resolve(null);    
            }

            return defer.resolve(map.vidyo_room_url);
        });

        return defer.promise;
    }
};