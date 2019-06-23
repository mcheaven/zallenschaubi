module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["react-native"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-native"
    ],
    "rules": {
        "no-console": "off",
        "no-use-before-define": "off",
        "react/prefer-stateless-function": "off",
    },
    "parser": "babel-eslint"
};