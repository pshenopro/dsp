const express = require('express'),
    path = require('path');

const app = express();

if (process.env.NODE_ENV === 'prod') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = 80;
app.listen(PORT, () => console.log('server start.... port - ' + PORT));