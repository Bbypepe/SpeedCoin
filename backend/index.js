const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Web3 = require('web3');
const contractABI = require('./SpeedCoinABI.json'); // ABI of the SpeedCoin contract
const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'));
const contract = new web3.eth.Contract(contractABI, contractAddress);

app.use(bodyParser.json());

app.post('/convert', async (req, res) => {
  const { points, userAddress } = req.body;

  if (points >= 5000) {
    const spdAmount = web3.utils.toWei('1', 'ether'); // 1 SPD token

    try {
      const result = await contract.methods.mint(userAddress, spdAmount).send({ from: '0x9e181e214612fe18a1f6a0927a69fdd8770db35c' });
      res.json({ success: true, result });
    } catch (error) {
      res.json({ success: false, error });
    }
  } else {
    res.json({ success: false, error: 'Not enough points' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
