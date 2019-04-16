module.exports = {
    apps: [{
        name: 'tutorial-2',
        script: './index.js'
    }],
    deploy: {
        production: {
            user: 'ec2-user',
            host: 'ec2-54-174-134-52.compute-1.amazonaws.com/',
            key: '~/.ssh/id_rsa.pub',
            ref: 'origin/master',
            repo: 'github.com/camzach/get-this-bread.git',
            path: '~/get-this-bread',
            'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
        }
    }
};