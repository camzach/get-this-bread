module.exports = {
    apps: [{
        name: 'bread',
        script: './app.js'
    }],
    deploy: {
        production: {
            user: 'ec2-user',
            host: 'ec2-3-91-148-201.compute-1.amazonaws.com',
            key: '~/.ssh/awsKey.pem',
            ref: 'origin/master',
            repo: 'git@github.com:camzach/get-this-bread.git',
            path: '/home/ec2-user/get-this-bread',
            'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
        }
    }
};
