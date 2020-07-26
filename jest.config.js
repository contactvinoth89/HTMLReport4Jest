module.exports = {
    "reporters": [
        "default",
        // ["<rootDir>/index.js", {
        //     "reportPath": "./temp/",
        //     "reportFileName": "result.html",
        //     "title": "Test Report",
        //     "hideMenu": true
        // }]
    ],
    moduleNameMapper: {
        '^.+\\.(css|scss|cssmodule)$': 'identity-obj-proxy'
    }, setupFilesAfterEnv: [
        '<rootDir>/src/setupTests.js'
    ]
};