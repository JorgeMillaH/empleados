const httpStatusDescriptions = {
    "100": "Continue",
    "101": "Switching Protocols",
    "200": "OK",
    "201": "Created",
    "202": "Accepted",
    "203": "Non-Authoritative Information",
    "204": "No Content",
    "205": "Reset Content",
    "300": "Multiple Choices",
    "301": "Moved Permanently",
    "302": "Found",
    "303": "See Other",
    "305": "Use Proxy",
    "307": "Temporary Redirect",
    "400": "Bad Request",
    "401": "Unauthorized",
    "402": "Payment Required",
    "403": "Forbidden",
    "404": "Not Found",
    "405": "Method Not Allowed",
    "406": "Not Acceptable",
    "408": "Request Timeout",
    "409": "Conflict",
    "410": "Gone",
    "411": "Length Required",
    "412": "Precondition Failed",
    "413": "Payload Too Large",
    "414": "URI Too Long",
    "415": "Unsupported Media Type",
    "417": "Expectation Failed",
    "422": "Unprocessable Entity",
    "423": "Locked",
    "426": "Upgrade Required",
    "429": "Too Many Requests",
    "500": "Internal Server Error",
    "501": "Not Implemented",
    "502": "Bad Gateway",
    "503": "Service Unavailable",
    "504": "Gateway Timeout",
    "505": "HTTP Version Not Supported",
};

module.exports = (targetVal, opts, paths, otherValues) => {
    const results = [];
    const validCodes = opts.validCodes || [];

    // Itera sobre las respuestas para verificar las descripciones
    Object.keys(targetVal).forEach(code => {
        // Limpia el codigo si tiene caracteres extraños, pero manten la clave original
        const cleanCode = code.replace(/[^0-9]/g, ''); // Solo numeros

      
        // Solo procesa los codigos definidos en validCodes
        if (validCodes.includes(parseInt(cleanCode))) {
            const description = targetVal[code]?.description || '';
            const expectedDescription = httpStatusDescriptions[cleanCode] || '';
    

            // Si la descripcion no coincide, agrega un resultado de error
            if (description !== expectedDescription) {
                results.push({
                    message: `Code ${code} must have the description '${expectedDescription}' but found '${description}'`,
                    path: paths.target ? [...paths.target, code, 'description'] : [code, 'description'],
                });
            }
        }
    });

    return results;
};
