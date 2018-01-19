var mongoose = require("./db");
Schema = mongoose.Schema;
let sensorLogSchema = new Schema({
  reportTime: { type: Date },
  createTime: { type: Date },
  updateTime: { type: Date },
  channels: { type: Object },
  error: { type: Object },
  alert: { type: Object },
  arcFault: { type: String }
});

module.exports = mongoose.model("SensorLog", sensorLogSchema, "SensorLog");
