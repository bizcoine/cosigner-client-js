var crypto = require('crypto'),
    secp256k1 = require('secp256k1/js');

exports.generatePrivateKey = function() {
  // Generate secp256k1 key
  var privKey;
  do {
    privKey = crypto.randomBytes(32);
  } while(!secp256k1.privateKeyVerify(privKey));

  return privKey.toString('hex');
};

exports.generatePublicKey = function(privateKey) {
 var pubKey = secp256k1.publicKeyCreate(new Buffer(privateKey, 'hex'), false);
 return pubKey.toString('hex');  
};

exports.signWithPrivateKey = function(sigData, privateKey) {
  // TODO
};
