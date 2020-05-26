const express = require('express'),
      config = require('config'),
      request = require('request'),
      path = require('path');


const app = express(),
      backAPI = config.get("backApi");

let pathHttp = '';

app.use(express.json({extended: true}));


if (process.env.NODE_ENV === 'prod') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    pathHttp = req.path;
    next();
});

app.use(pathHttp, (req, res, next) => {
    // if (pathHttp === '/') {
    //     return;
    // }

    let data,
        opt,
        id = '';

    opt = {...req.body.opt};
    data = { ...req.body.body };
    console.log(data)
    console.log(data && opt.mtd !== 'GET');

    request({
        url: opt.param ? backAPI + pathHttp + opt.param : backAPI + pathHttp,
        method: opt.mtd,
        json: data,   // <--Very important!!!
        body: data && (opt.mtd !== 'GET' && opt.mtd !== 'DELETE'),
        // preambleCRLF: true,
        // postambleCRLF: true,
    }, function (error, response, body) {
        if (error) {
            res.status(500);
            res.json({message: 'SERVER ERROR'});
            next();
            return
        }

        console.log('url ', pathHttp);
        console.log('code ', response.statusCode);

        if (response.statusCode === 500 || response.statusCode === 400) {
            res.status(response.statusCode);
            res.json({message: response.statusMessage, code: response.statusCode, data:response.body});
            return
        }

        if (!response.body) {
            res.status(200);
            res.json({code: 204});
            return
        }

        res.json(response.body);
        return res.status(200);
    });


});

const PORT = config.get('port') || 5000;
app.listen(PORT, () => console.log('server start.... port - ' + PORT));

