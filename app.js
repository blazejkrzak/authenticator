const express = require('express');
const Web3 = require('web3');
const net = require('net');
const Accounts = require('web3-eth-accounts');
const app = express();
const port = (process.env.port || 8081);
const ipcLocator = (process.env.nodeAddr || '/root/.silesiacoin/ssc.ipc');

app.get('/', (req, res) => res.json(res.json(indexResponse())));
app.get('/accounts/:address', async(req, res) => res.json(await checkBalance(req)));
app.put('/accounts', async(req, res) => res.json(await createAccount()));

app.listen(port, () => console.log(`Authenticator listening on port ${port}!`));

const web3 = new Web3(new Web3.providers.IpcProvider(ipcLocator, net));

const indexResponse = () => {
    return {
        routes: app._router.stack
            .filter(possibleRoute => possibleRoute.route)
            .map(possibleRoute => {
                return {
                    route: possibleRoute.route.path,
                    methods: possibleRoute.route.methods
                }
            })
    }
};

const createAccount = async() => {
    const accounts = new Accounts();
    const { address, privateKey } = accounts.create();

    return {
        address,
        privateKey
    }
};

const checkBalance = async(req) => {
    const { address } = req.params;

    try {
        const balance = await web3.eth.getBalance(address);
        const sscConverted = web3.utils.fromWei(balance);

        return {
            "accountNumber": address,
            "balance": {
                "wei": balance,
                "ssc": sscConverted
            }
        }
    } catch (error) {
        return {
            "error": error.message
        }
    }
};