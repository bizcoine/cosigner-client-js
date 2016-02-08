var fs = require('fs'),
    util = require('util'),
    https = require('https');

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

  var connect = (function connect() {
    var s;
    options.agent = new https.Agent(options);
    if(data != null) {
      options.headers['content-length'] = data.length; 
    };
    self.s = https.request(options, (res) => {
      res.on('data', (data) => {
        console.log(data.toString());
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

exports.CosignerConnector = CosignerConnector;

CosignerConnector.prototype.checkState = function() {
  if(this.s.authorized) {
    console.log("Authorized");
  } else {
    console.log("Unauthorized");
    console.log(this);
  };
};

exports.ListCurrencies = function() {
  var connector = new CosignerConnector(exports.host, exports.port, '/rs/ListCurrencies', 'GET', null); 
};

exports.RegisterAddress = function(currencyParams) {
  var connector = new CosignerConnector(exports.host, exports.port, '/rs/RegiterAddress', 'POST', JSON.stringify(currencyParams));
};

exports.GetNewAddress = function(currencyParams) {
  var connector = new CosignerConnector(exports.host, exports.port, '/rs/GetNewAddress', 'POST', JSON.stringify(currencyParams));
};

exports.GenerateAddressFromKey = function(currencyParams) {
  var connector = new CosignerConnector(exports.host, exports.port, '/rs/GenerateAddressFromKey', 'POST', JSON.stringify(currencyParams));
};

exports.ListAllAddresses = function(currencyParams) {
  var connector = new CosignerConnector(exports.host, exports.port, '/rs/ListAllAddresses', 'POST', JSON.stringify(currencyParams));
};

exports.ListTransactions = function(currencyParams) {
  var connector = new CosignerConnector(exports.host, exports.port, '/rs/ListTransactions', 'POST', JSON.stringify(currencyParams));
};

exports.GetBalance = function(currencyParams) {
  var connector = new CosignerConnector(exports.host, exports.port, '/rs/GetBalance', 'POST', JSON.stringify(currencyParams));
};

exports.PrepareTransaction = function(currencyParams) {
  var connector = new CosignerConnector(exports.host, exports.port, '/rs/PrepareTransaction', 'POST', JSON.stringify(currencyParams));
};

exports.GetSignersForTransaction = function(currencyParams) {
  var connector = new CosignerConnector(exports.host, exports.port, '/rs/GetSignersForTransaction', 'POST', JSON.stringify(currencyParams));
};

exports.GetSignatureString = function(currencyParams) {
  var connector = new CosignerConnector(exports.host, exports.port, '/rs/GetSignatureString', 'POST', JSON.stringify(currencyParams));
};

exports.ApplySignature = function(currencyParams) {
  var connector = new CosignerConnector(exports.host, exports.port, '/rs/ApplySignature', 'POST', JSON.stringify(currencyParams));
};

exports.ApproveTransaction = function(currencyParams) {
  var connector = new CosignerConnector(exports.host, exports.port, '/rs/ApproveTransaction', 'POST', JSON.stringify(currencyParams));
};

exports.SubmitTransaction = function(currencyParams) {
  var connector = new CosignerConnector(exports.host, exports.port, '/rs/SubmitTransaction', 'POST', JSON.stringify(currencyParams));
};


