const http = require('http');
const requestHandler = require('./requestHandler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;
const urlStruct = {
    '/': requestHandler.getIndex,
    '/style.css': requestHandler.getCss,
    '/success': requestHandler.getSuccess,
    '/badRequest': requestHandler.getBadRequest,
    '/unauthorized': requestHandler.getUnauthorized,
    '/forbidden': requestHandler.getForbidden,
    '/internal': requestHandler.getInternal,
    '/notImplemented': requestHandler.getNotImplemented,
    default: requestHandler.getPageDoesNotExist
}

const onRequest = (request, response) => {
    const protocol = request.encrypted ? 'https' : 'http';
    const parsedURL = new URL(request.url, `${protocol}://${request.headers.host}`);
    
    // pull necessary info from parsed url and request
    request.query = Object.fromEntries(parsedURL.searchParams);
    if (request.headers.accept){
        request.acceptedTypes = request.headers.accept.split(',');
    }
    const handler = urlStruct[parsedURL.pathname];
    // make request
    if (handler) {
        handler(request, response);
    }
    else {
        urlStruct.default(request, response);
    }
}

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
})