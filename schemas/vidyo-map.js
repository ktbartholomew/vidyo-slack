var mongoose = require('mongoose');

var VidyoMapSchema = mongoose.Schema({
    slack_user_id: String,
    vidyo_room_url: String
});

module.exports = VidyoMapSchema;