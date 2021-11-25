var http = require('http');
var fs = require('fs');
var url = require('url');
const { listenerCount } = require('process');

function templateHTML(title, list, body) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
    </head>
    
    <body>
        <h1><a href="/">WEB</a>
        </h1>
        ${list}
        ${body}
    </body>
    </html>
    `;
}
function templateList(filelist) {
    let list = '<ul>';
    let i = 0;

    while (i < filelist.length) {
        list = list + `<li><a href='/?id=${filelist[i]}'>${filelist[i]}</a></li>`
        i = i + 1;
    }

    list = list + '</ul>';
    return list;
}

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    const pathname = url.parse(_url, true).pathname;

    if (pathname === '/') {
        if (queryData.id === undefined) {

            fs.readdir('./data', function (error, filelist) {
                var title = 'welcome';
                var description = 'Hello, Node.js';
                const list = templateList(filelist);
                const template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
                response.writeHead(200);
                response.end(template);
            })

        } else {
            fs.readdir('./data', function (error, filelist) {
                const list = templateList(filelist);
                var title = queryData.id;
                fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
                    const template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
                    response.writeHead(200);
                    response.end(template);
                });
            });
        }
    } else {
        response.writeHead(404);
        response.end('Not Found');
    }

});
app.listen(3000);