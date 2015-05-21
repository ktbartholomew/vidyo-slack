var express = require('express'),
    router = express.Router(),
    _ = require('lodash'),
    ChatService = require('../services/slack/chat'),
    StorageService = require('../services/storage');

router.all('/', function (req, res) {
    if(req.method !== 'POST' && req.method !== 'GET') {
        return res.status(405).end();
    }

    req.data = (req.method === 'GET') ? req.query : req.body;

    if(_.startsWith(req.data.text, 'set')) {

        var vidyoUrl = req.data.text.match(/^set ([^\ ]+)/)[1] || '';

        if(!vidyoUrl) {
            return res.send('Sorry, I couldn\'t determine your URL from what you typed.')
        }
        
        StorageService.setUrl({
            userId: req.data.user_id,
            url: vidyoUrl
        })
        .then(function (newUrl) {
            res.send('Your Vidyo room URL has been set to <' + newUrl + '>. Invite others to chat with you by typing `/vidyo`');
        });

        return;
    }

    if(!_.isEmpty(req.data.text)) {
        return res.send('Unsupported action. To send an invite, type `/vidyo` and nothing else.');
    }

    StorageService.getUrl(req.data.user_id)
    .then(function (url) {
        if(url === null) {
            return res.send('You have not set your Vidyo URL yet. Type `/vidyo set [url]` to set one.');
        }

        ChatService.postMessage({
            channel: req.data.channel_id,
            text: '<@' + req.data.user_id + '|' + req.data.user_name + '> has invited you to <' + url + '|join his/her Vidyo room>.',
            username: 'Vidyo',
            icon_emoji: ':camera:'
            
        })
        .then(function (result) {
            console.log(result);
            return res.send('Vidyo invite sent.');
        });
    });
});

module.exports = router;