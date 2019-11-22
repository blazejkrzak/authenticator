const express = require('express');
const Web3 = require('web3');
const Accounts = require('web3-eth-accounts');

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const app = express();
const port = 8081;

app.get('/accounts', async(req, res) => res.json(await getAccountList()));
app.get('/accounts/unlock', async(req, res) => res.json(await unlockAccount()));
app.get('/accounts/create', async(req, res) => res.json(await createAccount()));
app.get('/provider', (req, res) => res.json(getCurrentProvider()));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


const getCurrentProvider = () => {
    return { body: { version: web3.version, provider: web3.currentProvider }};
};

const getAccountList = async() => {
    const list = await web3.eth.getAccounts();

    return { accounts: list }
};

const createAccount = async() => {
    const accounts = new Accounts();
    const { address, privateKey } = accounts.create();
    // This function if node is connected will return whole account. Private Key is enough for further dev
    // const account = await web3.eth.accounts.privateKeyToAccount(privateKey);

    return {
        address,
        privateKey
    }
};

const unlockAccount = async() => {
    const accounts = await web3.eth.personal.getAccounts();
    let accountsResponse = {};

    if (!Array.isArray(accounts) && accounts.length < 0) {
        return;
    }

    const parseAccounts = async () => {
        for (const account of accounts) {
            const unlocked = await web3.eth.personal.unlockAccount(
                accounts[0],
                'EloMelo1!',
                20
            );
            accountsResponse[account] = { unlocked: unlocked }
        }
    };

    await parseAccounts();

    console.log(accountsResponse);

    return accountsResponse;
};