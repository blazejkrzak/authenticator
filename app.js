const express = require('express');
const Web3 = require('web3');
const Accounts = require('web3-eth-accounts');
const app = express();
const port = (process.env.port || 8081);

app.get('/', (req, res) => res.json(res.json(indexResponse())));
app.put('/accounts', async(req, res) => res.json(await createAccount()));

app.listen(port, () => console.log(`Authenticator listening on port ${port}!`));


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
    // This function if node is connected will return whole account. Private Key is enough for further dev
    // const account = await web3.eth.accounts.privateKeyToAccount(privateKey);

    return {
        address,
        privateKey
    }
};