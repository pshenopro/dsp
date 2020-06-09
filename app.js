const express = require('express'),
      config = require('config'),
      request = require('request'),
      path = require('path'),
      multer = require('multer'),
      upload = require('express-fileupload'),
      FormData = require('form-data'),
      bodyParser = require("body-parser");
      unirest = require('unirest');
      fs = require('fs');



const app = express(),
      urlencodedParser = bodyParser.urlencoded({extended: false});
      backAPI = config.get("backApi");

let pathHttp = '',
    streamName = '',
    streamFile = '',
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

// app.post(backAPI + pathHttp, function (qq, ss) {
//     console.log('post', qq.files)
// });



app.use(pathHttp, (req, res, next) => {
    let data,
        opt;

    console.log('onLoadStream - ', onLoadStream);

    opt = {...req.body.opt};
    data = { ...req.body.body };

    console.log("body ", req.body);
    if (req.files) {

        const file = req.files.positiveDomains;
        streamName = req.files.positiveDomains.name;
        streamFile = path.join(__dirname, 'client', 'public', streamName);
        fs.unlinkSync(streamFile)


        file.mv(streamFile, function (err) {
            console.log('error  -  ', err)
            res.status(200);
            return
        });

        onLoadStream = true;

        // let data = new FormData();
        // data.append('positiveDomains', fs.createReadStream(streamFile));
        //
        // const FD = {
        //     positiveDomains: fs.createReadStream(streamFile),
        // };

        // request({
        //     url: backAPI + pathHttp,
        //     method: 'POST',
        //     headers: {'Content-Type': 'multipart/form-data' },
        //     form: {'positiveDomains': fs.createReadStream(fp)},
        //     // preambleCRLF: true,
        //     // postambleCRLF: true,
        // }, function (error, response, body) {
        //     console.log('response - ', response.statusMessage);
        //     console.log('body - ', response.body)
        // });


        // var options = {
        //     'method': 'POST',
        //     'url': backAPI + pathHttp + '?true',
        //     'headers': {
        //     },
        //     formData: {
        //         'positiveDomains': {
        //             'value': fs.createReadStream(fp),
        //             'options': {
        //                 'filename': name,
        //                 'contentType': null
        //             }
        //         }
        //     }
        // };
        // console.log('fp  ', fp)
        // request(options, function (error, response) {
        //     if (error) throw new Error(error);
        //     console.log(response.body);
        // });

        //
        // var reqq = request.post(backAPI + pathHttp, function (err, resp, body) {
        //     if (err) {
        //         console.log('Error!');
        //     } else {
        //         console.log('URL: ', resp);
        //     }
        // });
        // var form = reqq.form();
        // form.append('positiveDomains', fs.createReadStream(fp), {
        //     filename: name,
        //     contentType: 'application/octet-stream',
        //     contentDisposition: 'attachment; filename=' + name,
        // });



        // request.post({url:backAPI + pathHttp + '?true', headers: [
        //         {
        //             name: 'content-type',
        //             value: 'application/octet-stream'
        //         },
        //         {
        //             name: 'Content-Disposition',
        //             value: 'attachment; filename=' + name
        //         }
        //     ], form: FD}, function optionalCallback(err, res, body) {
        //     if (err) {
        //         return console.error('upload failed:', err);
        //     }
        //     console.log('body  -  ', FD)
        //     console.log('Upload successful!  Server responded with:', res.statusMessage);
        // });



        // fs.unlink(fp, (err) => {
        //     if (err) {
        //
        //     }
        // })


        res.status(200);
        res.json({});
        return
    }

    if (onLoadStream) {
        const mypost = unirest('POST', 'http://92.42.15.118:6000/api/advertisers/1/campaigns/1/subgroups/3001/positivedomains?true')
            .headers({'Content-Type': 'multipart/form-data'})
            .attach('positiveDomains', streamFile)
            .then((ress) => {
                console.log('POST - ', ress.body)
            });

        onLoadStream = false;

        res.status(200);
        res.end();
        return;
    }

    request({
        url: opt.param ? backAPI + pathHttp + opt.param : backAPI + pathHttp,
        method: opt.mtd,
        json: data,   // <--Very important!!!
        // headers: opt.head,
        body: data && (opt.mtd !== 'GET' && opt.mtd !== 'DELETE'),
        // preambleCRLF: true,
        // postambleCRLF: true,
    }, function (error, response, body) {
        onLoadStream = false;
        if (error) {
            res.status(500);
            res.json({message: 'SERVER ERROR'});
            next();
            return
        }

        console.log('url ', pathHttp);

        if (opt.set === 'file') {
            const file = response.headers['content-disposition'].split('filename=')[1].split(';')[0];
            const fp = path.join(__dirname, 'client', 'public', file);

            fs.readFile(fp, "utf8", function(error,data){ });
            fs.writeFileSync(fp, response.body);


            res.json({file: file});
            res.status(200);
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

// app.use(pathHttp, (req, res, next) => {
//     if (streamName) {
//         const mypost = unirest('POST', 'http://92.42.15.118:6000/api/advertisers/1/campaigns/1/subgroups/3001/positivedomains?true')
//             .headers({'Content-Type': 'multipart/form-data'})
//             .attach('positiveDomains', streamFile)
//             .then((ress) => {
//                 console.log('POST - ', ress.body)
//             })
//
//         return
//     }
// })




const PORT = config.get('port') || 5000;
app.listen(PORT, () => console.log('server start.... port - ' + PORT));

