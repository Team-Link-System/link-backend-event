module.exports = {
  apps: [{
    name: "link-event",
    script: "server/server.js",
    instances: Number(process.env.CLUSTER_INSTANCES || '1'),
    exec_mode: "cluster",
    env: {
      PWD: '/app',
      PORT: 9000
    }
  }]
};