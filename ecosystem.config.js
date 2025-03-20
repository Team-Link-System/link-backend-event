module.exports = {
  apps: [{
    name: "link-event",
    script: "./dist/server.js",
    instances: "max",
    exec_mode: "cluster",
    env: {
      NODE_ENV: "production",
      PORT: 9000
    }
  }]
};