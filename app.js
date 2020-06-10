const express = require('express'),
      config = require('config'),
      request = require('request'),
      path = require('path'),
      upload = require('express-fileupload'),
      fs = require('fs');



const app = express(),
      backAPI = config.get("backApi");

let pathHttp = '',
    onLoadStream = false;

app.use(express.json({extended: true}));
app.use(upload());


if (process.env.NODE_ENV === 'prod') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

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
    let data,
        opt;

    opt = {...req.body.opt};
    data = { ...req.body.body };

    request({
        url: opt.param ? backAPI + pathHttp + opt.param : backAPI + pathHttp,
        method: opt.mtd,
        json: data,   // <--Very important!!!
        // headers: opt.head,
        body: data && (opt.mtd !== 'GET' && opt.mtd !== 'DELETE'),

    }, function (error, response, body) {
        onLoadStream = false;
        if (error) {
            res.status(500);
            res.json({message: 'SERVER ERROR'});
            next();
            return
        }

        if (opt.set === 'file') {
            const file = response.headers['content-disposition'].split('filename=')[1].split(';')[0];
            const fp = path.join(__dirname, 'client', 'public', file);

            fs.readFile(fp, "utf8", function(error,data){ });
            fs.writeFileSync(fp, response.body);

            console.log(response.body);

            res.json({file: file, test:fp});
            res.status(200);
            res.end();
            return
        }

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
        res.status(200);
        return
    });
});

const PORT = config.get('port') || 5000;
app.listen(PORT, () => console.log('server start.... port - ' + PORT));

