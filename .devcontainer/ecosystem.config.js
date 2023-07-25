module.exports = {
  apps: [{
    script: 'cd restfulApiHandler; node_modules/lambda-edge-server/server.js --handler src/app.js',
    error_file: '.devcontainer/error.log',
    out_file: '.devcontainer/debug.log',
    watch: ['restfulApiHandler/src'],
    watch_delay: 1000
  }]
}
