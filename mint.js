require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const ABI = require('./contract_abi.json');

//Change these variables
const CONTRACT_ADDRESS = '0x7e6bc952d4b4bd814853301bee48e99891424de0'

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);
const nftContract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

const MINT_PRICE = 0.07
const MINT_QUANTITY = 1
var MAX_PRIORITY_FEE = 100

MAX_PRIORITY_FEE *= 1_000_000_000
MAX_PRIORITY_FEE = MAX_PRIORITY_FEE
const WALLET_ADDRESS = web3.utils.toChecksumAddress(PUBLIC_KEY)
async function mintNFT() {
  //get latest nonce
  const nonce = await web3.eth.getTransactionCount(WALLET_ADDRESS, 'latest');
  console.log('Latest nonce is:', nonce)

  value = web3.utils.toWei((MINT_PRICE*MINT_QUANTITY)+'', 'ether')

  //the transaction
  const tx = {
    'from': WALLET_ADDRESS,
    'to': CONTRACT_ADDRESS,
    'value': value,
    'nonce': nonce,
    'gas': 600000,
    'maxPriorityFeePerGas': MAX_PRIORITY_FEE,
    'data': nftContract.methods.mint(MINT_QUANTITY).encodeABI()
  };
  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise.then((signedTx) => {
    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
      if (!err) {
        console.log("The hash of your transaction is: ", hash, "\nCheck the EVM Mempool to view the status of your transaction!");
      } else {
        console.log("Something went wrong when submitting your transaction:", err)
      }
    });
  }).catch((err) => {
    console.log("Promise failed:", err);
  });
}

mintNFT();
