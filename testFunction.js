const validate4xx = require('./functions/codeDescriptions');

const testCases = [
    { code: "404", description: "Not Found" },
    { code: "400", description: "Bad Request" },
    { code: "404", description: "Incorrect Description" }
];

testCases.forEach(testCase => {
    validate4xx(testCase, {
        report: (result) => {
            console.log(result);
        }
    });
});
