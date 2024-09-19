const httpStatusDescriptions = {
    "400": "Bad Request",
    "401": "Unauthorized",
    "403": "Forbidden",
    "404": "Not Found",
    "406": "Not Acceptable",
    "415": "Unsupported Media Type",
    "422": "Unprocessable Entity",
    "429": "Too Many Requests",
};

module.exports = (targetVal, opts, paths, otherValues) => {
    const results = [];
    const validCodes = opts.validCodes || [];

    // Mensaje de depuración: opciones iniciales
    console.log("Initialization:", {
        targetVal, validCodes
    });

    // Itera sobre las respuestas para verificar las descripciones
    Object.keys(targetVal).forEach(code => {
        // Limpia el código si tiene caracteres extraños, pero mantén la clave original
        const cleanCode = code.replace(/[^0-9]/g, ''); // Sólo números

        console.log("culo:", {
            cleanCode
        });

      

        // Solo procesa los códigos definidos en validCodes
        if (validCodes.includes(parseInt(cleanCode))) {
            const description = targetVal[code]?.description || '';
            const expectedDescription = httpStatusDescriptions[cleanCode] || '';

            console.log("culo2:", {
                description, expectedDescription
            });
    

            // Si la descripción no coincide, agrega un resultado de error
            if (description !== expectedDescription) {
      

                results.push({
                    message: `Code ${code} must have the description '${expectedDescription}' but found '${description}'`,
                    path: paths.target ? [...paths.target, code, 'description'] : [code, 'description'],
                });
            }
        } else {
            // Mensaje de depuración: código no válido
        }
    });

    // Mensaje de depuración: resultados finales

    return results;
};
