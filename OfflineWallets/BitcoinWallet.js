var crypto = require('crypto'),
    bs58check = require('bs58check');

// change secp256k1 to elliptic

exports.generatePrivateKey = function() {
  // Generate secp256k1 key

  // Encode it.
  // var networkByte = "80";
  // privKey = privKey.toString('hex');
  //
  // var byteData = networkByte + privKey;
  //
  // return bs58check.encode(new Buffer(byteData, 'hex'));
};

exports.generatePublicKey = function(privateKey) {
  // privateKey = bs58check.decode(privateKey).toString('hex').substring(2);
};

exports.signWithPrivateKey = function(sigData, privateKey) {
  // TODO
};
