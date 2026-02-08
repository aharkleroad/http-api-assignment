const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// used to respond to all requests
const respond = (request, response, status, content, type, message) => {
    response.writeHead(status, message, {
        'Content-Type': type,
        'Content-Length': Buffer.byteLength(content, 'utf8')
    });
    response.write(content);
    response.end();
}

// calls respond depending on what url is requested
const getIndex = (request, response) => {
    respond(request, response, 200, index, 'text/html', "");
}

const getCss = (request, response) => {
    respond(request, response, 200, css, 'text/css', "");
}

const getSuccess = (request, response) => {
    const message = "This is a successful response";
    // handle xml
    if (request.acceptedTypes) {
        if (request.acceptedTypes[0] === 'text/xml') {
            const responseXML = `<response><message>${message}</message></response>`;
            console.log(responseXML);
            respond(request, response, 200, responseXML, 'text/xml', responseXML);
        }
    }
    // handle json
    const responseJSON = JSON.stringify({ message });
    console.log(responseJSON);
    respond(request, response, 200, responseJSON, 'application/json', responseJSON);
}

const getBadRequest = (request, response) => {
    let responseText;
    let message = "This request has the required parameters.";
    let status = 200;
    let id;

    // check for appropriate query parameters
    if (!request.query.valid || request.query.valid !== 'true') {
        message = "Missing valid query parameter set to true.";
        status = 400;
        id = "badRequest";
    }
    // handle xml
    if (request.acceptedTypes) {
        if (request.acceptedTypes[0] === 'text/xml') {
            // adds id to xml if it's defined
            if (id) {
                responseText = `<response><message>${message}</message><id>${id}</id></response>`;
            }
            else {
                responseText = `<response><message>${message}</message></response>`;
            }
            console.log(responseText);
            respond(request, response, status, responseText, 'text/xml', responseText);
        }
    }
    // handle json
    if (id) {
        responseText = JSON.stringify({ message, id });
    }
    else {
        responseText = JSON.stringify({ message });
    }
    console.log(responseText);
    respond(request, response, status, responseText, 'application/json', responseText);
}

const getUnauthorized = (request, response) => {
    let responseText;
    let message = "You have successfully viewed the content";
    let status = 200;
    let id;

    // check for appropriate query parameters
    if (!request.query.loggedIn || request.query.loggedIn !== 'yes') {
        message = "Missing loggedIn query parameter set to yes.";
        status = 401;
        id = "unauthorized";
    }
    // handle xml
    if (request.acceptedTypes) {
        if (request.acceptedTypes[0] === 'text/xml') {
            // adds id to xml if it's defined
            if (id) {
                responseText = `<response><message>${message}</message><id>${id}</id></response>`;
            }
            else {
                responseText = `<response><message>${message}</message></response>`;
            }
            console.log(responseText);
            respond(request, response, status, responseText, 'text/xml', responseText);
        }
    }
    // handle json
    if (id) {
        responseText = JSON.stringify({ message, id });
    }
    else {
        responseText = JSON.stringify({ message });
    }
    console.log(responseText);
    respond(request, response, status, responseText, 'application/json', responseText);
}

const getForbidden = (request, response) => {
    const message = "You do not have access to this content.";
    const id = "forbidden";
    // handle xml
    if (request.acceptedTypes) {
        if (request.acceptedTypes[0] === 'text/xml') {
            const responseXML = `<response><message>${message}</message><id>${id}</id></response>`;
            console.log(responseXML);
            respond(request, response, 403, responseXML, 'text/xml', responseXML);
        }
    }
    // handle json
    const responseJSON = JSON.stringify({ message, id });
    console.log(responseJSON);
    respond(request, response, 403, responseJSON, 'application/json', responseJSON);
}

const getInternal = (request, response) => {
    const message = "Internal Server Error. Something went wrong.";
    const id = "internalError";
    // handle xml
    if (request.acceptedTypes) {
        if (request.acceptedTypes[0] === 'text/xml') {
            const responseXML = `<response><message>${message}</message><id>${id}</id></response>`;
            console.log(responseXML);
            respond(request, response, 500, responseXML, 'text/xml', responseXML);
        }
    }
    // handle json
    const responseJSON = JSON.stringify({ message, id });
    console.log(responseJSON);
    respond(request, response, 500, responseJSON, 'application/json', responseJSON);
}

const getNotImplemented = (request, response) => {
    const message = "A get request for this page has not been implemented yet. Check again later for updated content";
    const id = "notImplemented";
    // handle xml
    if (request.acceptedTypes) {
        if (request.acceptedTypes[0] === 'text/xml') {
            const responseXML = `<response><message>${message}</message><id>${id}</id></response>`;
            console.log(responseXML);
            respond(request, response, 501, responseXML, 'text/xml', responseXML);
        }
    }
    // handle json
    const responseJSON = JSON.stringify({ message, id });
    console.log(responseJSON);
    respond(request, response, 501, responseJSON, 'application/json', responseJSON);
}

const getPageDoesNotExist = (request, response) => {
    const message = "The page you are looking for was not found";
    const id = "notFound";
    // handle xml
    if (request.acceptedTypes) {
        if (request.acceptedTypes[0] === 'text/xml') {
            const responseXML = `<response><message>${message}</message><id>${id}</id></response>`;
            console.log(responseXML);
            respond(request, response, 404, responseXML, 'text/xml', responseXML);
        }
    }
    // handle json
    const responseJSON = JSON.stringify({ message, id });
    console.log(responseJSON);
    respond(request, response, 404, responseJSON, 'application/json', responseJSON);
}

module.exports = {
    getIndex,
    getCss,
    getSuccess,
    getBadRequest,
    getUnauthorized,
    getForbidden,
    getInternal,
    getNotImplemented,
    getPageDoesNotExist
}