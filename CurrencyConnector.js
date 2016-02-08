var fs = require('fs'),
    util = require('util'),
    EventEmitter = require('events').EventEmitter,
    https = require('https'),
    ws = require('ws');

exports.host = '127.0.0.1';
exports.port = 8443;

exports.CurrencyParametersRecipient = {
  recipientAddress: "",
  amount: ""
};

exports.CurrencyParameters = {
  currencySymbol: "",
  userKey: "",
  account: [],
  callback: "",
  receivingAccount: [],
  transactionData: ""
};

var CosignerConnector = function(host, port, path, method, data) {
  var options = {
    ca: fs.readFileSync('ca.pem').toString(),
    key: fs.readFileSync('client.key').toString(),
    cert: fs.readFileSync('client.pem').toString(),
    headers: { 'content-type': 'text/plain'},

    hostname: host,
    port: port,
    path: path,
    method: method
  };

  var self = this;
  EventEmitter.call(this);

  var connect = (function connect() {
    var s;
    options.agent = new https.Agent(options);
    if(data != null) {
      options.headers['content-length'] = data.length; 
    };
    self.s = https.request(options, (res) => {
      res.on('data', (data) => {
        self.emit('response', data.toString());
      });
    });
    if(data != null) {
      self.s.write(data);
    };
    self.s.on('error', (error) => {
      console.log(error);
    });
    self.s.end();
  })();
};

var CosignerWebSocketConnector = function(host, port, path, data) {
var options = {
    ca: fs.readFileSync('ca.pem').toString(),
    key: fs.readFileSync('client.key').toString(),
    cert: fs.readFileSync('client.pem').toString(),

    hostname: host,
    port: port,
    path: path,
  };

  var self = this;
  EventEmitter.call(this);

  var connect = (function connect() {
    var s;
    self.s = new ws('wss://' + host + ':' + port + path, options);
    self.s.on('open', () => {
      // Send the payload.
      self.s.send(data);
    });
    self.s.on('message', (data, flags) => {
      self.emit('response', data);  
    });
  })();
};

util.inherits(CosignerConnector, EventEmitter);
util.inherits(CosignerWebSocketConnector, EventEmitter);

exports.CosignerConnector = CosignerConnector;

exports.ListCurrencies = function(callback) {
  var connector = new CosignerConnector(exports.host, exports.port, '/rs/ListCurrencies', 'GET', null); 
  connector.on('response', (data) => { if(typeof(callback) == "function") {callback(data); };});
};

exports.RegisterAddress = function(currencyParams, callback) {
  var connector = new CosignerConnector(exports.host, exports.port, '/rs/RegiterAddress', 'POST', JSON.stringify(currencyParams));
  connector.on('response', (data) => { if(typeof(callback) == "function") {callback(data); };});
};

exports.GetNewAddress = function(currencyParams, callback) {
  var connector = new CosignerConnector(exports.host, exports.port, '/rs/GetNewAddress', 'POST', JSON.stringify(currencyParams));
  connector.on('response', (data) => { if(typeof(callback) == "function") {callback(data); };});
};

exports.GenerateAddressFromKey = function(currencyParams, callback) {
  var connector = new CosignerConnector(exports.host, exports.port, '/rs/GenerateAddressFromKey', 'POST', JSON.stringify(currencyParams));
  connector.on('response', (data) => { if(typeof(callback) == "function") {callback(data); };});
};

exports.ListAllAddresses = function(currencyParams, callback) {
  var connector = new CosignerConnector(exports.host, exports.port, '/rs/ListAllAddresses', 'POST', JSON.stringify(currencyParams));
  connector.on('response', (data) => { if(typeof(callback) == "function") {callback(data); };});
};

exports.ListTransactions = function(currencyParams, callback) {
  var connector = new CosignerConnector(exports.host, exports.port, '/rs/ListTransactions', 'POST', JSON.stringify(currencyParams));
  connector.on('response', (data) => { if(typeof(callback) == "function") {callback(data); };});
};

exports.GetBalance = function(currencyParams, callback) {
  var connector = new CosignerConnector(exports.host, exports.port, '/rs/GetBalance', 'POST', JSON.stringify(currencyParams));
  connector.on('response', (data) => { if(typeof(callback) == "function") {callback(data); };});
};

exports.PrepareTransaction = function(currencyParams, callback) {
  var connector = new CosignerConnector(exports.host, exports.port, '/rs/PrepareTransaction', 'POST', JSON.stringify(currencyParams));
  connector.on('response', (data) => { if(typeof(callback) == "function") {callback(data); };});
};

exports.GetSignersForTransaction = function(currencyParams, callback) {
  var connector = new CosignerConnector(exports.host, exports.port, '/rs/GetSignersForTransaction', 'POST', JSON.stringify(currencyParams));
  connector.on('response', (data) => { if(typeof(callback) == "function") {callback(data); };});
};

exports.GetSignatureString = function(currencyParams, callback) {
  var connector = new CosignerConnector(exports.host, exports.port, '/rs/GetSignatureString', 'POST', JSON.stringify(currencyParams));
  connector.on('response', (data) => { if(typeof(callback) == "function") {callback(data); };});
};

exports.ApplySignature = function(currencyParams, callback) {
  var connector = new CosignerConnector(exports.host, exports.port, '/rs/ApplySignature', 'POST', JSON.stringify(currencyParams));
  connector.on('response', (data) => { if(typeof(callback) == "function") {callback(data); };});
};

exports.ApproveTransaction = function(currencyParams, callback) {
  var connector = new CosignerConnector(exports.host, exports.port, '/rs/ApproveTransaction', 'POST', JSON.stringify(currencyParams));
  connector.on('response', (data) => { if(typeof(callback) == "function") {callback(data); };});
};

exports.SubmitTransaction = function(currencyParams, callback) {
  var connector = new CosignerConnector(exports.host, exports.port, '/rs/SubmitTransaction', 'POST', JSON.stringify(currencyParams));
  connector.on('response', (data) => { if(typeof(callback) == "function") {callback(data); };});
};

exports.MonitorBalance = function(currencyParams, callback) {
  var connector = new CosignerWebSocketConnector(exports.host, exports.port, '/ws/MonitorBalance', JSON.stringify(currencyParams));
  connector.on('response', (data) => { if(typeof(callback) == "function") {callback(data); };});
}

// Tests
//exports.ListCurrencies((response) => {console.log(response);});
//exports.CurrencyParameters.currencySymbol = "BTC";
//exports.CurrencyParameters.account.push("deadbeef");
//exports.MonitorBalance(exports.CurrencyParameters, (response) => {console.log(response);});
