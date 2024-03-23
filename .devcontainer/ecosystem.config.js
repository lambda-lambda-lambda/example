module.exports = {
  apps: [{
    script: 'node_modules/lambda-edge-server/server.js',
    args: '--handler src/app.js',
    cwd: 'restfulApiHandler',
    error_file: '../.devcontainer/error.log',
    out_file: '../.devcontainer/debug.log',
    watch: ['src'],
    watch_delay: 5000,
    instance_var: 'dev',
    instances: 1,
    exec_mode: 'fork'
  }]
};
