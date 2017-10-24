/*jshint esversion: 6 */
const https = require('https');
const express = require("express");
const bodyParser = require("body-parser");
const databox = require('node-databox');
const netatmo = require('netatmo')
const fs = require('fs');
const units = {"Temperature": "ºC", "Humidity": "%", "CO2": "ppm", "Noise": "dB", "Pressure": "mBar"}



//
// Get the needed Environment variables 
//
const DATABOX_STORE_BLOB_ENDPOINT = process.env.DATABOX_STORE_ENDPOINT;

//HTTPS certs created by the container mangers for this components HTTPS server.
credentials = databox.getHttpsCredentials();

var auth;
var api;

var PORT = process.env.port || '8080';

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/status", function(req, res) {
    res.send("active");
});

var vendor = "databox inc";

function pollData() {
  fs.readFile('/src/config.json', 'utf8', (err, data)=>{
      if (err) throw err;
      auth = JSON.parse(data);  
      
      api = new netatmo(auth);
      api.getStationsData((err, devices)=>{
        var sensor_name = devices[0].module_name;
        devices[0].data_type.forEach((sensor_type)=>{
          save(sensor_name+"_"+sensor_type, devices[0].dashboard_data[sensor_type]);
      });

      devices[0].modules.forEach((module)=>{
        var sensor_name = module.module_name
        module.data_type.forEach((sensor_type)=>{
          save(sensor_name+"_"+sensor_type,module.dashboard_data[sensor_type]);
        });
      });

    });
    function save(datasourceid,data) {
      console.log("Saving data::", datasourceid, data);
      
      databox.timeseries.write(DATABOX_STORE_BLOB_ENDPOINT, datasourceid, data)
      .catch((error)=>{
        console.log("[Error writing to store]", error);
      });
    }
    });
}


databox.waitForStoreStatus(DATABOX_STORE_BLOB_ENDPOINT,'active',10)
  .then(() => {

    fs.readFile('/src/config.json', 'utf8', (err, data)=>{
      if (err) throw err;
      auth = JSON.parse(data);
      api = new netatmo(auth);
      api.getStationsData((err, devices)=>{
        proms = [];
        var sensor_name = devices[0].module_name;
        devices[0].data_type.forEach((sensor_type)=>{
          var sensor = {
            description: sensor_name+"_"+sensor_type+"_sensor",
            contentType: 'text/json',
            vendor: 'Databox Inc.',
            unit: units[sensor_type],
            type: sensor_type,
            datasourceid: sensor_name+"_"+sensor_type,
            storeType: 'store-json'
          }
          console.log(sensor);
          proms.push(databox.catalog.registerDatasource(DATABOX_STORE_BLOB_ENDPOINT, sensor));
        });

        devices[0].modules.forEach((module)=>{
          var sensor_name = module.module_name
          module.data_type.forEach((sensor_type)=>{
            var sensor = {
              description: sensor_name+"_"+sensor_type+"_sensor",
              contentType: 'text/json',
              vendor: 'Databox Inc.',
              unit: units[sensor_type],
              type: sensor_type,
              datasourceid: sensor_name+"_"+sensor_type,
              storeType: 'store-json'
            }
            console.log(sensor);
            proms.push(databox.catalog.registerDatasource(DATABOX_STORE_BLOB_ENDPOINT, sensor));
          });
        });
        return Promise.all(proms);
      });
    }); 
  })
  .then(()=>{
    https.createServer(credentials, app).listen(PORT);
    setInterval(pollData, 5000);
    
    

  })
  .catch((err)=>{
    console.log("[ERROR]",err);
  });
  
module.exports = app;