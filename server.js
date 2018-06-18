require('dotenv').config();
const app = require('express')();
const ip = require('ip');
const fetch = require('isomorphic-fetch');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.all('/*', (req, res) => {
    if(req.url.indexOf('favicon') !== -1) return res.sendStatus(404);
    fetch(`${process.env.DEST}${req.url}`, {
        method: req.method,
        body : req.body,
        headers: req.headers
    })
    .then((pRes) => {
        res.headers = pRes.headers;
        return pRes.json()
    })
    .then((json) => {
        res.send(json);
    })
    .catch((err) => {
        res.send(err);
    });
});

const port = process.env.PORT || 5454
console.log(`Post to ${ip.address()}:${port}`);
console.log(`will be passed to ${process.env.DEST}`)
app.listen(port);