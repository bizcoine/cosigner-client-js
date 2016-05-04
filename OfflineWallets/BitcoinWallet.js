var crypto = require('crypto'),
    bs58check = require('bs58check'),
    secp256k1 = require('secp256k1/js');

exports.generatePrivateKey = function() {
  // Generate secp256k1 key
  var privKey;
  do {
    privKey = crypto.randomBytes(32);
  } while(!secp256k1.privateKeyVerify(privKey));

  // Encode it.
  var networkByte = "80";
  privKey = privKey.toString('hex');

  var byteData = networkByte + privKey;

  return bs58check.encode(new Buffer(byteData, 'hex'));
};

exports.generatePublicKey = function(privateKey) {
  privateKey = bs58check.decode(privateKey).toString('hex').substring(2);

  var pubKey = secp256k1.publicKeyCreate(new Buffer(privateKey, 'hex'), false);
  return pubKey.toString('hex');
};

exports.signWithPrivateKey = function(sigData, privateKey) {
  // TODO
};
