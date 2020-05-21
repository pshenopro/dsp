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
    if (pathHttp === '/') {
        return;
    }

    let data,
        opt,
        id = '';

    opt = {...req.body.opt};
    data = { ...req.body.body };

    console.log('url ', pathHttp);
    request({
        // url: posts[pathHttp].method === 'PUT' ? backAPI + posts[pathHttp].url + `/${data.id}` : backAPI + posts[pathHttp].url + id,
        url: opt.param ? backAPI + pathHttp + opt.param : backAPI + pathHttp,
        method: opt.mtd,
        json: data,   // <--Very important!!!
        body: data && opt.mtd !== 'GET',
        preambleCRLF: true,
        postambleCRLF: true,
    }, function (error, response, body) {
        if (error) {
            res.status(500);
            res.json({message: 'SERVER ERROR'});
            next();

            return
        }

        console.log('status ', response.statusMessage);

        if (response.statusCode === '500') {
            console.log('status ', response.statusMessage);
            console.log('code ', response.statusCode);
            console.log('body  ', response.body);

            res.json(response.body);

            return res.status(500);
        }


        res.json(response.body);

        return res.status(200);
    });


});

const PORT = config.get('port') || 5000;


app.listen(PORT, () => console.log('server start.... port - ' + PORT));

