# NFT Tools
Tools to help analyzing and automating NFTs strategies.

## Node.js script to Mint NFTs

Files you need to update:
* The contract ABI: ```contract_abi.json```
* Info about your private keys: ```.env```
* Other contract related info: ```mint.js```

### How to install it:
After you've updated the files above, install the dependencies:

```npm install .```

### How to run it:
Finally, you will always run this script with the following command:

```node mint.js```

## Python script to analyze ids available for minting
Files you need to update:
* The contract ABI: ```contract_abi.json```
* Info about your private keys: ```.env```
* The contract address in ```nft_availability_sniper.py```

### How to install it:
After you've updated the files above, install the dependencies:

```pip install -r requirements.txt```

### How to run it:
Finally, you will always run this script with the following command:

```python nft_availability_sniper.py```
