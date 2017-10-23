/*jshint esversion: 6 */
const https = require('https');
const express = require("express");
const bodyParser = require("body-parser");
const databox = require('node-databox');

//
// Get the needed Environment variables 
//
const DATABOX_STORE_BLOB_ENDPOINT = process.env.DATABOX_STORE_ENDPOINT;

//HTTPS certs created by the container mangers for this components HTTPS server.
credentials = databox.getHttpsCredentials();


var PORT = process.env.port || '8080';

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/status", function(req, res) {
    res.send("active");
});

var vendor = "databox inc";

databox.waitForStoreStatus(DATABOX_STORE_BLOB_ENDPOINT,'active',10)
  .then(() => {
    
    proms = [
      databox.catalog.registerDatasource(DATABOX_STORE_BLOB_ENDPOINT, {
        description: 'Datasource 1',
        contentType: 'text/json',
        vendor: 'Databox Inc.',
        unit:'%',
        type: 'type1',
        datasourceid: 'dsid1',
        storeType: 'store-json'
      }),

      databox.catalog.registerDatasource(DATABOX_STORE_BLOB_ENDPOINT, {
        description: 'Datasource 2',
        contentType: 'text/json',
        vendor: 'Databox Inc.',
        unit:'%',
        type: 'type1',
        datasourceid: 'dsid2',
        storeType: 'store-json'
      }),

      databox.catalog.registerDatasource(DATABOX_STORE_BLOB_ENDPOINT, {
        description: 'Datasource 3',
        contentType: 'text/json',
        vendor: 'Databox Inc.',
        unit:'%',
        type: 'type2',
        datasourceid: 'dsid3',
        storeType: 'store-json'
      }),

       databox.catalog.registerDatasource(DATABOX_STORE_BLOB_ENDPOINT, {
        description: 'Datasource 4',
        contentType: 'text/json',
        vendor: 'Databox Inc.',
        unit:'%',
        type: 'type2',
        datasourceid: 'dsid4',
        storeType: 'store-json'
      })
      
    ];
    
    return Promise.all(proms);
  })
  .then(()=>{
    https.createServer(credentials, app).listen(PORT);

      
    save('dsid1', {"value": 1});
    save('dsid2', {"value": 1});
    save('dsid3', {"value": 1});
    save('dsid4', {"value": 1});

    function save(datasourceid,data) {
      console.log("Saving data::", datasourceid, data);
      
      databox.timeseries.write(DATABOX_STORE_BLOB_ENDPOINT, datasourceid, data)
      .catch((error)=>{
        console.log("[Error writing to store]", error);
      });
    }


  })
  .catch((err)=>{
    console.log("[ERROR]",err);
  });
  
module.exports = app;