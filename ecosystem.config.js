require('dotenv').config();

module.exports = {
    apps: [{
        name: 'bread',
        script: './app.js'
    }],
    deploy: {
        production: {
            user: "ec2-user",
            host: process.env.HOST,
            key: process.env.KEY,
            ref: process.env.REF,
            repo: process.env.REPO,
            path: process.env.PATH,
            'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
        }
    }
};
