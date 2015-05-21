module.exports = function (req, res, next) {

    if(req.method === 'GET') {
        if(req.query.token !== process.env.VS_WEBHOOK_TOKEN) {
            return res.status(401).end();
        }
    }

    if(req.method === 'POST') {
        if(req.body.token !== process.env.VS_WEBHOOK_TOKEN) {
            return res.status(401).end();
        }
    }

    next();
}