module.exports = {
    apps: [{
        name: 'bread',
        script: './app.js'
    }],
    deploy: {
        production: {
            user: process.env.USER,
            host: process.env.HOST,
            key: process.env.KEY,
            ref: process.env.REF,
            repo: process.env.REPO,
            path: process.env.PATH,
            'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
        }
    }
};
