var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body) {
    var template = `
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
};

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    const pathname = url.parse(_url, true).pathname;



    if (pathname === '/') {
        if (queryData.id === undefined) {

            fs.readdir('./data', function (error, filelist) {
                console.log(filelist);
                var title = 'welcome';
                var description = 'Hello, Node.js';
                let list = '<ul>';
                let i = 0;

                while (i < filelist.length) {
                    list = list + `<li><a href='/?id=${filelist[i]}'>${filelist[i]}</a></li>`
                    i = i + 1;
                }

                list = list + '</ul>';
                const template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
                response.writeHead(200);
                response.end(template);
            })

        } else {
            fs.readdir('./data', function (error, filelist) {
                console.log(filelist);
                let list = '<ul>';
                let i = 0;

                while (i < filelist.length) {
                    list = list + `<li><a href='/?id=${filelist[i]}'>${filelist[i]}</a></li>`
                    i = i + 1;
                }

                list = list + '</ul>';
            

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