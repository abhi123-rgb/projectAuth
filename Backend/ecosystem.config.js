module.exports = {
    apps: [
        {
            name: "ProjectAuth",
            script: "npm",
            args: "start",
            env: {
                NODE_ENV: "development",
                ENV_VAR1: "environment-variable",
            },
        },
    ],
};