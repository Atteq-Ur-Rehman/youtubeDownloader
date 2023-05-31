const express = require('express');
const bodyParser = require('body-parser');
const ytdl = require('ytdl-core');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/download', (req, res) => {
    const { url, quality, fps } = req.body;
    let options = {};

    if (quality === 'highest') {
        options.quality = 'highestvideo';
    } else if (quality === 'lowest') {
        options.quality = 'lowestvideo';
    }

    if (fps) {
        options.filter = format => format.fps && format.fps == fps;
    }

    const videoStream = ytdl(url, options);
    res.header('Content-Disposition', 'attachment; filename="video.mp4"');
    videoStream.pipe(res);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
