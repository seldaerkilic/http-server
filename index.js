const http = require('http');

const PORT = 3000;



// const server = http.createServer((req, res) => {
//     res.writeHead(200, {
//         'Content-Type': 'application/json',
//     });
//     res.end(JSON.stringify({
//         id: 1,
//         name: 'Isaac Newton',
//     }));
// });

const friends = [
    {
        id: 0,
        name: 'Nicola Tesla',
    },
    {
        id: 1,
        name: 'Sir Isaac Newton',
    },
    {
        id: 2,
        name: 'Albert Einstein',
    }
]

const server = http.createServer();

server.on('request', (req, res) => {
    const items = req.url.split('/');
    // /friends/2 => ['', 'friends', '2']

    if (items[1] === 'friends') {
        // writeHead default is 200. No need for code below. However, if we want to write it, there's another way following it:
        // res.writeHead(200, {
        //     'Content-Type': 'application/json',
        // });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        if (items.length === 3) {
            const friendIndex = Number(items[2]);
            res.end(JSON.stringify(friends[friendIndex]));
        } else {
            res.end(JSON.stringify(friends));
        }
    } else if (items[1] === 'messages') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>Hello Isaac!</li>');
        res.write('<li>What are your thoughts on astronomy?</li>');
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    } else {
        res.statusCode = 404;
        res.end();
    }
} );

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
});
