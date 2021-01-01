module.exports = {
    "roots": [
        "<rootDir>/src/"
    ],
    "testMatch": [
        "**/?(*.)+(test).+(ts)"
    ],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    "collectCoverageFrom": [
        "src/**/*.ts"
    ]
}