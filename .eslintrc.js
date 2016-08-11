module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "globals": {
        "app": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "max-len": [
            "error",
            {
                "code": 90,
                "ignoreUrls": true
            }
        ],
        "eqeqeq": [
            "error",
            "always"
        ],
        "no-console": "warn"
    }
};
