import asyncio
import json
import os
from web3 import Web3
from dotenv import load_dotenv

load_dotenv()
w3 = Web3(Web3.HTTPProvider(os.getenv('API_URL')))

ABI = json.load(open('contract_abi.json',))

token_contract_address = '0xab0b0dd7e4eab0f9e31a539074a03f1c1be80879'
token_contract_address = Web3.toChecksumAddress(token_contract_address)

# define contract
contract = w3.eth.contract(token_contract_address, abi=ABI)
available_ids = []

def background(f):
    def wrapped(*args, **kwargs):
        return asyncio.get_event_loop().run_in_executor(None, f, *args, **kwargs)

    return wrapped

@background
def fetch_available_ids(i):
    global available_ids
    try:
        owner_info = contract.functions.ownerOf(i).call()
    except:
        print(f'- - - -> No owner for: {i}')
        available_ids.append(i)


async def run_tasks():
    for i in range(1, 2501):
        fetch_available_ids(i)

asyncio.run(run_tasks())
print('Available IDs: ', json.dumps(available_ids, indent=4))
print('Total number of available IDs:', len(available_ids))
