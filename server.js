const grpc = require("grpc");
const proto = grpc.load(`${__dirname}/./sample.proto`);
const SensorLog = require("./sensorLog");
const config = require("./config.json");
const HOST = config.host;
const PORT = config.port || process.env.PORT;
const server = new grpc.Server();

server.addService(proto.Greeter.service, {
  async sayHello(call, cb) {
    let dataArr = JSON.parse(call.request.data);
    for (let i in dataArr) {
      let sensorLog = new SensorLog({
        reportTime: dataArr[i].reportTime,
        createTime: new Date().toLocaleString(),
        updateTime: new Date().toLocaleString(),
        message: dataArr[i].message,
        error: dataArr[i].error,
        alert: dataArr[i].alert,
        arcFault: dataArr[i].arcFault
      });
      await sensorLog.save(function(err, res) {
        if (err) {
          console.log("Error:" + err);
        } else {
          console.log("Res:" + res);
        }
      });
    }

    const res = {
      message: "data received:" + new Date().toLocaleString()
    };
    cb(null, res);
  }
});
server.bind(`${HOST}:${PORT}`, grpc.ServerCredentials.createInsecure());
server.start();
console.log(`server listening on ${HOST}:${PORT}`);
